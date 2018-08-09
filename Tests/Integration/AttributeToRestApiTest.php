<?php


namespace calderawp\CalderaForms\Admin\Tests\Integration;

use calderawp\CalderaForms\Admin\Transformations\AttributeForWordPress;

class AttributeToRestApiTest extends RestAPITestCase
{

    /**
     *
     * @covers AttributeForWordPress::attributesToRestApiRoute()
     */
	public function testRouteRegistered()
	{
		$id = 'cf1';
		$formEntity = $this->formEntityFactory($id);
		$attributes = $formEntity->getAttributes();
		$transformer = new AttributeForWordPress('foo');
		$transformer->attributesToRestApiRoute(
			$attributes,
			'form',
			'__return_true',
			'__return_true'
		);

        /**
         * @var \WP_REST_Server
         */
        global $wp_rest_server;

        $routes = $wp_rest_server->get_routes();
        $this->assertArrayHasKey( '/foo/form', $routes );

	}
}
