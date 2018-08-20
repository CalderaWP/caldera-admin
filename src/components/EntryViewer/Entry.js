import React from "react";
import entryType from './entryType'
import classNames from 'classnames'
import PropTypes from 'prop-types';

export const Entry = (props) => {
	return (
		<div>
			<div
				className="baldrick-modal-title"
				style={
					{
						display:'block'
					}
				}>
				<a
					//@todo make this an icon
					className="baldrick-modal-closer"
				>
					×
				</a>
				<h3
					className="modal-label"
				>
					Entry {props.id}
				</h3>
			</div>

			<div>
				<div className="caldera-forms-entry-left">
					<div
						className={classNames(
							{
								'user-avatar': props.user.id && 0 < props.user.id
							},
							`user-avatar-${props.user.id}`
						)}
						title={props.user.name}
						style={{
							marginTop: '-1px'
						}}
					>
						<img
							alt={`User Avatar for ${props.user.name}`}
							src={props.user.avatar}
						/>
					</div>

				</div>

				<div
					className={
						classNames('caldera-forms-entry-right', 'tab-detail-panel')
					}
				>
					<ul>

						{
							props.fields.map(field => {
							return (
								<li
									className="entry-detail"
									key={field.id}
								>
									<span className="entry-label">
										{field.label ? field.label : field.slug}
									</span>
									<span className="entry-content">
										{field.value}
									</span>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</div>

	);
};

/**
 *
 * @type {{fields, user, id, form: shim}}
 */
Entry.propTypes = {
	...entryType,
	form: PropTypes.object.isRequired
};

/**
 *
 * @type {{user: {id: string, avatar: string, name: string}}}
 */
Entry.defaultProps = {
	user: {
		id: '',
		avatar: '',
		name: ''
	}
};