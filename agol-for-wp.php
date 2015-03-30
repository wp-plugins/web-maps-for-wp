<?php
/*
 Plugin Name: Web Maps for WordPress Free
 Plugin URI: http://www.geo-jobe.com/wordpress-plugin-for-arcgis-online/
 Description: Web Maps for WordPress is the best way to quickly and easily search for and insert authoritative maps directly into your blog posts and pages.
 Version: 1.1.2
 Author: GEO-Jobe GIS Consulting
 Author URI: http://GEO-Jobe.com/
 License: GNU General Public License
 */

/*
Copyright (C) 2015 GEO-Jobe GIS Consulting, geo-jobe.com (info@geo-jobe.com)
Original code by GEO-Jobe GIS Consulting

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 1 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

//Loop through the lib folder and load the classes
//Register autoloader from above.
spl_autoload_register('agol_for_wp_template_autoloader');

function agol_for_wp_template_autoloader($class) {
	$namespaces = array(
		'AGOLForWP'
	);
	if ( preg_match('/([A-Za-z]+)_?/', $class, $match) && in_array($match[1], $namespaces) ) {
		$filename = str_replace('_', DIRECTORY_SEPARATOR, $class) . '.php';
		require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'lib' . DIRECTORY_SEPARATOR . $filename;
	}
}

//Adding Dojo Parser to Head of document
function register_dojo_parser(){
	echo('<script type="text/javascript">
            dojoConfig = {
                parseOnLoad : true
            }
		</script>');
}

add_action('wp_enqueue_scripts', 'register_dojo_parser', 0);
add_action('admin_enqueue_scripts', 'register_dojo_parser');

//Register all addional scripts
function agol_for_wp_register_additional_scripts_method() {

	//jQuery
	wp_enqueue_script("jquery");

	//Add ESRI JS Lib
	wp_register_script("esri_js_api", "http://js.arcgis.com/3.3/", array('jquery'), NULL, true);
	wp_enqueue_script("esri_js_api");

	

	//GEO-Jobe Classes
	wp_enqueue_script("gj_agolInsertMapPicker", plugins_url( '/js/gj/agolInsertMapPicker/agolInsertMapPicker.js' , __FILE__ ), array('jquery'), '1.0', true);

	wp_enqueue_script("gj_addMapLogic", plugins_url( '/js/gj/addMap/addMap.js' , __FILE__ ), array('jquery'), NULL, true);
}

//Add addigional scripts to Wordpress
add_action('wp_enqueue_scripts', 'agol_for_wp_register_additional_scripts_method', 10);
add_action('admin_enqueue_scripts', 'agol_for_wp_register_additional_scripts_method', 10);

//Register plugin styles
function agol_for_wp_register_styles(){
	 wp_register_style( 'agol_for_wp_main_style', plugins_url('styles/agolForWPStyle.css', __FILE__) );
     wp_enqueue_style( 'agol_for_wp_main_style');
}

$AGOLforWP_Class_AGOLforWPOptions = new AGOLForWP_Class_AGOLforWPOptions();

//Add styles to Wordpress
add_action('wp_enqueue_scripts', 'agol_for_wp_register_styles', 20);
add_action('admin_enqueue_scripts', 'agol_for_wp_register_styles', 20);

/*****************************************************
*
*	Page / Post Editing Bar
*
*****************************************************/
//Function that adds additoinal buttons to Media Bar
function agol_for_WP_Add_Media_Bar_Buttons($context) {
  //Append Insert Map Button
  $context .= "<a class='button thickbox add_media' title='Add Map' href='#TB_inline?width=600&inlineId=agol_for_WP_insert_map_popup_container'><span class='wp-media-buttons-icon'></span> Add Map</a>";

  return $context;
}

//Add action to append buttons to the Media Bar
add_action('media_buttons_context',  'agol_for_WP_Add_Media_Bar_Buttons');

//Function to add hidden container called by new media buttons
function add_inline_popup_content() {
	include 'templates/mediaAddMap.php';
}

//Add action to append hidden containers called by the media bar
add_action( 'admin_footer',  'add_inline_popup_content' );


//Function to add link services
function add_gis_link_services() {
	include('templates/media/insertMap/gis_services.php');
}
//Add services links on add map
add_action( 'wp_footer', 'add_gis_link_services' );
