import types,{collectionTypes} from "./types";


describe('types',() => {
	it( 'has the types', () => {
		expect(JSON.stringify(types)).toMatchSnapshot();

	});

	it( 'has the collectionTypes', () => {
		expect(JSON.stringify(collectionTypes)).toMatchSnapshot();

	});

});