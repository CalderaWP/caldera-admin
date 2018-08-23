// @flow

import PropTypes from "prop-types";
export type wpPostTitle = {
	rendered: string
};

export type wpPostContent = {
	rendered: string
}

export type wpPostExcerpt = {
	rendered: string
}

export type wpPost = {
	id: string|number,
	title: wpPostTitle,
	content: wpPostContent,
	excerpt: wpPostExcerpt
}