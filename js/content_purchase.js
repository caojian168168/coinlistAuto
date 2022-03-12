/*********定时器 自动提交确认缴费******** */
$(window).load(function () {
    window.setTimeout(function () {
        purchase_working();
    }, 1000 * 10);
});

/**获取最大充值金额 */
function purchase_getmaxmoney() {

    var buy_max_money = 0;
    var txt_max_money = document.getElementById("investment_committed_amount");
    var txt_money_top = $(txt_max_money.parentNode.parentNode.parentNode);
    var lbl_money = txt_money_top.prev().get(0);
    //$100–$1,000
    var max_money_val = lbl_money.lastChild.previousSibling.innerHTML;
    var vales = max_money_val.split('$');
    var mmoney = vales[vales.length - 1];
    if (mmoney.indexOf(",") > -1) {
        buy_max_money = parseInt( mmoney.replace(",",""));
    }
    else {
        buy_max_money = parseInt(mmoney);
    }
    return buy_max_money;
        //$("#investment_committed_amount").val(max_money);
}



/**开始工作 */
function purchase_working() {
    var href = window.location.href;
    //sales.coinlist.co/agoric-option-1/sri-budiyati/purchase
    //https://sales.coinlist.co/agoric-option-2/kapil-parasar/purchase
    if (href.indexOf("sales.coinlist.co") > -1) {
        console.log("purchase_working start....");
        if (purchase_money()) {
            purchase_usdt();
            purchase_chooseall();
            purchase_first_confirm();

            //开始第二次确认
            purchase_start_thread();
        }
      
    }
}



/**设置最大金额 */
function purchase_money() {
    var isOK = false;
    //investment_committed_amount
    var max_money = purchase_getmaxmoney();//1000;
    if (max_money) {
        $("#investment_committed_amount").val(max_money);
        isOK = true;
    }
    return isOK;
}

/**支付选择Usdt */
function purchase_usdt() {
    //investment_currency_usdt
    $("#investment_currency_usdt").prop("checked", true);
}

/**全选复选框 */
function purchase_chooseall() {
    //investment_currency_usdt
    var checkes = document.getElementsByName("investment[agreement_ids][]");
    for (var i = 0; i < checkes.length; i++) {
        var ch = checkes[i];
        if (ch.tagName.toLowerCase() == "input" && ch.type == "checkbox") {
            ch.checked = true
        }
    }
}

/**第一次确认提交 */
function purchase_first_confirm() {
    var confirms = document.getElementsByClassName("js-submit-investment-form");
    if (confirms.length > 0) {
        console.log("purchase_first_confirm start....");
        confirms[0].click();
    }
}


var check_readimg_thread_time = null;//定时器执行
function purchase_start_thread() {
    //先注释 先清理在执行
    purchase_clear_thread();

    check_readimg_thread_time = window.setTimeout(function () {
        if (!purchase_second_confirm()) {
            purchase_start_thread();
        }
    }, 1000 * speed);
}

function purchase_clear_thread() {
    if (check_readimg_thread_time != null) {
        window.clearTimeout(check_readimg_thread_time);
    }
}


/**第二次确认提交 */
function purchase_second_confirm() {
    var isClick = false;
    var cotanier = document.getElementsByClassName("mfp-content")[0];
    if (cotanier) {
        //m.firstChild
        var son = cotanier.firstChild.nextSibling;
        if (son.style.display == "block") {
            var confirms = cotanier.getElementsByClassName("js-confirm_purchase");
            if (confirms.length > 0) {
                console.log("purchase_second_confirm start....");
                confirms[0].click();
                isClick = true;
            }
        }
    }
    return isClick;
    /*
    else {
        cotanier = document.getElementsByClassName("investments-new-confirmation")[0];
        if (cotanier) {
            var confirms = cotanier.getElementsByClassName("js-confirm_purchase");
            if (confirms.length > 0) {
                console.log("purchase_second_confirm start....");
                confirms[0].click();
            }
        }
    }
    */
}
