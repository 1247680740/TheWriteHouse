var utils;
(function (utils) {
    var Identy = /** @class */ (function () {
        function Identy() {
        }
        Identy.prototype.tweenAct = function (author) {
            var statusOne = [{ "id": 2, "name": "休息" }, { "id": 3, "name": "工作" }];
            var statusObjOne = new Object();
            var statusObjTwo = new Object();
            if (GameConfig.authorInfoArr.length > 0) {
                // for (let i: number = 0; i < GameConfig.authorInfoArr.length; i++) {
                // let author: Object = GameConfig.authorInfoArr[i];
                var nameStr = author["name"];
                if (author["sportStatus"] == 0) {
                    statusObjOne = statusOne[1];
                }
                else if (author["sportStatus"] == 1) {
                    statusObjOne = statusOne[1];
                }
                else if (author["sportStatus"] == 2) {
                    statusObjOne = statusOne[0];
                }
                SceneLayerManager.sceneLayer.judgeStatus(statusObjOne, nameStr, author);
                // }
            }
        };
        return Identy;
    }());
    utils.Identy = Identy;
})(utils || (utils = {}));
//# sourceMappingURL=Identy.js.map