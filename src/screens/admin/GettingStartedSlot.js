import React from 'react';
import FormAdminToolbar from './FormAdminToolbar';
import FormAdminMainView from './FormAdminMainView';
import AdminSlot from "./AdminSlot";
import FormAdminHelpView from './FormAdminHelpView';


/**
 */
export default class GettingStartedSlot extends AdminSlot {

	render() {
		return (
			<div>
				<FormAdminToolbar.NavBar
					label="Getting Started"
					onActive={this.handleActive}
					onDeactive={this.handleDeactive}
					isActive={this.state.active}
				/>
				{this.state.active &&
				<React.Fragment>

					<FormAdminMainView.Content>
						{this.displayHelpContent()}
					</FormAdminMainView.Content>
					<FormAdminHelpView.Content>
						{this.displayHelpContent()}
					</FormAdminHelpView.Content>

				</React.Fragment>
				}


			</div>
		);
	}


}
