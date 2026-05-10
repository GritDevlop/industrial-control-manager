# Web预览版访问说明

## 当前状态

✅ **Web服务器正在运行中！**

服务器地址：`http://localhost:8000`

## 可访问的文件

1. **简单预览版**（推荐首先访问）
   - 地址：http://localhost:8000/simple-preview.html
   - 包含完整功能列表和界面预览

2. **完整UI预览版**
   - 地址：http://localhost:8000/web-preview.html
   - 包含完整的交互界面和功能演示

3. **Electron版界面**
   - 地址：http://localhost:8000/index.html
   - 完整的Electron桌面应用界面（需要Electron环境）

## 错误信息说明

如果您在控制台看到以下错误：
```
加载数据失败: {}
初始化失败: {}
```

这些错误来自之前打开的 `index.html` 页面，因为它尝试调用 Electron API，这在纯浏览器环境中不可用。

**解决方法是**：访问上面列出的 `simple-preview.html` 或 `web-preview.html`，这些是专门为浏览器环境设计的预览版本。

## 如何访问

1. 打开浏览器
2. 访问：http://localhost:8000/simple-preview.html
3. 即可看到预览内容

## 文件位置

所有文件都在 `/workspace/` 目录下：
- simple-preview.html - 简单预览
- web-preview.html - 完整UI预览
- index.html - Electron桌面版
- test.html - 测试页面

## 服务器信息

- 端口：8000
- 协议：HTTP
- 状态：运行中
- 文件根目录：/workspace/
