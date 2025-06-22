(function($, document, window){
	
	// When the document is fully loaded
	$(document).ready(function(){

		// Cloning the main navigation menu for use in the mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Toggle the mobile navigation menu when the menu toggle button is clicked
		$(".menu-toggle").click(function(){
			// Slide the mobile menu in or out when clicked
			$(".mobile-navigation").slideToggle();
		});

		// Map setup
		var map = $(".map"); // Select the map element
		var latitude = map.data("latitude"); // Get the latitude from data attribute
		var longitude = map.data("longitude"); // Get the longitude from data attribute
		// Check if the map element exists on the page
		if( map.length ){
			// Initialize the map using the gmap3 plugin
			map.gmap3({
				map:{
					options:{
						// Set the map's center to the provided latitude and longitude
						center: [latitude,longitude],
						// Set zoom level to 15
						zoom: 15,
						// Disable scrollwheel zooming
						scrollwheel: false
					}
				},
				// Add a marker at the specified latitude and longitude
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}
	});
	// This event runs when the window has fully loaded, including images and other resources
	$(window).load(function(){
		// Currently empty, but you can add additional functions or adjustments here
	});

})(jQuery, document, window);