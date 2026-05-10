const { app, BrowserWindow, ipcMain, dialog, shell, Menu, Tray, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
const log = require('electron-log');
const Store = require('electron-store');

log.transports.file.level = 'info';
log.transports.console.level = 'debug';
log.info('Application starting...');

const store = new Store({
  name: 'industrial-control-data',
  defaults: {
    settings: {
      theme: 'light',
      classificationMode: 'company-first',
      rootStoragePath: app.getPath('documents'),
      autoUpdate: true,
      updateFrequency: 'weekly',
      downloadSpeedLimit: 0,
      fontSize: 'medium',
      cardDisplayCount: 20,
      defaultModuleVisibility: {
        productIntro: true,
        driverSoftware: true,
        programmingExamples: true
      }
    },
    classification: {
      mode: 'company-first',
      tree: {}
    },
    favorites: [],
    searchHistory: [],
    backups: []
  }
});

let mainWindow;
let tray = null;

function createWindow() {
  log.info('Creating main window...');

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    show: false,
    backgroundColor: '#f5f5f5'
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    log.info('Window ready to show');
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    log.info('Main window closed');
    mainWindow = null;
  });

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  createMenu();
  log.info('Main window created successfully');
}

function createMenu() {
  const template = [
    {
      label: '文件',
      submenu: [
        {
          label: '导入配置',
          click: () => mainWindow.webContents.send('menu-import')
        },
        {
          label: '导出配置',
          click: () => mainWindow.webContents.send('menu-export')
        },
        { type: 'separator' },
        {
          label: '备份数据',
          click: () => mainWindow.webContents.send('menu-backup')
        },
        {
          label: '恢复数据',
          click: () => mainWindow.webContents.send('menu-restore')
        },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.isQuitting = true;
            app.quit();
          }
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: '视图',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '检查更新',
          click: () => mainWindow.webContents.send('menu-check-update')
        },
        { type: 'separator' },
        {
          label: '关于',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: '关于',
              message: '工控资料聚合管理器 v1.0.0',
              detail: '面向工控行业研发、调试、运维人员的资料聚合管理工具\n\n功能：资料分类、查询、管理、自动更新'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createTray() {
  const iconPath = path.join(__dirname, 'assets/icon.png');
  if (!fs.existsSync(iconPath)) {
    log.warn('Tray icon not found, skipping tray creation');
    return;
  }

  const icon = nativeImage.createFromPath(iconPath);
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '显示主窗口',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.focus();
        }
      }
    },
    {
      label: '检查更新',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
          mainWindow.webContents.send('menu-check-update');
        }
      }
    },
    { type: 'separator' },
    {
      label: '退出',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('工控资料管理器');
  tray.setContextMenu(contextMenu);

  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

ipcMain.handle('get-store-data', async (event, key) => {
  try {
    const data = store.get(key);
    log.info(`Store data retrieved: ${key}`);
    return data;
  } catch (error) {
    log.error(`Error getting store data: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('set-store-data', async (event, key, value) => {
  try {
    store.set(key, value);
    log.info(`Store data saved: ${key}`);
    return true;
  } catch (error) {
    log.error(`Error setting store data: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('select-directory', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

ipcMain.handle('select-files', async (event, filters) => {
  const fileFilters = filters || [
    { name: '所有文件', extensions: ['*'] },
    { name: '可执行文件', extensions: ['exe'] },
    { name: '压缩包', extensions: ['zip', 'rar', '7z'] },
    { name: 'PDF文档', extensions: ['pdf'] },
    { name: 'Word文档', extensions: ['docx', 'doc'] },
    { name: 'CAD文件', extensions: ['dwg', 'dxf'] }
  ];

  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile', 'multiSelections'],
    filters: fileFilters
  });

  if (!result.canceled) {
    return result.filePaths;
  }
  return [];
});

ipcMain.handle('open-file', async (event, filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      await shell.openPath(filePath);
      log.info(`Opened file: ${filePath}`);
      return true;
    } else {
      log.warn(`File not found: ${filePath}`);
      return false;
    }
  } catch (error) {
    log.error(`Error opening file: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('open-file-location', async (event, filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      shell.showItemInFolder(filePath);
      log.info(`Opened file location: ${filePath}`);
      return true;
    } else {
      log.warn(`File not found: ${filePath}`);
      return false;
    }
  } catch (error) {
    log.error(`Error opening file location: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('download-file', async (event, url, savePath) => {
  try {
    const axios = require('axios');
    const https = require('https');
    const http = require('http');

    log.info(`Downloading file from: ${url} to ${savePath}`);

    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
      timeout: 60000,
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      httpAgent: new http.Agent({ rejectUnauthorized: false })
    });

    const directory = path.dirname(savePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    const writer = fs.createWriteStream(savePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        log.info(`Download completed: ${savePath}`);
        resolve(true);
      });
      writer.on('error', (error) => {
        log.error(`Download error: ${error.message}`);
        reject(error);
      });
    });
  } catch (error) {
    log.error(`Download failed: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('get-file-info', async (event, filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      return {
        exists: true,
        size: stats.size,
        modified: stats.mtime
      };
    }
    return { exists: false };
  } catch (error) {
    log.error(`Error getting file info: ${error.message}`);
    return { exists: false, error: error.message };
  }
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return content;
    }
    return null;
  } catch (error) {
    log.error(`Error reading file: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('write-file', async (event, filePath, content) => {
  try {
    const directory = path.dirname(filePath);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    fs.writeFileSync(filePath, content, 'utf8');
    log.info(`File written: ${filePath}`);
    return true;
  } catch (error) {
    log.error(`Error writing file: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('copy-file', async (event, source, destination) => {
  try {
    const directory = path.dirname(destination);
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
    fs.copyFileSync(source, destination);
    log.info(`File copied from ${source} to ${destination}`);
    return true;
  } catch (error) {
    log.error(`Error copying file: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('delete-file', async (event, filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      log.info(`File deleted: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    log.error(`Error deleting file: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('export-data', async (event, data) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    title: '导出配置',
    defaultPath: `industrial-data-${Date.now()}.json`,
    filters: [
      { name: 'JSON文件', extensions: ['json'] }
    ]
  });

  if (!result.canceled && result.filePath) {
    try {
      fs.writeFileSync(result.filePath, JSON.stringify(data, null, 2), 'utf8');
      log.info(`Data exported to: ${result.filePath}`);
      return true;
    } catch (error) {
      log.error(`Export failed: ${error.message}`);
      throw error;
    }
  }
  return false;
});

ipcMain.handle('import-data', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: '导入配置',
    filters: [
      { name: 'JSON文件', extensions: ['json'] }
    ],
    properties: ['openFile']
  });

  if (!result.canceled && result.filePaths.length > 0) {
    try {
      const content = fs.readFileSync(result.filePaths[0], 'utf8');
      const data = JSON.parse(content);
      log.info(`Data imported from: ${result.filePaths[0]}`);
      return data;
    } catch (error) {
      log.error(`Import failed: ${error.message}`);
      throw error;
    }
  }
  return null;
});

ipcMain.handle('create-backup', async () => {
  try {
    const backupData = store.store;
    const backupPath = path.join(app.getPath('userData'), 'backups');

    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupPath, `backup-${timestamp}.json`);

    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2), 'utf8');
    log.info(`Backup created: ${backupFile}`);

    const backups = store.get('backups') || [];
    backups.push({
      path: backupFile,
      timestamp: new Date().toISOString()
    });
    store.set('backups', backups);

    return true;
  } catch (error) {
    log.error(`Backup failed: ${error.message}`);
    throw error;
  }
});

ipcMain.handle('show-message', async (event, options) => {
  return await dialog.showMessageBox(mainWindow, options);
});

ipcMain.handle('get-app-path', async () => {
  return app.getPath('userData');
});

ipcMain.handle('show-item-in-folder', async (event, fullPath) => {
  shell.showItemInFolder(fullPath);
});

process.on('uncaughtException', (error) => {
  log.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  log.error('Unhandled rejection at:', promise, 'reason:', reason);
});

app.whenReady().then(() => {
  log.info('App ready');
  createWindow();

  if (process.platform === 'win32') {
    createTray();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  log.info('Application quitting...');
  app.isQuitting = true;
});

log.info('Main process initialized');
