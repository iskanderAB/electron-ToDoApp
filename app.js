const electron = require('electron');

const { app , BrowserWindow , Menu } = electron;
let mainWindow;
let addToDoWindow;

app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        nodeIntegration :true,
        contextIsolation :false
    });
    mainWindow.loadURL(`file://${__dirname}/public/main.html`);
    mainWindow.on('closed',()=> {
        app.quit();
    });
    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const creatAddNewTodo = () => {
    addToDoWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New ToDo',
        isMenuBarAutoHide :true,
        nodeIntegration :true,
        contextIsolation :false
    });
    addToDoWindow.loadURL(`file://${__dirname}/public/add.html`);
    addToDoWindow.removeMenu();
};
const menuTemplate =[
    {
        label : 'File',
        submenu :[
            {
                label : 'New ToDo',
                click: ()=> {
                    creatAddNewTodo();
                }
            },
            {
                label: 'Quit',
                accelerator : process.platform === 'darwin' ? 'command+Q': 'ctrl+Q',
                // accelerator : ()=> {
                //   if (process.platform === 'darwin') {
                //       return 'Command+Q';
                //   }else {
                //       return 'ctrl+Q';
                //   }
                // },
                click: () => {
                    app.quit();
                }
            }
        ]
    }
];

 //if u have osx system !
 if(process.platform === 'darwin'){
     menuTemplate.unshift({
         label: ""
     });
 }
// if mode == developer
if (process.env.NODE_ENV !== 'prod'){
    menuTemplate.push({
       label: 'View',
       submenu: [
           {
               label: 'Toggle developer Tools',
               accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I' ,
               click: (item , focusedWindow)=> {
                   focusedWindow.toggleDevTools();
               }
           }
       ]
    });
}


