1. npm i webpack webpack-cli -D

2. "build": "webpack --mode=production src/index.js"

3. npm i html-webpack-plugin -D

4. npm i clean-webpack-plugin -D

5. 多入口

6. npm i style-loader css-loader less less-loader -D

7. npm i -D postcss-loader autoprefixer

8. 拆分css(4.0后推荐mini-css-extract-plugin)(所有css样式合并为一个css文件)
    npm i mini-css-extract-plugin -D
    (4.0之前使用extract-text-webpack-plugin)

9. 拆分多个css(extract-text-webpack-plugin@next)

10. file-loader url-loader

11. npm i @babel/core babel-loader @babel/preset-env -D

11. npm i @babel/ployfill -D
    entry: ["@babel/ployfill" path.resolve(__dirname, '../src/index.js')"]

12. npm i vue -S

13. npm i vue-loader vue-template-compiler vue-style-loader -D

14. npm i webpack-dev-server -D

15. "dev": "webpack-dev-server --config build/webpack.config.js --open"

16. 区分开发环境和生产环境

17. 开发环境webpack.dev.js 热更新，不需要代码压缩，开启sourcemap
    生产环境webpack.prod.js 压缩代码，合理的sourcemap，代码分割，提取css文件

18. 合并配置，优化css
    npm i webpack-merge optimize-css-assets-webpack-plugin -D

19. 拷贝静态资源
    npm i copy-webpack-plugin -D

20. 压缩js代码(原则上开启生产模式会自动压缩js代码，但是压缩CSS的时候会破坏原有压缩，故还是
    引入了该插件进行代码压缩)
    npm i uglifyjs-webpack-plugin -D

21. 打包时间优化
    webpack4默认mode为production会开启tree shaking去除无用代码
    缩小文件搜索范围
    别名alias
    include&exclude
    noParse(对于某些依赖库)
    extensions
    2578ms
    noParse: /lodash/ 2328ms => 713ms
    /\.vue$/ img include exclude => 698ms

22. happypack 开启多进程loader转换

23. npm i -D webpack-parallel-uglify-plugin增强代码压缩