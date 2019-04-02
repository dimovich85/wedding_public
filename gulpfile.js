const gulp = require('gulp');
const sass = require('gulp-sass');
const less = require('gulp-less');
const autopref = require('gulp-autoprefixer');
const brwSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const gcmq = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const minJS = require('gulp-uglify');




var config = {
	src: './src',
	
	css: {
		src: '/css/*.css',
		dest: '/css'
	},

	img: {
        src: '/img/*',
        dest: '/img/'
    },

	html: {
		src: '/*.html',
		dest: '/'

	},

	js: {
		src: '/js/*.js',
		dest: '/js'
	},

	sass: {
		src_scss: "/precss/*.scss",
		src_sass: "/precss/*.sass",
		dest: "/css",
	},

	less: {
		src: '/precss/*.less',
		dest: '/css'
	},

	backup: {
		srcH: '/*.html',
		srcC: '/css/*.css',
		srcJ: '/js/*js',
		dest: 'src-copy',
	},

	test: {
		src: 'src/test/*.html',
	},

};

gulp.task('prefix', function(){
	gulp.src(config.src+config.css.src)
      	.pipe(autopref({
            browsers: ['> 0.01%'],
            cascade: false
       }))
      	.pipe(gulp.dest(config.src + config.css.dest+'/style-pref'))

});

gulp.task('backup', function(){

	gulp.src(config.src+config.backup.srcH)
		.pipe(gulp.dest(config.backup.dest));
	gulp.src(config.src+config.backup.srcC)
		.pipe(gulp.dest(config.backup.dest));
	gulp.src(config.src+config.backup.srcJ)
		.pipe(gulp.dest(config.backup.dest));
});

gulp.task('sass', function(){
	gulp.src(config.src+config.sass.src_sass)
		.pipe(sass()).on('error', sass.logError)
		.pipe(gcmq())
		.pipe(sourcemaps.init())
		.pipe(autopref({
            browsers: ['> 0.01%'],
            cascade: false
       		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.src+config.sass.dest))
		.pipe(brwSync.reload({
			stream: true
		}));
});

gulp.task('scss', function(){
	gulp.src(config.src+config.sass.src_scss)
		.pipe(sass())
		.pipe(gcmq())
		.pipe(sourcemaps.init())
		.pipe(autopref({
            browsers: ['> 0.01%'],
            cascade: false
       		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.src+config.sass.dest))
		.pipe(brwSync.reload({
			stream: true
		}));
});

gulp.task('less', function(){
	gulp.src(config.src+config.less.src)
		.pipe(less())
		.pipe(gcmq())
		.pipe(sourcemaps.init())
		.pipe(autopref({
            browsers: ['> 0.01%'],
            cascade: false
       		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.src+config.less.dest))
		.pipe(brwSync.reload({
			stream: true
		}));
});

gulp.task('html', function(){
	gulp.src(config.src+config.html.src)
	.pipe(gulp.dest(config.src+config.html.dest))
	.pipe(brwSync.reload({
			stream: true
		}));
});

gulp.task('js', function(){
	gulp.src(config.src+config.js.src)
	.pipe(gulp.dest(config.src+config.js.dest))
	.pipe(brwSync.reload({
			stream: true
		}));
});
// New
gulp.task('build', ['backup'], function(){
	gulp.src(config.src + config.css.src)
		.pipe(gcmq())
		.pipe(sourcemaps.init())
		.pipe(autopref({
            browsers: ['> 0.01%'],
            cascade: false
       }))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(config.src + config.css.dest))
});

gulp.task('bwSync', function(){
	brwSync.init({
        server: {
            baseDir: config.src
        }
    });
});

gulp.task('css', function(){
	gulp.src(config.src+config.css.src)
	.pipe(gulp.dest(config.src+config.css.dest))
	.pipe(brwSync.reload({
		stream: true
	}));

});

gulp.task('watch-css', ['bwSync'], function(){
	gulp.watch(config.src+config.css.src, ['css']);
	gulp.watch(config.src+config.html.src, ['html']);
});

gulp.task('watch-precss', ['bwSync'], function(){
	gulp.watch(config.src+config.less.src, ['less']);
	gulp.watch(config.src+config.sass_sass.src, ['sass']);
	gulp.watch(config.src+config.sass_scss.src, ['sass']);
});


gulp.task('watch', ['bwSync'], function(){
	gulp.watch(config.src+config.html.src, ['html']);
	gulp.watch(config.src+config.sass.src_scss, ['scss']);
	gulp.watch(config.src+config.sass.src_sass, ['sass']);
	gulp.watch(config.src+config.less.src, ['less']);
	gulp.watch(config.src+config.js.src, ['js']);
});

gulp.task('img', function(){
    gulp.src(config.src + config.img.src)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.src + config.img.dest));
});
