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
    var action;
    (function (action) {
        var HitArea = Laya.HitArea;
        var Sprite = Laya.Sprite;
        var ScoreView = /** @class */ (function (_super) {
            __extends(ScoreView, _super);
            function ScoreView(infoObj) {
                var _this = _super.call(this) || this;
                _this.incomeArr = ResourceManager.incomeArr;
                _this.subJectArr = GameConfig.subJectArr;
                _this.zOrder = 2;
                _this.pos((Laya.stage.width - _this.width) / 2, (Laya.stage.height - _this.height) / 2); //200, 300
                _this.setValue(infoObj);
                _this.addMask();
                _this.releaseBtn.on(Laya.Event.CLICK, _this, _this.closeView, [infoObj["name"]]);
                return _this;
            }
            ScoreView.prototype.setValue = function (infoObj) {
                this.incomeObj = this.getIncomeObj();
                this.platObj = this.getPlatInfo(infoObj["platStr"]);
                var totalIncom = infoObj["totalIncom"];
                var totalCollect = infoObj["totalCollect"];
                var textTotal = this.incomeObj["textTotal"]; //网文总量   
                var userTotal = this.incomeObj["userTotal"]; //总用户  
                var peoplePro = infoObj["peoplePro"]; //人设数值 ====   
                var storyPro = infoObj["storyPro"]; //故事数值 ==== 
                var innovatePro = infoObj["innovatePro"]; //创新数值
                var depthPro = infoObj["depthPro"]; //深度数值  =====
                var platWeight = this.platObj["weight"]; //单独权重数量   
                var weightTotal = this.getWeightTotal(); //总权重   
                var weight = platWeight / weightTotal; //权重比  
                var share = infoObj["share"];
                var gradeNum = Math.floor(textTotal * weight * ((Hash.getRandomNum(8, 12)) / 10) / 10 - ((peoplePro + storyPro + innovatePro + depthPro) / 500 * 10 + totalCollect / (userTotal * weight) * 100));
                var houseReward = Math.floor(totalIncom * (1 - (share / 100))); //公寓收入
                this.rankTxt.text = gradeNum + "";
                this.collectTxt.text = totalCollect + "";
                this.reWardTxt.text = totalIncom + "";
                this.incomeTxt.text = houseReward + "";
            };
            ScoreView.prototype.addMask = function () {
                // 引导所在容器
                this.guideContainer = new Sprite();
                this.guideContainer.name = "maskView";
                // 设置容器为画布缓存
                this.guideContainer.cacheAs = "bitmap";
                this.guideContainer.zOrder = 2;
                SceneLayerManager.sceneLayer.addChild(this.guideContainer);
                this.guideContainer.addChild(this);
                //绘制遮罩区，含透明度，可见游戏背景
                var maskArea = new Sprite();
                maskArea.alpha = 0.8;
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = false;
                }
                maskArea.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
                this.guideContainer.addChild(maskArea);
                this.hitAreaOne = new HitArea();
                this.hitAreaOne.hit.drawRect(this.x, this.y, this.width, this.height, null);
                this.guideContainer.hitArea = this.hitAreaOne;
                this.guideContainer.mouseEnabled = true;
            };
            /** 获取当前收入信息 */
            ScoreView.prototype.getIncomeObj = function () {
                var year = GameConfig.year;
                for (var i = 0; i < this.incomeArr.length; i++) {
                    var getIncomeObj = this.incomeArr[i];
                    if (getIncomeObj["year"] == year) {
                        return getIncomeObj;
                    }
                }
            };
            /** 获取单独平台信息 */
            ScoreView.prototype.getPlatInfo = function (platName) {
                for (var j = 0; j < GameConfig.platGuDingArr.length; j++) {
                    var getPlatOBj = GameConfig.platGuDingArr[j];
                    if (getPlatOBj["net"] == platName) {
                        return getPlatOBj;
                    }
                }
            };
            /** 获取总的权重数量 */
            ScoreView.prototype.getWeightTotal = function () {
                var weight = 0;
                for (var j = 0; j < GameConfig.platArr.length; j++) {
                    var getPlatOBj = GameConfig.platArr[j];
                    weight = weight + getPlatOBj["weight"];
                }
                return weight;
            };
            /** 判断字符串中是否包含某一个字符 */
            ScoreView.prototype.judgeStr = function (subBuffStr, subStr) {
                if (subBuffStr.indexOf(subStr) != -1) {
                    return 1;
                }
                else {
                    return 0;
                }
            };
            ScoreView.prototype.closeView = function (name) {
                SceneLayerManager.sceneLayer.removeChild(this);
                GameConfig.displayPage -= 1;
                SceneLayerManager.sceneLayer.removeChildByName("maskView");
                if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                    var list = SceneLayerManager.sceneLayer.getChildByName("state_list");
                    list.visible = true;
                }
                if (GameConfig.displayPage <= 0) {
                    SceneLayerManager.sceneLayer.openEvent();
                }
                Hash.playMusic(2);
            };
            return ScoreView;
        }(ui.action.ScoreUI));
        action.ScoreView = ScoreView;
    })(action = views.action || (views.action = {}));
})(views || (views = {}));
//# sourceMappingURL=ScoreView.js.map