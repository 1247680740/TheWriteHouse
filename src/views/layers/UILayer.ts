namespace views.layers {
    import BaseView = views.base.BaseView;
    import Sprite = laya.display.Sprite;
    import Event = laya.events.Event;
    import TopToolBarUI = ui.toolBar.TopToolBarUI;
    import PlayerInfoCtrl = controllers.player.PlayerInfoCtrl;
    import GameConfig = configs.GameConfig;
    import Button = laya.ui.Button;
    import PlayerInfoModel = models.player.PlayerInfoModel;

    /**
     * UI层（存放各个场景中的通用UI，也用于切换场景）
     */
    export class UILayer extends BaseView {

        /** 顶部工具栏 */
        topToolBarView:views.toolbar.TopToolBarView;
        /** 倒计时页面 */
        timerBackView:views.common.TimeBackView;
        /** 右侧工具条 */
        rightToolBarView:views.toolbar.RightToolBarView;

        private static _instance:UILayer;

        constructor() {
            super();

            this.topToolBarView = views.toolbar.TopToolBarView.getInstance();
            this.topToolBarView.x =0; 
            this.topToolBarView.y =0; 
            this.addChild(this.topToolBarView);
            this.topToolBarView.resetMoney(GameConfig.money);
            this.topToolBarView.resetFans(GameConfig.fans);
            this.topToolBarView.resetHole(GameConfig.brainHole);

            this.timerBackView = views.common.TimeBackView.instance;
            this.timerBackView.x = (Laya.stage.width - this.timerBackView.width)/2;    
            this.timerBackView.y = this.topToolBarView.height;

            this.rightToolBarView = views.toolbar.RightToolBarView.getInstance();
            this.rightToolBarView.x = (Laya.stage.width - this.rightToolBarView.width);
            this.rightToolBarView.y =  Laya.stage.height/3 - 100;

            this.addChild(this.timerBackView);
            this.addChild(this.rightToolBarView);
        }

        static get instance():UILayer
		{
			if(!UILayer._instance)
				UILayer._instance = new UILayer();
			return UILayer._instance;
		}

        init(event?: Event): void {
            super.init();

        }

    }
}
