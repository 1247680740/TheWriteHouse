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
    var toolbar;
    (function (toolbar) {
        var ComTableDialogUI = ui.dialog.ComTableDialogUI;
        var ConfirmCancelTipView = views.common.ConfirmCancelTipView;
        var SubCtrl = controllers.login.SubCtrl;
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var AchiveView = views.events.AchiveView;
        var ComDialogView = /** @class */ (function (_super) {
            __extends(ComDialogView, _super);
            function ComDialogView() {
                var _this = _super.call(this) || this;
                _this.x = (Laya.stage.width - _this.width) / 2;
                _this.y = (Laya.stage.height - _this.height) / 2;
                _this.on(Laya.Event.CLICK, _this, _this.showComView);
                return _this;
            }
            ComDialogView.getInstance = function () {
                if (this.instance == null) {
                    this.instance = new ComDialogView();
                }
                return this.instance;
            };
            ComDialogView.prototype.showComView = function (e) {
                var name = e.target.name;
                switch (name) {
                    case "buildHomeBtn":
                        // GameConfig.displayPage-=1;
                        Laya.stage.removeChild(this);
                        Laya.stage.removeChildByName("maskView");
                        if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                            var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                            list.visible = false;
                        }
                        var info = "";
                        var spenMoney = GameConfig.homeFloor * GameConfig.builderMoney;
                        // GameConfig.displayPage += 1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        this.yesOrNoTip = ConfirmCancelTipView.getInstance();
                        // 引导所在容器
                        var guideContainer = new Sprite();
                        guideContainer.name = "CancelTipView";
                        // 设置容器为画布缓存
                        guideContainer.cacheAs = "bitmap";
                        Laya.stage.addChild(guideContainer);
                        guideContainer.addChild(this.yesOrNoTip);
                        //绘制遮罩区，含透明度，可见游戏背景
                        var maskAreaOne = new Sprite();
                        maskAreaOne.alpha = 0.8;
                        maskAreaOne.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                        guideContainer.addChild(maskAreaOne);
                        var hitAreaOne = new HitArea();
                        hitAreaOne.hit.drawRect(this.yesOrNoTip.x, this.yesOrNoTip.y, this.yesOrNoTip.width, this.yesOrNoTip.height, null);
                        guideContainer.hitArea = hitAreaOne;
                        guideContainer.mouseEnabled = true;
                        Laya.stage.addChild(this.yesOrNoTip);
                        info = "是否花费" + spenMoney + "金币进行加盖一层？";
                        this.yesOrNoTip.contentTxt.text = info;
                        break;
                    case "recruBtn":
                        Laya.stage.removeChild(this);
                        Laya.stage.removeChildByName("maskView");
                        /** 更新相关配置表 */
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
                        this.playerJobDialogView = new views.player.PlayerJobDialogView();
                        break;
                    case "storageBtn":
                        Laya.stage.removeChild(this);
                        Laya.stage.removeChildByName("maskView");
                        if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                            var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                            list.visible = true;
                        }
                        // Laya.LocalStorage.clear();
                        if (GameConfig.registerID == null || GameConfig.registerID == "") {
                            GameConfig.cachData["userId"] = GameConfig.temporaryID;
                        }
                        else {
                            GameConfig.cachData["userId"] = GameConfig.registerID;
                        }
                        Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
                        // console.log(JSON.stringify(GameConfig.cachData));
                        SubCtrl.getInstance().request_savaData(GameConfig.cachData);
                        TipLayerManager.tipLayer.showDrawBgTip("存档成功");
                        GameConfig.displayPage -= 1;
                        if (GameConfig.displayPage <= 0) {
                            SceneLayerManager.sceneLayer.openEvent();
                        }
                        break;
                    case "sessionBtn":
                        Laya.stage.removeChild(this);
                        this.achiveView = new AchiveView();
                        break;
                    case "authorTrainBtn":
                        if (GameConfig.authorInfoArr.length < 1) {
                            TipLayerManager.tipLayer.showDrawBgTip("当前没有签约作者，请签约作者！");
                            Laya.stage.removeChild(this);
                            Laya.stage.removeChildByName("maskView");
                            GameConfig.displayPage -= 1;
                            if (GameConfig.displayPage <= 0) {
                                SceneLayerManager.sceneLayer.openEvent();
                            }
                        }
                        else {
                            Laya.stage.removeChild(this);
                            Laya.stage.removeChildByName("maskView");
                            this.playerTrainView = new views.player.PlayerTrainView();
                            this.playerTrainView.name = "playerTrainView";
                            this.playerTrainView.visible = true;
                            Laya.stage.addChild(this.playerTrainView);
                        }
                        break;
                    default:
                        Laya.stage.removeChild(this);
                        Laya.stage.removeChildByName("maskView");
                        GameConfig.displayPage -= 1;
                        if (GameConfig.displayPage <= 0) {
                            SceneLayerManager.sceneLayer.openEvent();
                        }
                        TipLayerManager.tipLayer.showDrawBgTip("暂未开放");
                        break;
                }
            };
            return ComDialogView;
        }(ComTableDialogUI));
        toolbar.ComDialogView = ComDialogView;
    })(toolbar = views.toolbar || (views.toolbar = {}));
})(views || (views = {}));
//# sourceMappingURL=ComDialogView.js.map