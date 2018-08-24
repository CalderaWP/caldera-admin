//@flow
import React from 'react';
const HomePage = (props) => {
	return(
		<div>Hi Forms</div>
	)
};


type Props = {
	FormsSection: () => React.Node,
	SettingsSection: () => React.Node,
	NewFormSection: () => React.Node,
	activeView: string

}




export default class Router extends React.Component<Props> {

	getComponent(activeView){
		switch (activeView){
			case 'forms':
				return this.props.FormsSection;
			case 'settings':
				return this.props.SettingsSection;
			case 'newForm':
				return this.props.NewFormSection;
			default:
				return <HomePage/>
		}
	}
	render() {
		const {activeView} = this.props;
		return (
			<React.Fragment>
				{this.getComponent(activeView)}
			</React.Fragment>
		)
	}
}