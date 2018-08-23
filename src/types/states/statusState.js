// @flow
import type {status} from "../types/status";


/**
 * Current status
 *
 * @type {{loading: boolean, error: boolean, message: string}}
 */
let state : status = {
	loading: false,
	error: false,
	message: '',
};

/**
 * API for get/set status
 *
 * @type {{isLoading: (function(): boolean), setLoading: statusStore.setLoading, isError: (function(): boolean), setError: statusStore.setError, getMessage: (function(): string), setMessage: statusStore.setMessage}}
 */
export const statusStore = {
	getStatus: () : status =>{
		return state;
	},
	isLoading: () : boolean => {
		return state.loading;
	},
	setLoading: ( loading : boolean ) : void => {
		state = {
			...state,
			loading
		};
	},
	isError: () : boolean => {
		return state.error;
	},
	setError: (error: boolean) : void => {
		state = {
			...state,
			error
		};
	},
	getMessage: () : string =>{
		return state.message;
	},
	setMessage: (message : string) : void =>{
		state = {
			...state,
			message
		};
	}
};