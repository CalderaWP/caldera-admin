import {resolvers} from './resolvers';
import {formTemplateReducer} from "./templates-store";

describe( 'resolvers', () => {
	it( 'has functions', () => {
		expect( typeof resolvers.getForm ).toBe( 'function');
		expect( typeof resolvers.getForms ).toBe( 'function');
		expect( typeof resolvers.getFormPreview ).toBe( 'function');
		expect( typeof resolvers.getFormPrivacySettings ).toBe( 'function');
		expect( typeof resolvers.getStyleIncludes ).toBe( 'function');
		expect( typeof resolvers.getOtherSettings ).toBe( 'function');
		expect( typeof resolvers.getCfProFormSetting ).toBe( 'function');
		expect( typeof resolvers.getPageOfEntries ).toBe( 'function');
	});

	it( 'returns empty object when init form templates redcuer', () => {
		expect( formTemplateReducer( undefined, {type:'INIT'}) ).toEqual({});
	})
});
