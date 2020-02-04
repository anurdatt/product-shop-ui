(function() {

    function numkeys() {
        return function(obj) {
            return Object.keys(obj).length;
        }
    }

    app.filter('numkeys', numkeys);

})();
