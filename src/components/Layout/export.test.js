import Layout from './index';
import {snapshotObjectKeysAndTypes} from "../../testUtil/snapshotObjectKeysAndTypes";

describe( 'Layout export', () => {
	it( 'index has the right types and keys', () => {
		snapshotObjectKeysAndTypes(Layout);
	});
});