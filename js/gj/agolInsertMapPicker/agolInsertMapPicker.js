dojo.provide("gj.agolInsertMapPicker.agolInsertMapPicker");
dojo.addOnLoad(function() {
    dojo.declare("gj.agolInsertMapPicker.agolInsertMapPicker", null, {
        agolInsertMapPickerInstanceTargetPortal : "null",
        agolInsertMapPickerInstanceOptions : "null",
        // Doc: http://docs.dojocampus.org/dojo/declare#chaining
        "-chains-" : {
            constructor : "manual"
        },
        constructor : function(targetPortal, options) {

            /**********************************************************
             *
             *  Handle the creation and placement of visual components
             *
             ********************************************************/

            var itemsParams = {
                q : options.passedQuery,
                num : 100
            }

            targetPortal.queryItems(itemsParams).then(function(itemsResults) {
            	
            	//Declare Advanced View Options for Insert Map URL
            	var useTemplateCheck = 'false';

            	//Declare Advanced View Formatting option array and assign default values
            	var advancedViewOptionsArray = new Array();
            	advancedViewOptionsArray['currentSize'] = 'medium';
            	advancedViewOptionsArray['currentSizeWidth'] = '500';
            	advancedViewOptionsArray['currentSizeHeight'] = '400';
            	advancedViewOptionsArray['currentAlignment'] = 'left';
            	advancedViewOptionsArray['showZoomControls'] = 'false';
            	advancedViewOptionsArray['showScaleBar'] = 'false';
            	advancedViewOptionsArray['showLegend'] = 'false';
            	advancedViewOptionsArray['showDescription'] = 'false';
            	advancedViewOptionsArray['showLocationSearch'] = 'false';
            	advancedViewOptionsArray['showLocationSearchSub'] = 'false';
            	advancedViewOptionsArray['showBaseMapSelector'] = 'false';
            	advancedViewOptionsArray['viewLargerMap'] = 'true';
            	
                var itemsToInsert = "<div id='agol_for_wp_insert_map_picker_items_container'>";
                var pathToThumb = "";
                //Loop through the results and append a list item to the markup for each one
                for (var i = 0; i < itemsResults.results.length; i++) {
                    if (itemsResults.results[i].thumbnailUrl != null) {
                        pathToThumb = itemsResults.results[i].thumbnailUrl;
                    } else {
                        pathToThumb = options.pluginsPath + '/web-maps-for-wp/assets/ago_default.png';
                    }
                    //Assign values to preview attributes for each item
                    var portalName = itemsResults.results[i].portal.portalName;
                    var portalHostname = itemsResults.results[i].portal.portalHostname;
                    var owner = itemsResults.results[i].owner;
                    var snippet = itemsResults.results[i].snippet;
                    var avgRating = itemsResults.results[i].avgRating;

                    //Recurse each group for nested items
                    if (itemsResults.results[i].extent.length > 0) {
                        //Create a div for each item in the results using custom data attributes to transfer necessary information
                        itemsToInsert += "<div id='item" + itemsResults.results[i].id + "' class='agol_for_wp_insert_map_picker_item_container' " + "data-portalurl='" + itemsResults.results[i].portal.url + "' " + "data-itemid='" + itemsResults.results[i].id + "' " + "data-xmax='" + itemsResults.results[i].extent[0][0] + "' " + "data-ymax='" + itemsResults.results[i].extent[0][1] + "' " + "data-xmin='" + itemsResults.results[i].extent[1][0] + "' " + "data-ymin='" + itemsResults.results[i].extent[1][1] + "' " + "data-portalname='" + portalName + "' " + "data-portalhostname='" + portalHostname + "' " + "data-owner='" + owner + "' " + "data-snippet='" + snippet + "' " + "data-avgrating='" + avgRating + "' " + "data-itemTitle='" + itemsResults.results[i].title + "' " + "data-pathToThumb='" + pathToThumb + "'>" + "<img src='" + pathToThumb + "'/>" + "<h3>" + itemsResults.results[i].title + "</h3>" + "</div>";
                    }
                }
                //Close out the results container
                itemsToInsert += "</div>";

                jQuery('#' + options.targetContainer).html(itemsToInsert);

                for (var i = 0; i < itemsResults.results.length; i++) {

                    if (itemsResults.results[i].extent.length > 0) {

                        //Add click event to each item
                        jQuery('#item' + itemsResults.results[i].id).click(function(passedClickEvent) {

                            jQuery('#agol_for_WP_insert_map_popup_map_insert_preview').show();
                            jQuery('#' + options.targetContainer).hide();
                            jQuery('#agol_for_WP_insert_map_popup_map_insert_search_field').show();
                            
                            //Get portalURL from Event
                            var targetPortalURL = passedClickEvent.currentTarget.attributes['data-portalurl'].value;

                            //Get Title of Item
                            var targetItemTitle = passedClickEvent.currentTarget.attributes['data-itemTitle'].value;

                            //Get ItemId from Event
                            var targetItemId = passedClickEvent.currentTarget.attributes['data-itemid'].value;

                            //Get Extent from Event
                            var targetItemExtentXMax = passedClickEvent.currentTarget.attributes['data-xmax'].value;
                            var targetItemExtentYMax = passedClickEvent.currentTarget.attributes['data-ymax'].value;
                            var targetItemExtentXMin = passedClickEvent.currentTarget.attributes['data-xmin'].value;
                            var targetItemExtentYMin = passedClickEvent.currentTarget.attributes['data-ymin'].value;

                            //Get remaining details for preview from Event
                            var targetItemPortalName = passedClickEvent.currentTarget.attributes['data-portalname'].value;
                            var targetItemPortalHostname = passedClickEvent.currentTarget.attributes['data-portalhostname'].value;
                            var targetItemOwner = passedClickEvent.currentTarget.attributes['data-owner'].value;
                            var targetItemSnippet = passedClickEvent.currentTarget.attributes['data-snippet'].value;
                            var targetItemAvgRating = passedClickEvent.currentTarget.attributes['data-avgrating'].value;
                            var targetPathToThumb = passedClickEvent.currentTarget.attributes['data-pathToThumb'].value;

                            /***********************************************
                             *
                             *  Create HTML to insert for preview screen
                             *
                             **********************************************/
                            var previewContentForInsert = '';

                            //Open container for preview content
                            previewContentForInsert += '<div class="agolforwp_insert_map_preview">';

                            //Open Div for top row of content
                            previewContentForInsert += '<div class="agolforwp_insert_map_preview_top_row_container">';

                            //Open Left Hand Thumbnail of item
                            previewContentForInsert += '<div id="agolforwp_preview_top_left">';

                            //Left Hand Thumbnail of Item Content
                            previewContentForInsert += '<img src="' + targetPathToThumb + '" />';

                            //Title Under Thumbnail
                            previewContentForInsert += '<h4>' + targetItemTitle + '</h4>';

                            //Close Left Hand Thumbnail of item
                            previewContentForInsert += '</div>';

                            //Open Right Hand Item Details
                            previewContentForInsert += '<div id="agolforwp_preview_top_right">';

                            //Right Hand Item Details Content
                            previewContentForInsert += '<p><strong>Owner:</strong> ' + targetItemOwner + '</p>';
                            previewContentForInsert += '<p><strong>Description:</strong> ' + targetItemSnippet + '</p>';
                            previewContentForInsert += '<p><strong>Average Rating:</strong> ' + Math.round(targetItemAvgRating * 10) / 10 + '</p>';

                            //Close Right Hand Item Details
                            previewContentForInsert += '</div>';

                            //Right Hand Buttons: Insert / Advanced Formatting / Cancel
                            previewContentForInsert += '<p id="agol_for_wp_insert_map_buttons"><button id="insert_map_preview_confirm_btn">Insert</button>'
                            previewContentForInsert += '<button id="insert_map_preview_advanced_formatting_btn">Advanced Formatting</button>'
                            previewContentForInsert += '<button id="insert_map_preview_cancel_btn">Cancel</button></p>';

                            //Close Div for top row of content
                            previewContentForInsert += '</div>';

                            //Preview Title
                            previewContentForInsert += '<h3 id="agol_for_wp_insert_Map_Preview_Title">Map Preview</h3>';

                            //Begin Contaienr for Preview iFrame
                            previewContentForInsert += '<div id="agolforwp_preview_bottom">';

                            //Actual Preview iFrame
                            previewContentForInsert += '<iframe width="400px" height="300px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" '
                            previewContentForInsert += 'src="' + targetPortalURL + '/home/webmap/embedViewer.html?webmap=' + targetItemId + '&amp;extent=' + targetItemExtentXMax + ',';
                            previewContentForInsert += targetItemExtentYMax + ',' + targetItemExtentXMin + ',' + targetItemExtentYMin + '&amp;displayslider=true&amp;displaybasemaps=true">';
                            previewContentForInsert += '</iframe>';

                            //Close Contaienr for Preview iFrame
                            
                            previewContentForInsert += '<br /><small><em>Please Note: Some maps use data not publicly accessible and will not be available for use.</em></small>'
                            previewContentForInsert += '</div>';

                            //Close container for preview content
                            previewContentForInsert += '</div>';

                            //Insert HTML
                            jQuery('#agol_for_WP_insert_map_popup_map_insert_preview').html(previewContentForInsert);
                            
                            //Preview screen approval clicked
                            jQuery('#insert_map_preview_confirm_btn').click(function() {
                                jQuery('#agol_for_WP_insert_map_popup_map_insert_preview').hide();
                                jQuery('#' + options.targetContainer).show();
                                
                                useTemplateCheck = advancedViewOptionsArray['showLegend'] ==  'true' || advancedViewOptionsArray['showDescription'] == 'true' || advancedViewOptionsArray['showLocationSearch'] == 'true' || advancedViewOptionsArray['showBaseMapSelector'] == 'true' ? 'true' : 'false';

                                var advOptionUrl = new Array();
                                
                                advOptionUrl['useUrlPath'] = useTemplateCheck == 'true' ? 'templates/OnePane/basicviewer/embed.html' : 'embedViewer.html';
                                advOptionUrl['useExtent'] = useTemplateCheck == 'true' ? '&amp;gcsextent=' : '&amp;extent=';
                                advOptionUrl['showZoom'] = advancedViewOptionsArray['showZoomControls'] == 'true' ? ( useTemplateCheck == 'true' ? '&amp;displayslider=true' : '&amp;zoom=true' ) : '';
                                advOptionUrl['showScale'] = advancedViewOptionsArray['showScaleBar'] == 'true' ? ( useTemplateCheck == 'true' ? '&amp;displayscalebar=true' : '&amp;scale=true' ) : '';
                                advOptionUrl['showLegend'] = advancedViewOptionsArray['showLegend'] == 'true' ? '&amp;displaylegend=true' : '';
                                advOptionUrl['showDescription'] = advancedViewOptionsArray['showDescription'] == 'true' ? '&amp;displaydetails=true' : '';
                                advOptionUrl['showSearch'] = advancedViewOptionsArray['showLocationSearch'] == 'true' ? '&amp;displaysearch=true' : '';
                                advOptionUrl['searchExtent'] = advancedViewOptionsArray['showLocationSearchSub'] == 'true' ? '&amp;searchextent=true' : '';
                                advOptionUrl['baseSelector'] = advancedViewOptionsArray['showBaseMapSelector'] == 'true' ? '&amp;displaybasemaps=true' : '';
                                
                                //Parse string for iFrame to be inserted
                                var stringToInsert = '';
                                stringToInsert += '<div class="insert_map_iframe_container agol_insert_map_align_' + advancedViewOptionsArray['currentAlignment'] + '">';
                                stringToInsert += '<iframe width="' + advancedViewOptionsArray['currentSizeWidth'] + '" height="' + advancedViewOptionsArray['currentSizeHeight'] + '" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ';
                                stringToInsert += 'src="' + targetPortalURL + '/home/webmap/' + advOptionUrl['useUrlPath'] + '?webmap=' + targetItemId + advOptionUrl['useExtent'];
                                stringToInsert += targetItemExtentXMax + ',' + targetItemExtentYMax + ',' + targetItemExtentXMin + ',' + targetItemExtentYMin;
                                stringToInsert += advOptionUrl['showZoom'] + advOptionUrl['showScale'] + advOptionUrl['showLegend'] + advOptionUrl['showDescription'] + advOptionUrl['showSearch'] + advOptionUrl['searchExtent'] + advOptionUrl['baseSelector'] + '">';
                                stringToInsert += '</iframe>';
                                if (advancedViewOptionsArray['viewLargerMap'] == 'true') {
                                stringToInsert += '<small><a href="' + targetPortalURL + '/home/webmap/viewer.html?webmap=' + targetItemId + '&amp;extent=' + targetItemExtentXMax + ',' + targetItemExtentYMax + ',' + targetItemExtentXMin + ',' + targetItemExtentYMin + '" target="_blank">View Larger Map</a></small>';
                                } else {

                                stringToInsert += '<small></small>';
                                }
                                stringToInsert += '</div>';

                                //Insert iFrame into editor
                                window.parent.send_to_editor(stringToInsert);
                                window.parent.tb_remove();
                            });
                            
                            //Preview screen advanced formatting clicked
                            jQuery('#insert_map_preview_advanced_formatting_btn').click(function() {

                                /***********************************************
                                *
                                *  Create HTML for Advanced View Options screen
                                *
                                **********************************************/
                                var advancedViewOptions = '';
                                
                                //Open container for advanced view options
                                advancedViewOptions += '<div id="agolforwp_advanced_view_options">';
                                advancedViewOptions += '<h3>Advanced View Options</h3>';
                                
                                //Open fieldset for size and alignment options
                                advancedViewOptions += '<fieldset id="agolforwp_advanced_view_options_size_fieldset">';
                                
                                //Add size and alignment option fields
                                //	Small
                                advancedViewOptions += '<div><input type="radio" ' + ( advancedViewOptionsArray['currentSize'] == 'small' ? 'checked ' : '' ) + 'class="agol_radio" id="agolforwp_advanced_view_options_size_small" name="agolforwp_advanced_view_options_size" value="small">';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_size_small">Small<br />300x260</label></div>';
                                //	Medium
                                advancedViewOptions += '<div><input type="radio" ' + ( advancedViewOptionsArray['currentSize'] == 'medium' ? 'checked ' : '' ) + 'class="agol_radio" id="agolforwp_advanced_view_options_size_medium" name="agolforwp_advanced_view_options_size" value="medium" checked>';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_size_medium">Medium<br />500x400</label></div>';
                                //	Large
                                advancedViewOptions += '<div><input type="radio" ' + ( advancedViewOptionsArray['currentSize'] == 'large' ? 'checked ' : '' ) + 'class="agol_radio" id="agolforwp_advanced_view_options_size_large" name="agolforwp_advanced_view_options_size" value="large">';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_size_large">Large<br />940x600</label></div>';
                                //	Custom
                                advancedViewOptions += '<div><input type="radio" ' + ( advancedViewOptionsArray['currentSize'] == 'custom' ? 'checked ' : '' ) + 'class="agol_radio" id="agolforwp_advanced_view_options_size_custom" name="agolforwp_advanced_view_options_size" value="custom">';
                                advancedViewOptions += '<div class="agol_subfield"><label for="agolforwp_advanced_view_options_size_custom">Custom</label>';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_size_custom_width" class="agol_clear_l">Width</label>';
                                advancedViewOptions += '<input type="text" class="agol_text" id="agolforwp_advanced_view_options_size_custom_width" name="agolforwp_advanced_view_options_size_custom_width" length="5" value="' + advancedViewOptionsArray['currentSizeWidth'] + '" />';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_size_custom_height" class="agol_clear_l">Height</label>';
                                advancedViewOptions += '<input type="text" class="agol_text" id="agolforwp_advanced_view_options_size_custom_height" name="agolforwp_advanced_view_options_size_custom_height" length="5" value="' + advancedViewOptionsArray['currentSizeHeight'] + '" /></div></div>';
                               	//	Align
                                advancedViewOptions += '<div><select id="agolforwp_advanced_view_options_size_align" name="agolforwp_advanced_view_options_size_align">';
                                advancedViewOptions += '<option ' + ( advancedViewOptionsArray['currentAlignment'] == 'left' ? 'selected ' : '' ) + 'value="left">Left</option>';
                                advancedViewOptions += '<option ' + ( advancedViewOptionsArray['currentAlignment'] == 'center' ? 'selected ' : '' ) + 'value="center">Center</option>';
                                advancedViewOptions += '<option ' + ( advancedViewOptionsArray['currentAlignment'] == 'right' ? 'selected ' : '' ) + 'value="right">Right</option>';
                                advancedViewOptions += '</select></div>';
                                
                                //	Legend
                                advancedViewOptions += '<legend><em>Please note: some tools may not be visible on smaller maps due to size constraints.</em></legend>'
                                
                                //Close fieldset for size options
                                advancedViewOptions += '</fieldset>';
                                
                                //Open fieldset for tool options
                                advancedViewOptions += '<fieldset id="agolforwp_advanced_view_options_tools_fieldset">';
                                
                                //Add tool option fields
                                //	Zoom control
                                advancedViewOptions += '<div><input type="checkbox" id="agolforwp_advanced_view_options_tools_zoom" name="agolforwp_advanced_view_options_tools_zoom" ' + ( advancedViewOptionsArray['showZoomControls'] == 'true' ? 'checked' : '' ) + '/>';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_tools_zoom"> Show zoom control</label></div>';
                            	//	Scale bar
                                advancedViewOptions += '<div><input type="checkbox" id="agolforwp_advanced_view_options_tools_scale" name="agolforwp_advanced_view_options_tools_scale" ' + ( advancedViewOptionsArray['showScaleBar'] == 'true' ? 'checked' : '' ) + '/>';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_tools_scale"> Show scale bar</label></div>';
                            	//	Legend
                                advancedViewOptions += '<div><input type="checkbox" id="agolforwp_advanced_view_options_tools_legend" name="agolforwp_advanced_view_options_tools_legend" ' + ( advancedViewOptionsArray['showLegend'] == 'true' ? 'checked' : '' ) + '/>';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_tools_legend"> Show legend</label></div>';
                            	//	Description
                                advancedViewOptions += '<div><input type="checkbox" id="agolforwp_advanced_view_options_tools_desc" name="agolforwp_advanced_view_options_tools_desc" ' + ( advancedViewOptionsArray['showDescription'] == 'true' ? 'checked' : '' ) + '/>';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_tools_desc"> Show description</label></div>';
                            	//	Location Search
                                advancedViewOptions += '<div><input type="checkbox" id="agolforwp_advanced_view_options_tools_search" name="agolforwp_advanced_view_options_tools_search" ' + ( advancedViewOptionsArray['showLocationSearch'] == 'true' ? 'checked' : '' ) + '/>';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_tools_search"> Show location search</label></div>';
                                // Location Search Sub-option
                                advancedViewOptions += '<div id="agolforwp_advanced_view_options_tools_search_sub_container" style="display:none;"><input type="checkbox" id="agolforwp_advanced_view_options_tools_search_sub" name="agolforwp_advanced_view_options_tools_search_sub" ' + ( advancedViewOptionsArray['showLocationSearchSub'] == 'true' ? 'checked' : '' ) + '/>';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_tools_search_sub"> Limit search to extent</label></div>';
                            	//	Basemap Selector
                                advancedViewOptions += '<div><input type="checkbox" id="agolforwp_advanced_view_options_tools_basemap" name="agolforwp_advanced_view_options_tools_basemap" ' + ( advancedViewOptionsArray['showBaseMapSelector'] == 'true' ? 'checked' : '' ) + '/>';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_tools_basemap"> Show basemap selector</label></div>';
                            	//	View Larger Map
                                advancedViewOptions += '<div><input type="checkbox" id="agolforwp_advanced_view_options_tools_viewlarge" name="agolforwp_advanced_view_options_tools_viewlarge" checked ' + ( advancedViewOptionsArray['viewLargerMap'] == 'true' ? 'checked' : '' ) + '/>';
                                advancedViewOptions += '<label for="agolforwp_advanced_view_options_tools_viewlarge"> View larger map</label></div>';
                                                            
                                //Close fieldset for other options
                                advancedViewOptions += '</fieldset>';
                                
                                //Add confirm and cancel buttons for advanced view pane
                                advancedViewOptions += '<div class="agolforwp_advanced_view_button_container">';
                                advancedViewOptions += '<button id="insert_map_preview_advanced_formatting_confirm_btn">Confirm</button>';
                                advancedViewOptions += '<button id="insert_map_preview_advanced_formatting_cancel_btn">Cancel</button>';
                                advancedViewOptions += '</div>';
                                
                                //Close container for advanced view options
                                advancedViewOptions += '</div>';
                            	
                            	//Hide the Preview pane, populate the Advanced View Options form and display the Advanced View Options pane
                            	jQuery('#agol_for_WP_insert_map_popup_map_insert_preview').hide();
                            	jQuery('#agol_for_WP_insert_map_popup_map_insert_advanced').html(advancedViewOptions);
                            	jQuery('#agol_for_WP_insert_map_popup_map_insert_advanced').show();

                                jQuery('#insert_map_preview_advanced_formatting_confirm_btn').click(function() {

                                	//Process fields and update option values array to reflect form field entries
                                	var adViewSize = jQuery('input[name="agolforwp_advanced_view_options_size"]:checked').val();
                                	
                                	switch(adViewSize) {
                                	case 'small': 
                                		// 300x260
                                		advancedViewOptionsArray['currentSize'] = 'small';
                                		advancedViewOptionsArray['currentSizeWidth'] = '300';
                                		advancedViewOptionsArray['currentSizeHeight'] = '260';
                                		break;
                                	case 'medium': 
                                		// 500x400
                                		advancedViewOptionsArray['currentSize'] = 'medium';
                                		advancedViewOptionsArray['currentSizeWidth'] = '500';
                                		advancedViewOptionsArray['currentSizeHeight'] = '400';
                                		break;
                                	case 'large': 
                                		// 940x600
                                		advancedViewOptionsArray['currentSize'] = 'large';
                                		advancedViewOptionsArray['currentSizeWidth'] = '940';
                                		advancedViewOptionsArray['currentSizeHeight'] = '600';
                                		break;
                                	case 'custom':
                                		advancedViewOptionsArray['currentSize'] = 'custom';
                                		advancedViewOptionsArray['currentSizeWidth'] = jQuery('input[name="agolforwp_advanced_view_options_size_custom_width"]').val();
                                		advancedViewOptionsArray['currentSizeHeight'] = jQuery('input[name="agolforwp_advanced_view_options_size_custom_height"]').val();
                                		break;
                                	default:
                                		// 500x400
                                		advancedViewOptionsArray['currentSize'] = 'medium';
                                		advancedViewOptionsArray['currentSizeWidth'] = '500';
                                		advancedViewOptionsArray['currentSizeHeight'] = '400';
                                		break;
                                	}
                                	
                                	advancedViewOptionsArray['currentAlignment'] = jQuery('select[name="agolforwp_advanced_view_options_size_align"]').val();
                                	advancedViewOptionsArray['showZoomControls'] = jQuery('input[name="agolforwp_advanced_view_options_tools_zoom"]').is(':checked') ? 'true' : 'false';
                                	advancedViewOptionsArray['showScaleBar'] = jQuery('input[name="agolforwp_advanced_view_options_tools_scale"]').is(':checked') ? 'true' : 'false';
                                	advancedViewOptionsArray['showLegend'] = jQuery('input[name="agolforwp_advanced_view_options_tools_legend"]').is(':checked') ? 'true' : 'false';
                                	advancedViewOptionsArray['showDescription'] = jQuery('input[name="agolforwp_advanced_view_options_tools_desc"]').is(':checked') ? 'true' : 'false';
                                	advancedViewOptionsArray['showLocationSearch'] = jQuery('input[name="agolforwp_advanced_view_options_tools_search"]').is(':checked') ? 'true' : 'false';
                                	advancedViewOptionsArray['showLocationSearchSub'] = jQuery('input[name="agolforwp_advanced_view_options_tools_search_sub"]').is(':checked') ? 'true' : 'false';
                                	advancedViewOptionsArray['showBaseMapSelector'] = jQuery('input[name="agolforwp_advanced_view_options_tools_basemap"]').is(':checked') ? 'true' : 'false';
                                	advancedViewOptionsArray['viewLargerMap'] = jQuery('input[name="agolforwp_advanced_view_options_tools_viewlarge"]').is(':checked') ? 'true' : 'false';

                                	//Hide the Advanced View Options panel and display the Preview panel
                                	jQuery('#agol_for_WP_insert_map_popup_map_insert_advanced').hide();                                	
                                	jQuery('#agol_for_WP_insert_map_popup_map_insert_preview').show();                                	
                                });
                                
                                jQuery("#agolforwp_advanced_view_options_tools_search").change(function() {
                          	      if(jQuery("#agolforwp_advanced_view_options_tools_search").is(':checked')) {
                          	         jQuery("#agolforwp_advanced_view_options_tools_search_sub_container").show();
                          	      }
                          	      if(! jQuery("#agolforwp_advanced_view_options_tools_search").is(':checked')) {
                         	         jQuery("#agolforwp_advanced_view_options_tools_search_sub_container").hide();
                         	      }
                           	   });

                                jQuery('#insert_map_preview_advanced_formatting_cancel_btn').click(function() {
                                	jQuery('#agol_for_WP_insert_map_popup_map_insert_advanced').hide();
                                	jQuery('#agol_for_WP_insert_map_popup_map_insert_preview').show();
                                });
                            });

                            //Preview screen cancel clicked
                            jQuery('#insert_map_preview_cancel_btn').click(function() {
                                jQuery('#agol_for_WP_insert_map_popup_map_insert_preview').html('');
                                jQuery('#' + options.targetContainer).show();
                                jQuery('#agol_for_WP_insert_map_popup_map_insert_search_field').show();
                                // Items not clickable after this event
                            });

                        });
                    }
                }

            });

        }
    });
    // end of class declaration
});
// end of addOnLoad