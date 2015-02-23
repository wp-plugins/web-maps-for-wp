<script type="text/javascript">
var base_img_url = "http://cdn.geopowered.com/Applications/WordPressPlugins/AGOL/Free/logos/";
var target_url = "";
/**
 * Generate random number 1-10
 * Set the image source equal to whatever URL is in the switch
 **/

var url_rand = Math.floor((Math.random()*10)+1);
switch(url_rand) {
	case 1:
		target_img = "service-logo-1.png";
		break;
	case 2:
		target_img = "service-logo-2.png";
		break;
	case 3:
		target_img = "service-logo-3.png";
		break;
	case 4:
		target_img = "service-logo-4.png";
		break;
	case 5:
		target_img = "service-logo-5.png";
		break;
	case 6:
		target_img = "service-logo-6.png";
		break;
	case 7:
		target_img = "service-logo-7.png";
		break;
	case 8:
		target_img = "service-logo-8.png";
		break;
	case 9:
		target_img = "service-logo-9.png";
		break;
	case 10:
		target_img = "service-logo-10.png";
		break;
	default:
		target_img = "service-logo-1.png";
		break;
}

jQuery(".insert_map_iframe_container").append('<div><img src="' + base_img_url + target_img + '" /></div>');
</script>