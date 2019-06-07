namespace views.common {
	import Event = laya.events.Event;
	import ConfirmCancelTipUI = ui.common.ConfirmCancelTipUIUI
	import WritingView = views.action.WritingView;
	import HitArea = Laya.HitArea;
	import Sprite = Laya.Sprite;
	/**
	 * 带有确定、取消按钮的提示框
	 */
	export class ConfirmCancelTipView extends ConfirmCancelTipUI {

		private static instance: ConfirmCancelTipView;
		private guideContainer: Sprite;
		private hitAreaOne: HitArea;

		public static getInstance(): ConfirmCancelTipView {

			if (!ConfirmCancelTipView.instance) {
				ConfirmCancelTipView.instance = new ConfirmCancelTipView();
			}
			return ConfirmCancelTipView.instance;
		}



		constructor() {
			super();
			this.name = "ConfirmCancelTipView";
			this.x = (Laya.stage.width - this.width) / 2;
			this.y = (Laya.stage.height - this.height) / 2;
			this.visible = true;
			this.confirmBtn.on(Event.CLICK, this, this.builderHome);
			this.cancelBtn.on(Event.CLICK, this, this.cancelBtnFn);
			this.closeBtn.on(Event.CLICK, this, this.cancelBtnFn);
		}

		builderHome(event:Laya.Event): void {
			event.stopPropagation();
			SceneLayerManager.sceneLayer.buildHome(2);
			this.cancelBtnFn();
		}

		cancelBtnFn(): void {
			Laya.stage.removeChild(this);
			GameConfig.displayPage -= 1;
			Laya.stage.removeChildByName("CancelTipView");
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