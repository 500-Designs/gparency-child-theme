<?php

function create_glossary_post_type() {
    $args = array(
        'public' => true,
        'label'  => 'Glossaries',
        'supports' => array('title', 'editor')
    );
    register_post_type('glossary', $args);
}
add_action('init', 'create_glossary_post_type');



function print_all_post_types() {
    if (current_user_can('administrator')) { // So only you, the admin can see it.
        global $wp_post_types;
        echo '<pre>';
        print_r(array_keys($wp_post_types));
        echo '</pre>';
    }
}
add_action('wp_body_open', 'print_all_post_types');