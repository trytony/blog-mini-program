
const app = getApp()

Page({

    data: {
        isLoad: true,
        categories: [],
    },

    onLoad: function() {
        if (app.globalData.globalCategories.length > 0) {
            this.setData({
                categories: app.globalData.globalCategories
            });
            setTimeout(() => {
                this.setData({
                    isLoad: false,
                });
            }, 1500);
        } else {
            wx.request({
                url: 'https://blog.zblzm.xyz/api/mini-program/categories',
                header: {
                    'content-type': 'application/json'
                },
                success: res => {
                    app.globalData.globalCategories = res.data.data;
                    this.setData({
                        categories: app.globalData.globalCategories,
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

    handleChangeScroll({ detail }) {
        this.setData({
            current_scroll: detail.key
        });
    }
})
