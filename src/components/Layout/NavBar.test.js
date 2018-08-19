import React from 'react';
import renderer from "react-test-renderer";
import {NavBar} from "./NavBar";

const handler = () => {};
describe( 'NavBar component', () => {
	const choices = [
		{
			value: 'forms',
			label: 'FormsSlot'
		},
		{
			value: 'settings',
			label: 'Settings'
		}
	];
	it( 'Renders choices', () => {
		const component = renderer.create(
			<NavBar
				onNavigate={handler}
				choices={choices}
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	});

	it( 'passes classNames', () => {
		const component = renderer.create(
			<NavBar
				onNavigate={handler}
				choices={[
					...choices,
					{
						classNames: 'THIS_IS_FOOS_CLASS',
						value: 'foo',
						label: 'foo'
					}
				]}
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	});

	it( 'works with icons', () => {
		const component = renderer.create(
			<NavBar
				onNavigate={handler}
				choices={[
					...choices,
					{
						icon: 'smiley',
						value: 'foo-smile',
						label: 'foo'
					}
				]}
			/>
		);
		expect( component.toJSON() ).toMatchSnapshot();
	});

});