import GameConfig = configs.GameConfig;
import HttpConfig = configs.HttpConfig;
import IdentityConfig = configs.IdentityConfig;
import WritingConfig = configs.WritingConfig;
import Loading = views.common.Loading;
import Handler = laya.utils.Handler;
import HttpService = nets.HttpService;
import HttpServiceProxy = nets.HttpServiceProxy;
import SceneLayerManager = managers.SceneLayerManager;
import ResourceManager = managers.ResourceManager;
import TipLayerManager = managers.TipLayerManager;
import UILayerManager = managers.UILayerManager;
import ResLoader = commons.resLoad.ResLoader;
import LoginView = views.common.LoginView;
import WritingView = views.action.WritingView;
import LoginToolBarView = views.toolbar.LoginToolBarView;
import Hash = utils.Hash;
import Sprite = Laya.Sprite;
import Md5 = utils.Md5;


// 程序入口
class GameMain {

    private static instance: GameMain;
    loading: Loading;
    constructor() {

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

    onWindowResize(): void {
        GameConfig.init();
        Laya.stage.designWidth = GameConfig.DeviceW;
        Laya.stage.designHeight = GameConfig.DeviceH;
    }

    public maifestLoaded(): void {
        Laya.loader.load([{ url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS }], Handler.create(this, this.startLoading));
    }

    startLoading(): void {
        this.loading = new Loading();
        this.loading.name = "loading";
        this.loading.autoSize = true;
        Laya.stage.addChild(this.loading);
        this.loading.x = 0;
        this.loading.y = 0;
    }
}
new GameMain();