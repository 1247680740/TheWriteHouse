namespace views.action {

    export class OperaTingView extends ui.action.OperaTingUI {

        private incomeObj: Object;
        private incomeArr: Array<Object> = ResourceManager.incomeArr;
        private sp1: Sprite;
        private sp2: Sprite;
        private sp3: Sprite;

        constructor(auObj: Object) {
            super();
            this.zOrder = 2;
            this.setValue(auObj);
            this.startWritingBtn.on(Laya.Event.CLICK, this, this.startOpering);
            this.backBtn.on(Laya.Event.CLICK, this, this.backView);
        }

        setValue(auObj: Object): void {
            this.tipStr.visible = false;
            this.Iam.visible = false;
            this.authorIcon.skin = auObj["icon"];
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
            this.collectStr.text = "收藏："+auObj["totalCollect"];
            this.subStr.text = "订阅："+auObj["totalSubs"];
            this.incomeStr.text = "收入"+auObj["totalIncom"];

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
            this.startWritingBtn.label = "作品运营（" + auObj["operaNum"] + "）";
            this.removeLines();
            this.sp1 = this.createSpg(this.sp1, "spg1");
            this.sp2 = this.createSpg(this.sp2, "spg2");
            this.sp3 = this.createSpg(this.sp3, "spg3");
            this.sp1.graphics.drawLines(7, -20, auObj["everyDayCollectPosArr"], "#FF5F60", 3);
            this.sp2.graphics.drawLines(7, -50, auObj["everyDaySubsPosArr"], "#EEEE00", 3);
            this.sp3.graphics.drawLines(7, -50, auObj["everyDayIncomePosArr"], "#7EC0EE", 3);
        }

        removeLines(): void {
            this.bootomBg.removeChildByName("spg1");
            this.bootomBg.removeChildByName("spg2");
            this.bootomBg.removeChildByName("spg3");
        }

        createSpg(sp: Sprite, nameStr: string): Sprite {
            this.removeChildByName(nameStr);
            sp = new Sprite();
            sp.name = nameStr;
            this.bootomBg.addChild(sp);
            return sp;
        }

        startOpering(): void {
            let curObj:Object = this.getAuthorObj();
            if (curObj["operaNum"] <= 0) {
                TipLayerManager.tipLayer.showDrawBgTip("当前运营点数不足");
            } else {
                SceneLayerManager.sceneLayer.removeChild(this);
                let operaSelectUI:views.action.OperaSelectItemView = new views.action.OperaSelectItemView(curObj);
                SceneLayerManager.sceneLayer.addChild(operaSelectUI);
            }
        }

        getAuthorObj():Object{
            let nameStr:string = this.name.substring(0,this.name.length-3);;
            for (let j:number = 0; j < GameConfig.authorInfoArr.length; j++) {
                let auObj:Object = GameConfig.authorInfoArr[j];
                if(auObj["name"] == nameStr){
                    return auObj;
                }
            } 
        }

        backView(): void {
            SceneLayerManager.sceneLayer.removeChild(this);
            GameConfig.displayPage -= 1;
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
        }

    }
}