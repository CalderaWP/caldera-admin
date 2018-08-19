import React from 'react';
import {postPropTypes} from "./propTypes";
import EmbedContainer from 'react-oembed-container';
import PropTypes from 'prop-types'
/**
 * The main container component for the RemotePost
 *
 * @param {Object} props
 * @return {*}
 * @constructor
 */
export const RemotePost = (props) => {
	const { post } = props;
	return (
		<EmbedContainer
			markup={post.content.rendered}
			className={props.className}

		>
			<article
				id={`post-${post.id}`}
			>
				<h2>
					{ post.title.rendered }
				</h2>
				<div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
			</article>

		</EmbedContainer>
	);
};

RemotePost.propTypes = {
	...postPropTypes,
	className: PropTypes.string

};
