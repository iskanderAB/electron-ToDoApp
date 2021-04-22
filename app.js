const electron = require('electron');

const {app, BrowserWindow, Menu, ipcMain} = electron;
let mainWindow;
let addToDoWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL(`file://${__dirname}/public/main.html`);
    mainWindow.on('closed', () => {
        app.quit();
    });
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});
const creatAddNewTodo = () => {
    addToDoWindow = new BrowserWindow({
        width: 300,
        height: 200,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    addToDoWindow.loadURL(`file://${__dirname}/public/add.html`);
    addToDoWindow.on('closed',()=> addToDoWindow = null);
};
ipcMain.on('todo:add', (e, todo) => {
    mainWindow.webContents.send('todo:add', todo);
    addToDoWindow.close();
});
const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New ToDo',
                accelerator: 'Ctrl+N' ,
                click: () => {
                    creatAddNewTodo();
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform === 'darwin' ? 'command+Q' : 'ctrl+Q',
                click: () => {
                    app.quit();
                }
            }
        ]
    }
];
/*if u have osx system ! */
if (process.platform === 'darwin') {
    menuTemplate.unshift({
        label: ""
    });
}
/*if mode == developer */
console.log(app.isPackaged);
if (!app.isPackaged) {
    menuTemplate.push({
        label: 'View',
        submenu: [
            {
                role : 'reload'
            },
            {
                label: 'Toggle developer Tools',
                accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
                click: (item, focusedWindow) => {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}


