var models;
(function (models) {
    var player;
    (function (player) {
        /** 玩家数据 */
        var PlayerInfoVO = /** @class */ (function () {
            function PlayerInfoVO() {
                /** 用户昵称 */
                this.userName = "";
            }
            return PlayerInfoVO;
        }());
        player.PlayerInfoVO = PlayerInfoVO;
    })(player = models.player || (models.player = {}));
})(models || (models = {}));
//# sourceMappingURL=PlayerInfoVO.js.map