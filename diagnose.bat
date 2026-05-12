@echo off
chcp 65001 > nul
title 工控资料管理器 - 环境诊断工具
color 0B

echo ========================================
echo   工控资料管理器 - 环境诊断工具
echo ========================================
echo.

set WORK_DIR=%~dp0
set STATUS=0

echo [工作目录] %WORK_DIR%
echo.
echo ========================================
echo   系统信息
echo ========================================
echo.
systeminfo | findstr /B /C:"OS Name" /C:"OS Version"
echo.
echo 处理器:
wmic cpu get name | findstr /V "Name"
echo.
echo 内存:
wmic OS get TotalVisibleMemorySize | findstr /V "TotalVisibleMemorySize"
echo.

echo ========================================
echo   检查Node.js和npm
echo ========================================
echo.
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js未安装
    set /a STATUS=%STATUS%+1
    echo.
    echo 请访问: https://nodejs.org/
    echo 下载并安装Node.js LTS版本
) else (
    echo ✅ Node.js:
    node --version
    echo.
    npm --version > nul 2>&1
    if errorlevel 1 (
        echo ❌ npm未找到
        set /a STATUS=%STATUS%+1
    ) else (
        echo ✅ npm:
        npm --version
    )
)
echo.

echo ========================================
echo   检查项目文件
echo ========================================
echo.

set /a FILE_COUNT=0

set FILES=package.json index.html main.js preload.js README.md
for %%f in (%FILES%) do (
    if exist "%WORK_DIR%%%f" (
        echo ✅ %%f
    ) else (
        echo ❌ %%f
        set /a STATUS=%STATUS%+1
    )
)
echo.

if exist "%WORK_DIR%node_modules" (
    echo ✅ node_modules 存在
    echo.
    echo node_modules内容:
    dir /b "%WORK_DIR%node_modules" | findstr /V "^\." | findstr /V "^$" | findstr /V "^$"
) else (
    echo ⚠️ node_modules 不存在，请先运行安装
)
echo.

echo ========================================
echo   检查网络连接
echo ========================================
echo.
ping -n 2 npmmirror.com > nul
if errorlevel 1 (
    echo ❌ 无法访问npmmirror.com
    echo.
    echo 请检查网络连接
) else (
    echo ✅ 网络连接正常
)
echo.

echo ========================================
echo   检查GitHub仓库
echo ========================================
echo.
git status > nul 2>&1
if errorlevel 1 (
    echo ⚠️ 当前目录不是git仓库
) else (
    git log -1 --oneline
)
echo.

echo ========================================
echo   诊断总结
echo ========================================
echo.
if %STATUS% equ 0 (
    echo ✅ 环境检查通过，可以开始开发!
    echo.
    echo 建议操作:
    echo   1. 运行 npm install
    echo   2. 运行 npm start
    echo.
) else (
    echo ❌ 发现 %STATUS% 个问题需要解决
    echo.
    echo 请根据上方提示修复问题
    echo.
)
echo.

set /p NEXT="按任意键继续，或输入Q退出: "
if /i not "%NEXT%"=="Q" (
    echo.
    echo 尝试自动修复...
    echo.
    goto fix
)
goto end

:fix
echo.
echo ========================================
echo   尝试自动修复
echo ========================================
echo.

if not exist "node_modules" (
    echo 1. 安装依赖...
    npm config set registry https://registry.npmmirror.com
    npm config set ELECTRON_MIRROR https://npmmirror.com/mirrors/electron/
    npm install
)

echo.
echo ========================================
echo   修复完成
echo ========================================
echo.

:end
echo.
echo 按任意键退出...
pause > nul
