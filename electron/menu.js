const { Menu } = require('electron')
const { onLoadPage } = require('./handlers/window')

const macOSTemplate = [
  // { role: 'appMenu' },
  {
    label: 'Sample',
    submenu: [
      { role: 'about' }
    ]
  },
  // { role: 'FileMenu' }
  {
    label: 'File',
    submenu: [
      { role: 'close' },
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Experimental',
    submenu: [
      {
        label: 'L7',
        click: async () => {
          onLoadPage('antv/l7')
        }
      },
    ]
  }
]

let menu = undefined

function createDefaultMenu() {
  if (menu == undefined) {
    menu = Menu.buildFromTemplate(macOSTemplate)
  }

  return menu
}

function onCreateMenu() {
  Menu.setApplicationMenu(createDefaultMenu())
}

module.exports = {
  onCreateMenu
}
