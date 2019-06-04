Page({
    data: {
        spinShow: true,
        switch: true,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isLoad: true
    },
    onLoad() {
        // 查看是否授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            console.log(res.userInfo)
                        }
                    })
                }
            }
        })
    },

    onShow: function () {
        setTimeout(() => {
            this.setData({
                isLoad: false,
            });
        }, 2000);
    },

    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
    },

    onSwitchChange({ detail }) {
        const value = detail.value;
        this.setData({
            switch: value,
            spinShow: !value
        });
    }
});