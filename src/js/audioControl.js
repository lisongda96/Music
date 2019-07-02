(function($, root){
    //play pause getAudio
    function AudioManger(src){
        //创建一个音频对象
        this.audio = new Audio();
        // this.src = src;
        //默认音频状态
        this.status = 'pause';
    }

    AudioManger.prototype = {
        play: function(){
            this.audio.play();
            this.status = 'play';
        },
        pause: function(){
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function(src){
            console.log(src);
            this.audio.src = src;
            this.audio.load();
        },
        playTo: function(t){
            this.audio.currentTime = t;
        }
    }


    root.audiomanger =new AudioManger();

})(window.Zepto,window.player || (window.player = {}))