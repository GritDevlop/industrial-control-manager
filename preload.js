const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getStoreData: (key) => ipcRenderer.invoke('get-store-data', key),
  setStoreData: (key, value) => ipcRenderer.invoke('set-store-data', key, value),

  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  selectFiles: (filters) => ipcRenderer.invoke('select-files', filters),

  openFile: (filePath) => ipcRenderer.invoke('open-file', filePath),
  openFileLocation: (filePath) => ipcRenderer.invoke('open-file-location', filePath),
  showItemInFolder: (fullPath) => ipcRenderer.invoke('show-item-in-folder', fullPath),

  downloadFile: (url, savePath) => ipcRenderer.invoke('download-file', url, savePath),
  getFileInfo: (filePath) => ipcRenderer.invoke('get-file-info', filePath),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
  copyFile: (source, destination) => ipcRenderer.invoke('copy-file', source, destination),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),

  exportData: (data) => ipcRenderer.invoke('export-data', data),
  importData: () => ipcRenderer.invoke('import-data'),

  createBackup: () => ipcRenderer.invoke('create-backup'),

  showMessage: (options) => ipcRenderer.invoke('show-message', options),
  getAppPath: () => ipcRenderer.invoke('get-app-path'),

  onMenuImport: (callback) => ipcRenderer.on('menu-import', callback),
  onMenuExport: (callback) => ipcRenderer.on('menu-export', callback),
  onMenuBackup: (callback) => ipcRenderer.on('menu-backup', callback),
  onMenuRestore: (callback) => ipcRenderer.on('menu-restore', callback),
  onMenuCheckUpdate: (callback) => ipcRenderer.on('menu-check-update', callback)
});
