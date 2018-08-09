<?php


namespace calderawp\CalderaForms\Admin\Menu;

class MainPage extends Page
{

	const SLUG = 'caldera-forms';

	/** @inheritdoc */
	public function getSlug()
	{
		return $this->slug;
	}
	/** @inheritdoc */
	public function display()
	{
		add_menu_page(
			$this->getLabel(),
			$this->getLabel(),
			'manage_options',
			$this->getSlug(),
			[$this, 'render'],
			'dashicons-chart-pie',
			'58'
		);
	}
}
