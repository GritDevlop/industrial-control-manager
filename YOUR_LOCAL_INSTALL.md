# E:\Mcode\industrial-control-manager-main 本地安装与构建指南

## 📍 您的项目位置

**项目目录**: `E:\Mcode\industrial-control-manager-main`

✅ 您已成功下载项目到本地！

---

## 🚀 最快方式：使用自动化脚本

### 第一步：将脚本复制到项目目录

由于我无法直接访问您的E盘，请：

1. 从您的GitHub项目下载最新的脚本文件，或者
2. 手动创建以下脚本（稍后会更新到GitHub仓库）

### 第二步：运行自动化安装脚本

在您的项目目录 `E:\Mcode\industrial-control-manager-main` 中：

1. 打开文件夹，找到或创建 `install_and_build.bat` 脚本
2. **右键点击** → **以管理员身份运行**
3. 按照屏幕提示操作

脚本会自动：
- ✅ 检查Node.js环境
- ✅ 配置国内镜像源
- ✅ 安装项目依赖
- ✅ 构建Windows安装包

---

## 📋 详细分步安装

如果您想手动操作，或者脚本遇到问题，请按以下步骤：

### 🔧 第一步：检查Node.js环境

1. 按 `Win + R`，输入 `cmd`，打开命令提示符
2. 输入：
   ```bash
   node --version
   ```
3. 如果显示 `v16.x.x` 或更高版本 → 继续
4. 如果提示"不是内部命令" → 需要安装Node.js

### 📥 如果没有Node.js：

1. 访问：https://nodejs.org/
2. 下载 **LTS（长期支持）** 版本（Windows安装包，64位）
3. 运行安装程序，一路"下一步"
4. **重启命令行窗口**
5. 再次运行 `node --version` 验证

### 📦 第二步：安装项目依赖

1. 在项目目录下打开命令行：
   - 方法1：在文件夹中，按住Shift键 + 右键 → 选择"在此处打开PowerShell窗口"
   - 方法2：打开CMD，输入 `E: && cd Mcode\industrial-control-manager-main`

2. 配置国内镜像（加速下载）：
   ```bash
   npm config set registry https://registry.npmmirror.com
   npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
   ```

3. 安装依赖：
   ```bash
   npm install
   ```

   ⏱️ 首次安装可能需要 5-15 分钟，请耐心等待！

4. 验证安装：
   ```bash
   dir node_modules
   ```
   应该能看到一堆文件夹，表示安装成功！

### 🏃 第三步：运行应用测试

```bash
npm start
```

应用窗口应该会打开，显示完整界面！

### 📦 第四步：构建Windows安装包

```bash
npm run build
```

构建完成后：
- 📁 `dist\工控资料管理器-Setup.exe` - Windows安装程序（可分发）
- 📁 `dist\win-unpacked\` - 便携版程序（无需安装，直接运行）

---

## 💡 快速命令速查

| 命令 | 作用 |
|------|------|
| `npm install` | 安装依赖 |
| `npm start` | 启动应用 |
| `npm run dev` | 开发模式启动 |
| `npm run build` | 构建安装包 |
| `node --version` | 查看Node版本 |
| `npm --version` | 查看npm版本 |

---

## ❓ 常见问题解决

### 问题1：npm install 很慢或失败

**解决方案A**：使用淘宝镜像
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

**解决方案B**：删除并重新安装
```bash
npm cache clean --force
rmdir /s /q node_modules
del package-lock.json
npm install
```

### 问题2：Electron下载失败

**解决方案**：
```bash
npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
npm install
```

或者设置环境变量：
```bash
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
npm install
```

### 问题3：应用无法启动

**检查项**：
1. 确认Node.js版本 >= 16
2. 删除 `node_modules` 重新 `npm install`
3. 查看错误信息，截图发给我

### 问题4：构建失败

**检查项**：
1. 确保磁盘空间充足
2. 关闭杀毒软件或添加信任
3. 查看 `dist` 目录是否有部分文件生成
4. 查看构建日志

### 问题5：Git相关问题

您的项目可能是下载的ZIP文件而非Git克隆，这没关系！
- 只要项目文件完整就可以正常安装和构建
- Git是可选的（用于版本管理）

---

## 📝 确认项目文件完整性

请确认您的项目目录中有这些文件：

- ✅ `package.json` - 项目配置
- ✅ `index.html` - 主界面
- ✅ `main.js` - Electron主进程
- ✅ `preload.js` - 预加载脚本
- ✅ `README.md` - 项目说明
- ✅ `sample-data.json` - 示例数据
- ✅ `INSTALL.md` - 安装指南
- ✅ `QUICKSTART.md` - 快速入门

**缺少文件？**
- 请从GitHub重新下载完整项目：
  https://github.com/GritHan/industrial-control-manager/archive/refs/heads/main.zip

---

## 🎯 推荐的操作顺序（完美）

### 完美安装流程：

```bash
# 1. 确认项目目录
E:
cd Mcode\industrial-control-manager-main

# 2. 配置镜像源
npm config set registry https://registry.npmmirror.com
npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/

# 3. 安装依赖（耐心等待）
npm install

# 4. 测试运行（可选）
npm start

# 5. 构建安装包
npm run build
```

### 时间预估：

- 安装依赖：5-15分钟（取决于网络）
- 构建安装包：3-8分钟
- 总计：10-25分钟

---

## 🛠️ 诊断与修复

如果遇到问题，运行诊断工具：
```bash
# 如果有diagnose.bat文件，直接运行
diagnose.bat

# 或者按以下步骤手动检查
```

---

## 🎉 成功标志

完成后您应该能看到：

1. ✅ `node_modules` 文件夹存在
2. ✅ `npm start` 能打开应用窗口
3. ✅ `npm run build` 在 `dist` 目录生成 `工控资料管理器-Setup.exe`

---

## 📞 需要帮助？

如果您遇到问题，请提供：
1. 错误的完整信息或截图
2. 您的Node.js版本（`node --version`）
3. 问题发生在哪个步骤

我会帮您解决！

---

**祝您安装顺利！** 🚀

*如果一切顺利，您很快就会有一个可以分发的Windows安装包！*
