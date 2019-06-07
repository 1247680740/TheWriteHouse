namespace views.common {
    import View = laya.ui.View;
    import LoadingUI = ui.common.LoadingUI;
    import ProgressBar = laya.ui.ProgressBar;
    import Handler = laya.utils.Handler;
    import LoginView = views.common.LoginView;
    import LoginToolBarView = views.toolbar.LoginToolBarView;
    /**
     * 加载进度条
     * @author hsx
     */
    export class Loading extends LoadingUI {

        private static instance: Loading;
        private loginView: views.common.LoginView;
        private loginToolBarView: LoginToolBarView;
        private arr: Array<any>;

        private minW = 30;  //bar 最小值
        private maxW = 265 - this.minW; //bar 最大值

        constructor() {
            super();
            this.arr = [{ url: "res/atlas/gameUI/common.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/gameUI/AuthorData.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/gameUI/toolbar.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/gameUI/event.atlas", type: Laya.Loader.ATLAS },
            { url: "res/atlas/gameUI/action.atlas", type: Laya.Loader.ATLAS },
            { url: "res/sounds/bgm.mp3", type: Laya.Loader.SOUND },
            { url: "res/sounds/btn_open.mp3", type: Laya.Loader.SOUND },
            { url: "res/sounds/btn_press.mp3", type: Laya.Loader.SOUND },
            { url: "res/sounds/build.mp3", type: Laya.Loader.SOUND }
            ];

            this.init();
        }

        private init(): void {
            Laya.loader.load(this.arr, Laya.Handler.create(this, this.onAssetsLoaded), Laya.Handler.create(this, this.progressChanged, null, false));
        }

        progressChanged(progNum: number): void {
            console.log("2D资源加载进度："+progNum);
            this.bar.width = this.minW + (progNum * this.maxW);
            this.progressTxt.text = String(progNum * 100 << 0 / 100) + "%";
        }

        onAssetsLoaded(): void {
            // alert('加载完毕');
            this.getPfInfo();
        }

        getPfInfo(): void {
            let pfObj: Object;   //https://0a6529c7.ngrok.io/writer-apartment/Wrcontro/   /www.secsplus.com    cb1159a0.ngrok.io
            pfObj = { "protocol": "https", "host": "www.secsplus.com", "port": 8080, "path": "/writer-apartment/Wrcontro/", "platform": "mmc" };
            HttpConfig.init(pfObj["protocol"] + "://", pfObj["host"], pfObj["port"], pfObj["path"]);
            HttpConfig.serverResUrl = "res/data/";
            // 自定义数据加载部分（加载Server上的静态数据）
            ResourceManager.callback = this.resLoaderComplete;
            ResourceManager.instance.loadRes([HttpConfig.serverResUrl + "format.json",
            HttpConfig.serverResUrl + "platform.json",
            HttpConfig.serverResUrl + "income.json",
            HttpConfig.serverResUrl + "history.json",
            HttpConfig.serverResUrl + "subject.json",
            HttpConfig.serverResUrl + "element.json",
            HttpConfig.serverResUrl + "awards.json",
            HttpConfig.serverResUrl + "guide.json",
            HttpConfig.serverResUrl + "release.json",
            HttpConfig.serverResUrl + "talent.json",
            HttpConfig.serverResUrl + "achiveGoal.json",
            HttpConfig.serverResUrl + "train.json",
            HttpConfig.serverResUrl + "writing.json",
            HttpConfig.serverResUrl + "triggerEvent.json"]);
            this.uiAtlasHandler();
        }

        resLoaderComplete(infoArr: Array<Object>): void {
            console.info("静态资源加载完成");
            if (!infoArr || !infoArr.length)
                return;
        }

        /** 纹理资源加载完成 */
        uiAtlasHandler(): void {
            Laya.LocalStorage.clear(); //清理缓存
            this.destroy();
            TipLayerManager.tipLayer = new views.layers.TipLayer();
            TipLayerManager.tipLayer.name = "tipLayer";
            Laya.stage.addChild(TipLayerManager.tipLayer);
            /** 进入登录界面 */
            this.loginView = views.common.LoginView.getInstance();
            Laya.stage.addChild(this.loginView);
            this.loginToolBarView = new views.toolbar.LoginToolBarView();
            this.loginToolBarView.name = "loginToolBar";
            this.loginView.addChild(this.loginToolBarView);
            this.loginToolBarView.pos((this.loginView.width - this.loginToolBarView.width) / 2, 660);
        }
    }
}