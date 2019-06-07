namespace views.action {

    import PlotSingleItemUI = ui.action.PlotSingleItemUI;

    export class AddEleView extends ui.action.WritingUI {

        private operaTingView: views.action.OperaTingView;
        private curSelectArr: Array<string>;
        private curReSelectArr: Array<string>;
        private curHoleObj: Object;

        constructor(infoObj: Object) {
            super();
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
            this.zOrder = 2;
            this.initView(infoObj);
            this.plotConffimBtn.on(Laya.Event.CLICK, this, this.backMainView, [infoObj]);
            this.backBtn.on(Laya.Event.CLICK, this, this.backMainView, [infoObj]);
        }

        initView(infoObj: Object): void {
            this.holeBtn.visible = false;
            this.plotBtn.visible = false;
            this.writBtn.visible = false;
            this.holeGrid.visible = false;
            this.plotGrid.visible = true;
            this.plotBox.visible = true;
            this.writBox.visible = false;
            this.friendBox.visible = false;
            this.themeStr.visible = true;
            this.plotConffimBtn.visible = true;
            this.plotConffimBtn.mouseEnabled = true;
            this.backBtn.visible = true;
            this.backBtn.mouseEnabled = true;
            this.backWritBtn.visible = false;
            this.backWritBtn.mouseEnabled = false;
            this.plotGrid.vScrollBarSkin = "";

            this.curSelectArr = new Array<string>();
            this.curReSelectArr = new Array<string>();
            this.curSelectArr.splice(0, this.curSelectArr.length);
            this.curReSelectArr.splice(0, this.curReSelectArr.length);

            let eleStr: string = infoObj["eleStr"];
            if (eleStr.indexOf(",") == -1) {
                this.curSelectArr.push(eleStr);
            } else {
                this.curSelectArr = eleStr.split(",");
            }

            for (let m: number = 0; m < ResourceManager.holeArr.length; m++) {
                let holeObj: Object = ResourceManager.holeArr[m];
                if (holeObj["theme"] == infoObj["subStr"]) {
                    this.curHoleObj = holeObj;
                }
            }

            this.themeStr.text = "选择合适的剧情元素";
            this.plotGrid.removeChildren(0, this.plotGrid.numChildren);
            let wonArr: Array<number> = this.curHoleObj["wonderful"];
            let perArr: Array<number> = this.curHoleObj["perfect"];
            for (let i: number = 0; i < GameConfig.eleArr.length; i++) {
                let eleObj: Object = GameConfig.eleArr[i];
                let plotItemUI: PlotSingleItemUI = new PlotSingleItemUI();
                plotItemUI.name = eleObj["element"];
                plotItemUI.eleStr.text = eleObj["element"];
                plotItemUI.hotStr.text = "中";
                if (this.curSelectArr.indexOf(eleObj["element"]) != -1) {
                    plotItemUI.plotSelectBg.skin = "gameUI/action/ditu4.png";
                } else {
                    plotItemUI.plotSelectBg.skin = "gameUI/action/ditu3.png";
                }
                if (WritingConfig.actPlotObjArr.length > 0 && WritingConfig.actPlotArr.indexOf(this.curHoleObj["theme"]) != -1) {
                    for (let index: number = 0; index < WritingConfig.actPlotObjArr.length; index++) {
                        let actObj: Object = WritingConfig.actPlotObjArr[index];
                        let curActArr: Array<string> = new Array<string>();
                        curActArr.splice(0,curActArr.length);
                        if (actObj["name"] == this.curHoleObj["theme"]) {
                            let newObjArr:Array<Object> = actObj["value"];
                            for (let m:number = 0; m < newObjArr.length; m++) {
                                let newObj:Object = newObjArr[m];
                                curActArr.push(newObj["name"]);
                            }
                            if (curActArr.indexOf(eleObj["element"]) != -1) {
                                if (wonArr.indexOf(eleObj["id"]) != -1) {
                                    plotItemUI.adapterStr.text = "50%";
                                } else if (perArr.indexOf(eleObj["id"]) != -1) {
                                    plotItemUI.adapterStr.text = "100%";
                                } else {
                                    plotItemUI.adapterStr.text = "40%";
                                }
                            } else {
                                plotItemUI.adapterStr.text = "未知";
                            }
                        }
                    }
                } else {
                    plotItemUI.adapterStr.text = "未知";
                }
                plotItemUI.x = 0;
                plotItemUI.y = i * (plotItemUI.height + 7);
                this.plotGrid.addChild(plotItemUI);
                // 点击每一项选择剧情，最多选择三次
                plotItemUI.on(Laya.Event.CLICK, this, this.checkPlot, [eleObj]);
            }
        }

        checkPlot(eleObj: Object): void {
            if (this.curSelectArr.indexOf(eleObj["element"]) != -1) {
                TipLayerManager.tipLayer.showDrawBgTip("之前选择的元素无法取消哦~");
            } else if (this.curReSelectArr.length == 1) {
                TipLayerManager.tipLayer.showDrawBgTip("最多可重选一个剧情");
            } else {
                this.curSelectArr.push(eleObj["element"]);
                this.curReSelectArr.push(eleObj["element"]);
                for (let i: number = 0; i < this.plotGrid.numChildren; i++) {
                    let plotSingleItemUI: PlotSingleItemUI = this.plotGrid.getChildAt(i) as PlotSingleItemUI;
                    plotSingleItemUI.plotSelectBg.skin = "gameUI/action/ditu3.png";
                }
                for (let j: number = 0; j < this.curSelectArr.length; j++) {
                    let element: string = this.curSelectArr[j];
                    let plotSingleItemUI: PlotSingleItemUI = this.plotGrid.getChildByName(element) as PlotSingleItemUI;
                    plotSingleItemUI.plotSelectBg.skin = "gameUI/action/ditu4.png";
                }
            }
        }

        backMainView(infoObj: Object): void {
            this.removeSelf();
            // let eleStr:string = this.returnEleStr();
            for (let index:number = 0; index < GameConfig.authorInfoArr.length; index++) {
                let auObj:Object = GameConfig.authorInfoArr[index];
                if(auObj["name"] == infoObj["name"]){
                    // auObj["eleStr"] = eleStr;
                    // auObj["operaNum"] = auObj["operaNum"]-1;
                    this.operaTingView = new views.action.OperaTingView(auObj);
                    this.operaTingView.name = infoObj["name"] + "ope";
                    SceneLayerManager.sceneLayer.addChild(this.operaTingView);
                }
            }
        }

        returnEleStr(): string {
            let eleStr: string = "";
            for (let i: number = 0; i < this.curSelectArr.length; i++) {
                let plotName: string = this.curSelectArr[i];
                eleStr = eleStr + plotName + ",";
            }
            eleStr = eleStr.substring(0, eleStr.length - 1);
            return eleStr;
        }
    }
}