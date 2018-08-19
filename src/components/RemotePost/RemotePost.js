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
	const {post} = props;

	const Content = () => {
		if (props.showExcerpt) {
			return (<div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>);

		}
		return (
			<div dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
		);

	}
	return (
		<EmbedContainer
			markup={post.content.rendered}
			className={props.className}

		>
			<article
				id={`post-${post.id}`}
			>
				<h2>
					{post.title.rendered}
				</h2>
				{Content()}
				<a href={post.link}>Read More</a>
			</article>

		</EmbedContainer>
	);
};

RemotePost.propTypes = {
	...postPropTypes,
	className: PropTypes.string,
	showExcerpt: PropTypes.bool

};

RemotePost.defaultProps = {
	showExcerpt: true
}
