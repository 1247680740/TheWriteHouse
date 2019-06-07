namespace views.action {

    import HitArea = Laya.HitArea;
    import Style = laya.display.css.Style;
    import CSSStyle = laya.display.css.CSSStyle;
    import HTMLDivElement = laya.html.dom.HTMLDivElement;
    import Sprite = Laya.Sprite;
    import BaseView = views.base.BaseView;

    export class StartWritingDialogView extends ui.action.StartWritingUI {

        private static instance: StartWritingDialogView;
        private static xiuNum: number;
        private static fixedValue: number;
        private releaseView: views.action.ReleaseView;
        private eleNum: number = null;
        private initPas: number;
        private initPre: number;
        private initCur: number;
        private initDis: number;

        private pasVue: number;
        private preVue: number;
        private curVue: number;
        private disVue: number;

        /** 转化次数 */
        private converTimes: number;
        /** 转化倍数 */
        private converMul: number;

        public static viewObj: Object = new Object;

        public testInfoObj: Object;

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;

        constructor(infoObj) {
            super();
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2); //200, 300
            this.mouseThrough = false;
            this.addMask();
            this.setValue(infoObj);
            this.startBtn.on(Laya.Event.CLICK, this, this.startWriting, [infoObj]);
        }

        /** 数值初始化 */
        setValue(infoObj: Object): void {
            this.authorIcon.skin = infoObj["icon"];
            this.authorName.text = infoObj["name"];
            this.articalName.text = infoObj["pageName"];
            this.pasInit.value = infoObj["passionMin"] / 100; //文笔
            this.pasReset.value = infoObj["passionMin"] / 100;
            this.preInit.value = infoObj["precisenessMin"] / 100; //构思
            this.preReset.value = infoObj["precisenessMin"] / 100;
            this.curInit.value = infoObj["curiousMin"] / 100; //脑洞
            this.curReset.value = infoObj["curiousMin"] / 100;
            this.disInit.value = infoObj["disciplineMin"] / 100; //阅历
            this.disReset.value = infoObj["disciplineMin"] / 100;

            this.initPas = infoObj["passionMin"];
            this.initPre = infoObj["precisenessMin"];
            this.initCur = infoObj["curiousMin"];
            this.initDis = infoObj["disciplineMin"];

            this.pasVue = this.pasInit.value;
            this.preVue = this.preInit.value;
            this.curVue = this.curInit.value;
            this.disVue = this.disInit.value;

            this.peoPro.value = 0;
            this.stoPro.value = 0;
            this.innPro.value = 0;
            this.depPro.value = 0;

            this.pasStr.text = this.initPas + "/100";
            this.preStr.text = this.initPre + "/100";
            this.curStr.text = this.initCur + "/100";
            this.disStr.text = this.initDis + "/100";

            this.peoStr.text = "0/100";
            this.stoStr.text = "0/100";
            this.innStr.text = "0/100";
            this.depStr.text = "0/100";

            this.converTimes = 1;
            this.converMul = 1;
            this.startBtn.visible = false;
            this.startBtn.mouseEnabled = false;
            this.tipStr.visible = true;
            this.tipStr.text = "大纲编辑中";

            this.changeData();
        }

        /** 数值运算（保留两位小数） */
        countNum(num: number): number {
            let str: string = parseFloat(num + "").toFixed(3);
            let str1: string = str.substring(0, str.toString().length - 1);
            let value: number = parseFloat(str1);
            return value;
        }

        /** 进行文笔运动 */
        changeData(): void {
            // 文笔 - 人设   文笔 - 故事
            let peoVue: number = this.countNum(this.peoPro.value);
            let stoVue: number = this.countNum(this.stoPro.value);

            let pasPeo: number = Math.floor(this.initPas * (Hash.getRandomNum(50, 80) / 100) * this.converMul) + parseInt((peoVue * 200) + "");
            let pasSto: number = Math.floor(this.initPas * (Hash.getRandomNum(10, 30) / 100) * this.converMul) + parseInt((stoVue * 200) + "");

            this.proBarTween(this.pasReset, this.pasVue);
            Laya.Tween.to(this.peoPro, { value: pasPeo / 200 }, 3000, null);
            Laya.Tween.to(this.stoPro, { value: pasSto / 200 }, 3000, null, Handler.create(this, this.nextPre, [pasPeo, pasSto]));
        }

        /** 进行构思运动 */
        nextPre(pasPeo: number, pasSto: number): void {
            this.peoStr.text = pasPeo + "/200";
            this.stoStr.text = pasSto + "/200";
            // 构思 - 人设   构思 - 故事   构思 - 创新   构思 - 深度
            let peoVue: number = this.countNum(this.peoPro.value);
            let stoVue: number = this.countNum(this.stoPro.value);
            let innVue: number = this.countNum(this.innPro.value);
            let depVue: number = this.countNum(this.depPro.value);

            let prePeo: number = Math.floor(this.initPre * (Hash.getRandomNum(0, 30) / 100) * this.converMul) + parseInt((peoVue * 200) + "");
            let preSto: number = Math.floor(this.initPre * (Hash.getRandomNum(20, 40) / 100) * this.converMul) + parseInt((stoVue * 200) + "");
            let preInn: number = Math.floor(this.initPre * (Hash.getRandomNum(0, 30) / 100) * this.converMul) + parseInt((innVue * 200) + "");
            let preDep: number = Math.floor(this.initPre * (Hash.getRandomNum(10, 30) / 100) * this.converMul) + parseInt((depVue * 200) + "");

            this.proBarTween(this.preReset, this.preVue);
            Laya.Tween.to(this.peoPro, { value: prePeo / 200 }, 3000, null);
            Laya.Tween.to(this.stoPro, { value: preSto / 200 }, 3000, null);
            Laya.Tween.to(this.innPro, { value: preInn / 200 }, 3000, null);
            Laya.Tween.to(this.depPro, { value: preDep / 200 }, 3000, null, Handler.create(this, this.nextCur, [prePeo, preSto, preInn, preDep]));
        }

        /** 进行脑洞运动判断 */
        nextCur(prePeo: number, preSto: number, preInn: number, preDep: number): void {
            this.peoStr.text = prePeo + "/200";
            this.stoStr.text = preSto + "/200";
            this.innStr.text = preInn + "/200";
            this.depStr.text = preDep + "/200";
            // 脑洞 - 故事   脑洞 - 创新
            let stoVue: number = this.countNum(this.stoPro.value);
            let innVue: number = this.countNum(this.innPro.value);

            let curSto: number = Math.floor(this.initCur * (Hash.getRandomNum(20, 40) / 100) * this.converMul) + parseInt((stoVue * 200) + "");
            let curInn: number = Math.floor(this.initCur * (Hash.getRandomNum(0, 30) / 100) * this.converMul) + parseInt((innVue * 200) + "");

            this.proBarTween(this.curReset, this.curVue);
            Laya.Tween.to(this.stoPro, { value: curSto / 200 }, 3000, null);
            Laya.Tween.to(this.innPro, { value: curInn / 200 }, 3000, null, Handler.create(this, this.nextDis, [curSto, curInn]));
        }

        /** 进行阅历运动判断 */
        nextDis(curSto: number, curInn: number): void {
            this.stoStr.text = curSto + "/200";
            this.innStr.text = curInn + "/200";
            // 阅历 - 故事   阅历 - 深度
            let stoVue: number = this.countNum(this.stoPro.value);
            let depVue: number = this.countNum(this.depPro.value);

            let disSto: number = Math.floor((this.initPre * 0.2 * this.converMul)) + parseInt((stoVue * 200) + "");
            let disDep: number = Math.floor((this.initPre * 0.8 * this.converMul)) + parseInt((depVue * 200) + "");

            this.proBarTween(this.disReset, this.disVue);
            Laya.Tween.to(this.stoPro, { value: disSto / 200 }, 3000, null);
            Laya.Tween.to(this.depPro, { value: disDep / 200 }, 3000, null, Handler.create(this, this.closeAction));
        }

        /** 运动完毕,判断是否进入下一阶段 */
        closeAction(): void {
            this.converTimes += 1;
            switch (this.converTimes) {
                case 2:
                    this.tipStr.text = "初稿编辑中";
                    this.converMul = 0.5;
                    this.changeData();
                    break;
                case 3:
                    let rateOne: boolean = (Hash.countRate(0.5) == 1 ? true : false);
                    if (rateOne) {
                        this.tipStr.text = "等一下....作者突然想到一个绝妙的主意";
                        this.converMul = 0.25;
                        this.changeData();
                    } else {
                        this.changeBootom();
                    }
                    break;
                case 4:
                    let rateTwo: boolean = (Hash.countRate(0.1) == 1 ? true : false);
                    if (rateTwo) {
                        this.tipStr.text = "精益求精....作者觉得文章还有提升空间";
                        this.converMul = 0.125;
                        this.changeData();
                    } else {
                        this.changeBootom();
                    }
                    break;
                case 5:
                        this.changeBootom();
                    break;
            }
        }

        changeBootom(): void {
            this.tipStr.visible = false;
            this.startBtn.visible = true;
            this.startBtn.mouseEnabled = true;
        }


        /** 顶部进度条动画 */
        proBarTween(bar: Laya.ProgressBar, num: number): void {
            Laya.Tween.to(bar, { value: 0 }, 3000, null, Handler.create(this, this.ComTween, [bar, num]));
        }

        ComTween(bar: Laya.ProgressBar, num: number): void {
            bar.value = num;
        }

        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "StartWritingDialogViewConTain";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            SceneLayerManager.sceneLayer.addChild(this.guideContainer);
            this.guideContainer.addChild(this);

            //绘制遮罩区，含透明度，可见游戏背景
            let maskArea: Sprite = new Sprite();
            maskArea.alpha = 0.8;
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = false;
            }
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.guideContainer.addChild(maskArea);

            this.hitAreaOne = new HitArea();
            this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);

            this.guideContainer.hitArea = this.hitAreaOne;
            this.guideContainer.mouseEnabled = true;

        }

        startWriting(infoObj: Object): void {
            /** 计算需要写作的天数 */
            let disciplineMin: number = infoObj["disciplineMin"];
            let rateNum: number = this.getWritingRateNum();
            let num: number = 30 - disciplineMin * 0.1 - disciplineMin * 0.2 * rateNum;
            let day: number = Math.floor(num);

            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let obj: Object = GameConfig.authorInfoArr[i];
                if (infoObj["name"] == obj["name"]) {
                    obj["curStatus"] = 2;
                    obj["peoplePro"] = this.peoPro.value * 200;  //人设
                    obj["storyPro"] = this.stoPro.value * 200;   //故事
                    obj["innovatePro"] = this.innPro.value * 200;//创新
                    obj["depthPro"] = this.depPro.value * 200;   //深度
                    obj["startWritingDay"] = day;
                    obj["startWritingTime"] = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
                    GameConfig.startWritingTestObjArr.unshift(obj);
                    StartWritingDialogView.viewObj["view"] = this;
                    GameConfig.cachData["StartWritingObjArr"] = GameConfig.startWritingTestObjArr;
                }
            }
            this.closeView();
        }

        getWritingRateNum(): number {
            let levelArr: Array<number> = [];
            levelArr.splice(0, levelArr.length);
            for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                let everyObj: Object = GameConfig.everyLevelArr[i];
                levelArr.push(everyObj["level"]);
            }
            if (levelArr.indexOf(7) != -1) {
                for (let i: number = 0; i < GameConfig.everyLevelArr.length; i++) {
                    let everyObj: Object = GameConfig.everyLevelArr[i];
                    let curNum: number = everyObj["point"];
                    if (everyObj["level"] == 7) {
                        if (curNum == 1) {
                            return 0.9;
                        } else if (curNum == 2) {
                            return 0.8;
                        } else if (curNum == 3) {
                            return 0.7;
                        } else {
                            return 1;
                        }
                    }
                }
            } else {
                return 1;
            }
        }

        /** 多线程操作 耗内存、CPU(待优化) */
        openNewViewTwo(obj: Object): void {
            let startDay: string = GameConfig.year + "-" + GameConfig.month + "-" + GameConfig.day;
            let diffDays: number = Hash.dateDifference(obj["startWritingTime"], startDay);
            let rateStr: string = (diffDays / obj["startWritingDay"]).toFixed(2);
            let outLine: number = parseFloat(rateStr);
            for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                let authorObj: Object = GameConfig.authorInfoArr[i];
                if (obj["name"] == authorObj["name"]) {
                    authorObj["outLine"] = outLine;
                    obj["outLine"] = outLine;
                }
            }
            if (diffDays >= obj["startWritingDay"]) { // 防止出现多个作者同时写作，导致其他作则发布不了作品
                GameConfig.displayPage += 1;
                SceneLayerManager.sceneLayer.stopEvent();
                for (let i: number = 0; i < GameConfig.startWritingTestObjArr.length; i++) {
                    let startObject: Object = GameConfig.startWritingTestObjArr[i];
                    if (startObject["name"] == obj["name"]) {
                        GameConfig.startWritingTestObjArr.splice(i, 1);
                        i--;
                    }
                }
                GameConfig.cachData["StartWritingObjArr"] = GameConfig.startWritingTestObjArr;
                this.releaseView = new views.action.ReleaseView(obj);
                this.releaseView.name = "releaseView";
                SceneLayerManager.sceneLayer.addChild(this.releaseView);
            } else {
                return;
            }
        }

        closeView(): void {
            GameConfig.displayPage -= 1;
            SceneLayerManager.sceneLayer.removeChild(this);
            SceneLayerManager.sceneLayer.removeChildByName("StartWritingDialogViewConTain");
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = true;
            }

            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
        }

    }
}