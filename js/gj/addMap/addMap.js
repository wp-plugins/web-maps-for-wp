jQuery(document).ready(function() {

	dojo.require('esri.arcgis.Portal');
	dojo.addOnLoad(function() {

	/********************************************************************************
	*
	* 	Handle Default Item Pallet
	*
	********************************************************************************/
		var agol_url = "http://maps.arcgis.com";
		var currentAddMapView = "searchAGOLView";
		var pluginsPath = "../wp-content/plugins";

		var portalInstance = new esri.arcgis.Portal(agol_url);

		var urlTemp =  pluginsPath;

		//Pass Options for the Initial Map Picker
		agolInsertMapPickerOptions = {
			"targetContainer" : "agol_for_WP_insert_map_popup_map_insert_content_container",
			"passedQuery" : "group:b8787a74b4d74f7fb9b8fac918735153",
			"pluginsPath" : pluginsPath
		};

		agolInsertMapPickerInstance = new gj.agolInsertMapPicker.agolInsertMapPicker(portalInstance, agolInsertMapPickerOptions);

		// Search if enter key pressed
		jQuery('#agol_for_WP_add_map_agol_search_input').keypress(function(e) {
			if (e.which == '13') {

				var tempValue = jQuery('#agol_for_WP_add_map_agol_search_input').val();
				var loadingSpinner = '<div id="loader"><img class="loading_spinner" src="' + urlTemp + '/web-maps-for-wp/assets/ajax-loader.gif" alt="Loading Results" /></div>';

				parsedQuery =  tempValue;
				jQuery('#agol_for_WP_insert_map_popup_map_insert_content_container').html(loadingSpinner);

				//Pass Options for the Initial Map Picker
				agolInsertMapPickerOptions = {
					"targetContainer" : "agol_for_WP_insert_map_popup_map_insert_content_container",
					"passedQuery" : parsedQuery,
					"pluginsPath" : pluginsPath
				};

				agolInsertMapPickerInstance = new gj.agolInsertMapPicker.agolInsertMapPicker(portalInstance, agolInsertMapPickerOptions);

			}
		});

		jQuery('#agol_for_WP_add_map_agol_search_button').click(function(){
			if ( jQuery('#agol_for_WP_add_map_agol_search_input').val() ) {
				var tempValue = jQuery('#agol_for_WP_add_map_agol_search_input').val();
				var loadingSpinner = '<div id="loader"><img class="loading_spinner" src="' + urlTemp + '/web-maps-for-wp/assets/ajax-loader.gif" alt="Loading Results" /></div>';

				parsedQuery =  tempValue;
				jQuery('#agol_for_WP_insert_map_popup_map_insert_content_container').html(loadingSpinner);

				//Pass Options for the Initial Map Picker
				agolInsertMapPickerOptions = {
					"targetContainer" : "agol_for_WP_insert_map_popup_map_insert_content_container",
					"passedQuery" : parsedQuery,
					"pluginsPath" : pluginsPath
				};

				agolInsertMapPickerInstance = new gj.agolInsertMapPicker.agolInsertMapPicker(portalInstance, agolInsertMapPickerOptions);
			}
		});

		jQuery('#agol_for_WP_insert_map_popup_insert_map_button').click(function(){
			jQuery('#agol_for_WP_insert_map_popup_insert_view').show();
			jQuery('#agol_for_WP_insert_map_popup_create_view').hide();
		});

		jQuery('#agol_for_WP_insert_map_popup_create_map_button').click(function(){
			jQuery('#agol_for_WP_insert_map_popup_create_view').show();
			jQuery('#agol_for_WP_insert_map_popup_insert_view').hide();
		});
	});
});