import React from 'react';
import ReactDOM from 'react-dom';
import store from "./store";
import {CalderaAdminWithState} from "./CalderaAdminWithState";
import {Provider} from 'react-redux';
import apiClients from './apiClients'

/**
 * A factory for a Caldera (Forms) Admin app
 * @constructor
 */
export default function AdminApp(){
	this.store = store;
	/**
	 * Get the current Redux(-like) store
	 */
	this.getStore = function () {
		return this.store;
	};

	/**
	 * Get the API clients
	 * @return {{cfAdmin, formsAdminApiClient, entriesClient, proSettingsClient, privacySettingsClient, generalSettingsClient}}
	 */
	this.getApiClients = function () {
		return apiClients;
	};

	/**
	 * Render admin app to dom
	 * @param {String} element ID attribute of element to mount app on
	 */
	this.renderToDom = function( element ){
		ReactDOM.render(
			this.component(),
			document.getElementById(element)
		);
	};

	/**
	 * Get the component wrapped in state
	 * @return {*}
	 */
	this.component = function( ){
		return (
			<Provider store={this.getStore()}>
				<CalderaAdminWithState/>
			</Provider>
		)
	}
};