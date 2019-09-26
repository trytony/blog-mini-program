//index.js
//获取应用实例
const app = getApp();

const { $Message } = require('../components/iview/base/index');

Page({
    data: {
        isLoad: true,
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        articles: [],
        isLoadingMore: true,
        currentPage: 1,
        networkError: false,
    },
    articleDetailTap(e) {
        wx.navigateTo({
            url: '../articleDetail/articleDetail?id=' + e.currentTarget.dataset.id,
        });
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onShow: function() {
        wx.getNetworkType({
            success: res => {
                const networkType = res.networkType;
                if (networkType === 'none') {
                    $Message({
                        content: '网络连接失败，请检查网络',
                        type: 'error'
                    });
                }
            }
        })
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        if (app.globalData.globalArticles.length > 0) {
            this.setData({
                articles: app.globalData.globalArticles
            });
            setTimeout(() => {
                this.setData({
                    isLoad: false,
                });
            }, 1500);
        } else {
            wx.request({
                url: 'https://blog.zblzm.work/api/mini-program/articles',
                header: {
                    'content-type': 'application/json'
                },
                success: res => {
                    app.globalData.globalArticles = res.data.data;
                    this.setData({
                        articles: app.globalData.globalArticles,
                    })
                    setTimeout(() => {
                        this.setData({
                            isLoad: false,
                        });
                    }, 1500);
                }
            })
        }
    },
    onReachBottom: function() {
        var that = this;
        let {
            currentPage
        } = this.data;
        let newCurrentPage = currentPage + 1;
        that.setData({
            currentPage: newCurrentPage,
        })
        wx.request({
            url: 'https://blog.zblzm.work/api/mini-program/articles?page=' + newCurrentPage,
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                this.setData({
                    articles: this.data.articles.concat(res.data.data),
                });
            }
        })
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})