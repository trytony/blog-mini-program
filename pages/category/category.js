
const app = getApp()

Page({

    data: {
        isLoad: true,
        categories: [],
        current_scroll: null,
        articlesOfCategory: [],
    },
    articleDetailTap(e) {
        wx.navigateTo({
            url: '../articleDetail/articleDetail?id=' + e.currentTarget.dataset.id,
        });
    },
    onLoad: function() {
        if (app.globalData.globalCategories.length > 0) {
            this.setData({
                categories: app.globalData.globalCategories,
                current_scroll: app.globalData.globalCategories[0].id,
            });
            this.getArticlesOfCategory(this.data.categories[0].id);
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
                        current_scroll: app.globalData.globalCategories[0].id,
                    })
                    this.getArticlesOfCategory(this.data.categories[0].id);
                }
            })
        }

        

    },

    getArticlesOfCategory(id) {
        wx.request({
            url: 'https://blog.zblzm.xyz/api/mini-program/articles?page=1&pageSize=99999&c_id=' + id,
            header: {
                'content-type': 'application/json'
            },
            success: res => {
                console.log(res.data.data);
                this.setData({
                    articlesOfCategory: res.data.data,
                })
                setTimeout(() => {
                    this.setData({
                        isLoad: false,
                    });
                }, 1500);
            }
        })
    },

    handleChangeScroll({ detail }) {
        this.setData({
            current_scroll: detail.key,
            isLoad: true,
        });
    
        this.getArticlesOfCategory(detail.key);
    }
})
