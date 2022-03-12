let href = window.location.href;
console.info(`%c ${chrome.runtime.getManifest().name},版本：${chrome.runtime.getManifest().version}；main - ${href}`, 'color:#999');


var url=href;//coinlist所在的浏览器地址
var userRememberMe =1;//cl登录页面记住我选项 0关闭 1开启
var login ='coinlist.co/login';//登录 coinlist.co/login/ coinlist.co/users/login/
var userslogin ='coinlist.co/users/login';
var multiFactor ='coinlist.co/multi_factor';//输入验证页面 coinlist.co/multi_factor
var dashboard = 'dashboard';//cl首页
var authorized='You are not authorized to perform this action.';
var accountsecurity ='account/security';//验证ip是否过多
var devices ="users/devices/new";//第一次登录或者其他电脑登录需要点击邮箱验证


var live='login.live.com';//微软邮箱登录
var google='accounts.google.com/';//谷歌邮箱登录

var type =2;//任务类型（1做号，2报名，3排队）

var sales='/onboarding';//报名一号活动
var opnew="/new";
var residence="/residence";//报名一号选择地区
var singhquiz ="/quiz";//报名一号选题目
var palsingh="coinlist.co/stader-option-1/";//1号报名成功地址


var sales2='/onboarding';//报名一号活动
var opnew2="/new";
var residence2="/residence";//报名一号选择地区
var singhquiz2 ="/quiz";//报名一号选题目
var palsingh2="coinlist.co/stader-option-2/";//2号报名成功地址

var coindashboard="https://coinlist.co/dashboard";//coinlist首页

var salesDashboard="sales.coinlist.co/dashboard";

var google=".google.";

var yse ="Completed";//报名成功 页面标识


var shouhu="pv.sohu.com";

var onboarding="coinlist.co/onboarding";//错误404页面跳转首页


var js =1;//邮箱开关
//获取账户信息
chrome.storage.local.get(["key"], function (result) {

    setTimeout(() => {//时间延迟
        if (result.key) {
            var AID='';//id
            var AccountNumber='';//编号
            var Email='';
            var Pass='';//邮箱
            var EncryptionPass='';//密码
            var SecretKey='';//密钥
            var CountryEnglish='';//国家(英文)
            var CountryChina='';//国家（中文）
            var IsStatus='';//状态（0正常，1死号
            var CreateTime='';//创建时间*/
            //alert('login  multiFactor');
            chrome.runtime.sendMessage({
                type: "userAccountPassword",
                keyA: result.key
            }, function (res) {
            })

            //登录账号
            if(url.indexOf(login) != -1 || url.indexOf(userslogin) != -1 || url.indexOf(multiFactor)!= -1  || url.indexOf(devices) != -1 ){
                chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

                    if (request.key !='' && request.key !=null ) {
                        AID=request.Aid;
                        AccountNumber=request.AccountNumber; //编号
                        Email=request.Email; //邮箱
                        Pass=request.Pass; //密码
                        EncryptionPass=request.EncryptionPass; //密码
                        SecretKey=request.SecretKey; //密钥
                        CountryEnglish=request.CountryEnglish; //国家(英文)
                        CountryChina=request.CountryChina; //国家（中文）
                        IsStatus=request.IsStatus; //状态（0正常，1死号）
                        CreateTime=request.CreateTime; //创建时间*/
                        //alert(number+' 333 '+AID +"|"+ AccountNumber +"|"+ Pass  +"|"+  EncryptionPass +"|"+  SecretKey +"|"+  CountryEnglish +"|"+ CountryChina  +"|"+  IsStatus +"|"+ CreateTime);

                        loginEnroll(Email,Pass);//登录
                        validator(SecretKey,request.key);//获取谷歌验证
                        if (1==js){//邮箱控制开关
                            if(url.indexOf(devices) != -1 ){
                                console.info("测试时间:"+url);
                                setTimeout(() => {//时间延迟
                                    console.info("测试时间2:"+url);
                                    var email163Uutlook = 'outlook';
                                    var emailTypeHotmail = 'hotmail';
                                    var emailTypeGmail = 'gmail';
                                    var emailType163 = '163';
                                    var email=Email;
                                    if(email.indexOf(email163Uutlook)!= -1){
                                        setTimeout(() => {//时间延迟
                                            //$(location).attr('href',' https://login.live.com/login.srf');
                                        }, 1000);
                                    }else if(email.indexOf(emailTypeHotmail)!= -1){

                                    }else if(email.indexOf(emailTypeGmail)!= -1){
                                        setTimeout(() => {//时间延迟
                                            $(location).attr('href','https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin');
                                        }, 2500);
                                    }else if(email.indexOf(emailType163)!= -1){

                                    }else{
                                        alert("邮箱:"+email+"未匹配到所对应邮箱类型。");
                                    }
                                }, 3000);
                            }
                        }
                    }
                })
            }

            //如果是404页面跳转首页
            if(url.indexOf(onboarding) != -1){
                setTimeout(() => {//3秒后跳转
                    $(location).attr('href',coindashboard);
                }, 3000);

            }

           //var ide="accounts.google.com/signin/v2/identifier";//谷歌输入邮箱账号url
            var ideServiceLogin="accounts.google.com/ServiceLogin";//谷歌输入邮箱账号url
            var pad="accounts.google.com/signin/v2/challenge/pwd";//谷歌输入邮箱密码url
            var signinchooser="accounts.google.com/ServiceLogin/signinchooser";//谷歌选择账号
            var mail="mail.google.com/mail";//登录成功
            var collection="myaccount.google.com/signinoptions/recovery-options-collection";//登录成功


            //判断是否 是谷歌地址如果是 对比是否为谷歌邮箱
            console.info("是否谷歌登录:"+url);
            //邮箱控制开关
            if(1==js){
                setTimeout(() => {

                if(url.indexOf(ideServiceLogin) != -1 || url.indexOf(pad) != -1 || url.indexOf(collection) != -1){//邮箱登录
                    console.info("第一次登录需要邮箱");
                    /*if(url.indexOf(signinchooser) != -1 ){//选择一个帐户
                        $('.BHzsHc').click()
                    }*/
                    console.info("setTimeout22222222:" );
                    chrome.runtime.sendMessage({
                        type: "userAccountPassword",
                        keyA: result.key
                    }, function (res) {
                    })
                    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                        //alert(result.key);
                        if (request.key != '' && request.key != null) {
                            AID = request.Aid;
                            AccountNumber = request.AccountNumber; //编号
                            Email = request.Email; //邮箱
                            Pass = request.Pass; //密码
                            EncryptionPass = request.EncryptionPass; //密码
                            SecretKey = request.SecretKey; //密钥
                            CountryEnglish = request.CountryEnglish; //国家(英文)
                            CountryChina = request.CountryChina; //国家（中文）
                            IsStatus = request.IsStatus; //状态（0正常，1死号）
                            CreateTime = request.CreateTime; //创建时间*!/
                            //alert(number+' 333 '+AID +"|"+ AccountNumber +"|"+ Pass  +"|"+  EncryptionPass +"|"+  SecretKey +"|"+  CountryEnglish +"|"+ CountryChina  +"|"+  IsStatus +"|"+ CreateTime);
                            console.info("是否谷歌登录账号:" + Email);
                            console.info("url1=:" + url);

                            if ( url.indexOf(ideServiceLogin) != -1) {
                                setTimeout(() => {
                                    if (Email != null && Email != "") {
                                        console.info("是否谷歌登录账号2===:" + Email);
                                        document.getElementById('identifierId').value = Email;
                                        setTimeout(() => {//时间延迟
                                            $(".VfPpkd-vQzf8d").click()
                                        }, 500);
                                    }
                                    setTimeout(() => {
                                        if (Pass != null && Pass != "") {
                                            console.info("是否谷歌登录密码2===:" + Pass);
                                            setTimeout(() => {//时间延迟
                                                $('input[name="password"]').val(Pass);
                                            }, 1000);
                                            setTimeout(() => {//时间延迟
                                                $(".VfPpkd-vQzf8d").click()
                                            }, 2500);

                                        }
                                    }, 1800);
                                }, 1500);
                            }
                            console.info("是否谷歌登录密码:" + Pass);
                            console.info("url2=:" + url);

                            if (url.indexOf(pad) != -1) {

                            }
                            if(url.indexOf(collection) != -1){

                            }
                        }
                    })
                }else if(url.indexOf(mail) != -1){
                    console.info("谷歌登录66:"+url);
                    /*console.info("点击执行"+url);
                    var spans = document.querySelectorAll("span");
                    for(var i =0;i<spans.length;i++){
                        var si = spans[i];
                        if(si.innerHTML == "Approve"){
                            si.click()
                        }
                    }*/
                    /*setTimeout(() => {//时间延迟
                        $(location).attr('href','https://mail.google.com/mail/u/0/#search/approve+your+new+device');
                    }, 3500);
                    setTimeout(() => {//时间延迟
                        $(".F").find("tbody").find("tr")[0].click()
                    }, 5000);
*/
                    setTimeout(() => {//时间延迟
                        console.info("点击了Coinlist");
                        var spans = document.querySelectorAll("span");
                        //document.querySelectorAll("span")[620].click();
                        var list1 = new Array();
                        for(var i =0;i<spans.length;i++){
                            var si = spans[i];
                            //console.info("首"+i+"页1:"+si.innerHTML );
                            if(si.innerHTML == "Approve your new device to log in"){
                                console.info("首"+i+"页2:"+si.innerHTML );
                                //si.click()
                                list1.push(i);
                            }
                        }
                        console.info("点点:"+list1.pop());

                        setTimeout(() => {//时间延迟
                            console.info("点点:"+list1.shift());
                            //document.querySelectorAll("span")[list1.pop()].click()
                            document.querySelectorAll("span")[list1.shift()].click();
                        }, 1500);

                        setTimeout(() => {//时间延迟
                            var approve = document.querySelectorAll("a");
                            //document.querySelectorAll("span")[620].click();
                            var list1Approve = new Array();
                            for(var i =0;i<approve.length;i++){
                                var siApprove = approve[i];
                                //console.info("首"+i+"页1:"+si.innerHTML );
                                if(siApprove.innerHTML.indexOf("this") != -1){
                                    console.info("66666："+i+"页2:"+siApprove.innerHTML );
                                    //si.click()
                                    list1Approve.push(i);
                                }
                            }
                            setTimeout(() => {//时间延迟
                                console.info("点点:"+list1Approve);
                                $("a")[list1Approve].click()
                            }, 1000);
                        }, 3000);
                    }, 6000);
                }
            }, 1500);
            }

            //排队报名
            console.info("报名排队:"+url );
            var    id='';	//ID
            var    number='';	//编号
            var    Tasktype='';	//任务类型（1做号，2报名，3排队）
            var    taskstatus="";
            var    goinlistpassword='';	//coinlist密码(做号)
            var    googleauxiliaryemail='';	//谷歌辅助邮箱(做号)
            var    googlepassword='';	//谷歌密码(做号)
            var    countryen='';	//国家(英文)(报名)
            var    countrycn='';	//国家（中文）(报名)
            var    registrationlink='';	//报名链接(报名)
            var    answerJScornerbook='';	//答题js角本(报名)
            var    queuedlink='';	//排队链接(排队)
            if( url.indexOf(dashboard) != -1 ||
                url.indexOf(sales) != -1 ||
                url.indexOf(opnew) != -1 ||
                url.indexOf(residence) != -1 ||
                url.indexOf(singhquiz) != -1 ){

                console.info("首页查询数据:"+url );
                chrome.runtime.sendMessage({
                    type: "userInformation",
                    keyA: result.key
                }, function (res) {
                })
                console.info("首页查询成功:"+url );
                chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                    id=request.Vid;//ID
                    number=request.number;//编号
                    Tasktype=request.tasktype;//任务类型（1做号，2报名，3排队）
                    taskstatus=request.taskstatus;//任务状态0未完成  1完成
                    goinlistpassword=request.goinlistpassword;//coinlist密码(做号)
                    googleauxiliaryemail=request.googleauxiliaryemail;//谷歌辅助邮箱(做号)
                    googlepassword=request.googlepassword;//谷歌密码(做号)
                    countryen=request.countryen;//国家(英文)(报名)
                    countrycn=request.countrycn;//国家（中文）(报名)
                    registrationlink=request.registrationlink;//报名链接(报名)
                    answerJScornerbook=request.answerJScornerbook;//答题js角本(报名)
                    queuedlink=request.queuedlink;//排队链接(排队)
                    console.info("查看是否有数据类型:"+Tasktype +"状态:"+taskstatus);
                    if(Tasktype==2 && taskstatus == 0){
                        console.info("报名:"+countrycn );
                        answerJScornerbook=unescape(answerJScornerbook);
                        signUp(id,countryen,countrycn,registrationlink,answerJScornerbook,number);//报名 id 国家(英文)(报名) 国家（中文）(报名) 报名链接(报名) 答题js角本(报名)
                    }else if(Tasktype==3 && taskstatus == 0)
                    {
                        lineUp(id,queuedlink);//排队
                    }
                })
            }else{
                var span=$('span.u-colorGreen').text();
                console.info("检测1号否报名成功:" );
                if(span.indexOf(yse) != -1) {//检测1号活动是否报名成功
                    //查看是否报名成功 如果报名成功去修改状态
                    console.info("首页查询数据:"+url );
                    chrome.runtime.sendMessage({
                        type: "userInformation",
                        keyA: result.key
                    }, function (res) {
                    })
                    console.info("首页查询成功:"+url );
                    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                        id=request.Vid;//ID
                        number=request.number;//编号
                        Tasktype=request.tasktype;//任务类型（1做号，2报名，3排队）
                        taskstatus=request.taskstatus;//任务状态0未完成  1完成
                        goinlistpassword=request.goinlistpassword;//coinlist密码(做号)
                        googleauxiliaryemail=request.googleauxiliaryemail;//谷歌辅助邮箱(做号)
                        googlepassword=request.googlepassword;//谷歌密码(做号)
                        countryen=request.countryen;//国家(英文)(报名)
                        countrycn=request.countrycn;//国家（中文）(报名)
                        registrationlink=request.registrationlink;//报名链接(报名)
                        answerJScornerbook=request.answerJScornerbook;//答题js角本(报名)
                        queuedlink=request.queuedlink;//排队链接(排队)
                        console.info("查看是否有数据类型:"+Tasktype +"状态:"+taskstatus);
                        if(Tasktype==2 && taskstatus == 0){
                            console.info("报名:"+countrycn );
                            answerJScornerbook=unescape(answerJScornerbook);
                            signUp(id,countryen,countrycn,registrationlink,answerJScornerbook,number);//报名 id 国家(英文)(报名) 国家（中文）(报名) 报名链接(报名) 答题js角本(报名)
                        }else if(Tasktype==3 && taskstatus == 0)
                        {
                            lineUp(id,queuedlink);//排队
                        }
                    })
                }
            }


            /* */
        }else{

            //获取当前电脑外网ip
            if(url.indexOf(shouhu) != -1){
                //alert(document.getElementsByTagName("pre")[0].innerHTML)
                var ipc = document.getElementsByTagName("pre")[0].innerHTML;
                var str2 = ipc.replace(/"/g,"");//

                var ip = str2.match(/cip: (\S*), cid/)[1];

                console.info("根据ip获取账号==:"+ip);
                var AID='';//id
                var AccountNumber='';//编号
                var Email='';
                var Pass='';//邮箱
                var EncryptionPass='';//密码
                var SecretKey='';//密钥
                var CountryEnglish='';//国家(英文)
                var CountryChina='';//国家（中文）
                var IsStatus='';//状态（0正常，1死号
                var CreateTime='';//创建时间*!/
                //alert('login  multiFactor');
                chrome.runtime.sendMessage({
                    type: "userAccountPassword",
                    keyA: ip
                }, function (res) {
                })
                //登录账号
                if(url.indexOf(shouhu) != -1) {
                    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                        //获取到账号赋值并存入缓存
                        console.info("根据ip找到对应cl数据=:"+request.Email);
                        if (request.Email != '' && request.Email != null) {
                            //存入缓存
                            chrome.storage.local.set({ 'key': ip })
                            //3秒后刷新进行登录
                            /*setTimeout(() => {
                                location.reload();
                            }, 3000);*/
                        }
                    })
                    setTimeout(() => {
                        $(location).attr('href',"https://coinlist.co/login");
                    }, 5000);
                }
            }else{
                if (!result.key) {
                    let stm = setInterval(() => {
                        layer.msg("请在后台添加CL账号信息,并在插件保存编号", {
                            icon: 10
                        })
                        if(url.indexOf(login) != -1) {
                        }
                        setTimeout(() => {
                            if(url.indexOf(login) != -1) {
                                location.reload();
                            }
                            setTimeout(() => {
                            }, 5000);
                        }, 15000);
                    }, 15000);
                }
            }

        }
    }, 3000);
});

//登录
function loginEnroll(accountNumber,password) {
    if(url.indexOf(login) != -1){//如果包含login 输入账号密码 点击登录操作
        $(function () {
            console.info("登录1:");
            setTimeout(() => {//时间延迟
                console.info("登录2:");
                var userEmail=$('#user_email').val();//账号
                var userPassword =$('#user_password').val();//密码
                //alert(userEmail=='');
                if(userEmail!="" && userPassword!=null){
                    setTimeout(() => {//时间延迟
                        $('.js-submit').click();// login
                    }, 4600);
                }else{
                    if(userEmail=='' || userPassword ==''){
                        setTimeout(() => {//时间延迟
                            $('#user_email').val(accountNumber);
                        }, 1300);
                        setTimeout(() => {//时间延迟
                            $('#user_password').val(password);
                        }, 2600);
                        setTimeout(() => {//时间延迟
                            if(userRememberMe==1){//cl登录页面记住我选项 0关闭 1开启
                                $('#user_remember_me').click();//记住我按钮
                            }
                        }, 3600);
                        setTimeout(() => {//时间延迟
                            $('.js-submit').click();// login
                        }, 4600);
                    }
                }
            }, 6000);
        })
    }
}
//报名排队
function registrationQueue(){

}

//获取谷歌验证
function validator(key,id) {
    console.info('validator3'+multiFactor.indexOf(url)+'    '+url);
    if(url.indexOf(multiFactor)!= -1){//如果包含multi_factor就进行验证操作  获取谷歌验证码并点击确认按钮

        console.info('validator5'+key+'    '+url);
        if (id) {
            if(key!= null && key !=""){
                $(function () {
                    setTimeout(() => {//时间延迟
                        var validator = $('#multi_factor_authentication_totp_otp_attempt').val();//验证器
                        if(validator==''){
                            console.info(key.length+'validator5.='+key.length>2);
                            if(key.length>2){
                                setTimeout(() => {//时间延迟
                                    var Gkeys =key;
                                    var ctime = Math.floor((new Date() - 0) / 30000);
                                    var code = HOTP(Gkeys, ctime);
                                    $('#multi_factor_authentication_totp_otp_attempt').val(code)
                                }, 300);
                                layer.msg("检查"+id+"秘钥:"+key+"", {
                                    icon: 10
                                })
                                setTimeout(() => {//时间延迟
                                    $('.s-marginPullTop1').click();// login
                                }, 3500);
                            }else{
                                layer.msg("秘钥不正确请检查"+id+"秘钥:"+key+",是否正确", {
                                    icon: 10
                                })
                            }
                        }
                    }, 2000);
                })
            }else{
                layer.msg("编号:"+id+"谷歌秘钥不存在 请在后台添加秘钥。", {
                    icon: 10
                })
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
        }else{
            layer.msg("请输入coinlist账号编号。", {
                icon: 10
            })
        }
    }else{
        console.info('validator4'+multiFactor.indexOf(url));
    }
}

//报名
function signUp(id,countryen,countrycn,registrationlink,answerJScornerbook,number) {
    //答题脚本
    if(answerJScornerbook == "" || answerJScornerbook==null){
        //answerJScornerbook ="$(\"label[class='c-label c-label--inline s-marginLeft1']\").each(function(){var trim = $(this).text().replace(/\\s/g,\"\");if(trim=='6,000,000'.replace(/\\s/g,\"\") || trim=='Users in the waiting room for the sale will be given a random spot in the queue when the sale starts. Users who arrive after the sale starts for the sale will be placed behind those in the waiting room'.replace(/\\s/g,\"\") || trim=='Terra'.replace(/\\s/g,\"\")|| trim=='Smart contract infrastructure for staking'.replace(/\\s/g,\"\")|| trim=='BTC,ETH,USDC,USDT,ALGO,SOL'.replace(/\\s/g,\"\")|| trim=='Option 1: $4.50 per token, $500 limit. Option 2: $3.33 per token, $500 limit'.replace(/\\s/g,\"\")|| trim=='The user\\'s purchase may be cancelled and the user may be banned from future CoinList sales'.replace(/\\s/g,\"\")|| trim=='CoinList.co'.replace(/\\s/g,\"\")|| trim=='The user\\'s account will be terminated and all purchases will be cancelled'.replace(/\\s/g,\"\")){$(this).children('input').click();sleep(300);} setTimeout(function (){$(\".js-submit\").click();}, 8000); }); function sleep(number){var now = new Date();var exitTime = now.getTime() + number;while (true) {now = new Date();if(now.getTime() > exitTime) return}}\n";
    }

    //报名 id 国家(英文)(报名) 国家（中文）(报名) 报名链接(报名) 答题js角本(报名)

    if(url.indexOf(dashboard) != -1){//如果包含dashboard 进行操作   查看是否是首页 如果是进行转场报名地址

        var result=registrationlink.split(",");//查看是否有存在两个报名地址如
        console.info("检测报名地址:"+ result);
        if(result.length>=2){//存在两个报名地址
            console.info("两个报名地址");
            setTimeout(() => {//确认报名
                var calert=$('.c-alert').text();
                if(calert.indexOf(authorized)!= -1){
                    console.info("废号:" );
                    setTimeout(() => {//确认报名
                        chrome.runtime.sendMessage({
                            type: "updateTask",
                            keyA: id,
                            idType: "2"
                        }, function (res) {
                        })
                    }, 300);

                    setTimeout(() => {//确认报名
                        chrome.runtime.sendMessage({
                            type: "updateAccountStatus",
                            keyA: number,
                            idType: "1"
                        }, function (res) {
                        })
                    }, 600);

                }
            }, 1000);
            //报名地址
            setTimeout(() => {//确认报名
                $(location).attr('href',result[0]);//先进入活动一报名
            }, 3000);

        }else{//如果不存在两个报名地址  直接转场
            setTimeout(() => {//确认报名
                var calert=$('.c-alert').text();
                if(calert.indexOf(authorized)!= -1){

                    console.info("废号2:" );
                    setTimeout(() => {//确认报名
                        chrome.runtime.sendMessage({
                            type: "updateTask",
                            keyA: id,
                            idType: "2"
                        }, function (res) {
                        })
                    }, 300);

                    setTimeout(() => {//确认报名
                        chrome.runtime.sendMessage({
                            type: "updateAccountStatus",
                            keyA: number,
                            idType: "1"
                        }, function (res) {
                        })
                    }, 600);
                }
            }, 1000);
            console.info("一号报名地址");
            setTimeout(() => {//确认报名
                $(location).attr('href',registrationlink);
            }, 3000);

        }
    }
    if(url.indexOf("-1/") != -1 || url.indexOf("-2/") != -1){//两个活动报名进入
        console.info("两个活动报名:"+url );
        if(url.indexOf("-1/") != -1){//查看是否是  一号活动
            console.info("一号:/quiz" );
            if(url.indexOf(singhquiz) != -1){//报名选题目
                if(answerJScornerbook!=null && answerJScornerbook!=""){
                    setTimeout(() => {//报名题目答题
                        eval(answerJScornerbook);
                    }, 1000);
                   /* setTimeout(() => {//确认报名
                        $('.c-button')[0].click();
                    }, 5000);*/
                }
            }else if(url.indexOf(residence) != -1){//报名选地区
                console.info("报名选择地址:/residence" );
                setTimeout(() => {//选中国家下拉框
                    $("#forms_offerings_participants_residence_residence_country").find("option:contains('"+countryen+"')").attr("selected", "selected");
                }, 1000);
                setTimeout(() => {//选中 知道选项
                    $("#forms_offerings_participants_residence_residence_signature").click();
                }, 2000);
                setTimeout(() => {//确认按钮
                    $('.c-button')[0].click();
                }, 3500);
            }else if(url.indexOf(opnew) != -1){//报名确认选项opnew
                console.info("666666报名地址确认:/new" );
                setTimeout(() => {//确认按钮
                    $('.c-button')[0].click();
                }, 2000);
            }else if(url.indexOf(sales) != -1){//报名确认选项

                console.info("1报名地址确认:/onboarding" );
                setTimeout(() => {//确认按钮
                    $('.c-button')[0].click();
                }, 2000);
            }else{// 一号报名成功页面
                var result=registrationlink.split(",");
                var span=$('span.u-colorGreen').text();
                console.info("检测1号否报名成功:" );
                if(span.indexOf(yse) != -1){//检测1号活动是否报名成功
                    console.info("1号报名成功:" );
                    if(result.length>=1){//查看是否还有二号报名地址如果有转场二号报名地址
                        $(location).attr('href',result[1]);
                    }else{//只有活动1报名成功去修改 报名状态修改
                        setTimeout(() => {
                            chrome.runtime.sendMessage({
                                type: "updateTask",
                                keyA: id,
                                idType: "1"
                            }, function (res) {
                            })
                        }, 5000);
                    }
                }else{//不成功跳转首页 继续报名
                    console.info("两个地址1号报名失败等在跳转继续报名:" );
                    setTimeout(() => {//确认按钮
                        $(location).attr('href',sales);
                    }, 5000);
                }
            }
        }else if(url.indexOf("-2/") != -1){//二号活动
            console.info("二号:" );
            if(url.indexOf(singhquiz2) != -1){//报名选题目
                console.info("二号报名答题:/quiz" );
                if(answerJScornerbook!=null && answerJScornerbook!=""){
                    setTimeout(() => {//报名题目答题
                        eval(answerJScornerbook);
                    }, 1000);
                    /*setTimeout(() => {//确认报名
                        $('.c-button')[0].click();
                    }, 5000);*/
                }
            }else if(url.indexOf(residence2) != -1){//报名选地区
                console.info("2报名选择地址:/residence2" );
                setTimeout(() => {//选中国家下拉框
                    $("#forms_offerings_participants_residence_residence_country").find("option:contains('"+countryen+"')").attr("selected", "selected");
                }, 1000);
                setTimeout(() => {//选中 知道选项
                    $("#forms_offerings_participants_residence_residence_signature").click();
                }, 2000);
                setTimeout(() => {//确认按钮
                    $('.c-button')[0].click();
                }, 3500);
            }else if(url.indexOf(opnew2) != -1){//报名确认选项opnew
                console.info("2报名地址确认:/new" );
                setTimeout(() => {//确认按钮
                    $('.c-button')[0].click();
                }, 2000);
            }else if(url.indexOf(sales2) != -1){//报名确认选项
                console.info("2报名地址确认:/onboarding" );
                setTimeout(() => {//确认按钮
                    $('.c-button')[0].click();
                }, 2000);
            }else{// 一号报名成功页面
                var span=$('span.u-colorGreen').text();
                console.info("检测2号否报名成功:" );
                if(span.indexOf(yse) != -1){//检测1号活动是否报名成功
                    console.info("2号报名成功:" );
                    setTimeout(() => {
                        console.info("2号修改报名状态:" );
                        chrome.runtime.sendMessage({
                            type: "updateTask",
                            keyA: id,
                            idType: "1"
                        }, function (res) {
                        })
                    }, 5000);
                }else{//不成功跳转首页 继续报名
                    console.info("2号报名失败等在跳转继续报名:" );
                    setTimeout(() => {//确认按钮
                        $(location).attr('href',sales2);
                    }, 5000);
                }
            }
        }
    }else{
        console.info("一个活动报名:" );
        if(url.indexOf(singhquiz) != -1){//报名选题目
            console.info("一个活动报名选题:" );
            if(answerJScornerbook!=null && answerJScornerbook!=""){
                setTimeout(() => {//报名题目答题
                    eval(answerJScornerbook);
                }, 1000);
                /*setTimeout(() => {//确认报名
                    $('.c-button')[0].click();
                }, 5000);*/
            }
        }else if(url.indexOf(residence) != -1){//报名选地区
            console.info("一个活动报名报名选择地址:" );
            setTimeout(() => {//选中国家下拉框
                $("#forms_offerings_participants_residence_residence_country").find("option:contains('"+countryen+"')").attr("selected", "selected");
            }, 1000);
            setTimeout(() => {//选中 知道选项
                $("#forms_offerings_participants_residence_residence_signature").click();
            }, 2000);
            setTimeout(() => {//确认按钮
                $('.c-button')[0].click();
            }, 3500);
        }else if(url.indexOf(opnew) != -1){//报名确认选项opnew
            console.info("一个活动报名报名地址确认:" );
            setTimeout(() => {//确认按钮
                $('.c-button')[0].click();
            }, 2000);
        }else if(url.indexOf(sales) != -1){//报名确认选项

            console.info("一个活动报名报名地址确认:" );
            setTimeout(() => {//确认按钮
                $('.c-button')[0].click();
            }, 2000);
        }else{// 一号报名成功页面
            var result=registrationlink.split(",");
            var span=$('span.u-colorGreen').text();
            console.info("一个活动是否报名成功:" );
            if(span.indexOf(yse) != -1){//检测1号活动是否报名成功
                console.info("一个活动成功。"+result.length );
                if(result.length>=2){//查看是否还有二号报名地址如果有转场二号报名地址
                    $(location).attr('href',result[1]);
                }else{//只有活动1报名成功去修改 报名状态修改
                    console.info("一个活动报名成功:" );
                    setTimeout(() => {
                        chrome.runtime.sendMessage({
                            type: "updateTask",
                            keyA: id,
                            idType: "1"
                        }, function (res) {
                        })
                    }, 5000);
                }
            }else{//不成功跳转首页 继续报名
                console.info("一个报名地址1号报名失败等在跳转继续报名:" );
                setTimeout(() => {//确认按钮
                    console.info("一个报名地址1号报: 修改状态 "+number );
                    var calert=$('.c-alert').text();

                    if(calert.indexOf(authorized)!= -1){
                        setTimeout(() => {//确认报名
                            chrome.runtime.sendMessage({
                                type: "updateTask",
                                keyA: id,
                                idType: "2"
                            }, function (res) {
                            })
                        }, 300);
                        console.info("修改账号状态:"+number );
                        setTimeout(() => {//确认报名
                            chrome.runtime.sendMessage({
                                type: "updateAccountStatus",
                                keyA: number,
                                idType: "1"
                            }, function (res) {
                            })
                        }, 600);
                    }else{
                        $(location).attr('href',sales);
                    }
                }, 1000);
            }
        }
    }
}

//排队
function lineUp(id,queuedlink) {
    //id 排队地址
    if(url.indexOf(dashboard) != -1){//如果包含dashboard 进行操作
        $(function () {

            //排队地址
            setTimeout(() => {
                $(location).attr('href',queuedlink);
                chrome.runtime.sendMessage({
                    type: "updateTask",
                    keyA: id,
                    idType: "1"
                }, function (res) {
                })
            }, 2300);

        })
    }
}
//验号 检测账号是否能打新
function inspectionNumber() {
    if(1==2){
        if(url.indexOf(dashboard) != -1){//如果包含dashboard 进行操作
            $(function () {
                setTimeout(() => {//时间延迟
                    console.info('如果包含dashboard666='+url);
                    $(location).attr('href','https://coinlist.co/anchor-protocol/onboarding');
                    console.info('如果包含dashboard111='+$('.u-text-center').text());
                    var calert=$('.c-alert').text();

                    if(calert.indexOf(authorized)!= -1){
                        layer.msg("此账号不可打新。", {
                            icon: 10
                        })
                    }else{
                        $(location).attr('href','https://coinlist.co/account/security');
                    }
                }, 1000);
            })
        }
    }
}
//验号 检测账号是否超ip
function accountsecurityNumber() {
    if(1==2){
        if(url.indexOf(accountsecurity) != -1){//如果包含dashboard 进行操作
            $(function () {
                setTimeout(() => {//时间延迟
                    console.info('accountsecurityNumber='+url);
                    //$(location).attr('href','https://coinlist.co/account/security');
                    var re=$('.s-grid-colSm4').text();
                    var end =re.replace(/\nIP address/g,"")
                    end=end.replace(/\n\n/g,",")
                    end='['+end.substring(0, end.lastIndexOf(','))+']';
                    var endList='';
                }, 1000);
            })
        }
    }
}

//谷歌验证器解码
function HOTP(K, C)
{
    var key = sjcl.codec.base32.toBits(K);

    // Count is 64 bits long.  Note that JavaScript bitwise operations make
    // the MSB effectively 0 in this case.
    var count = [((C & 0xffffffff00000000) >> 32), C & 0xffffffff];
    var otplength = 6;

    var hmacsha1 = new sjcl.misc.hmac(key, sjcl.hash.sha1);
    var code = hmacsha1.encrypt(count);

    var offset = sjcl.bitArray.extract(code, 152, 8) & 0x0f;
    var startBits = offset * 8;
    var endBits = startBits + 4 * 8;
    var slice = sjcl.bitArray.bitSlice(code, startBits, endBits);
    var dbc1 = slice[0];
    var dbc2 = dbc1 & 0x7fffffff;
    var otp = dbc2 % Math.pow(10, otplength);
    var result = otp.toString();
    while (result.length < otplength)
    {
        result = '0' + result;
    }
    return result
}
//获取当前客户端ip
function getLocalhostIP(val){
    var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;

    if (RTCPeerConnection) (function () {
        var rtc = new RTCPeerConnection({iceServers:[]});
        if (1 || window.mozRTCPeerConnection) {
            rtc.createDataChannel('', {reliable:false});
        };

        rtc.onicecandidate = function (evt) {
            if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
        };
        rtc.createOffer(function (offerDesc) {
            grepSDP(offerDesc.sdp);
            rtc.setLocalDescription(offerDesc);
        }, function (e) { console.warn("offer failed", e); });


        var addrs = Object.create(null);
        addrs["0.0.0.0"] = false;
        function updateDisplay(newAddr) {
            if (newAddr in addrs) return;
            else addrs[newAddr] = true;
            var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
            for(var i = 0; i < displayAddrs.length; i++){
                if(displayAddrs[i].length > 16){
                    displayAddrs.splice(i, 1);
                    i--;
                }
            }
            return displayAddrs[0];
        }
        alert("ip:" + updateDisplay())
        function grepSDP(sdp) {
            var hosts = [];
            sdp.split('\r\n').forEach(function (line, index, arr) {
                if (~line.indexOf("a=candidate")) {
                    var parts = line.split(' '),
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') updateDisplay(addr);
                } else if (~line.indexOf("c=")) {
                    var parts = line.split(' '),
                        addr = parts[2];
                    updateDisplay(addr);
                }
            });
        }
    })();
    return val;
}

function getUserIP(onNewIP) {
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
            iceServers: []
        }),
        noop = function() {},
        localIPs = {},
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;

    function iterateIP(ip) {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    pc.createDataChannel("");

    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });

        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
        // An error occurred, so handle the failure to connect
    });

    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
}



function setInput(selector, text) {
    document.querySelector(selector).focus();
    document.execCommand('selectAll', false, null);
    document.execCommand('insertText', false, text);
    document.querySelector(selector).blur();
}
