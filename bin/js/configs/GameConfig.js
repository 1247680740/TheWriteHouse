var configs;
(function (configs) {
    var GameConfig = /** @class */ (function () {
        function GameConfig() {
        }
        /** 初始化配置 */
        GameConfig.init = function () {
            var bw;
            var bh;
            if (laya.utils.Browser.height > laya.utils.Browser.width) {
                bw = laya.utils.Browser.width;
                bh = laya.utils.Browser.height;
            }
            else {
                bw = laya.utils.Browser.height;
                bh = laya.utils.Browser.width;
            }
            //bw = Math.max(Browser.height, Browser.width);
            //bh = Math.min(Browser.height, Browser.width);
            //如果设备尺寸上大于设计尺寸，让渲染尺寸等于设计尺寸，否则用设备尺寸。
            var scaleRatio = bw / bh;
            GameConfig.DeviceW = Math.min(bw, GameConfig.DesginW);
            GameConfig.DeviceH = Math.min(bh, GameConfig.DesginH);
            var scaleW = bw / GameConfig.DesginW;
            var scaleH = bh / GameConfig.DesginH;
            if (scaleW < scaleH) {
                GameConfig.DeviceW = GameConfig.DeviceH * scaleRatio;
            }
            else if (scaleW > scaleH) {
                GameConfig.DeviceH = GameConfig.DeviceW / scaleRatio;
            }
            //1.不留黑边 2.保证渲染区域最小
            scaleW = GameConfig.DeviceW / GameConfig.DesginW; //0.9
            scaleH = GameConfig.DeviceH / GameConfig.DesginH; //0.7
            GameConfig.Scale = Math.min(scaleW, scaleH);
            GameConfig.OrthographicVerticalSize = GameConfig.DeviceH / GameConfig.DesginH * 10;
            GameConfig.CameraAspectRatio = GameConfig.DeviceW / GameConfig.DeviceH;
            //CameraAspectRatio = 0;
            //UnitPerPixel = 1 / (DeviceH / OrthographicVerticalSize);
            GameConfig.UnitPerPixel = GameConfig.OrthographicVerticalSize / GameConfig.DeviceH;
        };
        GameConfig.PC = "PC";
        GameConfig.MOBILE = "Mobile";
        /** 游戏缓存数据 */
        GameConfig.cachData = new Object();
        /** 游戏主窗口宽度 */
        GameConfig.GAME_WINDOW_WIDTH = 450;
        /** 游戏主窗口高度 */
        GameConfig.GAME_WINDOW_HEIGHT = 950;
        //渲染尺寸
        GameConfig.DeviceW = 600;
        GameConfig.DeviceH = 950;
        //以600*950作为设计尺寸
        GameConfig.DesginW = 600;
        GameConfig.DesginH = 950;
        GameConfig.Scale = 1;
        GameConfig.OrthographicVerticalSize = 10;
        GameConfig.CameraAspectRatio = 1.775;
        GameConfig.UnitPerPixel = 0.015625; //1/64
        /*** 玩家在服务器序列编号 */
        GameConfig.QueueNumber = 1000000;
        /** 服务器接收的数据 */
        GameConfig.fuwuStr = "";
        /** 楼层的层数 */
        GameConfig.homeFloor = 1;
        /** 盖一层楼花费的金币数 */
        GameConfig.builderMoney = 555555;
        /** 游戏初始日期 */
        GameConfig.GameStartData = '2001-01-01';
        /** 基础货币 */
        GameConfig.money = 100000;
        /** 初始货币 */
        GameConfig.initmoney = 100000;
        /** 盈利货币 */
        GameConfig.gainmoney = 0;
        /** 基础脑洞 */
        GameConfig.brainHole = 999999;
        /** 基础粉丝 */
        GameConfig.fans = 1000;
        /** 宣传方式 */
        GameConfig.conductArr = ["普通宣传", "引流推广", "精准投放"];
        /** 特长类型 */
        GameConfig.talentArr = ["冲动", "勤奋", "懒惰", "抄袭", "社交", "知足", "好奇"];
        /** 题材类型 */
        GameConfig.subJectArr = ["奇幻", "科幻", "武侠", "修真", "仙侠", "冒险", "历史", "游戏", "无限", "灵异", "现实"];
        /** 时代类型 */
        GameConfig.eraArr = ["上古", "古代", "中古", "近代", "现代", "未来", "无限"];
        /** 元素类型 */
        GameConfig.elemArr = ["言情", "穿越", "盗墓", "架空", "肉", "耽美", "百合", "霸道总裁", "体育", "烹饪", "家庭", "悬疑", "恐怖", "侦探", "竞技", "都市", "校园", "医院", "犯罪", "群像", "喜剧", "悲剧", "幽默"];
        /** 二楼资源地址 */
        GameConfig.secondFloor = "res/house2/LayaScene_scene/scene.lh";
        /** 签约人数 */
        GameConfig.signingNum = 0;
        /** 签约作者所在位置 */
        GameConfig.authorPos = [];
        /** 作者招聘页面信息详情滑动次数 */
        GameConfig.slidNum = [];
        /** 作者状态栏列表滚动次数 */
        GameConfig.statusSlidNum = [];
        /** 当前点击的楼层 */
        GameConfig.curFloorNum = null;
        /** 显示页面数量 */
        GameConfig.displayPage = 0;
        /** 向服务器获取玩家队列编号方式 */
        GameConfig._calltype = 0;
        /** 已签约作者的ID集合 */
        GameConfig.authorIdArr = [];
        /** 已签约作者信息 */
        GameConfig.authorInfoArr = [];
        /** 正在写作的作者 */
        GameConfig.writingAuthor = [];
        /** 所写作品名称集合 */
        GameConfig.articalNameArr = [];
        /** 所选题材ID */
        GameConfig.checkSubID = null;
        /** 所选宣传方式ID */
        GameConfig.checkConductID = null;
        /** 所选平台ID */
        GameConfig.checkPlatID = null;
        /** 所选时代ID */
        GameConfig.checkAreID = null;
        /** 每日收藏、每日订阅、每日粉丝数据 */
        GameConfig.everyDayCollectArr = new Array();
        GameConfig.everyDaySubsArr = new Array();
        GameConfig.everyDayFansArr = new Array();
        GameConfig.everyDayCollectPosArr = new Array();
        GameConfig.everyDaySubsPosArr = new Array();
        GameConfig.everyDayFansPosArr = new Array();
        /** 历史事件对象集 */
        GameConfig.hisObjArr = [];
        /** 当前历史事件对象 */
        GameConfig.curHisObj = null;
        /** 历史事件流行元素判断 */
        GameConfig.popularValue = 0;
        /** 历史事件流行元素总类型 */
        GameConfig.hisStr = "";
        /** 题材流行计时器 */
        GameConfig.subTimeNum = 0;
        GameConfig.subTopNum = 0;
        /** 元素流行计时器 */
        GameConfig.eleTimeNum = 0;
        GameConfig.eleTopNum = 0;
        /** 评奖机制触发届数 */
        GameConfig.sessionNum = 0;
        /** 新手引导次数 */
        GameConfig.guideStepNum = 1;
        /** 缓存字符 */
        GameConfig.storageStr = "";
        /** 推广花费的金钱 */
        GameConfig.sexMoney = 0;
        GameConfig.ageMoney = 0;
        GameConfig.eduMoney = 0;
        /** 大纲阶段正在进行的作者 */
        // static writingTestObjArr:Array<Object> = [];
        /** 写作阶段正在进行的作者 */
        GameConfig.startWritingTestObjArr = [];
        /** 发布阶段正在进行的作者 */
        GameConfig.releaseTestObjArr = [];
        /** 当前选择的元素id集合 */
        GameConfig.curSelectEleArr = [];
        /** 当前选择的元素名称集合 */
        GameConfig.curSelectEleNameArr = [];
        /** 产生的灵感礼物对象集合 */
        GameConfig.insPArr = [];
        /** 当前状态栏状态 */
        GameConfig.barStatus = 1;
        /** 当前作者状态集合 */
        GameConfig.curAuthorArr = [];
        /** 作者公寓名称 */
        GameConfig.ApartmentName = '作家公寓';
        /** 是否是第一次加载动画 */
        GameConfig.isFirstAction = true;
        /** 当前拥有点数 */
        GameConfig.hasTalentPoint = 20;
        /** 天赋初始值 */
        GameConfig.defHasTalentPoint = 20;
        /** 天赋等级 */
        GameConfig.talentLevel = 1;
        /** 当前成就完成状态集合 */
        GameConfig.achiArr = [];
        /** 历史完成作品 */
        GameConfig.HistoryCompArr = [];
        /** 每个等级所拥有的的点数对象集合 */
        GameConfig.everyLevelArr = [{ "level": 1, "point": 0 }];
        /** 是否重新打开 */
        GameConfig.isFistUnlock = true;
        /** 当前解锁的Id集合 */
        GameConfig.unlockIDArr = [];
        /** 文章是否中奖 */
        GameConfig.isMyPageAward = false;
        /** 文章获奖次数 */
        GameConfig.winAwardNum = 0;
        /** 贷款情况 */
        GameConfig.loanarr = [];
        /** 定时器是否停止 */
        GameConfig.stopTimer = false;
        return GameConfig;
    }());
    configs.GameConfig = GameConfig;
})(configs || (configs = {}));
//# sourceMappingURL=GameConfig.js.map