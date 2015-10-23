<?php
/**
 * Plugin Name: Simple AJAX Load Posts
 * Plugin URI: http://www.github.com/eiffelqiu
 * Description: Load the next page of posts with AJAX.
 * Version: 0.1
 * Author: eiffel qiu
 * Author URI: http://www.github.com/eiffelqiu
 */

/**
 * Initialization. Add our script if needed on this page.
 */
function salp_init()
{
    global $wp_query;

    if (!is_singular()) {

        wp_enqueue_style(
            'salp-style',
            plugin_dir_url(__FILE__) . 'css/style.css',
            false,
            '1.0',
            'all'
        );


        wp_enqueue_script(
            'salp-script',
            plugin_dir_url(__FILE__) . 'js/load-posts.js',
            array('jquery'),
            '1.0',
            false
        );

        $max = $wp_query->max_num_pages;
        $paged = (get_query_var('paged') > 1) ? get_query_var('paged') : 1;

        // Add some parameters for the JS.
        wp_localize_script(
            'salp-script',
            'salp',
            array(
                'startPage' => $paged,
                'maxPages' => $max,
                'nextLink' => next_posts($max, false)
            )
        );

    }
}
add_action('template_redirect', 'salp_init');
