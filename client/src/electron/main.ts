import {app, BrowserWindow} from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { isDev } from './util.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'),
    //   contextIsolation: true,
    //   enableRemoteModule: false,
    //   nodeIntegration: false
    // }
  });

  if(isDev()){
    mainWindow.loadURL('http://localhost:5173');
  }
  else{
    mainWindow.loadFile(path.join(__dirname, '/dist/index.html'));
  }

});