import React from 'react';
import classNames from 'classnames'
import {NavigableMenu, MenuItem} from '@wordpress/components';
import PropTypes from 'prop-types'

export const NavBar = (props) => {

	return (
		<div
			className={classNames(NavBar.classNames)}
		>
			<NavigableMenu onNavigate={props.onNavigate}>
				{props.choices.map(item => {
					const isSelected = props.value === item.value;
					const icon = isSelected ? 'yes' :
						item.hasOwnProperty('icon') ? item.icon : false;
					return (
						<MenuItem
							className={
								classNames(
									NavBar.classNames.navItem,
									item.classNames,
									{
										active: isSelected
									}
								)
							}
							key={item.value}
							icon={icon}
							isSelected={isSelected}
							shortcut={item.shortcut}
							onClick={() => {
								if (!isSelected) {
									props.onNavigate(item.value);
								}
							}}
						>
							{item.label}
						</MenuItem>
					);
				})}

			</NavigableMenu>
		</div>
	);
}

NavBar.propTypes = {
	onNavigate: PropTypes.func.isRequired,
	choices: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			shortcut: PropTypes.string,
			classNames: PropTypes.string
		})),
	value: PropTypes.string
};

NavBar.defaultProps = [

	{
		value: 'forms',
		label: 'FormsSlot',
		icon: 'feedback'
	},
	{
		value: 'settings',
		label: 'Settings',
		icon: 'admin-settings'
	}
];

NavBar.classNames = {
	wrapper: [
		'caldera-editor-header', 'caldera-editor-subnav'
	],
	navItem: 'caldera-subnav',
	active: 'active'
}