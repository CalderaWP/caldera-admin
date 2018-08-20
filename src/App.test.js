import React from 'react';
import ReactDOM from 'react-dom';
import CalderaAdmin from './CalderaAdmin';
import {CalderaAdminWithState} from "./CalderaAdminWithState";
import {Provider} from 'react-redux';
import store from "./store";
import {shallow, mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {PRO_CONNECTED, PRO_SETTINGS} from "./components/Settings/ProSettings/proSettingsType";

Enzyme.configure({adapter: new Adapter()});
import forms, {formWithIdCf2} from './test-data/forms'

const genericHandler = () => {
};
describe('CalderaAdmin component', () => {
	it('renders without crashing', () => {
		ReactDOM.render(<CalderaAdmin
			forms={forms}
			getForm={genericHandler}
			getForms={genericHandler}
		/>, document.createElement('div'));
	});


	describe('methods', () => {
		const settings = {
			[PRO_SETTINGS]: {
				[PRO_CONNECTED]: false
			}
		}
		it('reports pro not connected', () => {

			const component = shallow(
				<CalderaAdmin
					forms={forms}
					getForm={genericHandler}
					getForms={genericHandler}
					settings={settings}
				/>);
			expect(component.instance().isProConnected()).toBe(false);
		});

		it('reports pro connected', () => {
			const settings = {
				[PRO_SETTINGS]: {
					[PRO_CONNECTED]: true
				}
			}
			const component = shallow(
				<CalderaAdmin
					forms={forms}
					getForm={genericHandler}
					getForms={genericHandler}
					settings={settings}
				/>);
			expect(component.instance().isProConnected()).toBe(true);
		});


		it('On create forms', () => {

			let newForm = {};
			const component = shallow(
				<CalderaAdmin
					onCreateForm={(value) => {
						newForm = value;
					}}
					forms={forms}
					getForm={genericHandler}
					getForms={genericHandler}
					settings={settings}
				/>);

			component.instance().onCreateForm(formWithIdCf2);
			expect(newForm).toEqual(formWithIdCf2);

		});

		it('Sets entry viewer form', () => {
			const component = shallow(
				<CalderaAdmin
					forms={forms}
					getForm={genericHandler}
					getForms={genericHandler}
					settings={settings}
				/>);

			component.instance().onOpenEntryViewerForForm(formWithIdCf2.ID);
			expect(component.state('entryViewerForm')).toEqual(formWithIdCf2);

		});

		it('Passes entry viewer form ID', () => {
			let id = null;
			const component = shallow(
				<CalderaAdmin
					forms={forms}
					getForm={genericHandler}
					getForms={genericHandler}
					settings={settings}
					onOpenEntryViewerForForm={(formId) => {
						id = formId;
					}}
				/>);

			component.instance().onOpenEntryViewerForForm(formWithIdCf2.ID);
			expect(component.state('entryViewerForm')).toEqual(formWithIdCf2);

		});

		it('showEntryViewer returns true when state allows it', () => {
			let newForm = {};
			const component = shallow(
				<CalderaAdmin
					createFrom={genericHandler}
					forms={forms}
					getForm={genericHandler}
					getForms={genericHandler}
					settings={settings}
				/>);

			component.setState({entryViewerForm: formWithIdCf2});
			expect(component.instance().showEntryViewer()).toEqual(true);
		});

		it('showEntryViewer returns false when state does not allow it', () => {
			let newForm = {};
			const component = shallow(
				<CalderaAdmin
					createFrom={genericHandler}
					forms={forms}
					getForm={genericHandler}
					getForms={genericHandler}
					settings={settings}
				/>);

			component.setState({entryViewerForm: {}});
			expect(component.instance().showEntryViewer()).toEqual(false);
		});

	});

});

