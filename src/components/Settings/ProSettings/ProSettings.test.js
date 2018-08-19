import renderer from 'react-test-renderer';
import React from 'react';
import {shallow} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ProSettings} from "./ProSettings";
import {prepareProSettings} from "./prepareProSettings";
import {PRO_CONNECTED, PRO_SETTINGS} from "./proSettingsType";
import {PRIVATE_KEY, PRO_API_KEYS, PUBLIC_KEY} from "./configFields";
import {prepareSettings} from "../../../state/prepareSettings";

Enzyme.configure({adapter: new Adapter()});
const handler = () => {
};
describe('ProSettings component', () => {

	it( 'Fills in missing settings when merging props and state', () => {
		const component = shallow(
			<ProSettings
				onSettingsSave={handler}
			/>);
		expect(
			component.state( 'proSettings' ).hasOwnProperty('connected')
		).toBe(true);
		expect(
			component.state( 'proSettings' ).hasOwnProperty('apiKeys')
		).toBe(true);
		expect(
			component.state( 'proSettings' ).hasOwnProperty('generalSettings')
		).toBe(true);
	});




	it('Matches snapshot with minimal props', () => {
		expect(
			renderer.create(
				<ProSettings
					proSettings={{
						connected: true,
					}}
					onSettingsSave={handler}
				/>
			).toJSON()
		).toMatchSnapshot()
	});

	it('Is wrapped in the right class', () => {
		expect(
			shallow(
				<ProSettings
					proSettings={{
						connected: true,
					}}
					onSettingsSave={handler}
				/>
			).find('.' + ProSettings.classNames.wrapper)
				.length
		).toEqual(1)
	});

	describe('configField preparation', () => {
		describe('apiKeys tab', () => {
			it('has 2 fields', () => {
				const component = shallow(
					<ProSettings
						onSettingsSave={handler}
					/>
				);
				const configFields = component.instance().getConfigFields('apiKeys');
				expect(configFields.length).toEqual(2);
			});

			it('adds value', () => {
				const settings = {
					connected: true,
					apiKeys: {
						public: 'addsValue'
					},
				};
				const component = shallow(
					<ProSettings
						proSettings={settings}
						onSettingsSave={handler}
					/>
				);
				const configFields = component.instance().getConfigFields('apiKeys');
				expect(configFields[0].value).toEqual('addsValue');
			});

			it('adds change handler', () => {
				const component = shallow(
					<ProSettings
						proSettings={
							{
								connected: true
							}
						}
						onSettingsSave={handler}
					/>
				);
				const configFields = component.instance().getConfigFields('apiKeys');
				expect(typeof configFields[0].onValueChange).toEqual('function');
			});

			it('updates state', () => {
				const component = shallow(
					<ProSettings
						proSettings={{
							connected: true,
							apiKeys: {
								public: '',
								private: 'r3s'
							}
						}}
						onSettingsSave={handler}
					/>
				);
				component.instance().onSettingsChange({
					apiKeys: {
						public: 'u'
					}
				});
				expect(component.state('proSettings').apiKeys.public).toEqual('u');
			});
			it('Change handler updates state', () => {
				const component = shallow(
					<ProSettings
						proSettings={{
							connected: true,
							apiKeys: {
								public: '',
								private: 'r3s'
							}
						}}
						onSettingsSave={handler}
					/>
				);
				const configFields = component.instance().getConfigFields('apiKeys');
				configFields[0].onValueChange('updatedValue');
				expect(component.state('proSettings').apiKeys.public).toEqual('updatedValue');
			});

			it('Change handler does not remove state values not updated', () => {
				const component = shallow(
					<ProSettings
						onSettingsSave={handler}
						proSettings={{
							connected: true,
							apiKeys: {
								public: '',
								private: 'r3s'
							}
						}}
					/>
				);
				const configFields = component.instance().getConfigFields('apiKeys');
				configFields[0].onValueChange('updatedValue');
				expect(component.state('proSettings').apiKeys.private).toEqual('r3s');
			});

			it('Passes updates to state to save handle', () => {
				const updatedSettings = {
					proSettings: {
						apiKeys: {
							public: 'hi',
							private: 'roy'
						}
					}
				};

				let updatedSettingsRecived = {};
				const component = shallow(
					<ProSettings
						onSettingsSave={(values) => {
							updatedSettingsRecived = values;
						}}
						proSettings={{
							generalSettings: {
								enhancedDelivery: true,
							},
							apiKeys: {
								public: '',
								private: 'r3s'
							}
						}}
					/>
				);
				component.setState(updatedSettings);
				component.instance().onSettingsSave();
				expect(updatedSettingsRecived.apiKeys.public).toEqual('hi');
				expect(updatedSettingsRecived.apiKeys.private).toEqual('roy');
			});

		});
	});
	describe( 'tab content', () => {
		it( 'Shows apiKeys tab', () => {
			const component = shallow(
				<ProSettings
					onSettingsSave={handler}
					proSettings={{
						connected: true,
						apiKeys: {
							public: '',
							private: ''
						}
					}}
				/>
			);
			const tabArea = renderer.create(
				component.instance().tabContentAreaConnected('apiKeys')
			);
			expect(tabArea.toJSON()).toMatchSnapshot();
		});

		it( 'Shows apiKeys tab', () => {
			const component = shallow(
				<ProSettings
					onSettingsSave={handler}
					proSettings={{
						connected: true,
						apiKeys: {
							public: '',
							private: ''
						}
					}}
				/>
			);
			const tabArea = renderer.create(
				component.instance().tabContentAreaConnected('apiKeys')
			);
			expect(tabArea.toJSON()).toMatchSnapshot();
		});

		it( 'Shows generalSettings tab', () => {
			const component = shallow(
				<ProSettings
					onSettingsSave={handler}
					proSettings={{
						connected: true,
						generalSettings: {
							enhancedDelivery: true,
							generatePDFs: true,
							logLevel: 500
						}
					}}
				/>
			);
			const tabArea = renderer.create(
				component.instance().tabContentAreaConnected('generalSettings')
			);
			expect(tabArea.toJSON()).toMatchSnapshot();
		});

		it( 'Shows freeTrial tab', () => {
			const component = shallow(
				<ProSettings
					onSettingsSave={handler}
					proSettings={{
						connected: false,

					}}
				/>
			);
			const tabArea = renderer.create(
				component.instance().tabContentAreaNotConnected('freeTrial')
			);
			expect(tabArea.toJSON()).toMatchSnapshot();
		});

		it( 'Shows whatIs tab', () => {
			const component = shallow(
				<ProSettings
					onSettingsSave={handler}
					proSettings={{
						connected: false,

					}}
				/>
			);
			const tabArea = renderer.create(
				component.instance().tabContentAreaNotConnected('whatIs')
			);
			expect(tabArea.toJSON()).toMatchSnapshot();
		});
	});
});

describe( 'prepareProSettings', () => {
	it( 'finds all the defaults', () => {
		expect( JSON.stringify(prepareProSettings({}))).toMatchSnapshot();
	});

	it( 'passes the saved values ', () => {
		const prepared = prepareProSettings({

			[PRO_CONNECTED] : true

		});
		expect(prepared[PRO_CONNECTED]).toBe(true);
	});

	it( 'merges deeply ', () => {
		const prepared = prepareProSettings({
				[PRO_API_KEYS] : {
					[PUBLIC_KEY]: 'roy'
				}

		});
		expect(prepared[PRO_API_KEYS][PUBLIC_KEY]).toBe('roy');
		expect(prepared[PRO_API_KEYS][PRIVATE_KEY]).toBe('');
	});

	it( 'works properly inside of prepareSettings', () => {
		const prepared = prepareSettings({
			[PRO_SETTINGS] : {
				[PRO_CONNECTED] : true,
				[PRO_API_KEYS] : {
					[PUBLIC_KEY]: 'roy'
				}
			}


		});
		expect(prepared[PRO_SETTINGS][PRO_API_KEYS][PUBLIC_KEY]).toBe('roy');
		expect(prepared[PRO_SETTINGS][PRO_API_KEYS][PRIVATE_KEY]).toBe('');
		expect(prepared[PRO_SETTINGS][PRO_CONNECTED]).toBe(true);
	});

})
