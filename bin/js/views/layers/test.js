var views;
(function (views) {
    var layers;
    (function (layers) {
        var test = /** @class */ (function () {
            function test() {
                views.common.TimeBackView.instance.startTimer();
                postMessage(5, "");
            }
            return test;
        }());
        layers.test = test;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=test.js.map