var root = window.player;
// var nowIndex = 0;
var dataList;
var len;
var audio = root.audiomanger;
var control;
var timer;
function getDate(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            // console.log(data);
            dataList = data;
            len = data.length;
            control = new root.controlIndex(len);
            // root.render(data[0]);
            // root.pro.renderAllTime(dataList[0].duration)
            // audio.getAudio(data[0].audio);
            bindEvent();
            bindTouch();

            root.playList.renderList(data);
            controlmanager = new root.controlIndex(data.length);
            songList = data;

            $('body').trigger('play:change', 0);
        },
        error: function () {
            console.log("error")
        }
    })
}

function bindEvent() {
    $('body').on('play:change', function (e, index) {
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        root.pro.renderAllTime(dataList[index].duration)
        if (audio.status == 'play') {
            audio.play();
            rotated(0);
        }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            'transform': 'rotateZ(0deg)',
            'transition': 0
        })
    })

    $('.prev').on('click', function () {
        // if (nowIndex == 0) {
        //     nowIndex = len - 1;
        // } else {
        //     nowIndex--;
        // }
        var i = control.prev();
        $('body').trigger('play:change', i);
        root.pro.start(0);
        if(audio.status = 'pause'){
            root.pro.stop()
        }
        // audio.getAudio(dataList[i].audio);
        // root.render(dataList[i]);
        // if(audio.status == 'play'){
        //     audio.play();
        // }
    });
    $('.next').on('click', function () {
        // if (nowIndex == len - 1) {
        //     nowIndex = 0;
        // } else {
        //     nowIndex++;
        // }
        var i = control.next();
        $('body').trigger('play:change', i);
        root.pro.start(0);
        if(audio.status = 'pause'){
            root.pro.stop()
        }
        // audio.getAudio(dataList[i].audio);
        // root.render(dataList[i]);
        // if(audio.status== 'play'){
        //     audio.play();
        // }
    });
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
        // console.log(audio)
    })
    $(".list").on("click",function(){
        root.playList.show(controlmanager);
    })
}

function bindTouch() {
    var $spot = $('.spot');
    var bottom = $('.pro-bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    $spot.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {

        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per >= 0 && per <= 1) {
            var time = per * dataList[control.index].duration;
            root.pro.update(per);
            audio.playTo(time);
            audio.play();
            audio.status = 'play';
            $('.play').addClass('playing');
        }
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per >= 0 && per <= 1) {
            root.pro.start(per);
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        }
    })
}

function rotated(deg) {
    clearInterval(timer)
    // var deg = 0;
    deg = +deg
    timer = setInterval(function () {
        deg += .1;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all is ease-in'
        })
    }, 9);
}

getDate("../mock/data.json")

//信息+图片渲染到页面上
//点击按钮
//音频的播放与暂停 切歌
//图片旋转
//列表切歌 
//进度条运动与拖拽
