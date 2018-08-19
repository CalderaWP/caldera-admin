import apiClients, {
	entriesClient,
	formsAdminApiClient,
	generalSettingsClient,
	privacySettingsClient,
	proSettingsClient
} from "./apiClients";
import * as calderaApiClient from '@caldera-labs/api-client';
import {cfAdmin} from "./apiClients";

describe('Forms client', () => {
	it('Works with mock data', () => {
		const FakeFormsClient = calderaApiClient.wpClientFactory(
			'./__MOCK_DATA__/cf-api',
			'theNonce',
			'forms'
		);

		expect(FakeFormsClient.urlFromEndpoint(
			FakeFormsClient.getFormsEndpoint()
		)).toBe('./__MOCK_DATA__/cf-api/forms?');
	});

	it('Has the right root route', () => {
		expect(formsAdminApiClient.route).toBe('./__MOCK_DATA__/cf-api');
	});


});

describe('Privacy client', () => {

	it('Has the right root route', () => {
		expect(privacySettingsClient.route).toBe('./__MOCK_DATA__/cf-api');
	});

});

describe('cfAdmin Templates list', () => {

	it('Has an object of templates', () => {
		expect(typeof cfAdmin.templates).toBe('object');
		expect(Array.isArray(cfAdmin.templates)).toBe(false);
	});

});


describe( 'exports', () => {
	it( 'exports cf admin config', () => {
		expect(typeof apiClients.cfAdmin ).toBe( 'object' );
	});
	it( 'exports formsAdminApiClient', () => {
		expect(typeof apiClients.formsAdminApiClient ).toBe( 'object' );
	});
	it( 'exports entriesClient', () => {
		expect(typeof apiClients.entriesClient ).toBe( 'object' );
	});
	it( 'exports proSettingsClient', () => {
		expect(typeof apiClients.proSettingsClient ).toBe( 'object' );
	});
	it( 'exports privacySettingsClient', () => {
		expect(typeof apiClients.privacySettingsClient ).toBe( 'object' );
	});
	it( 'exports generalSettingsClient', () => {
		expect(typeof apiClients.generalSettingsClient ).toBe( 'object' );
	});
});