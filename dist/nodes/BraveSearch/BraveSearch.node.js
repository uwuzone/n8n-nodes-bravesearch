"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BraveSearch = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const BraveSearch_options_1 = require("./BraveSearch.options");
class BraveSearch {
    constructor() {
        this.description = {
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
            properties: [...BraveSearch_options_1.braveSearchOptions],
        };
    }
    async execute() {
        var _a, _b;
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('braveApi');
        for (let i = 0; i < items.length; i++) {
            try {
                const query = this.getNodeParameter('query', i);
                const country = this.getNodeParameter('country', i);
                const limit = this.getNodeParameter('limit', i);
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
                        'X-Subscription-Token': credentials.apiKey,
                    },
                    json: true,
                });
                this.logger.info(`Got results for "${query}" in ${country} with a limit of ${limit} results`);
                returnData.push({
                    json: {
                        query,
                        results: ((_a = searchResults.web) === null || _a === void 0 ? void 0 : _a.results) || [],
                        total: ((_b = searchResults.web) === null || _b === void 0 ? void 0 : _b.totalResults) || 0,
                    },
                });
            }
            catch (error) {
                this.logger.info(`ah ah error ${error}`);
                if (this.continueOnFail()) {
                    returnData.push({ json: { input: this.getInputData(i)[0].json, error: `${error}` } });
                    continue;
                }
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), error);
            }
        }
        return [returnData];
    }
}
exports.BraveSearch = BraveSearch;
//# sourceMappingURL=BraveSearch.node.js.map