namespace views.common {
	import Event = laya.events.Event;
	import ConfirmCancelTipUI = ui.common.ConfirmCancelTipUIUI;
	import HitArea = Laya.HitArea;
	import Sprite = Laya.Sprite;
	/**
	 * 支付年薪页面
	 */
	export class ConfirmYearSalary extends ConfirmCancelTipUI {

		private static instance: ConfirmYearSalary;
		private guideContainer: Sprite;
		private hitAreaOne: HitArea;

		public static getInstance(money: number): ConfirmYearSalary {

			if (!ConfirmYearSalary.instance) {
				ConfirmYearSalary.instance = new ConfirmYearSalary(money);
			}
			return ConfirmYearSalary.instance;
		}



		constructor(money: number) {
			super();
			this.name = "ConfirmYearSalary";
			this.confirmBtn.x = null;
			this.confirmBtn.centerX = 0;
			this.cancelBtn.visible = false;
			this.cancelBtn.mouseEnabled = false;
			this.closeBtn.visible = false;
			this.closeBtn.mouseEnabled = false;
			this.x = (Laya.stage.width - this.width) / 2;
			this.y = (Laya.stage.height - this.height) / 2;
			this.visible = true;
			this.addMask();
			this.confirmBtn.on(Event.CLICK, this, this.payMoney, [money]);
		}

		addMask(): void {
			// 引导所在容器
			this.guideContainer = new Sprite();
			this.guideContainer.name = "maskView";
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

		payMoney(money: number): void {
			if (GameConfig.money < money) {
				TipLayerManager.tipLayer.showDrawBgTip("金币不够了哦！");
			} else {
				GameConfig.money = GameConfig.money - money;
				views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
				this.cancelBtnFn();
			}
		}

		cancelBtnFn(): void {
			Laya.stage.removeChild(this);
			GameConfig.displayPage -= 1;
			Laya.stage.removeChildByName("maskView");
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