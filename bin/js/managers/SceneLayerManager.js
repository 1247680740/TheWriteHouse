var managers;
(function (managers) {
    /** 场景层管理器 */
    var SceneLayerManager = /** @class */ (function () {
        function SceneLayerManager(interCls) {
            /** 套房层 */
            // static suiteSceneLayer: views.layers.SuiteSceneLayer;
            /** 层容器 */
            this.layersArr = [];
            /** 是否为首次显示 */
            this.isFirstShow = true;
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("SceneLayerManager is singleton, not allow to use constructor!");
        }
        SceneLayerManager.getInstance = function () {
            if (!SceneLayerManager.instance)
                SceneLayerManager.instance = new SceneLayerManager(new InternalClass());
            return SceneLayerManager.instance;
        };
        /** 大厅场景 */
        SceneLayerManager.prototype.initHallScene = function () {
            if (!SceneLayerManager.sceneLayer) {
                SceneLayerManager.sceneLayer = new views.layers.SceneLayer();
                SceneLayerManager.sceneLayer.hitTestPrior = false;
                SceneLayerManager.sceneLayer.name = "sceneLayer";
                this.layersArr.push(SceneLayerManager.sceneLayer);
            }
            this.switchSceneState(SceneLayerManager.sceneLayer);
            // 游戏初始化时若有活动则自动弹出活动窗口一次
            //  if(GameConfig.guideStepNum == 1 && this.isFirstShow){
            //     SceneLayerManager.sceneLayer.stopEvent();
            //     GameConfig.displayPage+=1;
            //     let guideStepView:views.common.GuideStep = new views.common.GuideStep(GameConfig.guideStepNum);
            //     Laya.stage.addChild(guideStepView);
            //     this.isFirstShow = false;
            // }
        };
        /** 套房层场景 */
        // suiteScene(): void {
        //     if (!SceneLayerManager.suiteSceneLayer) {
        //         SceneLayerManager.suiteSceneLayer = new views.layers.SuiteSceneLayer();
        //         SceneLayerManager.suiteSceneLayer.name = "suiteSceneLayer";
        //         Laya.stage.addChildAt(SceneLayerManager.suiteSceneLayer, 0);
        //         // Laya.stage.addChild(SceneLayerManager.suiteSceneLayer);
        //         SceneLayerManager.suiteSceneLayer.addFriendLandView();
        //         SceneLayerManager.suiteSceneLayer.addTeaGardenView();
        //         this.layersArr.push(SceneLayerManager.suiteSceneLayer);
        //     }
        //     else {
        //         SceneLayerManager.suiteSceneLayer.graphics.clear();
        //         SceneLayerManager.suiteSceneLayer.resetLoadBg(models.teaRoom.TeaGardenModel.decorationVOArr);
        //         SceneLayerManager.suiteSceneLayer.addFriendLandView();
        //         SceneLayerManager.suiteSceneLayer.addTeaGardenView();
        //     }
        //     this.switchSceneState(SceneLayerManager.suiteSceneLayer);
        // }
        /**
         * 切换场景间的显示状态
         * @param curLayer 需显示的场景，其它的隐藏
         */
        SceneLayerManager.prototype.switchSceneState = function (curLayer) {
            if (this.layersArr.length == 0)
                return;
            if (!curLayer)
                return;
            var i;
            var len = this.layersArr.length;
            var view;
            for (i = 0; i < len; i++) {
                view = this.layersArr[i];
                if (!view)
                    continue;
                if (curLayer.name == view.name)
                    curLayer.visible = true;
                else
                    view.visible = false;
            }
        };
        return SceneLayerManager;
    }());
    managers.SceneLayerManager = SceneLayerManager;
    var InternalClass = /** @class */ (function () {
        function InternalClass() {
        }
        return InternalClass;
    }());
})(managers || (managers = {}));
//# sourceMappingURL=SceneLayerManager.js.map