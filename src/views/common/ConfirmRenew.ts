namespace views.common {
	import Event = laya.events.Event;
	import ConfirmCancelTipUI = ui.common.ConfirmCancelTipUIUI;
	import HitArea = Laya.HitArea;
	import Sprite = Laya.Sprite;
	/**
	 * 提示是否续约的提示框
	 */
	export class ConfirmRenew extends ConfirmCancelTipUI {

		private static instance: ConfirmRenew;
		private guideContainer: Sprite;
		private hitAreaOne: HitArea;

		constructor(obj: Object, sala: number) {
			super();
			this.name = "ConfirmRenew";
			this.x = (Laya.stage.width - this.width) / 2;
			this.y = (Laya.stage.height - this.height) / 2;
			this.visible = true;
			this.confirmBtn.on(Event.CLICK, this, this.renew, [obj, sala]);
			this.cancelBtn.on(Event.CLICK, this, this.cancelBtnFn, [obj]);
			this.closeBtn.on(Event.CLICK, this, this.cancelBtnFn, [obj]);
		}

		renew(obj: Object, sala: number): void {
			Hash.playMusic(2);
			obj["monthlySalary"] = sala;
			obj["curStatus"] = 0;
			for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
				let authorObj: Object = GameConfig.authorInfoArr[i];
				if (authorObj["name"] == obj["name"]) {
					authorObj["monthlySalary"] = sala;
					authorObj["curStatus"] = 0;
				}
			}
			Laya.stage.removeChild(this);
			GameConfig.displayPage -= 1;
			Laya.stage.removeChildByName("reneWMaskView");
			if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
				let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
				list.visible = true;
			}
			if (GameConfig.displayPage <= 0) {
				SceneLayerManager.sceneLayer.openEvent();
			}
		}

		cancelBtnFn(infoObj: Object): void {
			Hash.playMusic(2);
			Laya.stage.removeChild(this);
			GameConfig.displayPage -= 1;
			Laya.stage.removeChildByName("reneWMaskView");
			if (GameConfig.authorInfoArr.length > 0 && SceneLayerManager.sceneLayer.getChildByName("state_list") != null) {
				let list: Laya.List = SceneLayerManager.sceneLayer.getChildByName("state_list") as Laya.List;
				list.visible = true;
			}
			if (GameConfig.displayPage <= 0) {
				SceneLayerManager.sceneLayer.openEvent();
			}
			GameConfig.signingNum -= 1;
			// if (GameConfig.signingNum <= 0) {
			// 	views.player.PlayerStateInfoView.getInstance().removeObj();
			// }
			SceneLayerManager.sceneLayer.deleteAuthor(infoObj["name"]);
			for (let i: number = 0; i < GameConfig.guding.length; i++) {
				let obj: Object = GameConfig.guding[i];
				if (obj["name"] == infoObj["name"]) {
					let id: string = obj["id"] + "";
					let index: number = obj["id"] - 1;
					GameConfig.authorArr.splice(index, 0, obj);
					let idIndex: number = GameConfig.authorIdArr.indexOf(id);
					GameConfig.authorIdArr.splice(idIndex, 1);
					GameConfig.authorInfoArr.splice(idIndex, 1);
					GameConfig.cachData["authorArr"] = GameConfig.authorArr;
					return;
				}
			}
		}
	}
}