<?php


namespace calderawp\CalderaForms\Admin\Api;

use calderawp\CalderaForms\Admin\Contracts\TransformsToWpRestApi;

class WpRestApiInit
{
	protected $transformer;
	protected $namespace;
	public function __construct($namespace, TransformsToWpRestApi $transformer)
	{
		$this->namespace = $namespace;
		$this->transformer = $transformer;
	}

	public function registerSingleRoutes()
	{
		$routes = [

		];
	}

	public function registerCollectionRoutes()
	{
	}
}
