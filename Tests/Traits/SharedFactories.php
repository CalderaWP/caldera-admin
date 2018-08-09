<?php


namespace calderawp\CalderaForms\Admin\Tests\Traits;

use calderawp\CalderaForms\Admin\Container;
use calderawp\interop\CalderaForms\Form\FormEntity;
use calderawp\interop\CalderaFormsInterop as CalderaForms;

trait SharedFactories
{

	/**
	 * @param string $id
	 * @return FormEntity
	 */
	protected function formEntityFactory($id = '')
	{
		if (!$id) {
			$id = uniqid('cf');
		}

		return (new FormEntity())->setId($id);
	}

	/**
	 * @return \calderawp\interop\CalderaFormsInterop
	 */
	protected function calderaFormsFactory()
	{
		return new CalderaForms(new Container());
	}
}
