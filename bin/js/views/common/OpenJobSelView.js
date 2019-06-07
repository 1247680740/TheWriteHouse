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
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var OpenJobSelView = /** @class */ (function (_super) {
            __extends(OpenJobSelView, _super);
            function OpenJobSelView(payObjArr) {
                var _this = _super.call(this) || this;
                _this.zOrder = 2;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2);
                _this.addMask();
                _this.setData(payObjArr);
                _this.onePeo.on(Laya.Event.CLICK, _this, _this.nextStep);
                _this.twoPeo.on(Laya.Event.CLICK, _this, _this.nextStep);
                _this.threePeo.on(Laya.Event.CLICK, _this, _this.nextStep);
                _this.backBtn.on(Laya.Event.CLICK, _this, _this.backMainView);
                return _this;
            }
            OpenJobSelView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "OpenJobSelViewMask";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                SceneLayerManager.sceneLayer.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.8;
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            OpenJobSelView.prototype.setData = function (payObjArr) {
                this.oneObj = payObjArr[0];
                this.twoObj = payObjArr[1];
                this.threeObj = payObjArr[2];
                this.oneNum.text = this.oneObj["selNum"] + "份";
                this.twoNum.text = this.twoObj["selNum"] + "份";
                this.threeNum.text = this.threeObj["selNum"] + "份";
                this.twoMoney.text = this.twoObj["money"];
                this.threeMoney.text = this.threeObj["money"];
                if (this.oneObj["money"] == 0) {
                    this.oneMoney.text = "(首次免费)";
                    this.oneMoney.color = "#37B448";
                }
                else {
                    this.oneMoney.text = this.oneObj["money"];
                    if (this.oneObj["money"] > GameConfig.money) {
                        this.oneMoney.color = "#FF5300";
                    }
                    else {
                        this.oneMoney.color = "#37B448";
                    }
                }
                if (this.twoObj["money"] > GameConfig.money) {
                    this.twoMoney.color = "#FF5300";
                }
                else {
                    this.twoMoney.color = "#37B448";
                }
                if (this.threeObj["money"] > GameConfig.money) {
                    this.threeMoney.color = "#FF5300";
                }
                else {
                    this.threeMoney.color = "#37B448";
                }
            };
            OpenJobSelView.prototype.nextStep = function (event) {
                switch (event.target.name) {
                    case "onePeo":
                        if (this.oneObj["money"] > GameConfig.money) {
                            TipLayerManager.tipLayer.showDrawBgTip("当前金币不足");
                            return;
                        }
                        else {
                            this.payMoney(this.oneObj["money"]);
                            this.delSelf();
                            this.updataAuthor();
                            this.playerJobDialogView = new views.player.PlayerJobDialogView(this.oneObj);
                        }
                        break;
                    case "twoPeo":
                        if (this.twoObj["money"] > GameConfig.money) {
                            TipLayerManager.tipLayer.showDrawBgTip("当前金币不足");
                            return;
                        }
                        else {
                            this.payMoney(this.twoObj["money"]);
                            this.delSelf();
                            this.updataAuthor();
                            this.playerJobDialogView = new views.player.PlayerJobDialogView(this.twoObj);
                        }
                        break;
                    case "threePeo":
                        if (this.threeObj["money"] > GameConfig.money) {
                            TipLayerManager.tipLayer.showDrawBgTip("当前金币不足");
                            return;
                        }
                        else {
                            this.payMoney(this.threeObj["money"]);
                            this.delSelf();
                            this.updataAuthor();
                            this.playerJobDialogView = new views.player.PlayerJobDialogView(this.threeObj);
                        }
                        break;
                }
            };
            OpenJobSelView.prototype.backMainView = function () {
                SceneLayerManager.sceneLayer.removeChild(this);
                SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
                GameConfig.displayPage -= 1;
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
            };
            /** 花费金币 */
            OpenJobSelView.prototype.payMoney = function (money) {
                GameConfig.money = GameConfig.money - money;
                views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
            };
            /** 删除当前页面 */
            OpenJobSelView.prototype.delSelf = function () {
                SceneLayerManager.sceneLayer.removeChild(this);
                SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
            };
            /** 更新招募作者 */
            OpenJobSelView.prototype.updataAuthor = function () {
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
            };
            return OpenJobSelView;
        }(ui.common.OpenJobSelUI));
        common.OpenJobSelView = OpenJobSelView;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=OpenJobSelView.js.map