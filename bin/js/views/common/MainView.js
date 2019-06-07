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
        var SubCtrl = controllers.login.SubCtrl;
        var MainView = /** @class */ (function (_super) {
            __extends(MainView, _super);
            function MainView() {
                var _this = _super.call(this) || this;
                _this.name = "mainview";
                _this.visible = true;
                for (var i = 1; i < 6; i++) {
                    var btn = _this.getChildByName("btn" + i);
                    btn.skin = "gameUI/common/icon" + i + ".png";
                }
                _this.on(Laya.Event.CLICK, _this, _this.openView);
                return _this;
            }
            MainView.prototype.openView = function (e) {
                if (GameConfig.stopTimer) {
                    return;
                }
                var name = e.target.name;
                switch (name) {
                    case 'btn1':
                        var loan = new views.events.loan();
                        var media = new views.events.MediaEvent(1);
                        break;
                    case 'btn2':
                        /** 更新可招募作者相关配置表 */
                        if (GameConfig.hisObjArr.length > 0) {
                            for (var i = 0; i < GameConfig.hisObjArr.length; i++) {
                                var hisObj = GameConfig.hisObjArr[i];
                                if (hisObj["id"] == 1 || hisObj["id"] == 2) {
                                    for (var j = 0; j < GameConfig.guding.length; j++) {
                                        var gudingObj = GameConfig.guding[j];
                                        if (gudingObj["unlock"] == hisObj["id"] && GameConfig.authorArr.indexOf(gudingObj) == -1) {
                                            GameConfig.authorArr.splice(gudingObj["id"] - 1, 0, gudingObj);
                                        }
                                    }
                                }
                            }
                        }
                        GameConfig.cachData["authorArr"] = GameConfig.authorArr;
                        if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                            var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                            list.visible = false;
                        }
                        GameConfig.displayPage += 1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        this.playerJobDialogView = new views.player.PlayerJobDialogView();
                        var media = new views.events.MediaEvent(1);
                        break;
                    case 'btn3':
                        if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                            var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                            list.visible = true;
                        }
                        if (GameConfig.displayPage <= 0) {
                            SceneLayerManager.sceneLayer.openEvent();
                        }
                        if (GameConfig.registerID == null || GameConfig.registerID == "") {
                            GameConfig.cachData["userId"] = GameConfig.temporaryID;
                        }
                        else {
                            GameConfig.cachData["userId"] = GameConfig.registerID;
                        }
                        Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
                        SubCtrl.getInstance().request_savaData(GameConfig.cachData);
                        TipLayerManager.tipLayer.showDrawBgTip("存档成功");
                        var media = new views.events.MediaEvent(2);
                        break;
                    case 'btn4':
                        GameConfig.displayPage += 1;
                        this.achiveView = new views.events.AchiveView();
                        var media = new views.events.MediaEvent(1);
                        break;
                    case 'btn5':
                        if (GameConfig.authorInfoArr.length < 1) {
                            TipLayerManager.tipLayer.showDrawBgTip("当前没有签约作者，请签约作者！");
                            var media = new views.events.MediaEvent(2);
                            if (GameConfig.displayPage <= 0) {
                                SceneLayerManager.sceneLayer.openEvent();
                            }
                        }
                        else {
                            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                                var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                                list.visible = false;
                            }
                            GameConfig.displayPage += 1;
                            this.playerTrainView = new views.player.PlayerTrainView();
                            this.playerTrainView.name = "playerTrainView";
                            this.playerTrainView.visible = true;
                            Laya.stage.addChild(this.playerTrainView);
                            var media = new views.events.MediaEvent(1);
                        }
                        break;
                    case "btn6":
                        if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                            var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                            list.visible = false;
                        }
                        GameConfig.displayPage += 1;
                        this.playerWritingView = new views.player.PlayerWritingListView();
                        this.playerWritingView.name = "playerWritingView";
                        this.playerWritingView.visible = true;
                        Laya.stage.addChild(this.playerWritingView);
                        var media = new views.events.MediaEvent(1);
                        break;
                    case "testBtn":
                        if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                            var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                            list.visible = false;
                        }
                        GameConfig.displayPage += 1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        this.testView = views.common.TestView.getInstance();
                        Laya.stage.addChild(this.testView);
                        break;
                    default:
                        TipLayerManager.tipLayer.showDrawBgTip("暂未开放");
                        if (GameConfig.displayPage <= 0) {
                            SceneLayerManager.sceneLayer.openEvent();
                        }
                        var media = new views.events.MediaEvent(2);
                        break;
                }
            };
            MainView.getInstance = function () {
                if (MainView.instance == null) {
                    MainView.instance = new MainView();
                }
                return MainView.instance;
            };
            return MainView;
        }(ui.common.MainViewUI));
        common.MainView = MainView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=MainView.js.map