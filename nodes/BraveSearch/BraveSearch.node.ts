import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { braveSearchOptions } from './BraveSearch.options';

export class BraveSearch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Brave Search',
		name: 'braveSearch',
		icon: 'file:brave.svg',
		group: ['transform'],
		version: 1,
		description: 'Perform searches using Brave Search API',
		defaults: {
			name: 'Brave Search',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'braveApi',
				required: true,
			},
		],
		properties: [...braveSearchOptions],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('braveApi');

		for (let i = 0; i < items.length; i++) {
			try {
				const query = this.getNodeParameter('query', i) as string;
				const country = this.getNodeParameter('country', i) as string;
				const limit = this.getNodeParameter('limit', i) as number;

				this.logger.info(`Searching for "${query}" in ${country} with a limit of ${limit} results`);

				const searchResults = await this.helpers.request({
					method: 'GET',
					url: 'https://api.search.brave.com/res/v1/web/search',
					qs: {
						q: query,
						country,
						count: limit,
					},
					headers: {
						Accept: 'application/json',
						'X-Subscription-Token': credentials.apiKey as string,
					},
					json: true,
				});
				this.logger.info(
					`Got results for "${query}" in ${country} with a limit of ${limit} results`,
				);

				returnData.push({
					json: {
						query,
						results: searchResults.web?.results || [],
						total: searchResults.web?.totalResults || 0,
					},
				});
			} catch (error) {
				this.logger.info(`ah ah error ${error}`);
				if (this.continueOnFail()) {
					returnData.push({ json: { input: this.getInputData(i)[0].json, error: `${error}` } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error);
			}
		}

		return [returnData];
	}
}
