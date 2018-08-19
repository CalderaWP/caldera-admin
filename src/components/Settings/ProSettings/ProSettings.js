import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import {TabPanel} from '@wordpress/components';
import configFields from './configFields'
import {RenderGroup} from '@caldera-labs/components'
import {pick, object} from 'dot-object'
import {proLocalSettingsFactory} from "../factories";
import {ProWhatIs} from "./ProWhatIs/ProWhatIs";
import {ProFreeTrial} from "./ProFreeTrial/ProFreeTrial";
import {SettingsGroup} from "../SettingsGroup";

/**
 * Create the CF Pro settings UI
 * @param {Object} props
 * @return {*}
 * @constructor
 */
export class ProSettings extends SettingsGroup {

	/**
	 * Create ProSettings component
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.state = {
			[props.settingsKey]: proLocalSettingsFactory(props.proSettings),
			currentTab: props.currentTab
		};

		this.getConfigFields = this.getConfigFields.bind(this);
		this.tabContentAreaConnected = this.tabContentAreaConnected.bind(this);
		this.tabContentAreaNotConnected = this.tabContentAreaNotConnected.bind(this);
		this.onTabChange = this.onTabChange.bind(this);
	}

	/**
	 * Prepare config fields, based on current tab
	 *
	 * @return {Array}
	 */
	getConfigFields() {
		let currentConfigFields = this.props.configFields[this.state.currentTab];
		currentConfigFields.forEach(configField => {
			const {path} = configField;
			configField.value = pick(
				path,
				this.state.proSettings
			);

			configField.onValueChange = (newValue) => {
				const update = {
					...this.state[this.props.settingsKey],
					[path]: newValue
				};
				this.onSettingsChange(object(update));
			};

		});
		return currentConfigFields;
	};

	/**
	 * Renderer for tab content area used when CF Pro is connected
	 * @param tabName
	 * @return {*}
	 */
	tabContentAreaConnected(tabName) {
		return (
			<RenderGroup
				configFields={this.getConfigFields(tabName)}
			/>
		);
	}

	/**
	 * Renderer for tab content area used when CF Pro is NOT connected
	 * @param tabName
	 * @return {*}
	 */
	tabContentAreaNotConnected(tabName) {
		switch (tabName) {
			case 'apiKeys':
				return this.tabContentAreaConnected('apiKeys');
			case 'freeTrial':
				return (
					<ProFreeTrial/>
				);
			case 'whatIs':
			default:
				return (
					<ProWhatIs/>
				)
		}
	}


	/**
	 * Update internal state when current tab changes
	 * @param {String} currentTab
	 */
	onTabChange(currentTab){
		this.setState({currentTab})
	}

	/**
	 * Render the ProSettings UI
	 * @return {*}
	 */
	render() {
		const {connected} = this.state.proSettings;
		let tabs = [
			{
				name: 'apiKeys',
				title: 'Api Keys',
				className: 'pro-settings',
			}
		];
		if (connected) {
			tabs.push(
				{
					name: 'generalSettings',
					title: 'Caldera FormsSlot Pro Settings',
					className: 'pro-settings',
				}
			);
			tabs.push(
				{
					name: 'formSettings',
					title: 'Form Settings',
					className: 'pro-form-settings',
				}
			);
		} else {
			tabs.push(
				{
					name: 'whatIs',
					title: 'What Is Caldera FormsSlot Pro ?',
					className: 'pro-what-is',
				}
			);
			tabs.push(
				{
					name: 'freeTrial',
					title: 'Free Trial',
					className: 'pro-free-tiral',
				}
			);
		}

		return (
			<TabPanel
				onSelect={this.onTabChange}
				className={classNames(this.props.className, ProSettings.classNames.wrapper)}
				orientation={'vertical'}
				tabs={tabs}
			>
				{
					(tabName) => {
						if (connected) {
							return this.tabContentAreaConnected(tabName);
						}
						return this.tabContentAreaNotConnected(tabName);

					}
				}
			</TabPanel>
		)
	}


};

/**
 * Prop types for the ProSettings component
 * @type {{}}
 */
ProSettings.propTypes = {
	classNames: PropTypes.string,
	proSettings: PropTypes.object,
	onSettingsSave: PropTypes.func.isRequired,
	configFields: PropTypes.object,
	settingsKey: PropTypes.string.isRequired,
	currentTab: PropTypes.string

};

/**
 * Default props for the ProSettings component
 * @type {{}}
 */
ProSettings.defaultProps = {
	configFields,
	settingsKey: 'proSettings',
	currentTab: 'apiKeys'
};

/**
 * Class names used in the ProSettings component
 * @type {{wrapper: string}}
 */
ProSettings.classNames = {
	wrapper: 'caldera-forms-pro-settings'
};