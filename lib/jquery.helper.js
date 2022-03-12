

//状态提示加载看
var status_windwon = null;


/*js 键对象*/
var EnumKey = {
    MenuPave: "menu_pave",//登录首页，菜单导航键
    MyTempelate: "MyTempelate",//我的模板对象键
    MySignalTempelate: "MySignalTempelate",//我的单个模板对象键
};

/*显示提示信息
@id:控件id
*/
function ShowToolTipMsg(id) {
    new jBox('Tooltip', {
        getTitle: 'data-jbox-title',
        getContent: 'data-jbox-content',
        attach: $('#' + id),
    });
}
/*显示提示信息
@id:控件id
@title:标题
@content:内容
*/
function ShowToolTipMsgContent(id, title, content) {
    new jBox('Tooltip', {
        title: title,
        content: content,
        attach: $('#' + id),
    });
}


/*
@msg:弹出提示洗洗脑
@index:0感叹号，1:成功，2：失败,3:问号
*/
function AlertMsg(msg) {
    var index = 0;
    if (msg.indexOf("成功") >= 0) {
        index = 1;
    }
    else if (msg.indexOf("失败") >= 0) {
        index = 2;
    }

    layer.msg(msg, {
        icon: index,
        time: 1000 * 2 //2秒关闭（如果不配置，默认是3秒）
    });
}


/*
@msg:弹出提示洗洗脑
@index:0感叹号，1:成功，2：失败,3:问号
*/
function AlertMsgGoUrl(msg,url) {
    var index = 0;
    if (msg.indexOf("成功") >= 0) {
        index = 1;
    }
    else if (msg.indexOf("失败") >= 0) {
        index = 2;
    }

    layer.msg(msg, {
        icon: index,
        time: 1000 * 2, //2秒关闭（如果不配置，默认是3秒）
        end: function () {
            location.href = url;
        }
    });
}

/*
两数字相除，保留多位小数
@num1：除数
@num2：被除数
@len：小数点数量
*/
function ToDecimal2(num1, num2, len) {
    if (num2 == 0) {
        return 0;
    }
    else {
        return (num1 / num2).toFixed(len);
    }
}

function ShowTip(id, msg, time) {
    if (time == undefined) {
        time = 5000;
    }
    layer.tips(msg, '#' + id, {
        tips: 3,
        time: time
    });
}

/**
 * 检测字符是否为数字
 * @param {any} str
 */
function CheckStrIsNumber(str) {
    var n = Number(str);
    if (!isNaN(n)) {
        return true;
    }
    else {
        return false;
    }
}

/*验证只能输入数字
       @len: 保留位数
       */
function CheckIsFormatNumber(str, len) {
    str = str.replace(/[^0-9.]/g, '');
    var newStr = str.split('');
    var newArray = [];
    var newLen = 0;
    var isFind = false;
    for (var y = 0; y < newStr.length; y++) {
        if (newStr[y] == ".") {
            isFind = true;
        }
        newArray.push(newStr[y])
        if (isFind) {
            if (newLen < len) {
                newLen++;
            }
            else {
                break;
            }
        }
    }
    if (str.indexOf(".") == str.length - 1) {
        newArray.push("0");
        newArray.push("0");
    }
    return newArray.join("");
}


/*
打开窗口
@title:窗口标题
@w：宽度
@h:高度的
@callback:关闭是执行的回调函数
@parames:回调函数参数
*/function OpenNewWindow(title, w, h, url, callback, parames) {
    if (w == undefined) {
        w = 900;
    }
    if (h == undefined) {
        h = 550;
    }
    var OpenNewWindowIndex = window.parent.layer.open({
        id: "OpenWindow",
        type: 2,
        title: title,
        shadeClose: true,
        shade: false,
        area: [w + 'px', h + 'px'],
        shift: 2,
        content: [url, 'no'], //iframe的url，no代表不显示滚动条
        end: function () { //此处用于演示
            if (callback != undefined
                && callback != null
                && typeof callback == "function") {
                callback(parames);
            }
        }

    });

    return OpenNewWindowIndex;
}

/*
关闭窗口
@isShowMsg:是否显示弹出消息
@msg：弹出消息
@result:影响结果
@menuId:导航菜单id
*/
function CloseNewWindow(isShowMsg, msg, result, menuId) {
    if (menuId == undefined) {
        menuId = MenuId;
    }
    if (result > 0) {
        if (isShowMsg) {
            AlertMsg(msg);
            window.setTimeout(function () {
                window.parent.frames["iframe_tab_" + menuId].CloseNewWindow();
            }, 1000 * 2);
        }
        else {
            window.parent.frames["iframe_tab_" + menuId].CloseNewWindow();
        }
    }
}



function CheckForm(formId) {
    // var form = GetFormData("form1");
    var isok = true;
    var fields = $("#" + formId).serializeArray(); //返回的并不是json格式数据
    for (var i = 0; i < fields.length; i++) {
        var value = fields[i].value;
        var name = fields[i].name;
        if (value == "" && $("#" + name).attr("_requied") && !$('#' + name).is(':hidden')) {
            ShowTip(name, '此项不能为空,请输入!');
            isok = false;
            break;
        }
    }
    return isok;
}

/**
对象数组移除
@key:数字key
@valu:值
*/
function ArrayRemoveObject(old_arry, key, value) {
    var array = [];
    for (var i = 0; i < old_arry.length; i++) {
        if (old_arry[i][key] != value) {
            array.push(old_arry[i]);
        }
    }
    return array;
}

/*将对象数组的字段值，单独转成数组
@obj_array:对象数组
@filed:对象属性
*/
function GetArrayFromObjFiled(obj_array, filed) {
    var array = [];
    for (var i = 0; i < obj_array.length; i++) {
        array.push(obj_array[i][filed]);
    }
    return array;
}


/**
数组移除值
@key:数字key
@valu:值
*/
function ArrayRemoveValue(old_arry, value) {
    var array = [];
    for (var i = 0; i < old_arry.length; i++) {
        if (old_arry[i] != value) {
            array.push(old_arry[i]);
        }
    }
    return array;
}


/**
数字检测该值是否存在
@key:数字key
@valu:值
*/
function ArrayIsContainValue(array, value) {
    var isContain = false;
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) {
            isContain = true;
            break;
        }
    }
    return isContain;
}


/**
数组检测对象是否存在
@key:数字key
@valu:值
*/
function ArrayIsContainObject(old_arry, key, value) {
    var isContain = false;
    for (var i = 0; i < old_arry.length; i++) {
        if (old_arry[i][key] == value) {
            isContain = true;
        }
    }
    return isContain;
}


/**
获取url参数
name:url参数名称
**/
function QuerryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/**
 * 检测字符是否为nul 或者空
 */
function IsNullOrEmpty(str) {
    var isTrue = true;
    if (str != null && str != undefined && str != "") {
        isTrue = false;
    }
    return isTrue;
}

/*获取表单数据，返回json对象*/
function GetFormData(formElementId) {
    var fields = $("#" + formElementId).serializeArray(); //返回的并不是json格式数据
    var paramObj = {};
    //序列化查询条件参数对象
    $.each(fields, function (i, field) {
        var p = {};
        p[field.name] = field.value; //转为json对象格式数据
        $.extend(paramObj, p);
    });

    return paramObj;
}
/**
获得当前时间
**/
function GetCurentTime() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getDay();              //秒

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

/**
设置界面元素中英文
@lan：语言版本
@array：数组
**/
function SetElementLan(lan, array) {
    if (array != null
        && array != undefined
        && lan != "") {
        for (var i = 0; i < array.length; i++) {
            var obj = array[i];
            $("#" + obj["id"]).val(obj[lan]).text(obj[lan]).html(obj[lan]);
        }
    }

}
/**
显示隐藏div
@id：divid
**/
function ShowHideDiv(id) {
    $("#" + id).slideToggle(500)
}

/**
关闭窗口
@id：divid
**/
function CloseWindown() {
    try {
        window.frames["main"].obj.close();
    }
    catch (ex) {
        try {
            window.parent.obj.close();
        }
        catch (es) {
            history.go(-1);
        }
    }
}
/**
* 给URL加上时间戳
*/
function buildUrl(url, paramObject) {
    if (paramObject) {
        var queryString = "";
        var attrs = paramObject.attributes;
        for (var attr in paramObject) {
            var name = attr;
            var value = paramObject[attr];

            if (queryString.length > 0) { queryString += "&"; }
            queryString += name + "=" + encodeURI(value);
        }
        if (queryString.length > 0) {
            if (url.indexOf("?") >= 0) {
                url = url + "&" + queryString;
            } else {
                url = url + "?" + queryString;
            }
        }
    }
    return url;
}

/**
@url：url地址
返回界面
*/
function GoBackUrl(url, isTop) {
    if (isTop) {
        window.parent.frames["main"].location.href = url;
    }
    else {
        location.href = url;
    }
}

//时间格式
Date.prototype.format = function (format) {
    /* 
     * eg:format="yyyy-MM-dd hh:mm:ss"; 
     */
    var o = {
        "M+": this.getMonth() + 1, // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds()
        // millisecond  
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
            - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

//LocalStorage操作=====
function SetLocalStorage(key, values) {
    localStorage.setItem(key, values);
}


//LocalStorage操作=====
function ReomveLocalStorage(key) {
    localStorage.removeItem(key);
}


function GetLocalStorage(key) {
    var obj = localStorage[key];
    if (obj != undefined) {
        return localStorage[key]
    }
    else {
        return "";
    }
}
//LocalStorage操作=====

/*获取表单数据，返回json对象*/
function GetFormData(formElementId) {
    var fields = $("#" + formElementId).serializeArray(); //返回的并不是json格式数据
    var paramObj = {};
    //序列化查询条件参数对象
    $.each(fields, function (i, field) {
        var p = {};
        p[field.name] = field.value; //转为json对象格式数据
        $.extend(paramObj, p);
    });

    return paramObj;
}


/*
获取当前日期的前几天日期 返回 yyyy-mm-dd
curDay:当前时间
addDay：往前推时间 正式
*/
function GetAddDay(curDay, addDay) {
    var dd = curDay;
    dd.setDate(dd.getDate() + addDay);//获取AddDayCount天后的日期 
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期 
    if (m < 10) {
        m = "0" + m;
    }

    var d = dd.getDate();
    if (d < 10) {
        d = "0" + d;
    }
    return y + "-" + m + "-" + d;
}

/*
比较日期时间差
@sDate1：时间减数 格式yyyy-MM-dd
@sDate2：时间被减数 格式yyyy-MM-dd
@flag: d:返回天数差，h:小时差，m:分钟差，s:秒数差，ms:毫秒差
*/
function DateDiff(sDate1, sDate2, flag) {    //sDate1和sDate2是2006-12-18格式    
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);    //转换为12-18-2006格式    
    aDate = sDate2.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    if (flag == "d") {
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);   //把相差的毫秒数转换为天数   
        iDays = iDays + 1;
    }
    else if (flag == "h") {
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60);    //把相差的毫秒数小时
    }
    else if (flag == "m") {
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60);   //把相差的毫秒数转换分钟   
    }
    else if (flag == "s") {
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000);    //把相差的毫秒数转换为秒   
    }
    else {
        iDays = parseInt(Math.abs(oDate1 - oDate2));
    }
    return iDays;
}


//时间格式
Date.prototype.format = function (format) {
    /* 
     * eg:format="yyyy-MM-dd hh:mm:ss"; 
     */
    var o = {
        "M+": this.getMonth() + 1, // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds()
        // millisecond  
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
            - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/*
@time "\/Date(1230739200000+0800)\/"
      "\/Date(1607322910000+0800)\/"
*/
function TimestampToDate(time) {
    if (time) {

        var t = time.slice(6, 19)
        var NewDtime = new Date(parseInt(t));
        return NewDtime.format("yyyy-MM-dd hh:mm:ss");
    }
    else {
        return "数据格式错误";
    }
}

/*生成指定位数的随机数*/
function GetRandom(len) {
    var jschars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var res = "";
    for (var i = 0; i < len; i++) {
        var id = Math.ceil(Math.random() * 35);
        res += jschars[id];
    }
    return res;

}

function OpenWindow(title, w, h, url) {
    if (w == undefined) {
        w = 900;
    }
    if (h == undefined) {
        h = 550;
    }
    var OpenWindowIndex = window.parent.layer.open({
        id: "OpenWindow",
        type: 2,
        title: title,
        shadeClose: true,
        shade: false,
        area: [w + 'px', h + 'px'],
        shift: 2,
        content: ['/pages/sys/roles/edit.aspx', 'no'], //iframe的url，no代表不显示滚动条
        end: function () { //此处用于演示

        }

    });
    return OpenWindowIndex;
}

/**
 * 字典排序
 * 返回排序好的数组
 * */
function ObjectToSortByDic(dic,expredFiled) {
    var new_str_arry = [];
    var sdic = Object.keys(dic).sort(function (a, b) { return dic[a] - dic[b] });
    for (ki in sdic) {
        if (expredFiled != null) {
            if (!ArrayIsContainValue(expredFiled, sdic[ki])) {
                new_str_arry.push(sdic[ki]);
                new_str_arry.push("=");
                new_str_arry.push(dic[sdic[ki]]);
                new_str_arry.push("&");
            }
        }
        //document.writeln(sdic[ki] + ":" + dic[sdic[ki]] + ",");
    }
    var newArr = new_str_arry.slice(0, -1); 

    return newArr;
}

/////////////////////////////////////////////////////
//--------------js map对象---------------------//
///////////////////////////////////////////////////

function Map() {
    var struct = function (key, value) {
        this.key = key;
        this.value = value;
    }

    var put = function (key, value) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                this.arr[i].value = value;
                return;
            }
        }
        this.arr[this.arr.length] = new struct(key, value);
    }


    var get = function (key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                return this.arr[i].value;
            }
        }
        return null;
    }

    var remove = function (key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if (v.key === key) {
                continue;
            }
            this.arr.unshift(v);
        }
    }

    var toClean = function () {
        this.arr = [];
    }

    var containsKey = function (key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                return true;
            }
        }
        return false;
    }

    var size = function () {
        return this.arr.length;
    }

    var isEmpty = function () {
        return this.arr.length <= 0;
    }

    var toArrays = function () {
        return this.arr;
    }

    var toKeyArray = function () {
        var arryes = [];
        for (var i = 0; i < this.arr.length; i++) {
            arryes.push(this.arr[i].key);
        }
        return arryes;
    }

    var toValueArray = function () {
        var arryes = [];
        for (var i = 0; i < this.arr.length; i++) {
            arryes.push(this.arr[i].value);
        }
        return arryes;
    }

    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.containsKey = containsKey;
    this.isEmpty = isEmpty;
    this.toArrays = toArrays;
    this.toClean = toClean;
    this.toKeyArray = toKeyArray;
    this.toValueArray = toValueArray;
}


    ///////////////使用案例/////////////////////////
    //var map = new Map();
    //map.put("re", "redhacker");
    //map.put("do", "douguoqiang");
    //map.put("gq", "dougq");
    //alert("map的大小为：" + map.size())
    //alert("key为re的map中存储的对象为：" + map.get("re"));
    //map.remove("re");
    //alert("移除key为re的对象后，获取key为re的map中存储的对象为：" + map.get("re"));
    //alert("map移除一个元素后的大小为：" + map.size());
    //alert("map是否是一个空map:" + map.isEmpty());

    ///////////////////////////////////////////////////////
    //////////////////////////////////////////////////////
    /////////////////////////////////////////////////////

