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
var views;
(function (views) {
    var common;
    (function (common) {
        var Event = laya.events.Event;
        var ConfirmCancelTipUI = ui.common.ConfirmCancelTipUIUI;
        /**
         * 提示是否续约的提示框
         */
        var ConfirmRenew = /** @class */ (function (_super) {
            __extends(ConfirmRenew, _super);
            function ConfirmRenew(obj, sala) {
                var _this = _super.call(this) || this;
                _this.name = "ConfirmRenew";
                _this.x = (Laya.stage.width - _this.width) / 2;
                _this.y = (Laya.stage.height - _this.height) / 2;
                _this.visible = true;
                _this.confirmBtn.on(Event.CLICK, _this, _this.renew, [obj, sala]);
                _this.cancelBtn.on(Event.CLICK, _this, _this.cancelBtnFn, [obj]);
                _this.closeBtn.on(Event.CLICK, _this, _this.cancelBtnFn, [obj]);
                return _this;
            }
            ConfirmRenew.prototype.renew = function (obj, sala) {
                Hash.playMusic(2);
                obj["monthlySalary"] = sala;
                obj["curStatus"] = 0;
                for (var i = 0; i < GameConfig.authorInfoArr.length; i++) {
                    var authorObj = GameConfig.authorInfoArr[i];
                    if (authorObj["name"] == obj["name"]) {
                        authorObj["monthlySalary"] = sala;
                        authorObj["curStatus"] = 0;
                    }
                }
                Laya.stage.removeChild(this);
                GameConfig.displayPage -= 1;
                Laya.stage.removeChildByName("reneWMaskView");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            ConfirmRenew.prototype.cancelBtnFn = function (infoObj) {
                Hash.playMusic(2);
                Laya.stage.removeChild(this);
                GameConfig.displayPage -= 1;
                Laya.stage.removeChildByName("reneWMaskView");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
                GameConfig.signingNum -= 1;
                // if (GameConfig.signingNum <= 0) {
                // 	views.player.PlayerStateInfoView.getInstance().removeObj();
                // }
                SceneLayerManager.sceneLayer.deleteAuthor(infoObj["name"]);
                for (var i = 0; i < GameConfig.guding.length; i++) {
                    var obj = GameConfig.guding[i];
                    if (obj["name"] == infoObj["name"]) {
                        var id = obj["id"] + "";
                        var index = obj["id"] - 1;
                        GameConfig.authorArr.splice(index, 0, obj);
                        var idIndex = GameConfig.authorIdArr.indexOf(id);
                        GameConfig.authorIdArr.splice(idIndex, 1);
                        GameConfig.authorInfoArr.splice(idIndex, 1);
                        GameConfig.cachData["authorArr"] = GameConfig.authorArr;
                        return;
                    }
                }
            };
            return ConfirmRenew;
        }(ConfirmCancelTipUI));
        common.ConfirmRenew = ConfirmRenew;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=ConfirmRenew.js.map