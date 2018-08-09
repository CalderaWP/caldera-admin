<?php

namespace calderawp\CalderaForms\Admin\Tests\Unit;

use calderawp\CalderaForms\Admin\Transformations\AttributeForWordPress;
use calderawp\interop\CalderaForms\Form\FormEntity;

/**
 * Class AttributeForWordPressTest
 * @package calderawp\CalderaForms\Admin\Tests\Unit
 */
class AttributeForWordPressTest extends TestCase
{

	/**
	 * @covers \calderawp\CalderaForms\Admin\Transformations\AttributeForWordPress::toRestApiArg()
	 */
	public function testToRestApiArg()
	{
		$id = 'cf1';
		$formEntity = $this->formEntityFactory($id);
		$attributes = $formEntity->getAttributes();
		$transformer = new AttributeForWordPress('foo');
		$arg = $transformer->toRestApiArg($attributes['name']);
		$this->assertSame('string', $arg['type']);
	}

	/**
	 * @covers \calderawp\CalderaForms\Admin\Transformations\AttributeForWordPress::testCollectionToRestApiArgs()
	 */
	public function testCollectionToRestApiArgs()
	{
		$id = 'cf1';
		$formEntity = $this->formEntityFactory($id);
		$attributes = $formEntity->getAttributes();
		$transformer = new AttributeForWordPress('foo');
		$args = $transformer->collectionToRestApiArgs($attributes);
		$this->assertArrayHasKey('name', $args);
		$this->assertSame(count($attributes), count($args));
		$this->assertSame(array_keys($attributes), array_keys($args));
	}

	public function testCollectionToRestApiEndpoint()
	{
		$formEntity = $this->formEntityFactory();
		$attributes = $formEntity->getAttributes();
		$transformer = new AttributeForWordPress('foo');
		$endpointArgs = $transformer->collectionToRestApiEndpoint($attributes, 'is_object', 'is_object');
		$this->assertArrayHasKey('methods', $endpointArgs);
		$this->assertArrayHasKey('callback', $endpointArgs);
		$this->assertArrayHasKey('args', $endpointArgs);
		$this->assertArrayHasKey('permission_callback', $endpointArgs);
	}
}
