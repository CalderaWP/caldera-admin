//@flow
import React from 'react';
import type {wpPost} from "../../types/types/wpPost";
import Grid from 'react-css-grid';
import {RemotePost} from "./RemotePost";

export const RemotePosts = (props: {
	posts: Array<wpPost>,
	readMore: string
}) => {
	const {posts} = props;
	const readMore = props.readMore ? props.readMore : 'Learn More';
	return (
		<Grid>
			{
				posts.map(function (post: wpPost) {
					return (
						<RemotePost
							post={post}
							key={post.id}
							readMore={readMore}
						/>
					)
				})
			}
		</Grid>
	)
}