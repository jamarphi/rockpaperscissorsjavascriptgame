const electron = require('electron');
const path = require('path');
const url = require('url');
const {colorSelection,changeColor} = require('./config.js');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

let win;

function createWindow(){
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.webContents.openDevTools();
}

app.on('ready', () => {
    createWindow();

    const template = [
        {
            label: 'Edit',
            submenu: [
                {...colorSelection},
                {role: 'undo'},
                {role: 'redo'},
                {role: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'delete'},
                {role: 'selectall'}
            ]   
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    const contextMenu = new Menu();
    contextMenu.append(new MenuItem({...colorSelection}));

    win.webContents.on('context-menu', (e,args) => {
        contextMenu.popup(win, args.x, args.y);
    });
});

//this is for mac
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

//this is for mac
app.on('activate', () => {
    if(win === null){
        createWindow();
    }
})

console.log('index.js ran...');
