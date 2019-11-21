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
    ext.move = function(type, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://localhost:80/move?type='+type,
              dataType: 'jsonp',
              success: function( response ) {
                  // Got the data - parse it and return the temperature
                  temperature = response['move'];
                  callback(temperature);
              }
        });

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'Move %s', 'move', 'Forward'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Random wait extension', descriptor, ext);
})();
