import React from 'react';
import PropTypes from 'prop-types'
import {RenderGroup} from '@caldera-labs/components';

export const SORT_FORMS_BY_NAME = 'NAME';
export const SORT_FORMS_BY_CREATED = 'CREATED';
export const FormListSort = (props) => {
	const sortOptions = {
		id: 'cf-form-sort-options',
		label: 'Sort Forms By',
		desc: '',
		type: 'select',
		inputClass: FormListSort.classNames.order,
		value: props.order,
		options: [
			{
				value: SORT_FORMS_BY_NAME,
				label: 'Name'
			},
			{
				value: SORT_FORMS_BY_CREATED,
				label: 'Created'
			}
		],
		onValueChange: (newOrder) => {
			props.onChangeOrder(newOrder)

		}
	};
	return (
		<div>
			<RenderGroup
				configFields={[
					sortOptions
				]}
				className={'caldera-forms-admin-list-sort'}
			/>
		</div>
	);
};


FormListSort.propTypes = {
	order: PropTypes.oneOf([
		SORT_FORMS_BY_NAME,
		SORT_FORMS_BY_CREATED
	]),
	onChangeOrder: PropTypes.func

};

FormListSort.defaultProps = {
	order: SORT_FORMS_BY_NAME
};

FormListSort.classNames = {
	order: 'order-forms-select'
}


