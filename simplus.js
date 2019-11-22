/* Extension demonstrating a blocking command block */
/* Reyhaneh <reyhanehpahlevan@ce.sharif.edu>, Nov 2019 */

new (function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.set_led = function(status,callback) {
         $.ajax({
              url: 'http://localhost:8080/set_led?status='+status,
              dataType: 'jsonp',
              success: function( response ) {
                  callback(response);
              }
        });
    };
    
    ext.get_proximity = function(number,callback) {
         $.ajax({
              url: 'http://localhost:8080/get_proximity?number='+number,
              dataType: 'jsonp',
              success: function( response ) {
                  callback(response);
              }
        });
    };
    
        
    ext.get_color = function(sensor,callback) {
         $.ajax({
              url: 'http://localhost:8080/get_color?sensor='+sensor,
              dataType: 'jsonp',
              success: function( response ) {
                  callback(response);
              }
        });
    };
    
    ext.get_position = function(position,callback) {
         $.ajax({
              url: 'http://localhost:8080/get_position?position='+position,
              dataType: 'jsonp',
              success: function( response ) {
                  callback(response);
              }
        });
    };
    
    ext.get_orientation = function(orientation,callback) {
         $.ajax({
              url: 'http://localhost:8080/get_orientation?orientation='+orientation,
              dataType: 'jsonp',
              success: function( response ) {
                  callback(response);
              }
        });
    };
    
    
    ext.set_wheels = function(rw,lw, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://localhost:8080/set_wheels?rw='+rw+'&lw='+lw,
              dataType: 'jsonp',
              success: function( response ) {
                  callback(response);
              }
        });
    };

	ext.get_distance_victim = function(callback) {
        $.ajax({
              url: 'http://localhost:8080/get_distance_victim',
              dataType: 'jsonp',
              success: function( response ) {
               console.warn(response);
                  callback(response);
              }
        });
    };
    
    ext.send_action = function(action,callback) {
        $.ajax({
              url: 'http://localhost:8080/send_action?action='+action,
              dataType: 'jsonp',
              success: function( response ) {
                  callback(response);
              }
        });
    };
    
    
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Get Proximity sensor value for %m.proximities', 'get_proximity','1'],
            ['R', 'Get %m.colorsensors Color sensor value' , 'get_color','center'],
            ['R', 'Get Position %m.positions' , 'get_position','x'],
            ['R', 'Get Orientation %m.orientations' , 'get_orientation','Ro'],
            ['R', 'Get distance to Victim ','get_distance_victim'],
            ['w', 'Change LED status to %m.led', 'set_led','off'],
            ['w', 'Right Wheel %n Left Wheel %n', 'set_wheels', '0','0'],
	    ['w', 'Action %m.actions', 'send_action', 'Find Victim'],

        ],
        menus: {
        	led: ['off', 'blue', 'green','red'],
        	colorsensors: ['center', 'right', 'left'],
        	proximities:['1','2','3','4','5','6','7','8'],
        	positions:['x','y','z'],
        	orientations:['Ro','Phi','Theta'],
        	actions: ['Find Victim', 'Find Checkpoint','Rescue Victim'],
    },
    };

    // Register the extension
    ScratchExtensions.register('Simplus', descriptor, ext);
})();
