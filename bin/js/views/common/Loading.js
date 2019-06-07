var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var views;
(function (views) {
    var common;
    (function (common) {
        var LoadingUI = ui.common.LoadingUI;
        /**
         * 加载进度条
         * @author hsx
         */
        var Loading = /** @class */ (function (_super) {
            __extends(Loading, _super);
            function Loading() {
                var _this = _super.call(this) || this;
                _this.minW = 30; //bar 最小值
                _this.maxW = 265 - _this.minW; //bar 最大值
                _this.arr = [{ url: "res/atlas/gameUI/common.atlas", type: Laya.Loader.ATLAS },
                    { url: "res/atlas/gameUI/AuthorData.atlas", type: Laya.Loader.ATLAS },
                    { url: "res/atlas/gameUI/toolbar.atlas", type: Laya.Loader.ATLAS },
                    { url: "res/atlas/gameUI/event.atlas", type: Laya.Loader.ATLAS },
                    { url: "res/atlas/gameUI/action.atlas", type: Laya.Loader.ATLAS },
                    { url: "res/sounds/bgm.mp3", type: Laya.Loader.SOUND },
                    { url: "res/sounds/btn_open.mp3", type: Laya.Loader.SOUND },
                    { url: "res/sounds/btn_press.mp3", type: Laya.Loader.SOUND },
                    { url: "res/sounds/build.mp3", type: Laya.Loader.SOUND }
                ];
                _this.init();
                return _this;
            }
            Loading.prototype.init = function () {
                Laya.loader.load(this.arr, Laya.Handler.create(this, this.onAssetsLoaded), Laya.Handler.create(this, this.progressChanged, null, false));
            };
            Loading.prototype.progressChanged = function (progNum) {
                console.log("2D资源加载进度：" + progNum);
                this.bar.width = this.minW + (progNum * this.maxW);
                this.progressTxt.text = String(progNum * 100 << 0 / 100) + "%";
            };
            Loading.prototype.onAssetsLoaded = function () {
                // alert('加载完毕');
                this.getPfInfo();
            };
            Loading.prototype.getPfInfo = function () {
                var pfObj; //https://0a6529c7.ngrok.io/writer-apartment/Wrcontro/   /www.secsplus.com    cb1159a0.ngrok.io
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
            };
            Loading.prototype.resLoaderComplete = function (infoArr) {
                console.info("静态资源加载完成");
                if (!infoArr || !infoArr.length)
                    return;
            };
            /** 纹理资源加载完成 */
            Loading.prototype.uiAtlasHandler = function () {
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
            };
            return Loading;
        }(LoadingUI));
        common.Loading = Loading;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=Loading.js.map