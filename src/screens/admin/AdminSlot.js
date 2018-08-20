import React from 'react';
import PropTypes from 'prop-types';
import {RemotePost} from "../../components/RemotePost/RemotePost";
import Grid from 'react-css-grid'

export default class AdminSlot extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			helpContent: {},
			started: false
		};
		this.handleActive = this.handleActive.bind(this);
		this.handleDeactive = this.handleDeactive.bind(this);
		this.getHelpContent = this.getHelpContent.bind(this);
		this.displayHelpContent = this.displayHelpContent.bind(this);

	}


	handleActive() {
		this.setState({active: true});

		if( undefined  === this.props.helpContentCategory || 0 === this.props.helpContentCategory ){
			return;
		};
		this.getHelpContent();

	}

	handleDeactive() {
		this.setState({active: false});
	}


	displayHelpContent(){
		const posts = this.state.helpContent;
		if( 0 === Object.keys(posts).length ){
			return <React.Fragment/>
		}
		return(
			<Grid
				width={320}
				gap={24}
			>
				{
					Object.values( posts ).map( post => {
						return(
							<RemotePost
								post={post}
								key={post.id}
								readMore={'Learn More'}
							/>
						)
					})
				}

			</Grid>

		);

	}

	getHelpContent(){

		fetch('https://calderaforms.com/wp-json/wp/v2/posts?type[]=doc&type[]=download&type[]=doc&caldera_admin_help=' + this.props.helpContentCategory, {
			mode:'cors',
			redirect: 'follow',
			cache: "default", // *default, no-cache, reload, force-cache, only-if-cached

		}).then(response => response.json())
			.catch(error => console.error('Error:', error))
			.then(response => {
				this.setState(
					{helpContent: response}
				)
			});
	}

};

AdminSlot.propTypes = {
	helpContentCategory: PropTypes.number
};

AdminSlot.defaultProps = {
	helpContentCategory: 0
}