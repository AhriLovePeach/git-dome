// pages/movies/movie-detail/movie-detail.js
const util = require('../../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let movieId = options.id;
        const doubanBase = app.globalData.doubanBase;
        let movieDetailUrl = doubanBase + '/v2/movie/subject/' + movieId;
        this.getMovieDeatilDate(movieDetailUrl);
    },
    /**
     * 获取豆瓣电影详情api数据
     */
    getMovieDeatilDate: function(movieDetailUrl) {
        let theatersThis = this;
        wx.request({
            url: movieDetailUrl,
            header: {
                "Content-Type": "json"
            },
            method: 'GET',
            success: function(res) {
                console.log(res.data);
                theatersThis.processMovieDeatilData(res.data);
            },
            fail: function(res) {
                console.log(res);
            }
        })
    },
    /**
     * 处理接收的数据
     */
    processMovieDeatilData: function(data) {
        let director = {
            avatars: '',
            id: '',
            name: ''
        };
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatars = data.directors[0].avatars.large;
            }
            director.id = data.directors[0].id;
            director.name = data.directors[0].name;
        }
        let movies = {
            movieImg: data.images? data.images.large: "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentsCount: data.comments_count,
            collectCount: data.collect_count,
            year: data.year,
            genres: data.genres.join('、'),
            stars: util.convertToStarsArray(data.rating.stars),
            average: data.rating.average,
            director: director,
            casts: util.convertToCastString(data.casts),
            castsInfo: util.convertToCastInfos(data.casts),
            summary: data.summary
        };
        console.log(movies);
        this.setData({
            movies: movies,
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

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
    onReachBottom: function() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {}
})
