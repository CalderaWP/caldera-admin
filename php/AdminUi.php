<?php


namespace calderawp\CalderaForms\Admin;

use calderawp\CalderaForms\Admin\Menu\MainPage;
use calderawp\CalderaForms\Admin\Menu\Page;
use calderawp\CalderaForms\Admin\ReactWPScripts as ReactWPScripts;

class AdminUi
{

	/**
	 * @var string
	 */
	protected $slug;
	/**
	 * @var string
	 */
	protected $pluginDirPath;

	public function __construct($pluginDirPath, $slug)
	{
		$this->pluginDirPath = $pluginDirPath;
		$this->slug = $slug;
	}

	/**
	 * Enqueue the assets for the menu pages
	 */
	public function enqueueAdmin()
	{

		ReactWPScripts\enqueue_assets($this->pluginDirPath, [
			'handle' => $this->slug
		]);

        if( class_exists( '\Caldera_Forms_Admin_Assets' ) ){
            \Caldera_Forms_Admin_Assets::set_cf_admin($this->slug);
        }
	}

	/**
	 * Add the hooks to load the menu pages
	 */
	public function setUpMenus()
	{
		$mainPage = new MainPage(
			$this->slug,
			'form',
			'Caldera Forms',
			'caldera-forms-admin'
		);
		add_action('admin_menu', [$mainPage, 'display'], 21);
		$calderaFormsEntries = new Page(
			'caldera-forms-entries',
			'form',
			'Caldera Forms',
			'caldera-forms-admin-entries'
		);
		add_action('admin_menu', [$calderaFormsEntries, 'display'], 21);
	}
}
