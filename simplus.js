/* Extension demonstrating a blocking command block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */

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
                  console.warn(response)
                  callback(response);
              }
        });
    };
    
    
    ext.move = function(rw,lw, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://localhost:8080/move?rw='+rw+'&lw='+lw,
              dataType: 'jsonp',
              success: function( response ) {
                  callback(response);
              }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'Change LED status to %m.led', 'set_led'],
            ['R', 'Right Wheel %n Left Wheel %n', 'move', '0','0'],

        ],
        menus: {
        	led: ['off', 'blue', 'green','red'],
    },
    };

    // Register the extension
    ScratchExtensions.register('Simplus', descriptor, ext);
})();
