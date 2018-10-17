<?php


namespace calderawp\CalderaForms\Admin\Contracts;


use calderawp\interop\Model;

/**
 * Interface SupportsWpRestApi
 * @package calderawp\CalderaForms\Admin\Contracts
 */
interface SupportsWpRestApi
{
    /**
     * Convert an entity to a WordPress REST API response
     *
     * @param Model $model
     * @return \WP_REST_Response
     */
    public function toRestResponse(Model $entity, $status = 200, array $headers = [] );


    /**
     * Create an entity from a WordPress REST API request
     *
     * @param \WP_REST_Request $request
     * @return Model
     */
    public function fromRestApiRequest(\WP_REST_Request $request );
}