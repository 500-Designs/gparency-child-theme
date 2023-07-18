<?php
/**
 * Theme functions and definitions.
 *
 * For additional information on potential customization options,
 * read the developers' documentation:
 *
 * https://developers.elementor.com/docs/hello-elementor-theme/
 *
 * @package HelloElementorChild
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'HELLO_ELEMENTOR_CHILD_VERSION', '2.0.0' );

/**
 * Load child theme scripts & styles.
 *
 * @return void
 */
function hello_elementor_child_scripts_styles() {

	wp_enqueue_style(
		'hello-elementor-child-style',
		get_stylesheet_directory_uri() . '/style.css',
		[
			'hello-elementor-theme-style',
		],
		HELLO_ELEMENTOR_CHILD_VERSION
	);

}

add_action( 'wp_enqueue_scripts', 'hello_elementor_child_scripts_styles', 20 );


// Allow SVG
add_filter( 'wp_check_filetype_and_ext', function($data, $file, $filename, $mimes) {

  global $wp_version;
  if ( $wp_version !== '4.7.1' ) {
     return $data;
  }

  $filetype = wp_check_filetype( $filename, $mimes );

  return [
      'ext'             => $filetype['ext'],
      'type'            => $filetype['type'],
      'proper_filename' => $data['proper_filename']
  ];

}, 10, 4 );

function cc_mime_types( $mimes ){
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter( 'upload_mimes', 'cc_mime_types' );

function fix_svg() {
  echo '<style type="text/css">
        .attachment-266x266, .thumbnail img {
             width: 100% !important;
             height: auto !important;
        }
        </style>';
}
add_action( 'admin_head', 'fix_svg' );


/**DISABLE MAIN THEME**/


function hide_inactive_themes($themes) {
    unset($themes['hello-elementor']);
    return $themes;
}
add_filter('wp_prepare_themes_for_js', 'hide_inactive_themes');

/**DISABLE MAIN THEME**/

/**FULL DISABLE COMMENTS**/

add_action('admin_init', function () {
    // Redirect any user trying to access comments page
    global $pagenow;
    
    if ($pagenow === 'edit-comments.php') {
        wp_redirect(admin_url());
        exit;
    }

    // Remove comments metabox from dashboard
    remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');

    // Disable support for comments and trackbacks in post types
    foreach (get_post_types() as $post_type) {
        if (post_type_supports($post_type, 'comments')) {
            remove_post_type_support($post_type, 'comments');
            remove_post_type_support($post_type, 'trackbacks');
        }
    }
});

// Close comments on the front-end
add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);

// Hide existing comments
add_filter('comments_array', '__return_empty_array', 10, 2);

// Remove comments page in menu
add_action('admin_menu', function () {
    remove_menu_page('edit-comments.php');
});

// Remove comments links from admin bar
add_action('init', function () {
    if (is_admin_bar_showing()) {
        remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
    }
});

/**FULL DISABLE COMMENTS**/


function custom_admin_css() {
    // Load only on wp-login and wp-admin pages
    if ( is_admin() || $GLOBALS['pagenow'] === 'wp-login.php' ) {
        $css = '
        a.uip-link-muted.uip-no-underline {
            display: none!important;
        }';

        wp_register_style('custom_wp_admin_css', false);
        wp_enqueue_style('custom_wp_admin_css');
        wp_add_inline_style('custom_wp_admin_css', $css);
    }
}
add_action('admin_enqueue_scripts', 'custom_admin_css');
add_action('login_enqueue_scripts', 'custom_admin_css');

function my_theme_add_admin_styles() {
    echo '<style>
       		li#wp-admin-bar-user-info .username {
    display: none!important;
}
    </style>';
}

// Add the hook for the admin <head></head>.
add_action( 'admin_head', 'my_theme_add_admin_styles' );


/* ADD CUSTOM FUNCTIONS BELOW THIS LINE */

require_once get_stylesheet_directory() . '/includes/get-events.php';
require_once get_stylesheet_directory() . '/includes/get-people.php';
require_once get_stylesheet_directory() . '/includes/autofill-zoho-popup.php';
require_once get_stylesheet_directory() . '/includes/resources-filters.php';
require_once get_stylesheet_directory() . '/includes/get-reading-time.php';
require_once get_stylesheet_directory() . '/includes/get-post-first-image.php';