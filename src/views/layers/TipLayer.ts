namespace views.layers
{
	import BaseView = views.base.BaseView;
	import GameConfig = configs.GameConfig;
	import PlayerInfoModel = models.player.PlayerInfoModel;
	import ConfirmCancelTipView = views.common.ConfirmCancelTipView;
	import Event = Laya.Event;
	/**
	* 游戏弹出层
	* 弹出UI层，不会隐藏，嵌入 TipManager 中，将弹出框添加至 TipLayer 后进行显示
	*/
	export class TipLayer extends BaseView
	{
		private static instance: TipLayer;
		/** 带有确定、取消按钮的提示框 */
		private yesOrNoTip:ConfirmCancelTipView;

		name: string = "TipLayer";

		isCheck: boolean = true;
		
		constructor()
		{
			super();
			this.zOrder = 99999;
			this.updateZOrder();
			this.on(Laya.Event.ADDED, this, this.addedFn);
			this.on(Laya.Event.COMPONENT_ADDED, this, this.compAddedFn);
		}

		addedFn(): void
		{
			console.log("==== TipLayer,addedFn() ");
		}

		compAddedFn(): void
		{
			console.log("==== TipLayer,compAddedFn() ");
		}

		static getInstance(): TipLayer
		{
			if (!TipLayer.instance)
				TipLayer.instance = new TipLayer();
			return TipLayer.instance;
		}


		/**
		 * 显示带有不同背景的信息提示
		 */
		showDrawBgTip(info: string, pos?: Laya.Point): void
		{
			if (!info)
				return;
			let tip: views.common.DrawBgTip = views.common.DrawBgTip.instance;
			tip.cacheAs = "bitmap";
			if (!this.getChildByName("drawBgTip"))
			{
				tip.name = "drawBgTip";
				this.addChild(tip);
			}

			tip.visible = true;
			tip.showTip(info);

			if (pos)
			{
				tip.x = pos.x;
				tip.y = pos.y;
			}
			else
			{
				tip.x = GameConfig.GAME_WINDOW_WIDTH - tip.width >> 1;
				tip.y = GameConfig.GAME_WINDOW_HEIGHT - tip.height >> 1;
			}
		}
	}
}