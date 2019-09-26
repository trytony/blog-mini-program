var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
    data: {
        isLoad: true,
        articleDetail: {},
    },
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: 'https://blog.zblzm.work/api/mini-program/articles/' + options.id,
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                this.setData({
                    isLoad: false,
                    articleDetail: res.data.data,
                });
                var article = res.data.data.originalContent.html;
                WxParse.wxParse('article', 'md', article, that, 5);
                wx.setNavigationBarTitle({
                    title: res.data.data.title
                })
            }
        })
    },
})