import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import {TabPanel} from '@wordpress/components';
import {ProSettings} from "./ProSettings/ProSettings";
import {GeneralSettings} from "./GeneralSettings/GeneralSettings";
import {collectionTypes} from "../../types";
import {GENERAL_SETTINGS} from "./GeneralSettings/generalSettingsType";
import {PRO_CONNECTED, PRO_SETTINGS} from "./ProSettings/proSettingsType";

/**
 * Creates the UI for Caldera FormsSlot global settings
 */
export class Settings extends React.PureComponent {

	/**
	 * Create Settings componet
	 * @param props
	 */
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
		this.onSettingsSave = this.onSettingsSave.bind(this);
	}

	/**
	 * Dispatch current tabName when tabs change
	 * @param tabName
	 */
	onSelect(tabName) {
		this.props.onTabSelect(tabName)
	};

	/**
	 * Dispatches settings to parent on save
	 * @param update
	 */
	onSettingsSave(update) {
		this.props.updateSettings(update);
	};

	/**
	 * Creat main Caldera FormsSlot settings UI
	 * @return {*}
	 */
	render() {
		const {settings} = this.props;
		return (
			<TabPanel
				orientation={'horizontal'}
				className={
					classNames(Settings.classNames.wrapper, this.props.classNames)
				}
				activeClass={
					classNames(Settings.classNames.active)
				}
				onSelect={this.onSelect}
				tabs={[

					{
						name: 'proSettings',
						title: 'Caldera Forms Pro',
						className: 'pro-settings',
					},
					{
						name: 'privacySettings',
						title: 'Privacy Settings',
						className: 'privacy-settings',
					},
					{
						name: 'generalSettings',
						title: 'Global Form Settings',
						className: 'global-form-settings',
					},
				]}
			>
				{
					(tabName) => {
						switch (tabName) {
							case 'generalSettings':
								return (
									<GeneralSettings
										settings={settings[GENERAL_SETTINGS]}
										onSettingsChange={(generalSettings) => {
											this.onSettingsSave({
												[GENERAL_SETTINGS]:generalSettings,
												[PRO_SETTINGS]:settings[PRO_SETTINGS]
											})
										}}
									/>
								);
							case 'proSettings':
							default:
								return (
									<ProSettings
										settings={settings[PRO_SETTINGS]}
										onSettingsSave={(proSettings) => {
											this.onSettingsSave({
												[GENERAL_SETTINGS]:settings[GENERAL_SETTINGS],
												[PRO_SETTINGS]:proSettings
											})
										}}
									/>
								)
						}
					}
				}
			</TabPanel>
		);
	}
};

/**
 * Prop definitions for Settings component
 *
 * @type {{classNames: shim, onTabSelect: *, proSettings: shim, generalSettings: shim, onSettingsSave: shim}}
 */
Settings.propTypes = {
	classNames: PropTypes.string,
	onTabSelect: PropTypes.func.isRequired,
	settings: collectionTypes.settingsType,
	updateSettings: PropTypes.func
};

/**
 * Default props for the Settings component
 * @type {{}}
 */
Settings.defaultProps = {
	settings:{
		[GENERAL_SETTINGS]: {},
		[PRO_SETTINGS]: {
			[PRO_CONNECTED]: false
		}
	}
}

/**
 * Class names used in the Settings component
 * @type {{wrapper: string}}
 */
Settings.classNames = {
	wrapper: 'caldera-forms-global-settings',
	active: 'caldera-forms-settings-tab-active'
};