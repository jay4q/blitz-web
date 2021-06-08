# Blitz Web

基于 Create React App 和 腾讯云 Cloudbase 的静态网站脚手架

## 步骤

1. 拷贝 `.env.example` 为 `.env.development.local` 和 `.env.production.local`
2. 根据注释说明填写环境变量
3. 要求部署在 cloudbase 静态托管的子路径下，需要根据产线服务域名和路径编辑 `./package.json` 下的 `homepage` ，具体可以 [参考](https://create-react-app.dev/docs/deployment/#building-for-relative-paths)

### 常用流程脚本

``` bash
# 开发
yarn dev
# 本地打包并验证
yarn build && yarn serve
# 部署至 cloudbase
yarn deploy
```

## Todo

+ [ ] 路由懒加载时的占位UI

## 注意事项

+ 因为单入口且使用静态文件托管，因此必须使用 **哈希路由**

### 关于依赖

+ `node-vibrant` 目前锁定在 3.1.6 版本，待 [官方](https://github.com/Vibrant-Colors/node-vibrant) 升级完成后再升级
