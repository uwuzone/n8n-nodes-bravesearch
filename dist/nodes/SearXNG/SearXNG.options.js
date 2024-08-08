"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searxngOptions = void 0;
exports.searxngOptions = [
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
        displayName: 'Instances',
        name: 'instances',
        type: 'string',
        default: '={{ $json.instances }}',
        description: 'Comma-separated list of SearXNG instance URLs or an array of URLs',
        required: true,
    },
    {
        displayName: 'Timeout',
        name: 'timeout',
        type: 'number',
        default: 10000,
        description: 'Timeout for the search request in milliseconds',
    },
];
//# sourceMappingURL=SearXNG.options.js.map