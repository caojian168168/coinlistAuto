var post_host = "http://coinlistv.puosen.cn";

$(function () {

    //根据编号获取谷歌验证器
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.type == "multiFactor") {

            $.ajax({
                type: "POST", //用POST方式传输
                dataType: "json", //数据格式:JSON
                url: post_host +"/WebSerivces/CoinlistHandler.ashx",
                data: "{\"tranno\":\"getValidator\",\"AccountNumber\":\"" + request.keyA + "\"}",
                success: function (json) {
                    var msg=json.respMsg;
                    if(msg!='' && msg != null){
                        console.log("获取到验证码" + msg)
                        messageX(json.respMsg)
                    }else{
                    }
                },
                error: function () {
                    //alert("操作错误 ，请重试");
                    layer.msg("操作错误 ，请重试。", {
                        icon: 1
                    })
                }
            });
        }else if (request.type == "userAccountPassword"){
            console.log("获取到验证码2userInformation" )

            var students = [];
            $.ajax({
                type: "POST", //用POST方式传输
                dataType: "json", //数据格式:JSON
                url: post_host +"/WebSerivces/CoinlistHandler.ashx",
                data: "{\"tranno\":\"getAccountInfo\",\"AccountNumber\":\"" + request.keyA + "\"}",
                success: function (json) {
                    var obj2 = eval(json);
                    //alert(obj2.length);
                    students=json;
                    //alert(students.length);
                    if(obj2.length!= undefined){

                        messageA(obj2[0].ID,
                            obj2[0].AccountNumber,
                            obj2[0].Email,
                            obj2[0].Pass,
                            obj2[0].EncryptionPass,
                            obj2[0].SecretKey,
                            obj2[0].CountryEnglish,
                            obj2[0].CountryChina,
                            obj2[0].IsStatus,
                            obj2[0].CreateTime)
                    }else{
                    }
                },
                error: function () {

                    layer.msg("未找到:"+request.keyA+"的帐号信息。", {
                        icon: 10
                    })
                }
            });
            //alert(students.length);

        }else if (request.type == "userInformation"){
            //sessionStorage.setItem(aaa,'666');
            console.log("获取到验证码2userInformation" )
            $.ajax({
                type: "POST", //用POST方式传输
                dataType: "json", //数据格式:JSON
                url: post_host +"/WebSerivces/CoinlistHandler.ashx",
                data: "{\"tranno\":\"getTaskList\",\"AccountNumber\":\"" + request.keyA + "\"}",
                success: function (json) {
                    var obj2 = eval(json);

                    if(obj2!='' && obj2 != null){

                       messageV(obj2[0].id,
                            obj2[0].number,
                            obj2[0].tasktype,
                            obj2[0].taskstatus,
                            obj2[0].goinlistpassword,
                            obj2[0].googleauxiliaryemail,
                            obj2[0].googlepassword,
                            obj2[0].countryen,
                            obj2[0].countrycn,
                            obj2[0].registrationlink,
                            obj2[0].answerJScornerbook,
                            obj2[0].queuedlink);
                    }else{

                    }
                },
                error: function () {
                    layer.msg("未找到:"+request.keyA+"的任务。", {
                        icon: 10
                    })
                }
            });
        }else if(request.type == "updateTask"){
            //alert(request.idType);
                $.ajax({
                    type: "POST", //用POST方式传输
                    dataType: "json", //数据格式:JSON
                    url: post_host +"/WebSerivces/CoinlistHandler.ashx",
                    data: "{\"tranno\":\"updateTask\",\"TaskID\":\""+request.keyA+"\",\"taskstatus\":\""+request.idType+"\"}",
                    success: function (json) {
                        //alert(json.respCode + "|" + json.respMsg);
                        layer.msg("修改任务成功 修改已完成。", {
                            icon: 10
                        })
                    },
                    error: function () {
                        layer.msg("修改为完成状态为成功。", {
                            icon: 10
                        })
                    }
                });
        }else if(request.type == "updateAccountStatus"){



                $.ajax({
                    type: "POST", //用POST方式传输
                    dataType: "json", //数据格式:JSON
                    url: post_host +'/WebSerivces/CoinlistHandler.ashx', //目标地址
                    data: "{\"tranno\":\"updateAccountStatus\",\"AccountNumber\":\"" + request.keyA + "\",\"IsStatus\":\"1\"}",
                    success: function (json) {
                        //alert(json.respCode + "|" + json.respMsg);
                        layer.msg("修改账号成功 修改已废。", {
                            icon: 10
                        })
                    },
                    error: function () {
                        layer.msg("操作错误 ，请重试。", {
                            icon: 10
                        })
                    }

                });

        }else{

        }
        return true
    })


    //反馈到页面
    function message(text) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            console.log(tabs[0].id)

            chrome.tabs.sendMessage(tabs[0].id, {
                type: "msg",
                text: text
            })
        })
    }

    //返回谷歌验证器
    function messageX(text) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            console.log(tabs[0].id)
            chrome.tabs.sendMessage(tabs[0].id, {
                keyX: text
            })
        })
    }


    //返回用户信息
    function messageA(AID,
                      AccountNumber,
                      Email,
                      Pass,
                      EncryptionPass,
                      SecretKey,
                      CountryEnglish,
                      CountryChina,
                      IsStatus,
                      CreateTime
    ) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            console.log(tabs[0].id)
            chrome.tabs.sendMessage(tabs[0].id, {
                key: AccountNumber,
                Aid:AID,
                AccountNumber:AccountNumber,
                Email:Email,
                Pass:Pass,
                EncryptionPass:EncryptionPass,
                SecretKey:SecretKey,
                CountryEnglish:CountryEnglish,
                CountryChina:CountryChina,
                IsStatus:IsStatus,
                CreateTime:CreateTime

            })
        })
    }

    //返回用户状态信息
    function messageV(Vid,
                      number,
                      Tasktype,
                      taskstatus,
                      goinlistpassword,
                      googleauxiliaryemail,
                      googlepassword,
                      countryen,
                      countrycn,
                      registrationlink,
                      answerJScornerbook,
                      queuedlink
    ) {
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, function (tabs) {
            console.log(tabs[0].id)
            chrome.tabs.sendMessage(tabs[0].id, {
                key: number,
                Vid:Vid,
                number:number,
                tasktype:Tasktype,
                taskstatus:taskstatus,
                goinlistpassword:goinlistpassword,
                googleauxiliaryemail:googleauxiliaryemail,
                googlepassword:googlepassword,
                countryen:countryen,
                countrycn:countrycn,
                registrationlink:registrationlink,
                answerJScornerbook:answerJScornerbook,
                queuedlink:queuedlink

            })
        })
    }
})


$(window).load(function () {
    king_thread();
    //prizeErrorHtml();
});

/**队列配置 */
var QueueConfig = {
    queue_number: 50000,
    queue_isstop: 0,
};

/*开启检测定时事件*/
var check_thread_time = null;//定时器执行
function king_thread() {
    //先去读取配置，异步读取即可
    Config.get("host").then(host => {
        king_getconfig(host);

        //先注释 先清理在执行
        if (check_thread_time != null) {
            window.clearTimeout(check_thread_time);
        }
        king_getdom();

        check_thread_time = window.setTimeout(function () {
            king_thread();
        }, 1000 * 20);
    });
}


/*最小化窗口 */
function king_minimized() {
    chrome.windows.getCurrent({}, (currentWindow) => {
        // state: 可选 'minimized', 'maximized' and 'fullscreen'
        chrome.windows.update(currentWindow.id, { state: 'minimized' });
    });
}

function king_getdom() {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
            chrome.tabs.sendMessage(tabs[0].id, "getdom", function (response) {
                //得到网页内容
                var cur_number = response;
                if (cur_number) {
                    king_getnumber(cur_number);
                }
            });
        }
    });
}


function king_getnumber(cur_number) {
    /**
     * 提取content 里面内容的 排队数字
     * */
    if (cur_number >= QueueConfig.queue_number
        && QueueConfig.queue_isstop == 0) {
        king_minimized();
    }
}

/**获取配置 */
function king_getconfig(host) {

    $.ajax({
        type: 'post',
        url: host + '/api/ashx/Queue/Done.ashx?busy=number',
        contentType: 'application/json',
        dataType: 'json',
        success: function (res) {
            var json_obj = res;
            if (json_obj.Tag == 1) {
                QueueConfig.queue_number = json_obj.data.queue_number;
                QueueConfig.queue_isstop = json_obj.data.queue_isstop;
            }
        },
        complete: function () {

        }
    })


}


