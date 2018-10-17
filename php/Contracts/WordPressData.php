<?php


namespace calderawp\CalderaForms\Admin\Contracts;


use calderawp\interop\Entity;

interface WordPressData
{


    public function getPostType();
    public function queryFor( array  $args = [] );
    public function save( \WP_Post $post, array  $metas= [] );
    public function getMeta($postId,$metaKey);
    public function updateMeta($postId,$metaKey);

    public function create( Entity $entity );
    public function update( Entity $entity );
    public function read( $id );
    public function delete( Entity $entity );

}