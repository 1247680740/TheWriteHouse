namespace views.common {

    import HitArea = Laya.HitArea;
    import Style = laya.display.css.Style;
    import CSSStyle = laya.display.css.CSSStyle;
    import HTMLDivElement = laya.html.dom.HTMLDivElement;
    import Sprite = Laya.Sprite;

    export class GuideStep extends ui.common.GuideStepUI {

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private guideStepArr: Array<Object> = ResourceManager.guideArr;
        private guideSteps: Array<Object>;
        private guideStep: number = -1;
        private curStatus:number;
        constructor(step: number, guideSteps: Array<Object>) {
            super();
            this.x = (Laya.stage.width-this.width)/2;
            this.y = Laya.stage.height - (this.height+20);
            this.guideSteps = new Array<Object>();
            this.guideSteps = guideSteps;
            this.curStatus = step;
            this.initGuide(step);
        }

        initGuide(step: number): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            Laya.stage.addChild(this.guideContainer);
            this.guideContainer.addChild(this);

            //绘制遮罩区，含透明度，可见游戏背景
            let maskArea: Sprite = new Sprite();
            maskArea.alpha = 0.5;
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000"); // - this.height
            this.guideContainer.addChild(maskArea);
            this.guideContainer.on(Laya.Event.MOUSE_DOWN, this, this.nextStep);

            this.hitAreaOne = new HitArea();
            let height: number = Laya.stage.height - this.height;
            this.hitAreaOne.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");

            this.guideContainer.hitArea = this.hitAreaOne;
            this.guideContainer.mouseEnabled = true;

            this.nextStep(step);
        }

        nextStep(step:number): void {
            if (this.guideStep == this.guideSteps.length - 1) {
                this.guideSteps.splice(0, this.guideSteps.length);
                Laya.stage.removeChild(this.guideContainer);
                Laya.stage.removeChild(this);
                if (this.curStatus == 1) {
                    GameConfig.displayPage -= 1;
                    if (Laya.stage.getChildByName("div")) {
                        Laya.stage.removeChildByName("div");
                    }
                    if (GameConfig.displayPage <= 0) {
                        SceneLayerManager.sceneLayer.openEvent();
                    }
                    GameConfig.cachData["finishFirstStep"] = true;
                }else if(this.curStatus == 2){
                    if(GameConfig.year<=2001){
                        let payObjArr:Array<Object> =[{"selNum":40,"money":0},{"selNum":60,"money":30000},{"selNum":80,"money":60000}]; 
                        let openJobView:views.common.OpenJobSelView = new views.common.OpenJobSelView(payObjArr);
                        openJobView.name = "openJobView";
                        SceneLayerManager.sceneLayer.addChild(openJobView);
                    }else{
                        let payObjArr:Array<Object> =[{"selNum":40,"money":15000},{"selNum":60,"money":30000},{"selNum":80,"money":60000}];
                        let openJobView:views.common.OpenJobSelView = new views.common.OpenJobSelView(payObjArr);
                        openJobView.name = "openJobView";
                        SceneLayerManager.sceneLayer.addChild(openJobView); 
                    }
                }
            }else {
                GameConfig.cachData["finishFirstStep"] = false;
                let colorArr: Array<string> = new Array<string>();
                let subArr: Array<string> = new Array<string>();
                let posArr: Array<number> = [0];
                let testSubArr: Array<string> = new Array<string>();
                let testPosArr: Array<number> = [];
                this.guideStep += 1;
                let stepObj: Object = this.guideSteps[this.guideStep];
                let str: string = stepObj["string"];
                let arr: Array<string>;
                let div: HTMLDivElement = new HTMLDivElement();
                let html: string = "";
                let colorID: number = 0;

                let reg = /#/g;
                let match: any;
                while ((match = reg.exec(str)) !== null) {
                    posArr.push(match.index);
                    testPosArr.push(match.index);
                    let colorStr: string = str.substr(match.index, 7);
                    colorArr.push(colorStr);
                    arr = str.split(colorStr);
                    let testStr: string = "";
                    for (let i: number = 0; i < arr.length; i++) {
                        let curStr: string = arr[i];
                        testStr = testStr + curStr;
                    }
                    str = testStr;
                }
                if (posArr.length > 1) {
                    for (let j = 0; j < posArr.length; j++) {
                        let pos: number = posArr[j];
                        if (j < posArr.length - 1) {
                            let pos2: number = posArr[j + 1];
                            let len: number = pos2 - pos;
                            let sub: string = str.substr(pos, len);
                            subArr.push(sub);
                        } else {
                            let len: number = str.length - pos;
                            let sub: string = str.substr(pos, len);
                            subArr.push(sub);
                        }
                    }

                    for (let j = 0; j < testPosArr.length; j++) {
                        let pos: number = testPosArr[j];
                        if (j < testPosArr.length - 1) {
                            let pos2: number = testPosArr[j + 1];
                            let len: number = pos2 - pos;
                            let sub: string = str.substr(pos, len);
                            testSubArr.push(sub);
                        } else {
                            let len: number = str.length - pos;
                            let sub: string = str.substr(pos, len);
                            testSubArr.push(sub);
                        }
                    }

                    for (let n = 0; n < subArr.length; n++) {
                        let subStr: string = subArr[n];
                        if (testSubArr.indexOf(subStr) != -1) {
                            html = html + "<span style='font-weight:bold;font:24px SimHei;color:" + colorArr[colorID] + "'>" + subStr + "</span>"
                            colorID += 1;
                        } else {
                            html = html + "<span style='font-weight:bold;font:24px SimHei'>" + subStr + "</span>";
                        }
                    }
                    div.style.wordWrap = true;
                    div.style.width = 413;
                    div.style.height = 186;
                    div.style.align = "left";
                    this.guideStepLabel.text = "";
                    div.innerHTML = html;
                    div.name = "div";
                    Laya.stage.addChild(div);
                    div.pos(152, (Laya.stage.height - this.height) + 50);
                } else {
                    Laya.stage.removeChildByName("div");
                    this.guideStepLabel.color = "#000000";
                    this.guideStepLabel.text = str;
                }
                this.guideName.text = stepObj["name"];
            }
        }
    }

}