namespace views.common {
    import Sprite = Laya.Sprite;
    import HitArea = Laya.HitArea;
    export class ApartInfoTbView extends ui.common.ApartInfoTbUI {
        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        private static instance: ApartInfoTbView;
        private guideStepArr: Array<Object> = ResourceManager.guideArr;

        public static getInstance(): ApartInfoTbView {
            if (ApartInfoTbView.instance == null) {
                ApartInfoTbView.instance = new ApartInfoTbView();
            }
            return ApartInfoTbView.instance;
        }

        constructor() {
            super();
            Laya.stage.removeChildByName("maskView");
            this.x = (Laya.stage.width - this.width) / 2;//70;
            this.y = (Laya.stage.height - this.height) / 2;//500;
            this.addMask();
            Laya.stage.addChild(this);
            this.startgame.on(Laya.Event.CLICK, this, this.startgamefuc);
            this.flushWorksInfoUI();
        }

        flushWorksInfoUI(): void {
            this.homenumber.text = GameConfig.QueueNumber.toString();
            this.regmoney.text = GameConfig.initmoney.toString();
            var curDate: Date = new Date();
            var month: number = curDate.getMonth() + 1;
            var day: number = curDate.getDay();
            this.regtime.text = curDate.getFullYear().toString() + '/' + month.toString() + '/' + curDate.getDate().toString();
        }

        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            // 设置容器为画布缓存
            this.guideContainer.name = "maskView";
            this.guideContainer.cacheAs = "bitmap";
            Laya.stage.addChild(this.guideContainer);
            this.guideContainer.addChild(this);

            //绘制遮罩区，含透明度，可见游戏背景
            let maskArea: Sprite = new Sprite();
            maskArea.alpha = 0.5;
            maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
            this.guideContainer.addChild(maskArea);

            this.hitAreaOne = new HitArea();
            let height: number = Laya.stage.height - this.height;
            this.hitAreaOne.hit.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");

            this.guideContainer.hitArea = this.hitAreaOne;
            this.guideContainer.mouseEnabled = true;


        }
        startgamefuc(): void { // 开始游戏
            var engnum = 0;
            var chinum = 0;
            var totalnum = 0;
            for (var i = 0; i < this.inputname.text.length; i++) { //求字符个数
                if (this.inputname.text.charCodeAt(i) < 128 && this.inputname.text.charCodeAt(i) >= 0) {
                    engnum += 1; //英文
                } else {
                    chinum += 2; // 中文
                }
            }
            totalnum = engnum + chinum
            if (this.inputname.text != '输入公寓名称' && totalnum > 10) {
                TipLayerManager.tipLayer.showDrawBgTip("字符过长");
                return
            }
            if (this.inputname.text != '输入公寓名称' && this.inputname.text != '') {
                GameConfig.ApartmentName = this.inputname.text;
            }
            this.closeView();
        }

        closeView(): void {// 关闭UI 并且打开剧情对话
            Laya.stage.removeChildByName("maskView");
            Laya.stage.removeChild(this);
            let guideSteps:Array<Object> = new Array<Object>();
            guideSteps.splice(0,guideSteps.length);
            for (let i = 0; i < this.guideStepArr.length; i++) {
                let guideObj: Object = this.guideStepArr[i];
                if (guideObj["id"] == GameConfig.guideStepNum) {
                    guideSteps.push(guideObj);
                }
            }
            let guideStepView: views.common.GuideStep = new views.common.GuideStep(GameConfig.guideStepNum,guideSteps);
            Laya.stage.addChild(guideStepView);
            Hash.playMusic(2);
        }
    }
}