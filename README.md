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
