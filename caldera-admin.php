<?php
/**
 * Plugin name: Caldera (Forms) Admin
 * Description: Plugin for developing the new Caldera Admin app for WordPress
 * Version: 0.0.1
 */
include_once __DIR__ .'/vendor/autoload.php';

add_action( 'init', function(){
    $slug = 'caldera-forms-two';
    $adminUi = new \calderawp\CalderaForms\Admin\AdminUi( plugin_dir_path( __FILE__ ), $slug );
    if( class_exists( '\Caldera_Forms_Admin_Assets' ) ){
        \Caldera_Forms_Admin_Assets::set_cf_admin($slug);

    }
    $adminUi->setUpMenus();
    $adminUi->enqueueAdmin();
});

add_action( 'admin_menu', function () {

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
add_action( 'admin_menu', function (){
    remove_menu_page( Caldera_Forms::PLUGIN_SLUG );
    if( class_exists('Caldera_Forms' ) ){
        remove_menu_page( Caldera_Forms::PLUGIN_SLUG );
    }
});

add_filter( 'caldera_forms_api_js_config', function($data){
    $templates = Caldera_Forms_Admin::internal_form_templates();
    $data['templates' ] = array_combine(
            array_keys($templates),
            array_column($templates,'name' )
        );

    return $data;
});

/**
 * Put react scripts in dev mode when Caldera Forms is in dev mode
 */
add_filter( 'reactwpscripts.is_development', function( ){
    return Caldera_Forms_Render_Assets::should_minify(true);
} );


/**
 * Add entries count to form response
 */
add_filter( 'caldera_forms_api_prepare_form', function ($form){
   $form[ 'entries' ] = [
       'count' => absint( Caldera_Forms_Entry_Bulk::count($form[ 'ID' ] ) )
   ];
   return $form;
});