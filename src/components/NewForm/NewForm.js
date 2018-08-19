import React from 'react';
import {factories} from '@caldera-labs/components';
import propTypes from 'prop-types'
import {collectionTypes} from "../../types";

const {fieldFactory} = factories;


const fieldConfigs = [
	{
		id: 'newFormName',
		label: 'Name',
		type: 'text',
	},
	{
		id: 'newFormTemplate',
		type: 'dropdown',
		label: 'Template',
		options: [

		],
		conditionals: [
			(values) => {
				return 'templates' === values.newFormCreateFrom;
			}
		]
	},
	{
		'id': 'newFormCreateFrom',
		'type': 'dropdown',
		'label': 'Create Form Using',
		options: [
			{
				value: 'templates',
				label: 'From Template'
			},
			{
				value: 'clone',
				label: 'Clone Existing'
			}
		],
	},
	{
		id: 'newFormSubmitButton',
		label: 'Create Form',
		type: 'button',
		inputType: 'submit',
		value: 'Submit',
	},
];


/**
 * The form for creating a new form
 */
export class NewForm extends React.PureComponent {
	/**
	 * Create CreateFormSlot component
	 * @param {Object} props
	 */
	constructor(props){
		super(props);
		this.state = {
			newFormName: '',
			newFormTemplate: '',
			newFormCreateFrom: 'templates',
		};
		this.getFieldComponents = this.getFieldComponents.bind(this);
	}

	/**
	 * Create the field components for CreateFormSlot
	 */
	getFieldComponents(){
		let fields = {};
		this.props.fieldConfigs.forEach( fieldConfig => {
			const {id} = fieldConfig;
			if ( 'newFormSubmitButton' !== id ) {
				fieldConfig.onValueChange = (newValue) => {
					let update = {};
					update[id] = newValue;
					this.setState(update);
				};
				fieldConfig.value = this.state[id];
				if( 'newFormTemplate' === id ){
					fieldConfig.options = this.props.templates;
				}
			}else{
				fieldConfig.onClick = () => {
					this.props.onCreate({
						...this.state
					});
				}
			}
			fields[id] = fieldFactory(fieldConfig);
		});
		return fields;

	}

	/**
	 * Render CreateFormSlot component
	 * @return {*}
	 */
	render(){
		const components = this.getFieldComponents();
		return (
			<div>
				{this.props.fieldConfigs.map(fieldConfig => {
					const {id} = fieldConfig;
					return React.createElement(
						React.Fragment,
						{
							key: `newForm-${id}`,
						},
						components[id]
					);
				})}
			</div>
		)
	}


};

/**
 * prop definitions for CreateFormSlot component.
 *
 * @type {{fieldConfigs: shim, onCreate: *, templates: shim}}
 */
NewForm.propTypes = {
	fieldConfigs: propTypes.array,
	onCreate: propTypes.func.isRequired,
	templates: propTypes.array,
	forms: collectionTypes.formsType
};

/**
 * Default props for CreateFormSlot component
 *
 * @type {{fieldConfigs: *[]}}
 */
NewForm.defaultProps = {
	fieldConfigs,
	forms: {}
};
