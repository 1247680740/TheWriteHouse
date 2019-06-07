namespace configs {
    
    /** 招募保存的相关数据*/    
    export class IdentityConfig {

        /** 当前激活的招聘按钮 */
        static curJobBtnArr:Array<string> = ["job1"];

        /** 当前招聘的作者集合 */
        static curCallAuthorArr:Array<Object> = [];

        /** 当前招募作者的总共积分点 */
        static curjobPoint:number = 0;

        /** 是否是首次签约高品质作者 */
        static isFirstTopAuthor:boolean = true;

        /** 是否是第一次发布作品 */
        static isFirstIssuePage:boolean = false;

        /** 首部作品名称 */
        static isFirstPageName:string;

        /** 首部作品归属作者 */
        static isFirstAuthorName:string;

        /** 首部作品所属平台 */
        static isFirstPlatName:string;

        /** 第一次发布作品计时 */
        static firstIssueTime:number = 0;


        /** 是否是首部作品第一次完结 */
        static isFirstFinish:boolean = false;

        /** 首部完结作者 */
        static firstFinishAuthor:string;

        /** 首部完结作品名称 */
        static firstFinishPageName:string;

        /** 首部完结作品平台 */
        static firstFinishPlatName:string;

        /** 首部作品完结计时 */
        static firstFinishTime:number = 0;

        /** 是否是首次招募高阶作者 */
        static isFirstEnlist:boolean = false;

        /** 招募的高阶作者名称 */
        static firstEnlistAuthor:string;

        /** 第一次招募高阶作者后计时 */
        static firstEnlistTime:number = 0;

        /** 是否是首次获奖 */
        static isFirstWin:boolean = false;

        /** 首次获奖的作者 */
        static firstWinAuthor:string;

        /** 首次获奖的作者作品 */
        static firstWinPageName:string;

        /** 首次获奖的作者所获奖项 */
        static firstWinName:string;

        /** 首次获奖平台名称 */
        static firstWinPlatname:string;

        /** 第一次中奖计时 */
        static firstWinTime:number = 0;

        /** 招聘触发年份 */
        static jobYear:number = 2001;
    }
}