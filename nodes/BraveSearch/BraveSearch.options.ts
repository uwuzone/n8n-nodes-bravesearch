import { INodeProperties } from 'n8n-workflow';

export const braveSearchOptions: INodeProperties[] = [
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		default: '',
		placeholder: 'Enter search query',
		description: 'The search query to perform',
		required: true,
	},
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		default: 'US',
		description: 'The country code for localized results (e.g., US, GB, DE)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			// Max is 20 per brave docs
			// eslint-disable-next-line n8n-nodes-base/node-param-type-options-max-value-present
			maxValue: 20,
		},
		// Default is 20 per brave docs
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-limit
		default: 20,
		description: 'Max number of results to return',
	},
];
