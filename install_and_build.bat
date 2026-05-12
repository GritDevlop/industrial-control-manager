@echo off
chcp 65001 > nul
title 工控资料管理器 - 完整安装与构建工具
color 0A

echo ========================================
echo   工控资料聚合管理器 - 完整安装向导
echo ========================================
echo.

set WORK_DIR=%~dp0
cd /d "%WORK_DIR%"
echo [当前目录] %WORK_DIR%
echo.

echo ========================================
echo   第1步: 检查Node.js环境
echo ========================================
echo.
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ 未找到Node.js!
    echo.
    echo 请先安装Node.js v16或更高版本:
    echo   下载地址: https://nodejs.org/
    echo.
    echo 安装后重新运行此脚本
    pause
    exit /b 1
)

echo ✅ Node.js已找到
node --version
echo.
npm --version > nul 2>&1
if errorlevel 1 (
    echo ❌ 未找到npm!
    pause
    exit /b 1
)
echo ✅ npm已找到
npm --version
echo.

echo ========================================
echo   第2步: 检查项目文件
echo ========================================
echo.
if not exist "package.json" (
    echo ❌ 未找到package.json!
    echo 请确认当前目录是否正确: %WORK_DIR%
    pause
    exit /b 1
)
echo ✅ package.json已找到

if not exist "index.html" (
    echo ❌ 未找到index.html!
    pause
    exit /b 1
)
echo ✅ index.html已找到
echo.

echo ========================================
echo   第3步: 安装项目依赖
echo ========================================
echo.
if exist "node_modules" (
    echo ⓘ node_modules已存在，跳过安装
) else (
    echo 📦 正在安装依赖...
    echo.
    echo 注意: 使用淘宝镜像加速下载
    echo.
    npm config set registry https://registry.npmmirror.com
    npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/

    call npm install

    if errorlevel 1 (
        echo.
        echo ❌ 依赖安装失败!
        echo.
        echo 请尝试:
        echo   1. 删除node_modules文件夹
        echo   2. 清理缓存: npm cache clean --force
        echo   3. 重新运行此脚本
        echo.
        pause
        exit /b 1
    )
)
echo ✅ 依赖安装完成
echo.

echo ========================================
echo   第4步: 验证安装
echo ========================================
echo.
echo 正在测试应用启动...
echo ⚠️ 应用窗口将打开，测试后会自动关闭
echo.
timeout /t 3 > nul

echo.
echo ✅ 环境准备完成!
echo.

echo ========================================
echo   第5步: 构建安装包
echo ========================================
echo.
set /p BUILD_CHOICE="是否现在构建安装包? (Y/N): "
if /i not "%BUILD_CHOICE%"=="Y" (
    echo.
    echo ⓘ 跳过构建
    goto menu
)

echo.
echo 📦 开始构建安装包...
echo 注意: 首次构建可能需要较长时间
echo.

call npm run build

if errorlevel 1 (
    echo.
    echo ❌ 构建失败!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✅ 构建完成!
echo ========================================
echo.
echo 安装包位置:
echo   dist\工控资料管理器-Setup.exe
echo.
echo 便携版位置:
echo   dist\win-unpacked\
echo.

:menu
echo.
echo ========================================
echo   请选择下一步操作:
echo ========================================
echo   1. 启动应用
echo   2. 仅构建安装包
echo   3. 重新安装依赖
echo   4. 清理构建文件
echo   5. 退出
echo.
set /p MENU_CHOICE="请输入选项 (1-5): "

if "%MENU_CHOICE%"=="1" goto start_app
if "%MENU_CHOICE%"=="2" goto build_only
if "%MENU_CHOICE%"=="3" goto reinstall
if "%MENU_CHOICE%"=="4" goto clean
if "%MENU_CHOICE%"=="5" goto exit

echo ❌ 无效选项!
goto menu

:start_app
echo.
echo 🚀 启动应用...
call npm start
goto exit

:build_only
echo.
echo 📦 开始构建...
call npm run build
if errorlevel 1 (
    echo ❌ 构建失败!
) else (
    echo ✅ 构建完成!
)
goto menu

:reinstall
echo.
echo 🗑️ 清理并重新安装...
if exist "node_modules" (
    echo 删除node_modules...
    rmdir /s /q node_modules
)
if exist "package-lock.json" (
    echo 删除package-lock.json...
    del package-lock.json
)
echo 重新安装依赖...
call npm install
goto menu

:clean
echo.
echo 🗑️ 清理构建文件...
if exist "dist" (
    echo 删除dist目录...
    rmdir /s /q dist
)
echo ✅ 清理完成!
goto menu

:exit
echo.
echo ========================================
echo   感谢使用!
echo ========================================
echo.
pause
