//@flow
import entriesClient from '../../apiClients';
import type {formId} from "../types/form";

export type formEntryViewerState = {
	entryViewerForm: formId,
	entryPage: number,
	entries: Object,
	currentEntry: number
}




const initalState : formEntryViewerState = {
	entryViewerForm: '',
	entryPage: 1,
	entries: {},
	currentEntry: 0,

};
