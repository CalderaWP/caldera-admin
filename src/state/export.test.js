import State from './index';
import {snapshotObjectKeysAndTypes} from '../testUtil/snapshotObjectKeysAndTypes';

describe( 'export', () => {
	it( 'has the right types and keys', () => {
		snapshotObjectKeysAndTypes(State);
	});
});