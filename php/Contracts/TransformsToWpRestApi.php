<?php


namespace calderawp\CalderaForms\Admin\Contracts;

use calderawp\interop\Entity;

interface TransformsToWpRestApi
{

	/**
	 * @return string
	 */
	public function getNameSpace();


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
	);

	/**
	 * @param array $attributes The attributes collection to derive endpoint arguments for
	 * @param callable $callback The response controller for this endpoint
	 * @param callable $permissionsCallback The response permissions controller for this endpoint
	 * @param string|array $method The HTTP method(s) that are accepted by this endpoint
	 * @return array
	 */
	public function collectionToRestApiEndpoint(array $attributes, $callback, $permissionsCallback, $method = 'GET');


}
