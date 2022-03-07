//  1:歌曲搜索接口
// 请求地址:https://autumnfish.cn/search
// 请求方法:get
// 请求参数:keywords(查询关键字)
// 响应内容:歌曲搜索结果
// 2:歌曲url获取接口
// 请求地址:https://autumnfish.cn/song/url
// 请求方法:get
// 请求参数:id(歌曲id)
// 响应内容:歌曲url地址
// 3.歌曲详情获取
// 请求地址:https://autumnfish.cn/song/detail
// 请求方法:get
// 请求参数:ids(歌曲id)
// 响应内容:歌曲详情(包括封面信息)
// 4.热门评论获取
// 请求地址:https://autumnfish.cn/comment/hot?type=0
// 请求方法:get
// 请求参数:id(歌曲id,地址中的type固定为0)
// 响应内容:歌曲的热门评论
// 5.mv地址获取
// 请求地址:https://autumnfish.cn/mv/url
// 请求方法:get
// 请求参数:id(mvid,为0表示没有mv)
// 响应内容:mv的地址
var app = new Vue({
    el: "#player",
    data: {
        // 查询关键字
        query: "",
        // 歌曲数组
        musicList: [],
        // 歌曲地址
        musicUrl: "",
        // 歌曲封面
        musicCover: "",
        // 歌曲评论
        hotComments: [],
        // 动画播放状态
        isplaying: false,
        // 遮罩层的显示状态
        isShow: false,
        // mv地址
        mvUrl: ""
    },
    methods: {
        // 歌曲搜索
        searchMusic: function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function(response) {
                        console.log(response);
                        that.musicList = response.data.result.songs;
                    },
                    function(err) {}
                );
        },
        // 歌曲播放
        playMusic: function(musicId) {
            // console.log(musicId);
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function(response) {
                    console.log(response);
                    // console.log(response.data.data[0].url);
                    // that.musicUrl = 'https://music.163.com/song/media/outer/url?id=' + musicId + '.mp3';
                    that.musicUrl = response.data.data[0].url;
                }, function(err) {})

            // 歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function(response) {
                    console.log(response);
                    // console.log(response.data.songs[0].al.picUrl);
                    // that.musicCover = 'https://music.163.com/song/media/outer/detail?id=' + musicId;
                    that.musicCover = response.data.songs[0].al.picUrl;
                }, function(err) {})

            // 热门评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function(response) {
                    // console.log(response);
                    that.hotComments = response.data.hotComments;
                }, function(err) {})
        },
        // 歌曲播放
        play: function() {
            // console.log("play");
            this.isplaying = true;
        },
        // 歌曲暂停
        pause: function() {
            // console.log("pause");
            this.isplaying = false;
        },
        // 播放mv
        playMV: function(mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function(response) {
                    // console.log(response.data.data.url);
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                }, function(err) {})
        },
        // 隐藏
        hide: function() {
            this.isShow = false;
            this.mvUrl = "";
        }

    }
})

// 服务器返回的数据比较复杂时，获取的时候需要注意层次结构
// 通过审查元素快速定位到需要操纵的元素
// 在vue中通过v-bind操纵属性 简写为：
// 本地无法获取的数据，基本都会有对应的接口
// 在vue中通过v-for生成列表
// audio标签的play事件会在音频播放时触发
// audio标签的pause事件会在音频暂停时触发
// 通过对象的方式设置类名，类名生效与否取决于后面值的真假
// 不同的接口需要的数据是不同的，文档的阅读需要仔细
// 页面结构复杂之后，通过审查元素的方式去快速定位相关元素
// 响应式的数据都需要定义在data中定义