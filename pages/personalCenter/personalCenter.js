Page({
    data: {
        spinShow: true,
        switch: true
    },
    onSwitchChange({ detail }) {
        const value = detail.value;
        this.setData({
            switch: value,
            spinShow: !value
        });
    }
});