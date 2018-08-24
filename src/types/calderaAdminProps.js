import type {formEntryViewerState} from "./states/formEntryViewerStore";
import type {statusType} from "./types/status";

export type calderaAdminProps = {
	formEntryViewerStore: formEntryViewerState,
	formsStore:formEntryViewerState,
	mainStatus: statusType
}