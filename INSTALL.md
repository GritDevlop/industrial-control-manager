# 工控资料聚合管理器 - 安装指南

## 环境要求

- **操作系统**: Windows 10/11 64位专业版/企业版
- **硬件**: CPU i3+ / 内存 4GB+ / 硬盘 10GB+
- **网络**: 需要互联网连接（用于下载依赖和更新）
- **Node.js**: v16.0.0 或更高版本
- **npm**: v8.0.0 或更高版本

## 安装步骤

### 1. 安装 Node.js

如果尚未安装 Node.js，请从官网下载并安装：
- 下载地址: https://nodejs.org/
- 推荐安装 LTS（长期支持）版本
- 安装时勾选 "Add to PATH" 选项

验证安装：
```bash
node --version
npm --version
```

### 2. 克隆或下载项目

将项目文件复制到本地目录：
```bash
cd C:\Projects\IndustrialControlManager
```

### 3. 安装项目依赖

```bash
npm install
```

**注意**: 如果安装过程中遇到网络问题，可以尝试：
- 使用国内镜像：`npm install --registry=https://registry.npmmirror.com`
- 或配置淘宝镜像：
  ```bash
  npm config set registry https://registry.npmmirror.com
  npm install
  ```

### 4. 运行应用程序

开发模式运行：
```bash
npm run dev
```

或直接运行：
```bash
npm start
```

### 5. 构建 Windows 安装包

```bash
npm run build
```

构建完成后，安装包将位于 `dist` 目录：
- `工控资料管理器-Setup.exe` - Windows 安装程序
- `dist/win-unpacked/` - 便携版程序

## 常见问题

### Q1: npm install 失败，提示网络超时

**解决方案**:
1. 检查网络连接
2. 使用国内镜像：
   ```bash
   npm config set registry https://registry.npmmirror.com
   npm install
   ```
3. 或使用 VPN/代理

### Q2: Electron 下载失败

**解决方案**:
1. 设置 Electron 镜像：
   ```bash
   export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
   npm install
   ```
2. 在 Windows 上：
   ```bash
   set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
   npm install
   ```

### Q3: 杀毒软件阻止程序运行

**解决方案**:
1. 将项目目录添加到杀毒软件白名单
2. 或在安装前暂时关闭杀毒软件
3. 签名打包后的应用程序

### Q4: 应用程序无法启动

**解决方案**:
1. 检查是否安装了必要的 Visual C++ 运行时库
2. 下载并安装: https://aka.ms/vs/17/release/vc_redist.x64.exe
3. 查看日志文件: `%USERPROFILE%\AppData\Roaming\industrial-control-manager\logs\`

## 项目结构

```
├── main.js              # Electron 主进程代码
├── preload.js           # 预加载脚本（安全桥梁）
├── index.html           # 主界面 HTML/CSS/JS
├── package.json         # 项目配置和依赖
├── sample-data.json     # 示例产品数据
├── README.md            # 项目说明
└── INSTALL.md           # 本安装指南
```

## 开发说明

### 技术栈
- **Electron 28.x**: 跨平台桌面应用框架
- **electron-store**: 本地数据持久化
- **electron-log**: 日志记录
- **axios**: HTTP 请求

### 代码架构
```
┌─────────────────────────────────┐
│         Main Process            │
│  (main.js)                     │
│  - 窗口管理                     │
│  - 系统集成                     │
│  - IPC 通信处理                 │
└────────────┬────────────────────┘
             │
             │ contextBridge
             │ (preload.js)
             ↓
┌─────────────────────────────────┐
│        Renderer Process         │
│  (index.html)                   │
│  - 用户界面                     │
│  - 业务逻辑                     │
│  - 数据展示                     │
└─────────────────────────────────┘
```

### 数据存储位置
- **Windows**: `%APPDATA%\industrial-control-manager\`
- **配置文件**: `industrial-control-data.json`
- **日志文件**: `logs/` 目录

## 功能验证清单

安装完成后，请验证以下功能：

- [ ] 应用程序正常启动
- [ ] 左侧目录树正常显示
- [ ] 模式切换按钮正常工作
- [ ] 产品卡片显示正常
- [ ] 产品下拉列表展开/收起
- [ ] 资料详情显示
- [ ] 文件关联功能
- [ ] 网络下载功能
- [ ] 搜索功能
- [ ] 收藏功能
- [ ] 设置保存成功
- [ ] 主题切换（浅色/深色）
- [ ] 数据导入/导出
- [ ] 数据备份/恢复
- [ ] 系统托盘功能

## 技术支持

如遇到问题，请检查：
1. Windows 事件查看器中的应用程序日志
2. Electron 日志文件
3. Node.js 控制台错误信息

## 下一步

1. 配置存储路径（设置 → 存储路径）
2. 导入或创建产品数据
3. 开始使用工控资料管理器！
