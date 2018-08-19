import {settingsProp} from './prepareSettings';

describe( 'prepareSettings ', () => {
	const settings = {
		a : 'a'
	};
	describe( 'util function', () => {
		it( 'gets an existent value', () => {
			expect( settingsProp(settings,'a','b')).toBe('a');
		});
		it( 'gets a non-existent value', () => {
			expect( settingsProp(settings,'fake','b')).toBe('b');
		});
	});

});