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
    ext.wait_random = function(callback) {
        wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait*1000);
    };

    ext.move = function(rw,lf, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://localhost:8080/move?type='+rw,
              dataType: 'jsonp',
              success: function( response ) {
                  // Got the data - parse it and return the temperature
                  temperature = response['move'];
                  callback(temperature);
              }
        });
         };
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'wait for random time', 'wait_random'],
            ['R', 'Right Wheel %n Left Wheel %n', 'move', 0,0],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Random wait extension', descriptor, ext);
})();
