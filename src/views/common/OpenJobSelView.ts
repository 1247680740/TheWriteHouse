namespace views.common {

    import HitArea = Laya.HitArea;
    import Sprite = Laya.Sprite;

    export class OpenJobSelView extends ui.common.OpenJobSelUI {

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private playerJobDialogView: views.player.PlayerJobDialogView;

        private oneObj: Object;
        private twoObj: Object;
        private threeObj: Object;

        constructor(payObjArr: Array<Object>) {
            super();
            this.zOrder = 2;
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
            this.addMask();
            this.setData(payObjArr);
            this.onePeo.on(Laya.Event.CLICK, this, this.nextStep);
            this.twoPeo.on(Laya.Event.CLICK, this, this.nextStep);
            this.threePeo.on(Laya.Event.CLICK, this, this.nextStep);
            this.backBtn.on(Laya.Event.CLICK, this, this.backMainView)
        }

        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "OpenJobSelViewMask";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            SceneLayerManager.sceneLayer.addChild(this.guideContainer);
            this.guideContainer.addChild(this);

            //绘制遮罩区，含透明度，可见游戏背景
            let maskArea: Sprite = new Sprite();
            maskArea.alpha = 0.8;
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.guideContainer.addChild(maskArea);

            this.hitAreaOne = new HitArea();
            this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);

            this.guideContainer.hitArea = this.hitAreaOne;
            this.guideContainer.mouseEnabled = true;
        }

        setData(payObjArr: Array<Object>): void {
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
            } else {
                this.oneMoney.text = this.oneObj["money"];
                if (this.oneObj["money"] > GameConfig.money) {
                    this.oneMoney.color = "#FF5300";
                } else {
                    this.oneMoney.color = "#37B448";
                }
            }

            if (this.twoObj["money"] > GameConfig.money) {
                this.twoMoney.color = "#FF5300";
            } else {
                this.twoMoney.color = "#37B448";
            }

            if (this.threeObj["money"] > GameConfig.money) {
                this.threeMoney.color = "#FF5300";
            } else {
                this.threeMoney.color = "#37B448";
            }
        }

        nextStep(event: Laya.Event): void {
            switch (event.target.name) {
                case "onePeo":
                    if (this.oneObj["money"] > GameConfig.money) {
                        TipLayerManager.tipLayer.showDrawBgTip("当前金币不足");
                        return;
                    } else {
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
                    } else {
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
                    } else {
                        this.payMoney(this.threeObj["money"]);
                        this.delSelf();
                        this.updataAuthor();
                        this.playerJobDialogView = new views.player.PlayerJobDialogView(this.threeObj);
                    }
                    break;

            }
        }

        backMainView(): void {
            SceneLayerManager.sceneLayer.removeChild(this);
            SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
            GameConfig.displayPage -= 1;
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
        }

        /** 花费金币 */
        payMoney(money: number): void {
            GameConfig.money = GameConfig.money - money;
            views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
        }

        /** 删除当前页面 */
        delSelf():void{
            SceneLayerManager.sceneLayer.removeChild(this);
            SceneLayerManager.sceneLayer.removeChild(this.guideContainer);
        }

        /** 更新招募作者 */
        updataAuthor(): void {
            /** 更新可招募作者相关配置表 */
            if (GameConfig.hisObjArr.length > 0) {
                for (let i: number = 0; i < GameConfig.hisObjArr.length; i++) {
                    let hisObj: Object = GameConfig.hisObjArr[i];
                    if (hisObj["id"] == 1 || hisObj["id"] == 2) {
                        for (var j = 0; j < GameConfig.guding.length; j++) {
                            let gudingObj: Object = GameConfig.guding[j];
                            if (gudingObj["unlock"] == hisObj["id"] && GameConfig.authorArr.indexOf(gudingObj) == -1) {
                                GameConfig.authorArr.splice(gudingObj["id"] - 1, 0, gudingObj);
                            }
                        }
                    }
                }
            }
            GameConfig.cachData["authorArr"] = GameConfig.authorArr;
        }
    }
}