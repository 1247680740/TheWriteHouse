namespace managers
{
	// import TipLayer = views.layers.TipLayer;

	/**
	 * 弹出层管理器（最上层的弹出框）
	 */
	export class TipLayerManager
	{
		static tipLayer: views.layers.TipLayer;
		private static instance:TipLayerManager;

		/**
		 * 弹出层管理器
		 */
		constructor()
		{
			TipLayerManager.tipLayer = new views.layers.TipLayer();
			TipLayerManager.tipLayer.name = "tipLayer";
		}

		static getInstance():TipLayerManager
		{
			if(!TipLayerManager.instance)
				TipLayerManager.instance = new TipLayerManager();
			return TipLayerManager.instance;
		}

		initTip():void
		{
			GameConfig.guding = managers.ResourceManager.infoObjArr;   //作者信息所有值
            GameConfig.platGuDingArr = managers.ResourceManager.platObjArr;  //平台信息所有值
            GameConfig.subGuDingArr = managers.ResourceManager.subjectArr;  //题材信息所有值
            GameConfig.eleGuDingArr = managers.ResourceManager.elementArr;  //元素信息所有值
		}

	}
}