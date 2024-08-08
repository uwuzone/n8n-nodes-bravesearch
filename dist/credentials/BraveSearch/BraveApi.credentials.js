"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BraveApi = void 0;
class BraveApi {
    constructor() {
        this.name = 'braveApi';
        this.displayName = 'Brave API';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
            },
        ];
    }
}
exports.BraveApi = BraveApi;
//# sourceMappingURL=BraveApi.credentials.js.map