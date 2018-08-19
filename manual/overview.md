# Overview
Write docs here.


## Structure

* A quick note about state: `<CalderaAdminWithState>` is used to wrap the interface with state provided by Redux. This overview ignores state until the end as all components below that level should be decoupled from state and remote API management.


* `<Admin.PageBody>`... components are from `@caldera-labs/components` [Admin module](https://calderalabs.org/caldera-components/manual/components.html#list-of-admin-components)
### High Level

```html

<CalderaAdminWithState>
    <CalderaAdmin>
        <Admin.PageBody>
    		<TopBar/>
           <MainAdmin/>		
        </Admin.PageBody>
    </CalderaAdmin>
</CalderaAdminWithState>

```

### Top Bar
This view details what is represented as `<TopBar/>` in the high level architecture. The component Wraps [`<Admin.CalderaHeader>`](https://calderalabs.org/caldera-components/function/index.html#static-function-CalderaHeader) 

```html

<Admin.CalderaHeader>
    <NewForm />
    <MainStatus />
    <ProStatus />
</Admin.CalderaHeader>
```

#### `<NewForm />`
* A button to open the new form UI
* The new form UI (after button is opened)

#### `<MainStatus />`
* Primary indicator of success and errors. For example, "Settings Saved" or "Could not delete entries"
* Wraps [`<Admin.StatusIndicator>`](https://calderalabs.org/caldera-components/function/index.html#static-function-StatusIndicator) and `<Button>` from [`@wordpress/components`](https://www.npmjs.com/package/@wordpress/components)

#### `<ProStatus />`
* Indicates if the current site can connect to Caldera FormsSlot Pro app.
* Wraps [`<Admin.StatusIndicator>`](https://calderalabs.org/caldera-components/function/index.html#static-function-StatusIndicator) and `<Button>` from [`@wordpress/components`](https://www.npmjs.com/package/@wordpress/components)

### Main Admin Area
This view details what is represented as `<MainAdmin/>` in the high level architecture.


```jsx
const state = {
	forms: {
		formId: {}
	},
	entries: {
		formId: {
			entryId: {}
		}
	},
	settings: {
		general: {
			...{},
			forms: {
				formId: {}
			}
		},
		proLocal: {
			...{},
			forms: {
				formId: {}
			}
		},
		privacy: {
			forms: {
				formId: {}
			}
		}

	}
}
    <FormList
        forms={state.forms}
     >
        <Form 
            form 
        />
    </FormList>
    <Settings 
        forms={state.forms}
        settings={state.settings}
    >
        <ProSettings
            settings
            forms
         />
        <GeneralSettings 
            settings
            forms
        />
        <PrivacySettings 
            settings
            forms
        />
    </Settings>
    <FormEntryViewer
         forms
         entries
    />
```

### Entry and Processor UI
Caldera FormsSlot admin 1.0, which we'll define as how it works in Caldera FormsSlot through 1.7, limits us to looking at the entries of one form or processors of one form. These are useful views, but so are the reverse. We can see all of the entries submitted to one form, but not all entries submitted by anyone with the email address `roy@hiroy.club` to any form. We can show all of the processors for one form, but not all of the Mailchimp processors for all of the forms.

The [Privacy settings screen in Caldera FormsSlot](https://github.com/CalderaWP/Caldera-Forms/tree/master/clients/privacy) is an example of a recent UI developed with the ability to work with the fields of any form. In that client's state, there is a collection of forms and `editForm`, which contains the current form being editted (source)[https://github.com/CalderaWP/Caldera-FormsSlot/blob/master/clients/privacy/containers/PrivacySettings.js#L250-L251].

The entry viewer, in order to show the entries of one form, needs to know which form was selected in `<FormList>`. We could next inside of `<Form>`:

```jsx
<FormList
        forms={state.forms}
        entries={state.entries}
     >
        <Form 
            form 
        >
            <FormEntryViewer
                form
                entries={entries[form.ID]}
            />
    </Form>
</FormList>
```

#### But:
* That's a lot of props drilling.
* What if we want to move `<FormEntryViewer>`'s position on the page to somewhere outside of `<FormList>`'s position?
* This is strongly-coupling `<FormEntryViewer>` to entries of one form.
* How can we make postion of elements customizable to the end user?

Lets organize the screen by location instead.

### Main Admin Views
To decouple the components from thier locations on the screen, we use a slot/fill pattern, implemented using [`@wordpress/components`'s slot/fill provider](https://github.com/WordPress/gutenberg/blob/master/packages/components/src/slot-fill/README.md), we have three main "views" in the main admin screen:

```jsx
<FormAdminToolbar/> //Toolbar - navigation, etc.
<FormAdminMainView/> //Most things go here - form list, entry viewer, settings.
<FormAdminHelpView/> //Content from CalderaForms.com displayed via WP API
```

The toolbar goes on the top of the page. On initial page load the main view is on the left and the help content is on the right:
 <img src="https://user-images.githubusercontent.com/38040370/43472988-edaae212-94bc-11e8-9462-27e0551bfda0.png" />

When the entry viewer opens, the main view will split into two areas inside of it "left" and "right" and the help content will move to the bottom of the screen:
 
<img src="https://user-images.githubusercontent.com/38040370/43472992-ef80352e-94bc-11e8-9e53-3c93d06bdf3e.png" />

#### FormAdminToolbar 
This view houses the main navigation bar.

```js
<FormAdminToolbar.NavBar
    label="Hi Roy"
    onActive={this.handleActive}
    onDeactive={this.handleDeactive}
    isActive={this.state.active}
/>
```

#### FormAdminMainView 
This Is The Main Content Area

```js
<FormAdminMainView.Content>
    <p>Hi Roy Main View</p>
</FormAdminMainView.Content>

```

#### FormAdminHelpView

```js
<FormAdminHelpView.Content>
    <p>Hi Roy Help View</p>
</FormAdminHelpView.Content>
```
#### Complete Example

```js
export default class HiRoy extends AdminSlot
 
 {

    
	render() {
		const {forms} = this.props;
		return (
			<div>
				<FormAdminToolbar.NavBar
					label="Hi Roy"
					onActive={this.handleActive}
					onDeactive={this.handleDeactive}
					isActive={this.state.active}
				/>
				{this.state.active &&
                    <React.Fragment>
                        <FormAdminMainView.Content>
                            <p>Hi Roy Main View</p>
                        </FormAdminMainView.Content>
                        <FormAdminHelpView.Content>
                            <p>Hi Roy Help View</p>
                        </FormAdminHelpView.Content>
                    </React.Fragment>
				}

			</div>
		);
	}


}
```

### State

This pseudo-code shows how we can map reducers from [`@caldera-labs/state`'s reducers](https://calderalabs.org/caldera-state/variable/index.html#static-variable-reducers) to the state object described above.

 ```js
import {state} from '@caldera-labs/state';
const {reducers} = state;
const state = {
	forms: reducers.formsReducer,
	entries: reducers.entriesReducer,
	settings: {
		general: reducers.settingsReducer,
		proLocal: reducers.proLocalSettingsReducer,
		privacy: reducers.privacySettingsReducer
	}
};
```