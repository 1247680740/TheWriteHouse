namespace views.common {

    import LoginToolBarView = views.toolbar.LoginToolBarView;
    import PhoneLoginView = views.toolbar.PhoneLoginView;
    import WritingView = views.action.WritingView;
    import StartWritingDialogView = views.action.StartWritingDialogView;
    import ReleaseView = views.action.ReleaseView;

    export class LoginView extends ui.common.LoginViewUI {

        private static instance: LoginView;
        private loginToolBar: LoginToolBarView;
        private isFirstShow: boolean = true;

        public static getInstance(): LoginView {
            if (this.instance == null) {
                this.instance = new LoginView();
            }
            return this.instance;
        }

        constructor() {
            super();
            this.pos(0,0);
        }

        /** 切换至手机登录界面 */
        removeNode(): void {
            this.removeChildByName("loginToolBar");
            let phoneLoginView:views.toolbar.PhoneLoginView = new views.toolbar.PhoneLoginView();
            phoneLoginView.name = "phoneLoginView";
            this.addChild(phoneLoginView);
            phoneLoginView.pos((this.width - phoneLoginView.width) / 2, 660);
            console.log(Laya.stage.getChildByName("tipLayer"));
        }

        /** 进入游戏界面 */
        fastGameView(obj: Object): void {
            Laya.stage.removeChildren();
            Laya.stage.addChild(TipLayerManager.tipLayer);
            SceneLayerManager.getInstance().initHallScene();
            Laya.stage.addChild(SceneLayerManager.sceneLayer);
            SceneLayerManager.sceneLayer.pos(0,0);
            Laya.stage.hitTestPrior = false;
            if (obj != null) {
                if (obj["finishFirstStep"] == false) {
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    let apartInfo: views.common.ApartInfoTbView = views.common.ApartInfoTbView.getInstance();
                } 
                /** 获取年月日 */
                if (!isNaN(obj["year"])) {
                    views.common.TimeBackView.instance.resetTime(obj["year"], obj["month"], obj["day"]);
                }

                GameConfig.temporaryID = obj["userId"];             //用户临时ID
                GameConfig.authorArr = obj["authorArr"];            //招聘作者配置表数据
                GameConfig.platArr = obj["platArr"];                //可选平台数据集
                GameConfig.subArr = obj["subArr"];                  //可选题材数据集
                GameConfig.eleArr = obj["eleArr"];                  //可选元素数据集
                // GameConfig.homeFloor = obj["homeFloor"];            //获取楼层数
                GameConfig.authorInfoArr = obj["authorInfoArr"];    //获取已签约作者信息
                GameConfig.writingAuthor = obj["writingAuthor"];    //获取正在写作作者
                GameConfig.articalNameArr = obj["articalNameArr"];  //获取已存在作品名
                GameConfig.hisObjArr = obj["hisObjArr"];            //获取历史事件对象集
                GameConfig.curHisObj = obj["curHisObj"];            //获取当前历史事件
                GameConfig.popularValue = obj["popularValue"];      //获取流行元素值
                GameConfig.subTimeNum = obj["subTimeNum"];          // 获取题材加成时间
                GameConfig.eleTimeNum = obj["eleTimeNum"];          //获取元素加成时间
                GameConfig.subTopNum = obj["subTopNum"];   
                GameConfig.eleTopNum = obj["eleTopNum"];
                GameConfig.achiArr = obj["achiArr"]; //成就完成情况
                GameConfig.loanarr = obj["loanarr"]; //贷款情况
                GameConfig.hasTalentPoint = obj["hasTalentPoint"];  //拥有的成就点
                GameConfig.defHasTalentPoint = obj["defHasTalentPoint"];  //当前成就完成后的共有天赋点
                GameConfig.everyLevelArr = obj["everyLevelArr"]   // 每个等级拥有的天赋点
                IdentityConfig.curCallAuthorArr = obj["freshAuthor"];  //上次招募作者的对象集合
                IdentityConfig.curJobBtnArr = obj["curJobBtnArr"];  //激活的招募按钮
                IdentityConfig.curjobPoint = obj["curjobPoint"];  //回收简历积分点
                WritingConfig.enableHoleArr = obj["enableHoleArr"]; //写作可选灵感对象集合
                WritingConfig.actPlotArr = obj["actPlotArr"]; //激活题材集合
                WritingConfig.actPlotObjArr = obj["actPlotObjArr"]; // 激活剧情集合
                GameConfig.QueueNumber = obj["QueueNumber"]; //玩家在服务器队列编号
                GameConfig.HistoryCompArr = obj["HistoryCompArr"]; //历史完成作品

                GameConfig.signingNum = GameConfig.authorInfoArr.length; //获取签约人数
                

                /** 获取正在写作阶段作者 */
                if(obj["StartWritingObjArr"] != null){
                    GameConfig.startWritingTestObjArr = obj["StartWritingObjArr"];
                }else{
                    obj["StartWritingObjArr"] = GameConfig.startWritingTestObjArr;
                }

                /** 获取正在发布阶段作者 */
                if (obj["ReleaseObjArr"] != null) {
                    GameConfig.releaseTestObjArr = obj["ReleaseObjArr"];
                } else {
                    obj["ReleaseObjArr"] = GameConfig.releaseTestObjArr;
                }
                StartWritingDialogView.viewObj["view"] = StartWritingDialogView;
                ReleaseView.viewObj["view"] = ReleaseView;

            } else {
                if (GameConfig.guideStepNum == 1 && this.isFirstShow) {
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    let apartInfo: views.common.ApartInfoTbView = views.common.ApartInfoTbView.getInstance();
                    this.isFirstShow = false;
                }
            }
        }
    }
}