var gulp = require("gulp");
//压缩html

//gulp插件应用  下载插件--->取到插件--->应用插件
var htmlclean = require("gulp-htmlclean");

//压缩图片
var imageMin = require("gulp-imagemin");

//压缩js
var uglify = require("gulp-uglify");

//去掉js中的调试语句
var debug = require("gulp-strip-debug");

//将less转化成css
var less = require("gulp-less");


//压缩css
var cssClean = require("gulp-clean-css");

//加css前缀
//gulp-postcss  autoprefixer
var postCss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");

//开启服务器
var connect = require("gulp-connect")

var folder={
    src:"src/",
    dist:"dist/"
}

var devMod = process.env.NODE_ENV == "development";
//$ export NODE_ENV=development  设置环境变量

gulp.task("html", function() {
    var page = gulp.src(folder.src + "html/*")
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(htmlclean())
        }
        page.pipe(gulp.dest(folder.dist + "html/"))
})

gulp.task("image", function() {
    gulp.src(folder.src + "image/*")
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + "image/"))
})

// gulp.task("image", function() {
//     gulp.src(folder.src + "image/*")
//         .pipe(imageMin())
//         .pipe(gulp.dest(folder.dist + "image/"))
// })

gulp.task("css", function() {
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postCss([autoprefixer()]))
        if(!devMod){
            page.pipe(cssClean())
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("js", function() {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        if(!devMod){
            page.pipe(debug())
            .pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("sever",function() {
    connect.server({
        port:"8888",
        livereload:true
    })
})


gulp.task("watch",function(){
    gulp.watch(folder.src + "html/*",["html"])
    gulp.watch(folder.src + "css/*",["css"])
    gulp.watch(folder.src + "js/*",["js"])

})

gulp.task("default",["html","css","js","image","sever","watch"])


//gulp.src()
//gulp.dest()
//gulp.task()
//gulp.watch()