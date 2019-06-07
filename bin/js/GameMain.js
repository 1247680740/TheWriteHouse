var GameConfig = configs.GameConfig;
var HttpConfig = configs.HttpConfig;
var IdentityConfig = configs.IdentityConfig;
var WritingConfig = configs.WritingConfig;
var Loading = views.common.Loading;
var Handler = laya.utils.Handler;
var HttpService = nets.HttpService;
var HttpServiceProxy = nets.HttpServiceProxy;
var SceneLayerManager = managers.SceneLayerManager;
var ResourceManager = managers.ResourceManager;
var TipLayerManager = managers.TipLayerManager;
var UILayerManager = managers.UILayerManager;
var ResLoader = commons.resLoad.ResLoader;
var LoginView = views.common.LoginView;
var WritingView = views.action.WritingView;
var LoginToolBarView = views.toolbar.LoginToolBarView;
var Hash = utils.Hash;
var Sprite = Laya.Sprite;
var Md5 = utils.Md5;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        //初始化引擎
        Laya3D.init(GameConfig.DeviceW, GameConfig.DeviceH, true);
        /** 屏幕适配测试版 */
        if (eval("isPC()")) {
            GameConfig.device_type = GameConfig.PC;
            Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        }
        else {
            GameConfig.device_type = GameConfig.MOBILE;
            Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
            Laya.stage.screenMode = "vertical";
        }
        // Laya.Stat.show();
        Laya.stage.frameRate = "mouse";
        GameMain.instance = this;
        this.maifestLoaded();
    }
    GameMain.prototype.onWindowResize = function () {
        GameConfig.init();
        Laya.stage.designWidth = GameConfig.DeviceW;
        Laya.stage.designHeight = GameConfig.DeviceH;
    };
    GameMain.prototype.maifestLoaded = function () {
        Laya.loader.load([{ url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS }], Handler.create(this, this.startLoading));
    };
    GameMain.prototype.startLoading = function () {
        this.loading = new Loading();
        this.loading.name = "loading";
        this.loading.autoSize = true;
        Laya.stage.addChild(this.loading);
        this.loading.x = 0;
        this.loading.y = 0;
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=GameMain.js.map