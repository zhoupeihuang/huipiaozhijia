var gulp = require('gulp'),
	less = require("gulp-less"),
	imagemin = require("gulp-imagemin"),
	fileinclude = require('gulp-file-include'),
	cssmin = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	autoprefixer = require('gulp-autoprefixer');

/**
 * js css html压缩
 * 暂不启用
 * */
gulp.task('testCssmin', function() {
	gulp.src('css/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('./css'));
});
gulp.task('jsmin', function() {
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
});
gulp.task('testHtmlmin', function() {
	var options = {
		removeComments: true, //清除HTML注释
		collapseWhitespace: true, //压缩HTML
		collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
		minifyJS: true, //压缩页面JS
		minifyCSS: true //压缩页面CSS
	};
	gulp.src('./*.html')
		.pipe(htmlmin(options))
		.pipe(gulp.dest('./'));
});
//自动前缀
gulp.task('testAutoFx', function() {
	gulp.src('css/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'Android >= 4.0'],
			cascade: true, //是否美化属性值 默认：true 像这样：
			//-webkit-transform: rotate(45deg);
			//        transform: rotate(45deg);
			remove: true //是否去掉不必要的前缀 默认：true 
		}))
		.pipe(gulp.dest('./css'));
});
//图片压缩
gulp.task("testImagemin", function() {
	gulp.src("images/*.{png,jpg,ico,gif}")
		.pipe(imagemin({
			optimizationLevel: 7,
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest("./images"));
});
//less
gulp.task("testLess", function() {
	gulp.src("./css/less/*.less")
		.pipe(less())
		.pipe(gulp.dest("./css"));
});
//页面动态化构建
gulp.task('fileinclude', function() {
	// 
	gulp.src('./tpl/*.html') //需要处理的文件路径
		.pipe(fileinclude({ //执行的方法  prefix前缀 basepath是传入参数
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('./')); //生成的目录 ./代表根目录
});

//watch 模式
gulp.task('watch',function(){
	gulp.watch("./css/*.css",['testLess']);
    gulp.watch("./css/less/*.less",['testLess']);
    gulp.watch('./src/*.html',['fileinclude']);
    gulp.watch('./tpl/*.html',['fileinclude']);
})


//gulp.task("default",['testCssmin','jsmin','testHtmlmin','testAutoFx','testImagemin','testLess','fileinclude']);
gulp.task('default', ['fileinclude','testLess','testImagemin','testAutoFx']);