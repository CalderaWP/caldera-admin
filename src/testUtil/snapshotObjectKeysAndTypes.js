/**
 * Test utility to snapshot an objects enumerable keys and their type
 * @param object
 */
export function snapshotObjectKeysAndTypes(object) {
	let test = {};
	Object.keys(object).forEach(key => {
		test[key] = typeof object[key];
	});
	expect(JSON.stringify(test)).toMatchSnapshot();
}
