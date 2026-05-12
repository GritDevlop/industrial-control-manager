# 工控资料聚合管理器 - 快速启动脚本

@echo off
chcp 65001 > nul
echo ========================================
echo   工控资料聚合管理器 - 快速启动
echo ========================================
echo.

:: 检查Node.js
echo [1/4] 检查Node.js环境...
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ 未找到Node.js，请先安装！
    echo    下载地址: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js已安装

:: 检查npm
echo.
echo [2/4] 检查npm...
npm --version > nul 2>&1
if errorlevel 1 (
    echo ❌ 未找到npm
    pause
    exit /b 1
)
echo ✅ npm已安装

:: 检查依赖
echo.
echo [3/4] 检查项目依赖...
if not exist "node_modules" (
    echo 📦 正在安装依赖，请稍候...
    npm install --registry=https://registry.npmmirror.com
    if errorlevel 1 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
) else (
    echo ✅ 依赖已安装
)

:: 启动应用
echo.
echo [4/4] 启动应用...
echo.
echo ========================================
echo   应用正在启动中...
echo ========================================
echo.

npm start

:: 如果应用退出，显示提示
if errorlevel 1 (
    echo.
    echo ❌ 应用启动失败，请检查错误信息
) else (
    echo.
    echo ✅ 应用已退出
)

pause
