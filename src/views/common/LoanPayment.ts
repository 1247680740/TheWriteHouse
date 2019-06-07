namespace views.common {
	import Event = laya.events.Event;
	import Payment = ui.common.paymentUI;
	import HitArea = Laya.HitArea;
	import Sprite = Laya.Sprite;
	/**
	 * 支付年薪页面
	 */
	export class LoanPayment extends Payment {

		private static instance: LoanPayment;
		private guideContainer: Sprite;
		private hitAreaOne: HitArea;

		public static getInstance(money: number,loan: number): LoanPayment {

			if (!LoanPayment.instance) {
				LoanPayment.instance = new LoanPayment(money,loan);
			}
			return LoanPayment.instance;
		}



		constructor(money: number,loan: number) {
			super();
			this.name = "LoanPayment";
			this.confirmBtn.centerX = 0;
			this.x = (Laya.stage.width - this.width) / 2;
			this.y = (Laya.stage.height - this.height) / 2;
			this.visible = true;
			this.addMask();
			this.confirmBtn.on(Event.CLICK, this, this.payMoney, [money + loan]);
			this.tipInfoBox.visible = true;
			this.tipInfoBox2.visible = true;
			this.nianxin.visible = true;
			this.daikuan.visible = true;
			this.wenbentittle.text = '您今天一共需要支付：';
			this.nianxin.text = '年薪： ';
			this.daikuan.text = '贷款： ';			
			this.daikuan.visible = true;			
			this.tipInfoBox.text = money.toString();
			this.tipInfoBox2.text = loan.toString();       
			this.tittle.text = '支出';
			this.confirmBtn.label = '确认';
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
			Laya.stage.removeChildByName("maskView");
			Laya.stage.removeChild(this);
			if (GameConfig.money < money) {
				TipLayerManager.tipLayer.showDrawBgTip("金币不够了哦！");
			} else {
				GameConfig.money = GameConfig.money - money;
				views.toolbar.TopToolBarView.getInstance().resetMoney(GameConfig.money);
			}
            GameConfig.displayPage -= 1;
            if (GameConfig.displayPage <= 0) {
                SceneLayerManager.sceneLayer.openEvent();
            }  			
		}
	}
}