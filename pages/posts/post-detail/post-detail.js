// pages/posts/post-detail/post-detail.js
const postsData = require('../../../data/post-data.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlayingMusic : false, //判断音乐的初始状态
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let postId = options.id;
        // this.data.currentPostId = postId;
        let postData = postsData.postList[postId];
        this.setData({
            currentPostId: postId,
            postData : postData
        });
        let postsCollected = wx.getStorageSync('postsCollected');
        //获取收藏的 postsCollected
        if (postsCollected) {
            let postCollected = postsCollected[postId];
            if (postCollected) {
                this.setData({
                    collected: postCollected
                });
            }
        }else {
            let postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('postsCollected', postsCollected);
        };
        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId){
            this.setData({
                isPlayingMusic : true,
            })
        }
        this.setMusicMonitor();
    },
    /**
     * 监听音乐是否播放事件
     */
    setMusicMonitor: function(event) {
        let audioThis = this;
        wx.onBackgroundAudioPlay(function () {
            audioThis.setData({
                isPlayingMusic: true,
            });
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = audioThis.data.currentPostId;
        });
        wx.onBackgroundAudioPause(function () {
            audioThis.setData({
                isPlayingMusic: false,
            });
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        });
        wx.onBackgroundAudioStop(function () {
            audioThis.setData({
                isPlayingMusic: false,
            });
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        });
    },
    /**
     * 点击是否音乐播放
     */
    onMusicTap: function (event) {
        console.log(this.data);
        let currentPostId = this.data.currentPostId;
        let music_array = postsData.postList[currentPostId].music;
        let isPlayingMusic = this.data.isPlayingMusic;
        if (isPlayingMusic == false) {
            wx.playBackgroundAudio({
                dataUrl: music_array.url,
                title: music_array.title,
                coverImgUrl: music_array.coverImg,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
            });
            this.setData({
                isPlayingMusic : true
            })
        }else {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
        }
    },
    /**
     * 点击是否收藏 
     */
    onCollectionTap: function (event) {
        var postsCollected = wx.getStorageSync('postsCollected');
        var postCollected = postsCollected[this.data.currentPostId];
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected;
        // wx.setStorageSync('postsCollected', postsCollected);
        // this.setData ({
        //     collected: postCollected
        // });
        this.showToast(postsCollected, postCollected);
        // this.showModal(postsCollected, postCollected);
    },
    /**
     * showToast
     */
    showToast: function (postsCollected, postCollected) {
        wx.setStorageSync('postsCollected', postsCollected);
        this.setData({
            collected: postCollected
        });
        wx.showToast({
            title: postCollected ? '收藏成功' : '取消成功',
        });
    },
    /**
     * showModal
     */
    showModal: function (postsCollected, postCollected) {
        let that = this;
        wx.showModal({
            title: '收藏',
            content: postCollected ? '确定收藏本文章？' :'确定取消收藏本文章？',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '',
            confirmText: '确定',
            confirmColor: '',
            success: function (res) {
                if (res.confirm == true) {
                    wx.setStorageSync('postsCollected', postsCollected);
                    that.setData({
                        collected: postCollected
                    });
                }
            },
            fail: function (res) { },
            complete: function (res) { },
        })
    },
    /**
     * 点击是否分享
     */
    onShareTap: function (event) {
        wx.showActionSheet({
            itemList: [
                '分享到微信好友',
                '分享到QQ好友',
                '分享到QQ空间',
                '分享到朋友圈',
                '分享到微博'
            ],
            itemColor: '',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})