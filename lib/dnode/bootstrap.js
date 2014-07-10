if (!window.getMerged) {
    window.getMerged = function () {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'helper.js';
        head.appendChild(script);
    };
}