// pages/posts/post.js
const postsData = require('../../data/post-data.js');
Page({

    /**
   * 页面的初始数据
   */
    data: {

    },

    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function(options) {
        this.setData({
            posts_content: postsData.postList
        });
    },
    /**
     * 跳转新闻详情页面
     */
    toPostDetail: function (event) {
        let postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
            url: './post-detail/post-detail?id=' + postId,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function() {
        console.log(this.data);
    },

    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function() {},

    /**
   * 生命周期函数--监听页面隐藏
   */
    onHide: function() {},

    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload: function() {},

    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function() {},

    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function() {
        console.log(1111);
    },

    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function() {}
})
