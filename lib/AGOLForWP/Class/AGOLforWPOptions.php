<?php

class AGOLforWP_Class_AGOLforWPOptions {

    private $sections;
	private $checkboxes;
	private $settings;

	/**
	 * Construct
	 *

	 */
	public function __construct() {

		// This will keep track of the checkbox options for the validate_settings function.
		$this->checkboxes = array();
		$this->settings = array();
		$this->get_settings();

		$this->sections['general']      = __( 'General Settings <small>(upgrade)</small>' );
		$this->sections['account']      = __( 'Account Settings <small>(upgrade)</small>' );
		$this->sections['adv_tree']     = __( 'Advanced Content Tree Settings <small>(upgrade)</small>' );

		add_action( 'admin_menu', array( &$this, 'add_pages' ) );
		add_action( 'admin_init', array( &$this, 'register_settings' ) );

		if ( ! get_option( 'agolforwp_options' ) )
			$this->initialize_settings();

	}

	/**
	 * Add options page
	 *

	 */
	public function add_pages() {

		$admin_page = add_options_page( __( 'ArcGIS Online' ), __( 'ArcGIS Online' ), 'manage_options', 'agolforwp-options', array( &$this, 'display_page' ) );

		add_action( 'admin_print_scripts-' . $admin_page, array( &$this, 'scripts' ) );
		//add_action( 'admin_print_styles-' . $admin_page, array( &$this, 'styles' ) );

	}

	/**
	 * Create settings field
	 *

	 */
	public function create_setting( $args = array() ) {

		$defaults = array(
			'id'      => 'default_field',
			'title'   => '',
			'desc'    => '',
			'std'     => '',
			'type'    => 'text',
			'section' => 'general',
			'choices' => array(),
			'class'   => ''
		);

		extract( wp_parse_args( $args, $defaults ) );

		$field_args = array(
			'type'      => $type,
			'id'        => $id,
			'desc'      => $desc,
			'std'       => $std,
			'choices'   => $choices,
			'label_for' => $id,
			'class'     => $class
		);

		if ( $type == 'checkbox' )
			$this->checkboxes[] = $id;

		add_settings_field( $id, $title, array( $this, 'display_setting' ), 'agolforwp-options', $section, $field_args );
	}

	/**
	 * Display options page
	 *
	 */
	public function display_page() {

		echo '<div class="wrap">
	<div class="icon32" id="icon-options-general"></div>
	<h2>' . __( 'Web Maps for WordPress' ) . '</h2>';

		if ( isset( $_GET['settings-updated'] ) && $_GET['settings-updated'] == true )
			echo '<div class="updated fade"><p>' . __( 'Web Maps for WordPress options updated.' ) . '</p></div>';

		echo '<form action="options.php" method="post">';

		settings_fields( 'agolforwp_options' );
		echo '<div class="ui-tabs">
			<ul class="ui-tabs-nav">';

		foreach ( $this->sections as $section_slug => $section )
			echo '<li><a href="#' . $section_slug . '">' . $section . '</a></li>';

		echo '</ul>';
		do_settings_sections( $_GET['page'] );

		echo '</div>

	</form>';

	echo '<script type="text/javascript">
		jQuery(document).ready(function($) {
			var sections = [];';

			foreach ( $this->sections as $section_slug => $section )
				echo "sections['$section'] = '$section_slug';";

			echo 'var wrapped = $(".wrap h3").wrap("<div class=\"ui-tabs-panel\">");
			wrapped.each(function() {
				$(this).parent().append($(this).parent().nextUntil("div.ui-tabs-panel"));
			});
			$(".ui-tabs-panel").each(function(index) {
				$(this).attr("id", sections[$(this).children("h3").text()]);
				if (index > 0)
					$(this).addClass("ui-tabs-hide");
			});
			$(".ui-tabs").tabs({
				fx: { opacity: "toggle", duration: "fast" }
			});
			$("input[type=text], textarea").each(function() {
				if ($(this).val() == $(this).attr("placeholder") || $(this).val() == "")
					$(this).css("color", "#999");
			});

			$("input[type=text], textarea").focus(function() {
				if ($(this).val() == $(this).attr("placeholder") || $(this).val() == "") {
					$(this).val("");
					$(this).css("color", "#000");
				}
			}).blur(function() {
				if ($(this).val() == "" || $(this).val() == $(this).attr("placeholder")) {
					$(this).val($(this).attr("placeholder"));
					$(this).css("color", "#999");
				}
			});

			$(".wrap h3").show();

			// This will make the "warning" checkbox class really stand out when checked.
			// I use it here for the Reset checkbox.
			$(".warning").change(function() {
				if ($(this).is(":checked"))
					$(this).parent().css("background", "#c00").css("color", "#fff").css("fontWeight", "bold");
				else
					$(this).parent().css("background", "none").css("color", "inherit").css("fontWeight", "normal");
			});

			// Browser compatibility
			if ($.browser.mozilla)
			         $("form").attr("autocomplete", "off");
		});
	</script>
</div>';

	}
/**
	 * Description for section
	 *

	 */
	public function display_section() {
		echo '<p><a href="http://www.geo-jobe.com/wp/upgrade" target="_blank"><img src="http://cdn.geopowered.com/Applications/WordPressPlugins/AGOL/Free/info/VersionChart500x600.png" alt="Version comparison" /></a></p>';
	}

	/**
	 * Description for About section
	 *
	 */
	public function display_about_section() {

		// Code

	}
	/**
	 * HTML output for text field
	 */
	public function display_setting( $args = array() ) {

		extract( $args );

		$options = get_option( 'agolforwp_options' );

		if ( ! isset( $options[$id] ) && $type != 'checkbox' )
			$options[$id] = $std;
		elseif ( ! isset( $options[$id] ) )
			$options[$id] = 0;

		$field_class = '';
		if ( $class != '' )
			$field_class = ' ' . $class;

		switch ( $type ) {

			case 'heading':
				echo '<h4>' . $desc . '</h4>';
				break;

			case 'checkbox':

				echo '<input class="checkbox' . $field_class . '" type="checkbox" id="' . $id . '" name="agolforwp_options[' . $id . ']" value="1" ' . checked( $options[$id], 1, false ) . ' /> <label for="' . $id . '">' . $desc . '</label>';

				break;

			case 'select':
				echo '<select class="select' . $field_class . '" name="agolforwp_options[' . $id . ']">';

				foreach ( $choices as $value => $label )
					echo '<option value="' . esc_attr( $value ) . '"' . selected( $options[$id], $value, false ) . '>' . $label . '</option>';

				echo '</select>';

				if ( $desc != '' )
					echo '<br /><span class="description">' . $desc . '</span>';

				break;

			case 'radio':
				$i = 0;
				foreach ( $choices as $value => $label ) {
					echo '<input class="radio' . $field_class . '" type="radio" name="agolforwp_options[' . $id . ']" id="' . $id . $i . '" value="' . esc_attr( $value ) . '" ' . checked( $options[$id], $value, false ) . '> <label for="' . $id . $i . '">' . $label . '</label>';
					if ( $i < count( $options ) - 1 )
						echo '<br />';
					$i++;
				}

				if ( $desc != '' )
					echo '<br /><span class="description">' . $desc . '</span>';

				break;

			case 'textarea':
				echo '<textarea class="' . $field_class . '" id="' . $id . '" name="agolforwp_options[' . $id . ']" placeholder="' . $std . '" rows="5" cols="30">' . wp_htmledit_pre( $options[$id] ) . '</textarea>';

				if ( $desc != '' )
					echo '<br /><span class="description">' . $desc . '</span>';

				break;

			case 'password':
				echo '<input class="regular-text' . $field_class . '" type="password" id="' . $id . '" name="agolforwp_options[' . $id . ']" value="' . esc_attr( $options[$id] ) . '" />';

				if ( $desc != '' )
					echo '<br /><span class="description">' . $desc . '</span>';

				break;

			case 'text':
			default:
		 		echo '<input class="regular-text' . $field_class . '" type="text" id="' . $id . '" name="agolforwp_options[' . $id . ']" placeholder="' . $std . '" value="' . esc_attr( $options[$id] ) . '" />';

		 		if ( $desc != '' )
		 			echo '<br /><span class="description">' . $desc . '</span>';

		 		break;

		}

	}

	/**
	 * Settings and defaults
	 *
	 */
	public function get_settings() {
	}

	/**
	 * Initialize settings to their default values
	 *
	 */
	public function initialize_settings() {

		$default_settings = array();
		foreach ( $this->settings as $id => $setting ) {
			if ( $setting['type'] != 'heading' )
				$default_settings[$id] = $setting['std'];
		}

		update_option( 'agolforwp_options', $default_settings );

	}

	/**
	* Register settings
	*
	*/
	public function register_settings() {

		register_setting( 'agolforwp_options', 'agolforwp_options', array ( &$this, 'validate_settings' ) );

		foreach ( $this->sections as $slug => $title ) {
			if ( $slug == 'about' )
				add_settings_section( $slug, $title, array( &$this, 'display_about_section' ), 'agolforwp-options' );
			else
				add_settings_section( $slug, $title, array( &$this, 'display_section' ), 'agolforwp-options' );
		}

		$this->get_settings();

		foreach ( $this->settings as $id => $setting ) {
			$setting['id'] = $id;
			$this->create_setting( $setting );
		}

	}

	/**
	* jQuery Tabs
	*
	*/
	public function scripts() {

		wp_print_scripts( 'jquery-ui-tabs' );

	}

	/**
	* Styling for the plugin options page
	*
	*/
	public function styles() {

		wp_register_style( 'agolforwp-admin', get_bloginfo( 'stylesheet_directory' ) . '/agolforwp-options.css' );
		wp_enqueue_style( 'agolforwp-admin' );

	}

	/**
	* Validate settings
	*
	* @since 1.0
	*/
	public function validate_settings( $input ) {

		if ( ! isset( $input['reset_plugin'] ) ) {
			$options = get_option( 'agolforwp_options' );

			foreach ( $this->checkboxes as $id ) {
				if ( isset( $options[$id] ) && ! isset( $input[$id] ) )
					unset( $options[$id] );
			}

			return $input;
		}
		return false;

	}

}

function agolforwp_option( $option ) {
	$options = get_option( 'agolforwp_options' );
	if ( isset( $options[$option] ) )
		return $options[$option];
	else
		return false;
}
?>