# Blitz Web

基于 Create React App 和 腾讯云 Cloudbase 的静态网站脚手架

## 步骤

1. 拷贝 `.env.example` 为 `.env.development.local` 和 `.env.production.local`
2. 根据注释说明填写环境变量
3. （强烈建议部署在子路径）如果需要部署在子路径，务必使用 `homepage` ，具体可以 [参考](https://create-react-app.dev/docs/deployment/#building-for-relative-paths)

## 注意事项

+ 因为单入口且使用静态文件托管，因此必须使用 **哈希路由**
