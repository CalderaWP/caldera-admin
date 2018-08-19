import React from 'react';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormsSlot from './FormsSlot';
i
Enzyme.configure({adapter: new Adapter()});
const handler = () => {
};

describe('Admin screen slot/ fills', () => {
	it('Activates', () => {
		const component = shallow(
			<FormsSlot
				openEntryViewerForForm={handler}
				onFormUpdate={handler}
			/>
		);
		component.setState({active: false});
		component.instance().handleActive();
		expect(component.state('active')).toBe(true);
	});

	it('Deactivates', () => {
		const component = shallow(
			<FormsSlot
				openEntryViewerForForm={handler}
				onFormUpdate={handler}
			/>
		);
		component.setState({active: true});
		component.instance().handleDeactive();
		expect(component.state('active')).toBe(false);
	});
});