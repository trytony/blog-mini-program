var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({
  data: {
    isLoad: true,
    //article将用来存储towxml数据
    article: {},
    articleDetail: {},
  },
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'https://blog.zblzm.xyz/api/mini-program/articles/' + options.id,
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        this.setData({
          isLoad: false,
          articleDetail: res.data.data,
        });
        var article = res.data.data.originalContent.raw;
        //将markdown内容转换为towxml数据
        console.log(article);
        console.log(res.data.data.originalContent);
        //将markdown内容转换为towxml数据
        let data = app.towxml.toJson(
          res.data.data.originalContent.raw,               // `markdown`或`html`文本内容
          'markdown'              // `markdown`或`html`
        );

        //设置文档显示主题，默认'light'
        // data.theme = 'dark';
        //设置数据
        that.setData({
          article: data
        });
        // WxParse.wxParse('article', 'html', article, that, 5);
        wx.setNavigationBarTitle({
          title: res.data.data.title
        })
      }
    })
  },
})