const electron = require('electron');

const { app , BrowserWindow , Menu } = electron;
let mainWindow;
let addToDoWindow;

app.on('ready',()=>{
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const creatAddNewTodo = () => {
    addToDoWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add New ToDo'
    });
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
                click : () => {
                    app.quit();
                }
            }
        ]
    }
];
// if u have osx system !
// if(process.platform === 'darwin'){
//     menuTemplate.unshift({});
// }

