var utils;
(function (utils) {
    var RenderState = laya.d3.core.render.RenderState;
    var Hash = /** @class */ (function () {
        function Hash() {
        }
        /**
         * 从数组中随机选取一项
         * @param paramArray
         * @return
         */
        Hash.selectItemFromArray = function (paramArray) {
            var nums = paramArray.length;
            var index = parseInt(Math.random() * nums + "");
            return paramArray[index];
        };
        /**
         * 随机变换数字
         * @param bitAmount 位数总计
         * @return
         */
        Hash.alterationNum = function (bitAmount) {
            var random = Math.random();
            if (random == 0) {
                Hash.alterationNum(bitAmount);
                return;
            }
            var minNum = '1';
            for (var i = 0; i < bitAmount; i++) {
                minNum += '0';
            }
            return random * parseInt(minNum);
        };
        /**
         * 生成校验密钥串
         * @param content 要加密的串数据
         */
        Hash.createPrivateKey = function (content, key) {
            if (key === void 0) { key = ''; }
            if (key === "") {
                key = "bobo";
            }
            var result = 0;
            var keyCode = 0;
            var i;
            for (i = 0; i < key.length; i++) {
                keyCode += key.charCodeAt(i);
            }
            for (i = 0; i < content.length; i++) {
                result += content.charCodeAt(i) ^ keyCode;
            }
            return result;
        };
        /**
         * 生成一个随机数字
         * @param 数字的位数
         * @return
         */
        Hash.createRandomNumber = function (digit) {
            return parseInt(Math.random() * Math.pow(10, parseInt(digit)) + "");
        };
        /**
         * 获取两个数值之间的随机数
         * @param min
         * @param max
         */
        Hash.getRandomNum = function (min, max) {
            var num = Math.floor(min + Math.floor(Math.random() * (max - min + 1)));
            return num;
        };
        /**
         * 转换3D投影坐标系统到2D屏幕坐标系统，以像素为单位,通常用于正交投影下的3D坐标（（0，0）在屏幕中心）到2D屏幕坐标（（0，0）在屏幕左上角）的转换。
         * @param	source 源坐标。
         * @param	out 输出坐标。
         */
        Hash.convert3DCoordTo2DScreenCoord = function (source, out) {
            var se = source.elements;
            var oe = out.elements;
            oe[0] = -RenderState.clientWidth / 2 + se[0];
            oe[1] = RenderState.clientHeight / 2 - se[1];
            oe[2] = se[2];
            return out;
        };
        Hash.conver3DTo2DCoord = function (source, out, sp) {
            // let newVec:Laya.Vector3 = new Laya.Vector3();
            // newVec = out;
            var viewPort = new Laya.Viewport(0, 0, 520, 500);
            viewPort.project(source, sp.transform.worldMatrix, out);
            return out;
        };
        /**
         * 转换2D屏幕坐标系统到3D投影坐标 系统（仅限于正交投影）
         * @param	source 源坐标。
         * @param	out 输出坐标。
         */
        Hash.screenCoordTo3DCoord = function (source, out) {
            var se = source.elements;
            var oe = out.elements;
            oe[0] = ((-GameConfig.DeviceW >> 1) + se[0]) * GameConfig.UnitPerPixel;
            oe[1] = ((GameConfig.DeviceH >> 1) - se[1]) * GameConfig.UnitPerPixel;
            oe[2] = se[2];
            return out;
        };
        /** 判断某点是否包含在多边形内 */
        Hash.pointInPoly = function (pt, poly) {
            for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
                ((poly[i].y <= pt.y && pt.y < poly[j].y) || (poly[j].y <= pt.y && pt.y < poly[i].y))
                    && (pt.x < (poly[j].x - poly[i].x) * (pt.y - poly[i].y) / (poly[j].y - poly[i].y) + poly[i].x)
                    && (c = !c);
            return c;
        };
        /** 根据权重获取数据 */
        Hash.weight_rand = function (arr) {
            //求出最大公约数以计算缩小倍数，perMode为百分比模式  
            var per;
            var maxNum = 0;
            var perMode = false;
            //使用clone元素对象拷贝仍然会造成浪费，但是使用权重数组对应关系更省内存  
            var weight_arr = new Array();
            for (var i = 0; i < arr.length; i++) {
                if ('undefined' != typeof (arr[i].weight)) {
                    if (arr[i].weight.toString().indexOf('%') !== -1) {
                        per = Math.floor(arr[i].weight.toString().replace('%', ''));
                        perMode = true;
                    }
                    else {
                        per = Math.floor(arr[i].weight * 100);
                    }
                }
                else {
                    per = 0;
                }
                weight_arr[i] = per;
                maxNum = Hash.getGcd(maxNum, per);
            }
            //数字比模式，3:5:7，其组成[0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2]  
            //百分比模式，元素所占百分比为15%，25%，35%  
            var index = new Array();
            var total = 0;
            var len = 0;
            if (perMode) {
                for (var i = 0; i < arr.length; i++) {
                    //len表示存储arr下标的数据块长度，已优化至最小整数形式减小索引数组的长度  
                    len = weight_arr[i];
                    for (var j = 0; j < len; j++) {
                        //超过100%跳出，后面的舍弃  
                        if (total >= 100) {
                            break;
                        }
                        index.push(i);
                        total++;
                    }
                }
                //使用最后一个元素补齐100%  
                while (total < 100) {
                    index.push(arr.length - 1);
                    total++;
                }
            }
            else {
                for (var i = 0; i < arr.length; i++) {
                    //len表示存储arr下标的数据块长度，已优化至最小整数形式减小索引数组的长度  
                    len = weight_arr[i] / maxNum;
                    for (var j = 0; j < len; j++) {
                        index.push(i);
                    }
                    total += len;
                }
            }
            //随机数值，其值为0-11的整数，数据块根据权重分块  
            var rand = Math.floor(Math.random() * total);
            return arr[index[rand]];
        };
        /** 自定义Math求最小公约数方法  */
        Hash.getGcd = function (a, b) {
            var min = Math.min(a, b);
            var max = Math.max(a, b);
            var result = 1;
            if (a === 0 || b === 0) {
                return max;
            }
            for (var i = min; i >= 1; i--) {
                if (min % i === 0 && max % i === 0) {
                    result = i;
                    break;
                }
            }
            return result;
        };
        ;
        /** 百分比几率计算 */
        Hash.countRate = function (probability) {
            probability = probability * 100;
            var odds = Math.floor(Math.random() * 100);
            if (probability === 100) {
                return 1;
            }
            ;
            if (odds < probability) {
                return 1;
            }
            else {
                return 0;
            }
        };
        /** 判断两个日期之间相差天数 */
        Hash.dateDifference = function (data1, data2) {
            var aDate = new Array();
            var newDate1;
            var newDate2;
            var Days;
            if (laya.utils.Browser.onIOS) {
                aDate = data1.split("-");
                newDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为07-10-2017格式  
                aDate = data2.split("-");
                newDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
                Days = parseInt((Math.abs(newDate1 - newDate2) / 1000 / 60 / 60 / 24) + ""); //把差的毫秒数转换为天数  
                return Days;
            }
            else {
                aDate = data1.split("-");
                newDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为07-10-2017格式  
                aDate = data2.split("-");
                newDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
                Days = parseInt((Math.abs(newDate1 - newDate2) / 1000 / 60 / 60 / 24) + ""); //把差的毫秒数转换为天数  
                return Days;
            }
        };
        /** 播放背景音乐/音效 */
        Hash.playMusic = function (soundId) {
            switch (soundId) {
                case 1:
                    laya.media.SoundManager.playSound("res/sounds/btn_open.mp3", 1); //弹出面板的
                    break;
                default:
                    laya.media.SoundManager.playSound("res/sounds/btn_press.mp3", 1); //关闭按钮的 确认 or 取消 or 关闭
                    break;
            }
        };
        return Hash;
    }());
    utils.Hash = Hash;
})(utils || (utils = {}));
//# sourceMappingURL=Hash.js.map