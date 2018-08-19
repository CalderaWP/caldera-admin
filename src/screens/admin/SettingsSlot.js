import React from 'react';
import FormAdminToolbar from './FormAdminToolbar';
import FormAdminMainView from './FormAdminMainView';
import AdminSlot from "./AdminSlot";
import {collectionTypes} from "../../types";
import {Settings} from "../../components/Settings/Settings";

/**
 * Container for SettingsSlot UI in main admin screen
 */
export default class SettingsSlot extends AdminSlot {

	render() {
		const {forms,settings} = this.props;

		return (
			<div>
				<FormAdminToolbar.NavBar
					label="Settings"
					onActive={this.handleActive}
					onDeactive={this.handleDeactive}
					isActive={this.state.active}
				/>
				{this.state.active &&
				<div>

					<FormAdminMainView.Content>
						<Settings
							onTabSelect={() => {}}
							forms={forms}
							settings={settings}
						/>
					</FormAdminMainView.Content>

				</div>
				}
			</div>
		);
	}


}


SettingsSlot.propTypes = {
	forms: collectionTypes.formsType,
	settings: collectionTypes.settingsType,
};
SettingsSlot.defaultProps = {
	forms: {},
	settings: {}
};