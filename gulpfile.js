let gulp = require("gulp");
let browserSync = require("browser-sync").create();
let concat = require("gulp-concat");



let scripts = [
    "./node_modules/angular/angular.js",
    "./node_modules/angular-material/angular-material.js",
    "./node_modules/angular-aria/angular-aria.min.js",
    "./node_modules/angular-messages/angular-messages.min.js",
    "./node_modules/angular-animate/angular-animate.min.js",
    "./node_modules/@uirouter/angularjs/release/angular-ui-router.js",
    "./node_modules/socket.io-client/dist/socket.io.js",
    "./client/index.js",
    "./client/**/*.js",

];


let styles = [
    "./node_modules/angular-material/angular-material.css",
    "./client/**/*.css"
];


let template = ["./client/**/*.html"];



gulp.task("css", function () {
    return gulp
        .src(styles)
        .pipe(concat("style.css"))
        .pipe(gulp.dest("./dist/css"))
});

gulp.task("scripts", function () {
    return gulp
        .src(scripts)
        .pipe(concat("script.js"))
        .pipe(gulp.dest("./dist/js"))
});

gulp.task("html", function () {
    return gulp
        .src(template)
        .pipe(gulp.dest("./dist"))
});

gulp.task("serve", function () {
    gulp.watch("./client/**/*.html", gulp.series("html"));
    gulp.watch("./client/**/*.js", gulp.series("scripts"));
    gulp.watch("./client/**/*.css", gulp.series("css"));
});

gulp.task("default", gulp.parallel("css", "scripts", "html", "serve"));