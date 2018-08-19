import screens from './index';
import admin from './admin';
import {snapshotObjectKeysAndTypes} from '../testUtil/snapshotObjectKeysAndTypes';

describe( 'screens export', () => {
	it( 'index has the right types and keys', () => {
		snapshotObjectKeysAndTypes(screens);
	});
});

describe( 'admin screen export', () => {
	it( 'admin has the right types and keys', () => {
		snapshotObjectKeysAndTypes(admin);
	});
});