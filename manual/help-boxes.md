The small help boxes in the Caldera (Forms) admin, as of version 1.8 are all loaded via CalderaForms.com’s REST API, which content is shown is based on the “Help Category” taxonomy.

Terms:

* No Forms
    * Content from this term will be shown if no forms are saved on the current site, meaning this is likely a new user.
    * Term ID 550
* Form List
    * This content is shown next to the form list, when no entries are being shown
    * Term ID 549

* Settings
    * This content is shown below the settings when settings (including CF Pro) are being edited.
    * Term ID 548

* Entry Viewer
    * This content is shown below the entry viewer when entries are being viewed.
    * Term ID 551


Notes:

* A maximum of three boxes will ever be shown at once.
* Posts can be in the post type of post, doc, update or download.
* The title and excerpt of a post will be displayed.
* https://calderaforms.com/wp-json/wp/v2/posts?type[]=doc&type[]=download&type[]=doc&caldera_admin_help=549
