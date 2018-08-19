import React from "react";
import entryType from './entryType'
import classNames from 'classnames'

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
								'user-avatar': props.user.ID && 0 < props.user.ID
							},
							`user-avatar-${props.user.ID}`
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
						classNames('caldera-forms-entry-right', 'tab-detail-panel hidden')
					}
				>
					<ul>
						{props.fields.map(field => {
							return (
								<li className="entry-detail">
									<span className="entry-label">{field.label}</span>
									<div className="entry-content">
										{field.value}
									</div>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</div>

	);
};

Entry.propTypes = entryType;


