var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var resource = managers.ResourceManager;
var views;
(function (views) {
    var events;
    (function (events) {
        var AchiEvent = /** @class */ (function (_super) {
            __extends(AchiEvent, _super);
            function AchiEvent(id) {
                var _this = _super.call(this) || this;
                var curDate = new Date();
                var year = curDate.getFullYear();
                var month = curDate.getMonth() + 1;
                var data = curDate.getDate();
                GameConfig.achiArr[id] = GameConfig.year + '-' + GameConfig.month + '-' + GameConfig.day;
                GameConfig.cachData["achiArr"] = GameConfig.achiArr;
                _this.bgimage.skin = 'gameUI/event/cj_tips.png';
                var avchidata = resource.achiveGoldArr;
                _this.m_name.text = avchidata[id]['name'];
                _this.m_icon.skin = 'gameUI/event/talent_on.png';
                _this.m_quest.text = '你获得了一点成就';
                _this.m_comtime.text = '' + GameConfig.year + '年' + GameConfig.month + '月' + GameConfig.day + '日 达成';
                Laya.stage.addChild(_this);
                _this.AddAchiPoint();
                _this.PopUI();
                _this.x = (Laya.stage.width - _this.width) / 2; //70;
                _this.y = (Laya.stage.height - _this.height) / 2; //500;
                return _this;
            }
            AchiEvent.prototype.AddAchiPoint = function () {
                GameConfig.hasTalentPoint += 1;
                GameConfig.defHasTalentPoint += 1;
                GameConfig.cachData['hasTalentPoint'] = GameConfig.hasTalentPoint;
                GameConfig.cachData['defHasTalentPoint'] = GameConfig.defHasTalentPoint;
            };
            AchiEvent.prototype.PopUI = function () {
                this.alpha = 0;
                Laya.Tween.to(this, { alpha: 1 }, 500, Laya.Ease.sineOut, Handler.create(this, this.comeUI), 1000);
            };
            AchiEvent.prototype.comeUI = function () {
                Laya.Tween.to(this, { alpha: 0 }, 1000, Laya.Ease.sineOut, Handler.create(this, this.RemoveUI), 1000);
            };
            AchiEvent.prototype.RemoveUI = function () {
                Laya.stage.removeChild(this);
            };
            return AchiEvent;
        }(ui.event.AchiPopUI));
        events.AchiEvent = AchiEvent;
    })(events = views.events || (views.events = {}));
})(views || (views = {}));
//# sourceMappingURL=AchiEvent.js.map