const gulp = require("gulp");
const ts = require("gulp-typescript");
const JSON_FILES = ["src/*.json", "src/**/*.json"];

// pull in the project Typescript config
const tsProject = ts.createProject("tsconfig.json");

gulp.task("scripts", () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest("dist"));
});

gulp.task("assets", () => {
    return gulp.src(JSON_FILES).pipes(gulp.dest("dist"));
});

gulp.task("default", ["watch", "assets"]);