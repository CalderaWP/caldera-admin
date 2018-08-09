<?php


namespace calderawp\CalderaForms\Admin\Transformations;

use calderawp\CalderaForms\Admin\Contracts\TransformsToWpRestApi;
use calderawp\interop\Attribute;

/**
 * Class AttributeForWordPress
 * @package calderawp\CalderaForms\Admin\Transformations
 */
class AttributeForWordPress implements TransformsToWpRestApi
{

	/**
	 * @var string
	 */
	protected $namespace;

	/**
	 * AttributeForWordPress constructor.
	 * @param string $namespace
	 */
	public function __construct($namespace)
	{
		$this->namespace = $namespace;
	}

	/**
	 * @return string
	 */
	public function getNameSpace()
	{
		return $this->namespace;
	}


	/**
	 * @param array $attributes The attributes collection to derive endpoint arguments for
	 * @param $endpointUri
	 * @param callable $callback The response controller for this endpoint
	 * @param callable $permissionsCallback The response permissions controller for this endpoint
	 * @param string|array $method The HTTP method(s) that are accepted by this endpoint
	 */
	public function attributesToRestApiRoute(
		$attributes,
		$endpointUri,
		$callback,
		$permissionsCallback,
		$method = 'GET'
	) {
		register_rest_route(
			$this->namespace,
			$endpointUri,
			$this->collectionToRestApiEndpoint($attributes, $callback, $permissionsCallback, $method)
		);
	}


	/**
	 * @param array $attributes The attributes collection to derive endpoint arguments for
	 * @param callable $callback The response controller for this endpoint
	 * @param callable $permissionsCallback The response permissions controller for this endpoint
	 * @param string|array $method The HTTP method(s) that are accepted by this endpoint
	 * @return array
	 */
	public function collectionToRestApiEndpoint(array $attributes, $callback, $permissionsCallback, $method = 'GET')
	{
		return [
			'methods' => $method,
			'callback' => $callback,
			'args' => $this->collectionToRestApiArgs($attributes),
			'permission_callback' => $permissionsCallback,
		];
	}

	/**
	 * @param array $attributes
	 * @return array
	 */
	public function collectionToRestApiArgs(array $attributes)
	{
		$args = [];
		foreach ($attributes as $name => $attribute) {
			$args['name'] = $this->toRestApiArg($attribute);
		}
		return $attributes;
	}


	/**
	 * Convert an Attribute to a WordPress REST API endpoint argument
	 *
	 * @param Attribute $attribute
	 * @return array
	 */
	public function toRestApiArg(Attribute $attribute)
	{

		$arg = [
			'type' => $attribute->getType(),
			'description' => $attribute->getDescription()
		];

		if (is_callable($attribute->getSanitize())) {
			$arg['sanitize_callback'] = $attribute->getSanitize();
		}

		if (is_callable($attribute->getValidate())) {
			$arg['validate_callback'] = $attribute->getValidate();
		}

		if (!empty($attribute->getEnum())) {
			$arg['enum'] = $attribute->getEnum();
		}

		return $arg;
	}
}
