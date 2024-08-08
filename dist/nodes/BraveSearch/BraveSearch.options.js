"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.braveSearchOptions = void 0;
exports.braveSearchOptions = [
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
            maxValue: 20,
        },
        default: 20,
        description: 'Max number of results to return',
    },
];
//# sourceMappingURL=BraveSearch.options.js.map