namespace views.action {

    export class AttributeView extends ui.action.OperaTingUI {

        private operaTingView: views.action.OperaTingView;
        /** 写作倒计时 */
        private timeNum: number = 30;

        constructor(infoObj) {
            super();
            this.zOrder = 2;
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2);
            this.init(infoObj);
            this.startWritingBtn.on(Laya.Event.CLICK, this, this.startAtri, [infoObj]);
            this.backBtn.on(Laya.Event.CLICK, this, this.backView,[infoObj]);
        }

        init(auObj: Object): void {
            this.lineBox.visible = false;
            this.tipStr.visible = true;
            this.Iam.visible = true;
            this.startWritingBtn.label = "属性优化";
            this.authorIcon.skin = auObj["icon"];
            this.Iam.skin = auObj["icon"];
            this.authorName.text = auObj["name"];
            this.articalName.text = auObj["pageName"];
            if (auObj["articalTip"].length > 9) {
                this.ellipStr.visible = true;
            } else {
                this.ellipStr.visible = false;
            }
            this.articalTip.text = auObj["articalTip"];
            let eleStr: string = auObj["eleStr"];
            eleStr = eleStr.replace(/,/g, "、");
            this.labelTip.text = "标签：" + eleStr;
            if (this.labelTip.text.length > 9) {
                this.ellipStrTwo.visible = true;
            } else {
                this.ellipStrTwo.visible = false;
            }
            this.peoMax.value = auObj["peopleProMax"] / 100;
            this.stoMax.value = auObj["storyProMax"] / 100;
            this.newMax.value = auObj["innovateProMax"] / 100;
            this.depMax.value = auObj["depthProMax"] / 100;
            this.peoMin.value = auObj["peoplePro"] / 100;
            this.stoMin.value = auObj["storyPro"] / 100;
            this.newMin.value = auObj["innovatePro"] / 100;
            this.depMin.value = auObj["depthPro"] / 100;
            this.peoStr.text = auObj["peoplePro"] + "/100";
            this.stoStr.text = auObj["storyPro"] + "/100";
            this.newStr.text = auObj["innovatePro"] + "/100";
            this.depStr.text = auObj["depthPro"] + "/100";
        }

        startAtri(infoObj: Object): void {
            if (this.startWritingBtn.label == "优化完成") {
                this.backView(infoObj);
            } else if(this.startWritingBtn.label == "属性优化"){
                this.startWritingBtn.label = "00:30";
                Laya.timer.loop(1000, this, this.timeBack, [infoObj]);
                Laya.timer.loop(2000, this, this.addPro, [infoObj]);
            }else{
                return;
            }
        }

        timeBack(infoObj: Object): void {
            this.timeNum -= 1;
            if (this.timeNum < 0) {
                Laya.timer.clearAll(this);
                this.backBtn.mouseEnabled = true;
                this.startWritingBtn.mouseEnabled = true;
                for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                    let BakcObj: Object = GameConfig.authorInfoArr[i];
                    if (BakcObj["name"] == infoObj["name"]) {
                        BakcObj["peoplePro"] = parseInt(this.peoMin.value * 100 + "");
                        BakcObj["storyPro"] = parseInt(this.stoMin.value * 100 + "");
                        BakcObj["innovatePro"] = parseInt(this.newMin.value * 100 + "");
                        BakcObj["depthPro"] = parseInt(this.depMin.value * 100 + "");
                        BakcObj["operaNum"] = BakcObj["operaNum"]-1;
                        this.startWritingBtn.visible = false;
                        TipLayerManager.tipLayer.showDrawBgTip("优化已完成");
                    }
                }
                // this.startWritingBtn.label = "优化完成";
            } else {
                this.backBtn.mouseEnabled = false;
                this.startWritingBtn.mouseEnabled = false;
                if (this.timeNum < 10) {
                    let str: string = "00:0" + this.timeNum;
                    this.startWritingBtn.label = str;
                } else {
                    let str: string = "00:" + this.timeNum;
                    this.startWritingBtn.label = str;
                }
            }
        }

        addPro(infoObj: Object): void {
            let totalNum: number = infoObj["passionMin"] + infoObj["precisenessMin"] + infoObj["disciplineMin"] + infoObj["curiousMin"];  //文笔  构思  阅历  脑洞
            let hashNum: number = Hash.getRandomNum(10, 20) / 100;
            let addNum: number = Math.round(totalNum / 10 * hashNum);
            let weiArr: Array<Object> = new Array<Object>();
            weiArr.splice(0, weiArr.length);
            let pasObj: Object = { "name": "passionMin", "weight": infoObj["passionMin"] };
            let preObj: Object = { "name": "precisenessMin", "weight": infoObj["precisenessMin"] };
            let disObj: Object = { "name": "disciplineMin", "weight": infoObj["disciplineMin"] };
            let curObj: Object = { "name": "curiousMin", "weight": infoObj["curiousMin"] };
            weiArr.push(pasObj); weiArr.push(preObj); weiArr.push(disObj); weiArr.push(curObj);
            let bigObj: Object = Hash.weight_rand(weiArr);
            let index = Math.floor((Math.random() * 4));
            switch (bigObj["name"]) {
                case "passionMin":
                    let peoNum: number = this.peoMin.value + addNum / 100;
                    this.tipStr.text = WritingConfig.peoLangue[index];
                    Laya.Tween.to(this.peoMin, { value: peoNum }, 1000, null, Handler.create(this, this.changePeoVue, [peoNum, addNum]));
                    break;
                case "precisenessMin":
                    let stoNum: number = this.stoMin.value + addNum / 100;
                    this.tipStr.text = WritingConfig.stoLangue[index];
                    Laya.Tween.to(this.stoMin, { value: stoNum }, 1000, null, Handler.create(this, this.changeStoVue, [stoNum, addNum]));
                    break;
                case "disciplineMin":
                    let depNum: number = this.depMin.value + addNum / 100;
                    this.tipStr.text = WritingConfig.depLangue[index];
                    Laya.Tween.to(this.depMin, { value: depNum }, 1000, null, Handler.create(this, this.changeDepVue, [depNum, addNum]));
                    break;
                case "curiousMin":
                    let newNum: number = this.newMin.value + addNum / 100;
                    this.tipStr.text = WritingConfig.newLangue[index];
                    Laya.Tween.to(this.newMin, { value: newNum }, 1000, null, Handler.create(this, this.changeNewVue, [newNum, addNum]));
                    break;
            }
        }

        changePeoVue(peoNum: number, addNum: number): void {
            this.peoStr.text = parseInt(peoNum * 100 + "") + "/100";
            this.tipStr.text = "+人设:" + addNum;
        }

        changeStoVue(stoNum: number, addNum: number): void {
            this.stoStr.text = parseInt(stoNum * 100 + "") + "/100";
            this.tipStr.text = "+故事:" + addNum;
        }

        changeDepVue(depNum: number, addNum: number): void {
            this.depStr.text = parseInt(depNum * 100 + "") + "/100";
            this.tipStr.text = "+深度:" + addNum;
        }

        changeNewVue(newNum: number, addNum: number): void {
            this.newStr.text = parseInt(newNum * 100 + "") + "/100";
            this.tipStr.text = "+新意:" + addNum;
        }


        backView(infoObj: Object): void {
            this.removeSelf();
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let auObj: Object = GameConfig.authorInfoArr[i];
                if (auObj["name"] == infoObj["name"]) {
                    this.operaTingView = new views.action.OperaTingView(auObj);
                    this.operaTingView.name = auObj["name"] + "ope";
                    SceneLayerManager.sceneLayer.addChild(this.operaTingView);
                }
            }
        }


    }
}