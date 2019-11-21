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
  

    ext.move = function(rw,lw, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://localhost:8080/move?rw='+rw+'&lw='+lw,
              dataType: 'jsonp',
              success: function( response ) {
                  // Got the data - parse it and return the temperature
                  temperature = response;
                  callback(temperature);
              }
        });
         };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Right Wheel %n Left Wheel %n', 'move', '0','0'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Random wait extension', descriptor, ext);
})();
