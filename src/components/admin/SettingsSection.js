import React from 'react';
import type {calderaAdminProps} from "../../types/calderaAdminProps";
import Grid from 'react-css-grid';

type Props = {
	...calderaAdminProps
}

type State = {

};

export class SettingsSection extends React.Component<Props,State> {

	render(){
		const {
			formsStore,
			settingsStore
		} = this.props;

		return (
			<Grid>
				<Settings
					onTabSelect={() => {}}
					forms={formsStore.getForms()}
					settings={settings}
				/>
			</Grid>
		)
	}
}