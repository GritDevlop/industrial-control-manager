# 工控资料聚合管理器 - 快速入门指南

## 🚀 快速开始（3分钟）

### 第一步：下载项目到本地

打开命令行（CMD或PowerShell），运行：

```bash
# 进入您想存放项目的目录
cd C:\Projects

# 克隆GitHub仓库
git clone https://github.com/GritHan/industrial-control-manager.git

# 进入项目目录
cd industrial-control-manager
```

**或者**：直接下载ZIP文件：
1. 访问 https://github.com/GritHan/industrial-control-manager
2. 点击绿色的 "Code" 按钮
3. 选择 "Download ZIP"
4. 解压到 `C:\Projects\industrial-control-manager`

---

## 📋 快速安装

### 如果您已有Node.js（v16+）

双击运行项目中的 `start.bat` 文件，它会自动检查环境并启动应用。

### 或者手动安装

1. **安装Node.js**（如果没有）
   - 访问 https://nodejs.org/
   - 下载并安装 LTS 版本

2. **安装依赖**
   ```bash
   npm install
   ```
   
   如果网络慢，使用：
   ```bash
   npm install --registry=https://registry.npmmirror.com
   ```

3. **启动应用**
   ```bash
   npm start
   ```

---

## 🎯 立即可用功能

✅ **三级目录分类** - 公司→类别→产品  
✅ **双模式切换** - 一键切换按公司/按类别显示  
✅ **产品卡片** - 直观展示产品信息  
✅ **资料管理** - 产品介绍、驱动、编程示例  
✅ **收藏功能** - 快速访问常用产品  
✅ **搜索功能** - 快速定位产品和资料  
✅ **主题切换** - 浅色/深色模式  
✅ **数据备份** - 一键备份和恢复  

---

## 📚 详细文档

- **[LOCAL_SETUP.md](file:///workspace/LOCAL_SETUP.md)** - 完整的本地开发指南
- **[INSTALL.md](file:///workspace/INSTALL.md)** - 安装和问题排查
- **[README.md](file:///workspace/README.md)** - 项目说明

---

## ❓ 遇到问题？

### 问题1：npm install 失败
```bash
# 清除缓存
npm cache clean --force

# 使用国内镜像
npm config set registry https://registry.npmmirror.com
npm install
```

### 问题2：Electron 下载慢
```bash
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
npm install
```

### 问题3：应用无法启动
1. 确认Node.js版本 >= 16
2. 删除 `node_modules` 文件夹
3. 重新运行 `npm install`
4. 再运行 `npm start`

---

## 🎉 成功标志

当您看到应用窗口打开，显示：
- 蓝色渐变的顶部标题栏
- 左侧显示分类目录树
- 中间显示产品卡片
- 底部显示状态栏

**恭喜！您已成功运行项目！**

---

## 💡 下一步

1. **体验功能**：浏览产品、添加收藏、切换主题
2. **添加数据**：点击添加按钮，创建自己的产品数据
3. **构建安装包**：运行 `npm run build` 生成安装程序
4. **自定义开发**：修改HTML/CSS/JS定制功能

---

**GitHub仓库**: https://github.com/GritHan/industrial-control-manager

**祝您使用愉快！** 🚀
