// pages/movies/more-movie/more-movie.js
const util = require('../../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: {},
        category: '',
        start: 0,
        dataUrl: '',
        isEmpty: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let start = this.data.start;
        const doubanBase = app.globalData.doubanBase;
        let category = options.category;
        this.setData({ category: category });
        let dataUrl = '';
        switch (category) {
            case '正在热映':
                dataUrl = doubanBase + '/v2/movie/in_theaters?start=';
                break;
            case '即将上映':
                dataUrl = doubanBase + '/v2/movie/coming_soon?start=';
                break;
            case '豆瓣TOP250':
                dataUrl = doubanBase + '/v2/movie/top250?start=';
                break;
        };
        this.setData({ dataUrl: dataUrl });
        this.getMoreMoviesData(dataUrl, start);
    },
    /**
     * 获取更多电影信息
     */
    getMoreMoviesData: function (dataUrl, start) {
        let theatersThis = this;
        wx.request({
            url: dataUrl + start,
            header: {
                "Content-Type": "json"
            },
            method: 'GET',
            success: function (res) {
                theatersThis.processDoubanData(res.data.subjects);
            },
            fail: function (res) {
                console.log(res);
            }
        });
    },
    /**
     * [处理接受的数据]
     * @param  {[type]} moviesDouban [description]
     * @return {[type]}              [description]
     */
    processDoubanData: function (moviesDouban) {
        let movies = [];
        let start = this.data.start;
        let isEmpty = this.data.isEmpty;
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
        let totalMovies = {};
        if (!isEmpty) {
            totalMovies = this.data.movies.concat(movies);
        } else {
            totalMovies = movies;
            this.data.isEmpty = false;
        }
        this.setData({
            movies: totalMovies,
            start: start + 20
        });
        console.log(totalMovies);
    },
    /**
     * 滚动到底部/右边，会触发 scrolltolower 事件
     */
    onScrolltoLower: function (event) {
        let start = this.data.start;
        let dataUrl = this.data.dataUrl;
        this.getMoreMoviesData(dataUrl, start);
    },
    /**
     * 点击跳转电影详情页面
     */
    onMovieDetail: function (event) {
        let id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../movie-detail/movie-detail?id=' + id,
            success: function (res) {},
            fail: function (res) {},
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (event) {
        wx.setNavigationBarTitle({ title: this.data.category })
    },

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
