import type {formEntryViewerState} from "./states/formEntryViewerStore";
import type {settingsState} from "./states/settingsStore";
import type {status} from "./types/status";

export type calderaAdminProps = {
	formEntryViewerStore: formEntryViewerState,
	formsStore:formEntryViewerState,
	settingsStore: settingsState,
	mainStatus: status
}