"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearXNG = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const SearXNG_options_1 = require("./SearXNG.options");
class SearXNG {
    constructor() {
        this.description = {
            displayName: 'SearXNG',
            name: 'searXng',
            icon: 'file:searxng.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{ $parameter["operation"] }}',
            description: 'Perform searches using SearXNG instances',
            defaults: {
                name: 'SearXNG',
            },
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                ...SearXNG_options_1.searxngOptions,
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    options: [
                        {
                            name: 'Search',
                            value: 'search',
                            description: 'Search the internet using SearXNG',
                            action: 'Perform a search',
                        },
                    ],
                    default: 'search',
                    noDataExpression: true,
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        for (let i = 0; i < items.length; i++) {
            try {
                const query = this.getNodeParameter('query', i);
                const instancesInput = this.getNodeParameter('instances', i);
                const timeout = this.getNodeParameter('timeout', i);
                this.logger.info(`Searching with SearXNG: ${query} ${instancesInput} ${timeout}`);
                this.logger.info(`ugu`);
                let instances;
                if (typeof instancesInput === 'string') {
                    this.logger.info(`is string`);
                    instances = instancesInput.split(',').map((url) => url.trim());
                }
                else if (Array.isArray(instancesInput)) {
                    this.logger.info(`is array`);
                    instances = instancesInput;
                }
                else {
                    this.logger.info(`error inputs wrong format`);
                    throw new Error('Invalid instances input. Expected comma-separated string or array of URLs.');
                }
                if (instances.length === 0) {
                    this.logger.info(`error`);
                    throw new Error('No SearXNG instances provided.');
                }
                const instance = instances[0];
                const url = `${instance}/search`;
                this.logger.info('Sending request: ' + url);
                const searchResults = await this.helpers.request({
                    method: 'GET',
                    url,
                    qs: {
                        q: query,
                    },
                    timeout: timeout,
                });
                this.logger.info(`Search results from ${instance}: ${JSON.stringify(searchResults)}`);
                returnData.push({
                    json: {
                        query,
                        instance,
                        results: searchResults.results || [],
                    },
                });
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { input: this.getInputData(i)[0].json, error: `${error}` } });
                    continue;
                }
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), error);
            }
        }
        return [this.helpers.returnJsonArray(returnData)];
    }
}
exports.SearXNG = SearXNG;
//# sourceMappingURL=SearXNG.node.js.map