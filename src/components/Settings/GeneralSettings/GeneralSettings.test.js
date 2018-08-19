import renderer from 'react-test-renderer';
import React from 'react';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GeneralSettings} from './GeneralSettings'
import {CDN_ENABLE, STYLE_ALERT, STYLE_FORM, STYLE_GRID} from "./configFields";
import configFields from './configFields';
import {PRO_CONNECTED} from "../ProSettings/proSettingsType";
import {prepareGeneralSettings} from "./prepareGeneralSettings";
import {prepareSettings, settingsProp} from "../../../state/prepareSettings";
import {GENERAL_SETTINGS} from "./generalSettingsType";

const handler = () => {
};
Enzyme.configure({adapter: new Adapter()});
const settings = {
	proSettings: {
		[PRO_CONNECTED]: true
	}
}
describe('GeneralSettings component', () => {
	it('Matches snapshot with minimal props', () => {
		expect(
			renderer.create(
				<GeneralSettings
					onSettingsChange={() => {
					}}
					settings={settings}
				/>
			).toJSON()
		).toMatchSnapshot()
	});

	describe('configField preparation', () => {
		it('Has the right number of fields', () => {
			const component = shallow(
				<GeneralSettings
					onSettingsChange={handler}
					settings={settings}

				/>
			);
			expect(component.instance().getConfigFields().length)
				.toEqual(configFields.length);
		});


		it('Adds change handlers', () => {
			const component = shallow(
				<GeneralSettings
					onSettingsChange={handler}
					settings={settings}
				/>
			);
			expect(typeof component.instance().getConfigFields()[0].onValueChange)
				.toEqual('function');
		});

	});
});

describe('prepareGeneralSettings', () => {
	it('adds defaults', () => {
		expect(
			prepareGeneralSettings({}, {})
		).toEqual({
				[STYLE_FORM]: true,
				[STYLE_GRID]: true,
				[STYLE_ALERT]: true,
				[CDN_ENABLE]: true,
			}
		)
	});

	it('sets values', () => {
		expect(
			prepareGeneralSettings({
				[STYLE_GRID]: false,
			}, {
				[CDN_ENABLE]: false,
			})
		).toEqual(
			{
				[STYLE_FORM]: true,
				[STYLE_GRID]: false,
				[STYLE_ALERT]: true,
				[CDN_ENABLE]: false,
			}
		);
	});

	it.skip('works in prepareSettings with values passed', () => {
		const prepared = prepareSettings({
			[GENERAL_SETTINGS]: {
				styleIncludes: {
					[STYLE_GRID]: false,

				},
				otherSettings: {
					[CDN_ENABLE]: false,
				}
			}
		});
		expect(
			prepared[GENERAL_SETTINGS]
		).toEqual({
				[STYLE_FORM]: true,
				[STYLE_GRID]: false,
				[STYLE_ALERT]: true,
				[CDN_ENABLE]: false,
			}
		);
	});
});