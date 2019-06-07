var configs;
(function (configs) {
    /** 招募保存的相关数据*/
    var IdentityConfig = /** @class */ (function () {
        function IdentityConfig() {
        }
        /** 当前激活的招聘按钮 */
        IdentityConfig.curJobBtnArr = ["job1"];
        /** 当前招聘的作者集合 */
        IdentityConfig.curCallAuthorArr = [];
        /** 当前招募作者的总共积分点 */
        IdentityConfig.curjobPoint = 0;
        /** 是否是首次签约高品质作者 */
        IdentityConfig.isFirstTopAuthor = true;
        /** 是否是第一次发布作品 */
        IdentityConfig.isFirstIssuePage = false;
        /** 第一次发布作品计时 */
        IdentityConfig.firstIssueTime = 0;
        /** 是否是首部作品第一次完结 */
        IdentityConfig.isFirstFinish = false;
        /** 首部作品完结计时 */
        IdentityConfig.firstFinishTime = 0;
        /** 是否是首次招募高阶作者 */
        IdentityConfig.isFirstEnlist = false;
        /** 第一次招募高阶作者后计时 */
        IdentityConfig.firstEnlistTime = 0;
        /** 是否是首次获奖 */
        IdentityConfig.isFirstWin = false;
        /** 第一次中奖计时 */
        IdentityConfig.firstWinTime = 0;
        /** 招聘触发年份 */
        IdentityConfig.jobYear = 2001;
        return IdentityConfig;
    }());
    configs.IdentityConfig = IdentityConfig;
})(configs || (configs = {}));
//# sourceMappingURL=IdentityConfig.js.map