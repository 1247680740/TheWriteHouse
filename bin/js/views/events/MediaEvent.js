var views;
(function (views) {
    var events;
    (function (events) {
        var MediaEvent = /** @class */ (function () {
            function MediaEvent(state) {
                if (state == 1) {
                    laya.media.SoundManager.playSound("res/sounds/btn_open.wav", 1); //弹出面板的
                }
                else {
                    laya.media.SoundManager.playSound("res/sounds/btn_press.wav", 1); //关闭按钮的 确认 or 取消 or 关闭
                }
            }
            return MediaEvent;
        }());
        events.MediaEvent = MediaEvent;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=MediaEvent.js.map