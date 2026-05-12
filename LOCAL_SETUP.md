# 工控资料聚合管理器 - 本地开发指南

## 📋 概述

本项目是一个完整的Windows桌面端工控资料聚合管理应用，基于Electron框架开发，支持跨平台运行。

## 🖥️ 本地环境要求

### 硬件要求
- **CPU**: Intel Core i3 或更高（推荐 i5+）
- **内存**: 4GB RAM（推荐 8GB+）
- **硬盘**: 10GB 可用空间

### 软件要求
- **操作系统**: Windows 10/11 64位
- **Node.js**: v16.0.0 或更高版本
- **npm**: v8.0.0 或更高版本

## 📥 第一步：克隆项目到本地

### 方法1：通过Git克隆（推荐）

1. 打开命令行提示符（CMD）或PowerShell
2. 进入您想存放项目的目录：
   ```bash
   cd C:\Projects
   ```

3. 克隆GitHub仓库：
   ```bash
   git clone https://github.com/GritHan/industrial-control-manager.git
   ```

4. 进入项目目录：
   ```bash
   cd industrial-control-manager
   ```

### 方法2：下载ZIP文件

1. 访问 GitHub仓库: https://github.com/GritHan/industrial-control-manager
2. 点击绿色的 "Code" 按钮
3. 选择 "Download ZIP"
4. 解压到您想要的目录

## 🔧 第二步：安装依赖

### 1. 安装Node.js（如果尚未安装）

1. 访问 https://nodejs.org/
2. 下载 LTS（长期支持）版本
3. 运行安装程序，按照提示完成安装
4. 重启命令行窗口以使环境变量生效

### 2. 验证Node.js安装

打开命令行，运行：
```bash
node --version
npm --version
```

应该显示类似：
```
v18.x.x
9.x.x
```

### 3. 安装项目依赖

在项目目录下运行：
```bash
npm install
```

**⚠️ 如果遇到网络问题**，使用国内镜像：
```bash
# 设置淘宝镜像
npm config set registry https://registry.npmmirror.com

# 重新安装
npm install
```

或者：
```bash
# 直接使用镜像安装
npm install --registry=https://registry.npmmirror.com
```

安装过程可能需要几分钟，请耐心等待。

## 🚀 第三步：运行应用

### 开发模式运行
```bash
npm run dev
```

### 生产模式运行
```bash
npm start
```

应用窗口应该会打开，您可以看到完整的界面。

## 📦 第四步：构建安装包

当您完成开发并准备分发时，可以构建Windows安装包：

### 构建完整的安装程序
```bash
npm run build
```

构建完成后，在 `dist` 目录下会生成：
- `工控资料管理器-Setup.exe` - Windows安装程序
- `dist/win-unpacked/` - 便携版程序（无需安装）

### 查看构建日志
如果构建失败，可以查看详细日志：
```bash
npm run build --verbose
```

## 📁 项目结构说明

```
industrial-control-manager/
├── main.js              # Electron主进程代码
│                      # - 窗口管理
│                      # - 系统集成
│                      # - IPC通信处理
│
├── preload.js           # 预加载脚本
│                      # - 安全桥梁
│                      # - API暴露
│
├── index.html           # 主界面
│                      # - HTML结构
│                      # - CSS样式
│                      # - JavaScript逻辑
│
├── package.json         # 项目配置
│                      # - 依赖声明
│                      # - 脚本命令
│                      # - 构建配置
│
├── sample-data.json     # 示例数据
│                      # - 8个工控产品示例
│
├── README.md            # 项目说明
├── INSTALL.md           # 安装指南
├── PREVIEW.md           # 预览说明
└── .gitignore           # Git忽略文件
```

## 🎯 核心功能模块

### 1. 三级目录分类系统
- **位置**: index.html 中的 `renderCategoryTree()` 函数
- **功能**: 公司→类别→产品 三级分类
- **切换**: 支持按公司或按类别两种显示模式

### 2. 产品卡片展示
- **位置**: index.html 中的 `renderProducts()` 函数
- **功能**: 卡片式产品展示，支持展开/收起
- **交互**: 点击卡片展开资料列表

### 3. 资料管理
- **位置**: index.html 中的 `renderModule()` 函数
- **功能**: 产品介绍、驱动软件、编程示例三大模块
- **支持**: 自定义资料添加、文件关联、网络下载

### 4. 数据持久化
- **库**: electron-store
- **位置**: main.js 中的 Store 配置
- **存储**: 用户配置、产品数据、收藏夹等

## 🛠️ 开发工具推荐

### 1. VS Code（推荐）
- 下载地址: https://code.visualstudio.com/
- 插件推荐:
  - ESLint - 代码检查
  - Prettier - 代码格式化
  - GitLens - Git增强

### 2. Git客户端
- Git for Windows: https://git-scm.com/
- SourceTree: https://www.sourcetreeapp.com/
- GitHub Desktop: https://desktop.github.com/

## 🔍 常见问题排查

### Q1: npm install 失败
**解决方案**:
1. 清除npm缓存: `npm cache clean --force`
2. 删除node_modules: `rmdir /s /q node_modules`
3. 使用镜像: `npm config set registry https://registry.npmmirror.com`
4. 重新安装: `npm install`

### Q2: Electron 下载失败
**解决方案**:
```bash
# 设置Electron镜像
export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
npm install
```

Windows:
```bash
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
npm install
```

### Q3: 应用启动报错
**检查项**:
1. Node.js版本是否 >= 16
2. 是否成功运行了 `npm install`
3. 查看错误日志信息
4. 重启命令行窗口

### Q4: 打包后无法运行
**解决方案**:
1. 确保所有依赖都正确安装
2. 检查 package.json 中的路径配置
3. 查看构建日志中的警告信息
4. 尝试以管理员身份运行

## 📚 学习资源

### Electron官方文档
- 文档: https://www.electronjs.org/docs
- 教程: https://www.electronjs.org/docs/tutorial
- API: https://www.electronjs.org/docs/api

### electron-store
- 文档: https://github.com/sindresorhus/electron-store

### electron-builder
- 文档: https://www.electron.build/

## 🔄 更新项目代码

当GitHub上有更新时，在本地同步：
```bash
git pull origin main
```

或者：
```bash
git fetch origin
git merge origin/main
```

## 💡 下一步开发建议

### 1. 自定义数据
编辑 `sample-data.json` 添加您自己的产品数据，或在应用中手动添加。

### 2. 主题定制
修改 `index.html` 中的 `:root` CSS变量，更改配色方案。

### 3. 功能扩展
- 添加更多资料类型
- 实现云同步功能
- 添加多语言支持
- 集成更多第三方服务

### 4. 性能优化
- 图片压缩和懒加载
- 数据缓存策略
- 代码分割和按需加载

## 📞 技术支持

如果您遇到问题：
1. 查看本文档的常见问题部分
2. 检查GitHub仓库的Issues
3. 查看控制台错误信息
4. 参考官方文档

## ✅ 检查清单

在开始使用前，请确认：

- [ ] Node.js已安装（版本 >= 16）
- [ ] npm已安装（版本 >= 8）
- [ ] 成功克隆了项目
- [ ] 运行 `npm install` 成功
- [ ] 运行 `npm start` 成功打开应用
- [ ] 了解了项目结构
- [ ] 知道如何获取帮助

## 🎉 恭喜！

如果您完成了以上所有步骤，恭喜您！您已经成功在本地设置了工控资料聚合管理器项目。现在可以开始开发、测试和定制您的应用了！

**祝您开发愉快！** 🚀
