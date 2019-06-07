namespace views.action {

    import WritingView = views.action.WritingView;
    import HitArea = Laya.HitArea;
    import Style = laya.display.css.Style;
    import CSSStyle = laya.display.css.CSSStyle;
    import HTMLDivElement = laya.html.dom.HTMLDivElement;
    import Sprite = Laya.Sprite;
    import BaseView = views.base.BaseView;

    export class ScoreView extends ui.action.ScoreUI {

        private static instance: ScoreView;
        private incomeArr: Array<Object> = ResourceManager.incomeArr;
        private subJectArr: Array<string> = GameConfig.subJectArr;
        private incomeObj: Object;
        private platObj: Object;

        private guideContainer: Sprite;
        private hitAreaOne: HitArea;

        constructor(infoObj: Object) {
            super();
            this.zOrder = 2;
            this.pos((Laya.stage.width - this.width) / 2, (Laya.stage.height - this.height) / 2); //200, 300
            this.setValue(infoObj);
            this.addMask();
            this.releaseBtn.on(Laya.Event.CLICK, this, this.closeView, [infoObj["name"]]);
        }

        setValue(infoObj: Object): void {

            this.incomeObj = this.getIncomeObj();
            this.platObj = this.getPlatInfo(infoObj["platStr"]);
            let totalIncom: number = infoObj["totalIncom"];
            let totalCollect: number = infoObj["totalCollect"];

            let textTotal: number = this.incomeObj["textTotal"]; //网文总量   
            let userTotal: number = this.incomeObj["userTotal"]; //总用户  
            let peoplePro: number = infoObj["peoplePro"]; //人设数值 ====   
            let storyPro: number = infoObj["storyPro"]; //故事数值 ==== 
            let innovatePro: number = infoObj["innovatePro"]; //创新数值
            let depthPro: number = infoObj["depthPro"]; //深度数值  =====
            let platWeight: number = this.platObj["weight"]; //单独权重数量   
            let weightTotal: number = this.getWeightTotal();  //总权重   
            let weight: number = platWeight / weightTotal;  //权重比  
            let share: number = infoObj["share"];

            let gradeNum: number = Math.floor(textTotal * weight * ((Hash.getRandomNum(8, 12)) / 10) / 10 - ((peoplePro + storyPro + innovatePro + depthPro) / 500 * 10 + totalCollect / (userTotal * weight) * 100)); 
            let houseReward: number = Math.floor(totalIncom * (1 - (share / 100))); //公寓收入

            this.rankTxt.text = gradeNum + "";
            this.collectTxt.text = totalCollect + "";
            this.reWardTxt.text = totalIncom + "";
            this.incomeTxt.text = houseReward + "";
        }

        addMask(): void {
            // 引导所在容器
            this.guideContainer = new Sprite();
            this.guideContainer.name = "maskView";
            // 设置容器为画布缓存
            this.guideContainer.cacheAs = "bitmap";
            this.guideContainer.zOrder = 2;
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

        /** 获取当前收入信息 */
        getIncomeObj(): Object {
            let year: number = GameConfig.year;
            for (let i: number = 0; i < this.incomeArr.length; i++) {
                let getIncomeObj: Object = this.incomeArr[i];
                if (getIncomeObj["year"] == year) {
                    return getIncomeObj;
                }
            }
        }

        /** 获取单独平台信息 */
        getPlatInfo(platName: string): Object {
            for (var j = 0; j < GameConfig.platGuDingArr.length; j++) {
                let getPlatOBj: Object = GameConfig.platGuDingArr[j];
                if (getPlatOBj["net"] == platName) {
                    return getPlatOBj;
                }
            }
        }

        /** 获取总的权重数量 */
        getWeightTotal(): number {
            let weight: number = 0;
            for (var j = 0; j < GameConfig.platArr.length; j++) {
                let getPlatOBj: Object = GameConfig.platArr[j];
                weight = weight + getPlatOBj["weight"]
            }
            return weight;
        }


        /** 判断字符串中是否包含某一个字符 */
        judgeStr(subBuffStr: string, subStr: string): number {
            if (subBuffStr.indexOf(subStr) != -1) {
                return 1;
            } else {
                return 0;
            }
        }

        closeView(name: string): void {
            SceneLayerManager.sceneLayer.removeChild(this);
            GameConfig.displayPage -= 1;
            SceneLayerManager.sceneLayer.removeChildByName("maskView");
            if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                list.visible = true;
            }
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }
            Hash.playMusic(2);
        }

    }
}