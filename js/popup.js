// var bg = chrome.extension.getBackgroundPage()
chrome.storage.local.get(["key"], function (result) {
    if (result.key) {
        $('.key').val(result.key)
    }
})


$(function () {
    $('.save').click(function () {
        let key = $('.key').val()
        if (!!key) {
            chrome.storage.local.set({ 'key': key })
            layer.msg("保存成功", {
                icon: 1
            })
        } else {
            layer.msg("请先填写密钥", {
                icon: 2
            })
        }
    })
})