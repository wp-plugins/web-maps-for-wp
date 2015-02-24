<script>
dojo.require('esri.arcgis.Portal');
dojo.addOnLoad(function() {

/********************************************************************************
*
* 	Handle Default Item Pallet
*
********************************************************************************/
	var agol_url = "http://maps.arcgis.com";
	var currentAddMapView = "searchAGOLView";
	var pluginsPath = "<?php echo plugins_url(); ?>";

	var portalInstance = new esri.arcgis.Portal(agol_url);

	var urlTemp = '<?php echo plugins_url();?>';

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

</script>

<div id='agol_for_WP_insert_map_popup_container' style='display:none;'>
	<div id='agol_for_WP_insert_map_popup_left_container'>
		<ul id='agol_for_WP_insert_map_popup_left_container_list'>
			<li><a id="agol_for_WP_insert_map_popup_insert_map_button">Insert a Map</a></li>
			<li><a id="agol_for_WP_insert_map_popup_create_map_button">Create a Map <small>(upgrade)</small></a></li>
		</ul>

		<hr>
	</div>
	<div id='agol_for_WP_insert_map_popup_right_container'>
		<div id='agol_for_WP_insert_map_popup_insert_view'>
			<h2>Insert a Map</h2>
			<div id='agol_for_WP_insert_map_popup_map_insert_type_container'>
				<strong>Search ArcGIS Online</strong>
			</div>
			<div id="agol_for_WP_insert_map_popup_map_insert_search_field">
				<input id='agol_for_WP_add_map_agol_search_input' type='text'/><button id='agol_for_WP_add_map_agol_search_button'>Search</button>
			</div>
			<div id="agol_for_WP_insert_map_popup_map_insert_content_container">
			</div>
			<div id="agol_for_WP_insert_map_popup_map_insert_preview">
			</div>
			<div id="agol_for_WP_insert_map_popup_map_insert_advanced">
			</div>
		</div>
		<div id='agol_for_WP_insert_map_popup_create_view' style='display: none;'>
			<h2>Create a Map</h2>
			<a href="http://www.geo-jobe.com/wp/web-maps-for-wordpress-pro-plugin/" target="_blank"><img src="http://cdn.geopowered.com/Applications/WordPressPlugins/AGOL/Free/info/VersionChart400x487.png" alt="Plugin version comparison" /></a>
		</div>
	</div>
</div>