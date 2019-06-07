namespace views.toolbar {
    import Event = laya.events.Event;
    import Timer = laya.utils.Timer;
    import GameConfig = configs.GameConfig;
    import BottomToolBarUI = ui.toolBar.BottomToolBarUI
    import SubCtrl = controllers.login.SubCtrl;
    import HitArea = Laya.HitArea;
    import Sprite = Laya.Sprite;
    import PlayerJobDialogView = views.player.PlayerJobDialogView;

	/**
	 * 右侧工具条视图
	 */
    export class RightToolBarView extends BottomToolBarUI {

        private static instance: RightToolBarView;
        private guideContainer: Sprite;
        private hitAreaOne: HitArea;
        /** 作家作品等信息页面 */
        private authorInfoView: views.events.AuthorWorkView;
        /** 成就天赋页面 */
        private achiveView: views.events.AchiveView;
        private playerJobDialogView: PlayerJobDialogView;
        /** 培养页面 */
        private playerTrainView: views.player.PlayerTrainView;
        /** 可写作作者列表页面 */
        private playerWritingView: views.player.PlayerWritingListView;
        /** 带有确定、取消按钮的提示框 */
        public yesOrNoTip: ConfirmCancelTipView;
        private testView: views.common.TestView;

        constructor() {
            super();
            this.name = "BottomToolBarView";
            this.visible = true;
            for (let i: number = 1; i < 6; i++) {
                let btn: Laya.Button = this.getChildByName("btn" + i) as Laya.Button;
                btn.skin = "gameUI/common/icon" + i + ".png";
            }
            this.on(Laya.Event.CLICK, this, this.openView);
        }

        public static getInstance(): RightToolBarView {
            if (RightToolBarView.instance == null) {
                RightToolBarView.instance = new RightToolBarView();
            }
            return RightToolBarView.instance;
        }

        openView(e: Laya.Event): void {
            if (GameConfig.stopTimer) {
                return;
            }
            let name: string = e.target.name;
            switch (name) {
                case 'btn1':
                    Hash.playMusic(1);
                    GameConfig.displayPage += 1;
                    // SceneLayerManager.sceneLayer.stopEvent();
                    let loan = new views.events.Loan();
                    break;
                case 'btn2':
                    Hash.playMusic(1);
                    /** 更新可招募作者相关配置表 */
                    if (GameConfig.hisObjArr.length > 0) {
                        for (let i: number = 0; i < GameConfig.hisObjArr.length; i++) {
                            let hisObj: Object = GameConfig.hisObjArr[i];
                            if (hisObj["id"] == 1 || hisObj["id"] == 2) {
                                for (var j = 0; j < GameConfig.guding.length; j++) {
                                    let gudingObj: Object = GameConfig.guding[j];
                                    if (gudingObj["unlock"] == hisObj["id"] && GameConfig.authorArr.indexOf(gudingObj) == -1) {
                                        GameConfig.authorArr.splice(gudingObj["id"] - 1, 0, gudingObj);
                                    }
                                }
                            }
                        }
                    }
                    GameConfig.cachData["authorArr"] = GameConfig.authorArr;
                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                        let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                        list.visible = false;
                    }
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    this.playerJobDialogView = new views.player.PlayerJobDialogView(null);
                    break;
                case 'btn3':
                    Hash.playMusic(2);
                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                        let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                        list.visible = true;
                    }
                    if (GameConfig.displayPage <= 0) {
                        SceneLayerManager.sceneLayer.openEvent();
                    }
                    if (GameConfig.registerID == null || GameConfig.registerID == "") {
                        GameConfig.cachData["userId"] = GameConfig.temporaryID;
                    } else {
                        GameConfig.cachData["userId"] = GameConfig.registerID;
                    }
                    Laya.LocalStorage.setItem("cachData", JSON.stringify(GameConfig.cachData));
                    SubCtrl.getInstance().request_savaData(GameConfig.cachData);
                    TipLayerManager.tipLayer.showDrawBgTip("存档成功");
                    break;
                case 'btn4':
                    Hash.playMusic(1);
                    GameConfig.displayPage += 1;
                    this.achiveView = new views.events.AchiveView();
                    break;
                case 'btn5':
                    if (GameConfig.authorInfoArr.length < 1) {
                        Hash.playMusic(2);
                        TipLayerManager.tipLayer.showDrawBgTip("当前没有签约作者，请签约作者！");
                        if (GameConfig.displayPage <= 0) {
                            SceneLayerManager.sceneLayer.openEvent();
                        }
                    } else {
                        Hash.playMusic(1);
                        if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                            let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                            list.visible = false;
                        }
                        GameConfig.displayPage += 1;
                        SceneLayerManager.sceneLayer.stopEvent();
                        this.playerTrainView = new views.player.PlayerTrainView();
                        this.playerTrainView.name = "playerTrainView";
                        this.playerTrainView.visible = true;
                        Laya.stage.addChild(this.playerTrainView);
                    }
                    break;
                case "btn6":
                    Hash.playMusic(1);
                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                        let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                        list.visible = false;
                    }
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    this.playerWritingView = new views.player.PlayerWritingListView();
                    this.playerWritingView.name = "playerWritingView";
                    this.playerWritingView.visible = true;
                    Laya.stage.addChild(this.playerWritingView);
                    break;
                case "testBtn":
                    Hash.playMusic(2);
                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                        let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                        list.visible = false;
                    }
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    this.testView = views.common.TestView.getInstance();
                    Laya.stage.addChild(this.testView);
                    break;
                case "apartBtn":
                    Hash.playMusic(1);
                    GameConfig.displayPage += 1;
                    SceneLayerManager.sceneLayer.stopEvent();
                    if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
                        let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
                        list.visible = false;
                    }
                    this.authorInfoView = new views.events.AuthorWorkView();
                default:
                    // TipLayerManager.tipLayer.showDrawBgTip("暂未开放");
                    // if (GameConfig.displayPage <= 0) {
                    //     SceneLayerManager.sceneLayer.openEvent();
                    // }
                    break;
            }
        }
    }
}