// pages/posts/movies/movies.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        searchMovies: {},
        containerShow: true,
        searchPanelShow: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const doubanBase = app.globalData.doubanBase;
        let inTheatersUrl = doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
        let comingSoonUrl = doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
        let top250Url = doubanBase + '/v2/movie/top250' + '?start=0&count=3';
        this.getMovieListDate(inTheatersUrl, 'inTheaters', '正在热映');
        this.getMovieListDate(comingSoonUrl, 'comingSoon', '即将上映');
        this.getMovieListDate(top250Url, 'top250', '豆瓣TOP250');
    },
    /**
     * 输入框聚焦时触发
     */
    onBindFocus: function () {
        this.setData({
            containerShow: false,
            searchPanelShow: true,
        });
    },
    /**
     * 输入框失去焦点时触发
     */
    onBindBlur: function (event) {
        let text = event.detail.value;
        const bindBlurBase = app.globalData.doubanBase;
        let searchUrl = bindBlurBase + '/v2/movie/search?q=' + text;
        this.getMovieListDate(searchUrl, 'searchMovies', '');
    },
    /**
     * 是否点击搜索的xx按钮
     */
    onCancelImgTap: function () {
        this.setData({
            containerShow: true,
            searchPanelShow: false,
        });
    },
    /**
     * 获取豆瓣api数据
     */
    getMovieListDate: function (url, settedKey, categoryTitle) {
        let theatersThis = this;
        wx.request({
            url: url,
            header: {
                "Content-Type": "json"
            },
            method: 'GET',
            success: function (res) {
                theatersThis.processDoubanData(res.data.subjects, settedKey, categoryTitle);
            },
            fail: function (res) {
                console.log(res);
            }
        })
    },
    /**
     * [处理接受的数据]
     * @param  {[type]} moviesDouban [description]
     * @param  {[type]} settedKey    [description]
     * @return {[type]}              [description]
     */
    processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
        let movies = [];
        for (let idx in moviesDouban) {
            let subject = moviesDouban[idx];
            let title = subject.title; // 电影名字
            if (title.length > 6) {
                title = title.substring(0, 6) + '...';
            }
            let temp = {
                movieId: subject.id, // 电影id
                title: title, // 电影名字
                average: subject.rating.average, // 电影评分
                stars: util.convertToStarsArray(subject.rating.stars), // 电影评分
                coverageUrl: subject.images.large, // 电影海报
            }
            movies.push(temp);
        }
        let readyData = {};
        readyData[settedKey] = {
            movies: movies,
            categoryTitle: categoryTitle,
        };
        this.setData(readyData);
    },
    /**
     * [点击查看更多]
     * @param  {[type]} event [description]
     * @return {[type]}       [description]
     */
    onMoreTap: function (event) {
        let category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: './more-movie/more-movie?category=' + category,
            success: function (res) { },
            fail: function (res) { },
        })
    },
    /**
     * 点击跳转电影详情页面
     */
    onMovieDetail: function (event){
        let id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: './movie-detail/movie-detail?id=' + id,
            success: function(res) {},
            fail: function(res) {},
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () { },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () { },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () { },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () { },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { }
})
