
/*****排队筛查********/
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    //var html = document.documentElement.innerHTML;
    if (request == "getdom") {//undefined
        // 先判断变量是否存在
        if ($('#MainPart_lbUsersInLineAheadOfYou').length > 0) {
            console.log("addListener: ");
            var html = document.getElementById("MainPart_lbUsersInLineAheadOfYou").innerHTML;
            console.log("addListener html: " + html);
            sendResponse(html);
        }
    }
});