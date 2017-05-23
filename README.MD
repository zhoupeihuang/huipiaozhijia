
# 逝者如斯夫，不舍昼夜

## 利用gulp的插件 gulp-file-include

### 制作前端模板复用功能
---

### 项目下载后

```
npm install --save-dev  
```


### 启动项目

```
npm test 或者 gulp -w
```


### 项目使用 gulp-file-include插件


```
**gulpfile.js**
var gulp = require('gulp');  
var fileinclude  = require('gulp-file-include');  

gulp.task('fileinclude', function() {  
// 
	gulp.src('./tpl/*.html')//需要处理的文件路径
        .pipe(fileinclude({  //执行的方法  prefix前缀 basepath是传入参数
          prefix: '@@',  
          basepath: '@file'  
        }))  
    .pipe(gulp.dest('./'));  //生成的目录 ./代表根目录
});  

gulp.task('default', ['fileinclude']); 
```




```
**index.html页面使用**
@@include("../src/slide.html") //引入slide.html
		@@include("./../src/breadCrumb.html",{ //引入面包屑 并传参
			"BRName1": "IB8网", 
			"BRName2": "", 
			"BRName3": "", 
			"breadCrumb": { 
				"BRURL1": "index.html", 
				"BRURL2": "", 
				"BRURL3": "" 
				} 
				}) 
```


```
**breadCrumb.html 对于参数的判断以及处理**
<section id="breadCrumb">
	<div class="breadCrumbBox">
		当前位置：
		<a href="@@breadCrumb.BRURL1">@@BRName1</a>
		@@if (BRName2!='') {
		><a href="@@breadCrumb.BRURL2" class="breaNow">@@BRName2</a>
		}
		@@if (BRName3!='') {
		><a href="@@breadCrumb.BRURL3" class="breaNow">BRName3</a>
		}
	</div>
</section>
```

### 官方地址
https://www.npmjs.com/package/gulp-file-include
### 参考地址
http://blog.csdn.net/u011500781/article/details/52311763
