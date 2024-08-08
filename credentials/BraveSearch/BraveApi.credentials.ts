import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class BraveApi implements ICredentialType {
	name = 'braveApi';
	displayName = 'Brave API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
}
