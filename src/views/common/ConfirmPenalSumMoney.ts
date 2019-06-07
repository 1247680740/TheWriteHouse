namespace views.common {
	import Event = laya.events.Event;
	import ConfirmCancelTipUI = ui.common.ConfirmCancelTipUIUI
	import HitArea = Laya.HitArea;
	import Sprite = Laya.Sprite;
	/**
	 * 带有确定、取消按钮的提示框
	 */
	export class ConfirmPenalSumMoney extends ConfirmCancelTipUI {

		private guideContainer: Sprite;
		private hitAreaOne: HitArea;

		constructor(money: number, name: string, Btn1: Laya.Button, Btn2: Laya.Button) {
			super();
			this.name = "confirmPenalSumMoney";
			this.x = (Laya.stage.width - this.width) / 2;
			this.y = (Laya.stage.height - this.height) / 2;
			this.visible = true;
			this.addMask();
			this.confirmBtn.on(Event.CLICK, this, this.payMoney, [money, name, Btn1, Btn2]);
			this.cancelBtn.on(Event.CLICK, this, this.cancelBtnFn);
			this.closeBtn.on(Event.CLICK, this, this.cancelBtnFn);
		}

		addMask(): void {
			// 引导所在容器
			this.guideContainer = new Sprite();
			this.guideContainer.name = "PenalSumMoney";
			// 设置容器为画布缓存
			this.guideContainer.cacheAs = "bitmap";
			Laya.stage.addChild(this.guideContainer);
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

		payMoney(money: number, name: string, Btn1: Laya.Button, Btn2: Laya.Button, viewNum: number): void {
			if (GameConfig.money < money) {
				TipLayerManager.tipLayer.showDrawBgTip("金币不够了哦！");
			} else {
				GameConfig.money = GameConfig.money - money;
				views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
				views.player.SinglePlayerInfoView.getInstance(name).surrender(name, Btn1, Btn2);
			}
			this.cancelBtnFn();
		}

		cancelBtnFn(): void {
			Laya.stage.removeChild(this);
			Laya.stage.removeChildByName("PenalSumMoney");
			console.log(Laya.stage.getChildByName("PenalSumMoney"));
			GameConfig.displayPage -= 1;
			if (GameConfig.displayPage <= 0) {
				SceneLayerManager.sceneLayer.openEvent();
			}
		}

	}
}