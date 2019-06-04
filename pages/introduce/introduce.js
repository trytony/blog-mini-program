Page({
    data: {
        isLoad: true
    },
    onShow: function () {
        setTimeout(() => {
            this.setData({
                isLoad: false,
            });
        }, 2000);
    },
})
