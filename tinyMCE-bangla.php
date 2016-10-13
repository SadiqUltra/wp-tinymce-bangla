<?php
/**
 * Plugin Name: TinyMCE - Bangla
 * Description: A Complete Bangla Typing Solution
 * Plugin URI:  
 * Version:     1.4.2
 * Author:      A S M Sadiqul Islam
 * Author URI:  http://sadiqultra.com
 * License:     GPLv2
 * License URI: 
 * Text Domain: 
 * Domain Path: /languages
 * Network:     false
 */

add_action( 'admin_head', 'fb_add_tinymce' );


tinymceBanglaCsJs();

function fb_add_tinymce() {
    global $typenow;

    // Only on Post Type: post and page
    /*if( ! in_array( $typenow, array( 'post', 'page' ) ) )
        return ;*/

    add_filter( 'mce_external_plugins', 'fb_add_tinymce_plugin' );
    // Add to line 1 form WP TinyMCE
    add_filter( 'mce_buttons', 'fb_add_tinymce_button' );


  tinymceBanglaCsJsEnqueue();
 
}

// Inlcude the JS for TinyMCE
function fb_add_tinymce_plugin( $plugin_array ) {

    $plugin_array['fb_test'] = plugins_url( 'js/plugin.js', __FILE__ );
    //var_dump($plugin_array);
    return $plugin_array;
}

// Add the button key for address via JS
function fb_add_tinymce_button( $buttons ) {

    array_push( $buttons, 'fb_test_avro' );
    array_push( $buttons, 'fb_test_bijoy' );
    array_push( $buttons, 'fb_test_bijoy2unijoy' );
    array_push( $buttons, 'fb_test_english' );
    //var_dump($buttons);

    return $buttons;
}


/////////////////////
add_filter( 'comment_form_field_comment', 'comment_editor' );
 
function comment_editor() {
  global $post;

  tinymceBanglaCsJsEnqueue();
 
  ob_start();
    add_filter( 'mce_external_plugins', 'fb_add_tinymce_plugin' );
    add_filter( "mce_buttons", "gk_comment_form_no_fullscreen");
    add_filter( 'mce_buttons', 'fb_add_tinymce_button' );
    
 
  wp_editor( '', 'comment', array(
    'tinymce' => true,
    'textarea_rows' => 15,
    'teeny' => false,
    'quicktags' => false,
    'media_buttons' => false,
      ) );
    

  $editor = ob_get_contents();
 
  ob_end_clean();
 
  //make sure comment media is attached to parent post
  $editor = str_replace( 'post_id=0', 'post_id='.get_the_ID(), $editor );
 



  return $editor;
}
 
// wp_editor doesn't work when clicking reply. Here is the fix.
add_action( 'wp_enqueue_scripts', '__THEME_PREFIX__scripts' );
function __THEME_PREFIX__scripts() {
    
    //wp_enqueue_script( 'tinymce-bangla-avro' );
    // need this
    //wp_enqueue_script( 'tinymce-bangla-jquery' );

}
add_filter( 'comment_reply_link', '__THEME_PREFIX__comment_reply_link' );
function __THEME_PREFIX__comment_reply_link($link) {
    return str_replace( 'onclick=', 'data-onclick=', $link );
}
add_action( 'wp_head', '__THEME_PREFIX__wp_head' );
function __THEME_PREFIX__wp_head() {
?>
<script type="text/javascript">
  jQuery(function($){
    $('.comment-reply-link').click(function(e){
      e.preventDefault();
      var args = $(this).data('onclick');
      args = args.replace(/.*\(|\)/gi, '').replace(/\"|\s+/g, '');
      args = args.split(',');
      tinymce.EditorManager.execCommand('mceRemoveEditor', true, 'comment');
      addComment.moveForm.apply( addComment, args );
      tinymce.EditorManager.execCommand('mceAddEditor', true, 'comment');
    });
  });
</script>
<?php }

add_filter( "teeny_mce_buttons", "gk_comment_form_no_fullscreen");
function gk_comment_form_no_fullscreen($buttons) {
    unset($buttons[14]);
    return $buttons;
}

add_action( 'wp_footer' , 'tinymceBanglaCsJsEnqueue' );

    // css and js registration
function tinymceBanglaCsJs()
{
    wp_register_style( 'jquery-atwho-min', plugins_url( 'tinyMCE-banlga/css/jquery.atwho.min.css' ) );
    //wp_register_style( 'tinymce-bangla-main', plugins_url( 'tinyMCE-banlga/css/main.css' ) );
    wp_register_script( 'tinymce-bangla-avro', plugins_url( 'tinyMCE-banlga/js/avro.min.js' ) );
    wp_register_script( 'tinymce-bangla-jquery', plugins_url( 'tinyMCE-banlga/js/jquery.min.js' ) );
    wp_register_script( 'tinymce-bangla-converter', plugins_url( 'tinyMCE-banlga/js/converter-scripts.js' ) );
    wp_register_script( 'tinymce-bangla-common', plugins_url( 'tinyMCE-banlga/js/common-scripts.js' ) );

    wp_register_script( 'tinymce-bangla-jquery-caret', plugins_url( 'tinyMCE-banlga/js/jquery.caret.min.js' ) );
    wp_register_script( 'tinymce-bangla-avro-atwho', plugins_url( 'tinyMCE-banlga/js/jquery.atwho.avro.js' ) );
    wp_register_script( 'tinymce-bangla-keymap', plugins_url( 'tinyMCE-banlga/js/driver.keymap.js' ) );
    wp_register_script( 'tinymce-bangla-init', plugins_url( 'tinyMCE-banlga/js/plugin.init.js' ) );
    wp_register_script( 'tinymce-bangla-input', plugins_url( 'tinyMCE-banlga/js/inputs.js' ) );
}

function tinymceBanglaCsJsEnqueue()
{
    wp_enqueue_style( 'jquery-atwho-min' );
    //wp_enqueue_style( 'tinymce-bangla-main' );
    wp_enqueue_script( 'tinymce-bangla-avro' );
    wp_enqueue_script( 'tinymce-bangla-keymap' );
    wp_enqueue_script( 'tinymce-bangla-init' );
    // need this
    wp_enqueue_script( 'tinymce-bangla-jquery' );
    wp_enqueue_script( 'tinymce-bangla-converter' );
    wp_enqueue_script( 'tinymce-bangla-common' );
    wp_enqueue_script( 'tinymce-bangla-jquery-caret' );
    wp_enqueue_script( 'tinymce-bangla-avro-atwho' );
    wp_enqueue_script( 'tinymce-bangla-input' );
}
