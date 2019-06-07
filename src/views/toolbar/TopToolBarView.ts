namespace views.toolbar {
    import Event = laya.events.Event;
    import Timer = laya.utils.Timer;
    import GameConfig = configs.GameConfig;
    import TopToolBarUI = ui.toolBar.TopToolBarUI
    import Image = laya.ui.Image;

	/**
	 * 顶部工具条视图
	 */
    export class TopToolBarView extends TopToolBarUI {

        private static instance: TopToolBarView;

        constructor() {
            super();
            if (isNaN(GameConfig.cachData["money"])) {

                GameConfig.cachData["fans"] = GameConfig.fans;
                GameConfig.cachData["money"] = GameConfig.money;
                GameConfig.cachData["brainHole"] = GameConfig.brainHole;
            } else {
                GameConfig.money = GameConfig.cachData["money"];
                GameConfig.fans = GameConfig.cachData["fans"];
                GameConfig.brainHole = GameConfig.cachData["brainHole"];
            }
            this.money.text = GameConfig.money + "";
            this.fans.text = GameConfig.fans + "";
            this.brainHole.text = GameConfig.brainHole + "";
        }

        static getInstance(): TopToolBarView {
            if (!TopToolBarView.instance)
                TopToolBarView.instance = new TopToolBarView();
            return TopToolBarView.instance;
        }

        resetMoney(money: number): void {
            GameConfig.money = money;
            this.money.text = money + "";
            GameConfig.cachData["money"] = GameConfig.money;
        }

        resetFans(fans: number): void {
            GameConfig.fans = fans;
            this.fans.text = fans + "";
            GameConfig.cachData["fans"] = GameConfig.fans;
        }

        resetHole(brainHole: number): void {
            GameConfig.brainHole = brainHole;
            this.brainHole.text = brainHole + "";
            GameConfig.cachData["brainHole"] = GameConfig.brainHole;
        }

    }
}