<?php



// Register REST API endpoint for 'deals' post type
function gparency_get_deals( $request ) {
    $args = array(
        'post_type' => 'deals',
        'posts_per_page' => -1,  // Retrieve all posts
    );

    $posts = get_posts( $args );
    $data = array();

    foreach( $posts as $post ) {
        $post_data = array(
            'id' => $post->ID,
            'title' => $post->post_title,
            'content' => $post->post_content,
        );

        $data[] = $post_data;
    }

    return new WP_REST_Response( $data, 200 );
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'jetengine/v1', '/deals', array(
        'methods' => 'GET',
        'callback' => 'gparency_get_deals',
    ));
});
