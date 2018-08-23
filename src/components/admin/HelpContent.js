// @flow
import React from 'react';
import {RemotePost} from "../../components/RemotePost/RemotePost";
import Grid from 'react-css-grid'

import type {wpPost} from "../../types/types/wpPost";

type Props = {
	helpContentCategory: number
};

type State = {
	helpContent: Array<wpPost>,
}

export default class AdminSlot extends React.Component<Props, State> {
	state = {
		helpContent: [],
	};

	constructor(props: Props) {
		super(props);
		(this: any).this.getHelpContent = this.getHelpContent.bind(this);
		(this: any).this.displayHelpContent = this.displayHelpContent.bind(this);

	}


	displayHelpContent() {
		if (undefined === this.state.helpContent || ! this.state.helpContent.length ) {
			return <React.Fragment/>
		}
		return (
			<Grid
				width={320}
				gap={24}
			>
				{
					this.state.helpContent.map(function (post: wpPost) {
						return (
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

	getHelpContent() : void {
		const url = 'https://calderaforms.com/wp-json/wp/v2/posts?type[]=doc&type[]=download&type[]=doc&caldera_admin_help='
			+ this.props.helpContentCategory;

		fetch(url, {
			mode: 'cors',
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

