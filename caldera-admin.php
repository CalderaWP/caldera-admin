<?php
/**
 * Plugin name: Caldera (Forms) Admin
 * Description: Plugin for developing the new Caldera Admin app for WordPress
 * Version: 0.0.2
 */
include_once __DIR__ . '/vendor/autoload.php';

/**
 * Initialize Caldera Admin for Caldera Forms.
 */
add_action('init', function () {
    $pageSlug = 'caldera-forms-two';

    $adminUi = new \calderawp\CalderaForms\Admin\AdminUi(plugin_dir_path(__FILE__), $pageSlug);


    $adminUi->setUpMenus();
    if (!isset($_GET['page']) || $pageSlug !== $_GET['page']) {
        return;
    }

    $adminUi->enqueueAdmin();
});


//************//
/* Begin Caldera Forms Changes We Probably Need To Merge Into Caldera Forms. */
//***********//


/**
 * Set up app in admin
 */
add_action('admin_menu', function () {

    /**
     * Replace assets for Caldera Forms main admin page
     */
    add_action('caldera_forms_admin_pre_enqueue', function () {
        //do not act if in editor (which uses main admin's assets)
        if (!Caldera_Forms_Admin::is_edit()) {
            //remove default callback
            remove_action('caldera_forms_admin_main_enqueue', ['Caldera_Forms_Admin_Assets', 'admin_common'], 1);
        }

    });

    /**
     * Remove Caldera Forms assets from the post editor if Gutenberg is in use for the current post
     */
    add_action('caldera_forms_admin_pre_enqueue', function () {
        if (function_exists('is_gutenberg_page') && is_gutenberg_page()) {
            remove_action('caldera_forms_admin_enqueue_post_editor', ['Caldera_Forms_Admin_Assets', 'post_editor']);
        }
    });
});

/**
 * Remove Caldera Forms menu
 */
add_action('admin_menu', function () {
    remove_menu_page(Caldera_Forms::PLUGIN_SLUG);
    if (class_exists('Caldera_Forms')) {
        remove_menu_page(Caldera_Forms::PLUGIN_SLUG);
    }
});

/**
 * Add additional data to the CF_ADMIN object printed by WordPress
 */
add_filter('caldera_forms_api_js_config', function ($data) {
    $templates = Caldera_Forms_Admin::internal_form_templates();
    $data['templates'] = array_combine(
        array_keys($templates),
        array_column($templates, 'name')
    );

    $controller = new Caldera_Forms_API_Forms();
    $request = new WP_REST_Request();
    $request->set_param('details', true);
    $forms = $controller->get_items($request);
    $data['forms'] = json_encode($forms->data);
    $data[ 'settings' ] = [
        'generalSettings' => array_merge( Caldera_Forms_Render_Assets::get_style_includes(), [
            'cdn' => Caldera_Forms::settings()->get_cdn()->enabled()
        ]),
    ];
    if( caldera_forms_pro_is_active() ){
        $data[ 'settings' ][ 'proSettings' ] = calderawp\CalderaForms\pro\container::get_instance()->get_settings()->toArray();
    }
    return $data;
});

add_filter('caldera_forms_render_assets_minify', '__return_true');

/**
 * Put react scripts in dev mode when Caldera Forms is in dev mode
 */
add_filter('reactwpscripts.is_development', function () {
    return Caldera_Forms_Render_Assets::should_minify(true);
});


/**
 * Add entries count to form response
 */
add_filter('caldera_forms_api_prepare_form', function ($form) {

    $form['entries'] = [
        'count' => absint(Caldera_Forms_Entry_Bulk::count($form['ID']))
    ];
    $_form = Caldera_Forms_Forms::get_form($form['ID']);
    $form[ '_last_updated' ] = $_form[ '_last_updated' ];

    $form[ 'editLink' ] = esc_url_raw( Caldera_Forms_Admin::form_edit_link( $form['ID']));
    return $form;
});


/**
 * Add random entries to all forms on activate
 */
add_action('init', function () {
    if (-1 !== get_option('CF_ADMIN_2_VER', -1)) {
        caldera_admin_random_form_data();
        update_option('CF_ADMIN_2_VER', 1);
    }
});

/**
 * Add random entries to all forms
 */
function caldera_admin_random_form_data()
{
    $forms = Caldera_Forms_Forms::get_forms(false);
    foreach ($forms as $form) {
        $form = Caldera_Forms_Forms::get_form($form);
        $creator = new \calderawp\CalderaForms\Admin\Entries\Create($form);
        $creator->createEntry();
        $creator->createEntry();
        $creator->createEntry();
    }
}