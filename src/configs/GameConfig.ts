namespace configs {

    export class GameConfig {

        /** 设备类型 */
        static device_type: string;
        static PC: string = "PC";
        static MOBILE: string = "Mobile";

        /** 游戏缓存数据 */
        static cachData: Object = new Object();

        /** 游戏主窗口宽度 */
        static GAME_WINDOW_WIDTH: number = 450;

        /** 游戏主窗口高度 */
        static GAME_WINDOW_HEIGHT: number = 950;

        //渲染尺寸
        static DeviceW: number = 600;
        static DeviceH: number = 950;

        //以600*950作为设计尺寸
        static DesginW: number = 600;
        static DesginH: number = 950;

        static Scale:number = 1;

        static OrthographicVerticalSize:number = 10;

        static CameraAspectRatio:number = 1.775;

        static UnitPerPixel:number = 0.015625;    //1/64

        /** 当前操作类型 */
        static curOperateType: string;

        /** 临时账号 */
        static temporaryID: string;

        /** 注册账号 */
        static registerID: string;

        /*** 验证码 */
        static CodeNum:number;

        /*** 玩家在服务器序列编号 */
        static QueueNumber:number = 1000000;

        /** 服务器接收的数据 */
        static fuwuStr:string="";

        /** 楼层的层数 */
        static homeFloor: number = 1;

        /** 盖一层楼花费的金币数 */
        static builderMoney: number = 555555;

        /** 游戏初始日期 */
        static GameStartData: string = '2001-01-01';

        /** 初始年 */
        static year: number;

        /** 初始月 */
        static month: number;

        /** 初始日 */
        static day: number;

        /** 作者名称 */
        static nameStr: string;

        /** 作者ID */
        static AuthorID: string;

        /** 作者头像 */
        static icon: string;

        /** 基础货币 */
        static money: number =  100000;

        /** 初始货币 */
        static initmoney: number = 100000;

        /** 盈利货币 */
        static gainmoney: number = 0;       

        /** 基础脑洞 */
        static brainHole:number = 999999;

        /** 基础粉丝 */
        static fans: number = 1000;

        /** 激情下限 */
        static passionMinStr: number;

        /** 激情上限 */
        static passionMaxStr: number;

        /** 严谨下限 */
        static precisenessMinStr: number;

        /** 严谨上限 */
        static precisenessMaxStr: number;

        /** 自律下限 */
        static disciplineMinStr: number;

        /** 自律上限 */
        static disciplineMaxStr: number;

        /** 好奇下限 */
        static curiousMinStr: number;

        /** 好奇上限 */
        static curiousMaxStr: number;

        /** 是否特殊 */
        static specialStr: string;

        /** 分红 */
        static shareStr: string;

        /** 年薪 */
        static monthlySalaryStr: string;

        /** 违约金 */
        static penalSumStr: string;

        /** 擅长题材 */
        static subjectStr: string;

        /** 擅长元素 */
        static elementStr: string;

        /** 特长 */
        static talentStr: string;

        /** 平台固定数据集 */
        static platGuDingArr: Array<Object>;

        /** 平台数据集 */
        static platArr: Array<Object>;

        /** 题材固定数据集 */
        static subGuDingArr: Array<Object>;

        /** 题材数据集 */
        static subArr: Array<Object>;

        /** 元素固定数据集 */
        static eleGuDingArr: Array<Object>;

        /** 元素数据集 */
        static eleArr: Array<Object>;
        
        /** 宣传方式 */
        static conductArr:Array<string> = ["普通宣传","引流推广","精准投放"];

        /** 特长类型 */
        static talentArr: Array<string> = ["冲动", "勤奋", "懒惰", "抄袭", "社交", "知足", "好奇"];

        /** 题材类型 */
        static subJectArr: Array<string> = ["奇幻", "科幻", "武侠", "修真", "仙侠", "冒险", "历史", "游戏", "无限", "灵异", "现实"];

        /** 时代类型 */
        static eraArr: Array<string> = ["上古", "古代", "中古", "近代", "现代", "未来", "无限"]

        /** 元素类型 */
        static elemArr: Array<string> = ["言情", "穿越", "盗墓", "架空", "肉", "耽美", "百合", "霸道总裁", "体育", "烹饪", "家庭", "悬疑", "恐怖", "侦探", "竞技", "都市", "校园", "医院", "犯罪", "群像", "喜剧", "悲剧", "幽默"];

        /** 二楼资源地址 */
        static secondFloor: string = "res/house2/LayaScene_scene/scene.lh";

        /** 配置表数据信息 */
        static authorArr: Array<Object>;

        /** 签约人数 */
        static signingNum: number = 0;

        /** 签约作者所在位置 */
        static authorPos: Array<string> = [];

        /** 作者招聘页面信息详情滑动次数 */
        static slidNum: Array<number> = [];

        /** 作者状态栏列表滚动次数 */
        static statusSlidNum: Array<number> = [];

        /** 当前点击的楼层 */
        static curFloorNum: number = null;

        /** 固定值 */
        static guding: Array<Object>;

        /** 显示页面数量 */
        static displayPage: number = 0;

        /** 向服务器获取玩家队列编号方式 */
        static _calltype: number = 0;

        /** 已签约作者的ID集合 */
        static authorIdArr: Array<string> = [];

        /** 已签约作者信息 */
        static authorInfoArr: Array<Object> = [];

        /** 正在写作的作者 */
        static writingAuthor: Array<string> = [];

        /** 所写作品名称集合 */
        static articalNameArr: Array<string> = [];

        /** 所选题材ID */
        static checkSubID: number = null;

        /** 所选宣传方式ID */
        static checkConductID:number = null;

        /** 所选平台ID */
        static checkPlatID: number = null;

        /** 所选时代ID */
        static checkAreID: number = null;

        /** 每日收藏、每日订阅、每日粉丝数据 */
        static everyDayCollectArr: Array<number> = new Array<number>();

        static everyDaySubsArr: Array<number> = new Array<number>();

        static everyDayFansArr: Array<number> = new Array<number>();

        static everyDayCollectPosArr: Array<number> = new Array<number>();

        static everyDaySubsPosArr: Array<number> = new Array<number>();

        static everyDayFansPosArr: Array<number> = new Array<number>();

        /** 历史事件对象集 */
        static hisObjArr: Array<Object> = [];

        /** 当前历史事件对象 */
        static curHisObj: Object = null;

        /** 历史事件流行元素判断 */
        static popularValue: number = 0;

        /** 历史事件流行元素总类型 */
        static hisStr: string = "";

        /** 题材流行计时器 */
        static subTimeNum: number = 0;
        static subTopNum: number = 0;

        /** 元素流行计时器 */
        static eleTimeNum: number = 0;
        static eleTopNum: number = 0;

        /** 评奖机制触发届数 */
        static sessionNum: number = 0;

        /** 新手引导次数 */
        static guideStepNum: number = 1;

        /** 缓存字符 */
        static storageStr:string = "";

        /** 推广花费的金钱 */
        static sexMoney:number = 0;
        static ageMoney:number = 0;
        static eduMoney:number = 0;


        /** 大纲阶段正在进行的作者 */
        // static writingTestObjArr:Array<Object> = [];

        /** 写作阶段正在进行的作者 */
        static startWritingTestObjArr:Array<Object> = [];

        /** 发布阶段正在进行的作者 */
        static releaseTestObjArr:Array<Object> = [];

        /** 当前选择的元素id集合 */
        static curSelectEleArr: Array<number> = [];

        /** 当前选择的元素名称集合 */
        static curSelectEleNameArr:Array<string> = [];

        /** 产生的灵感礼物对象集合 */
        static insPArr:Array<Object> = [];

        /** 当前状态栏状态 */
        static barStatus:number = 1;

        /** 当前作者状态集合 */
        static curAuthorArr:Array<Object> = [];

        /** 作者公寓名称 */
        static ApartmentName:string = '作家公寓';

        /** 是否是第一次加载动画 */
        static isFirstAction:boolean = true;

        /** 当前拥有点数 */
        static  hasTalentPoint:number = 20;

        /** 天赋初始值 */
        static defHasTalentPoint:number = 20;

        /** 天赋等级 */
        static  talentLevel:number = 1;

        /** 人生第一次进入游戏时间 */
        static  entergametime:number;

        /** 进入游戏时间 */
        static  playtime:number;

        /** 当前成就完成状态集合 */
        static  achiArr:Array<string> = [];

        /** 历史完成作品 */
        static  HistoryCompArr :Array<Object> = [];

        /** 每个等级所拥有的的点数对象集合 */
        static  everyLevelArr:Array<Object> = [{"level":1,"point":0}];

        /** 是否重新打开 */
        static isFistUnlock:boolean = true;

        /** 当前解锁的Id集合 */
        static unlockIDArr:Array<number> = [];

        /** 文章是否中奖 */
        static  isMyPageAward:boolean = false;

        /** 文章获奖次数 */
        static  winAwardNum:number = 0;

        /** 贷款情况 */
        static loanarr:Array<number> = [];

        /** 定时器是否停止 */
        static stopTimer:boolean = false;

        /** 初始化配置 */
        static init(): void {
            var bw: number;
            var bh: number;
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

            var scaleRatio: number = bw / bh;
            GameConfig.DeviceW = Math.min(bw, GameConfig.DesginW);
            GameConfig.DeviceH = Math.min(bh, GameConfig.DesginH);

            var scaleW: number = bw / GameConfig.DesginW;
            var scaleH: number = bh / GameConfig.DesginH;
            if (scaleW < scaleH) {
                GameConfig.DeviceW = GameConfig.DeviceH * scaleRatio;
            }
            else if (scaleW > scaleH) {
                GameConfig.DeviceH = GameConfig.DeviceW / scaleRatio;
            }
            //1.不留黑边 2.保证渲染区域最小

            scaleW = GameConfig.DeviceW / GameConfig.DesginW;  //0.9
            scaleH = GameConfig.DeviceH / GameConfig.DesginH;     //0.7
            GameConfig.Scale = Math.min(scaleW, scaleH);

            GameConfig.OrthographicVerticalSize = GameConfig.DeviceH / GameConfig.DesginH * 10;
            GameConfig.CameraAspectRatio = GameConfig.DeviceW / GameConfig.DeviceH;
            //CameraAspectRatio = 0;
            //UnitPerPixel = 1 / (DeviceH / OrthographicVerticalSize);
            GameConfig.UnitPerPixel = GameConfig.OrthographicVerticalSize / GameConfig.DeviceH;
        }
    }
}