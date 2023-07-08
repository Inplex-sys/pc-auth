// Modules to control application life and create native browser window
const {
    app: electronApp,
    ipcMain,
    BrowserWindow
} = require('electron')
const totp = require('totp-generator');
const {
    v4: uuidv4
} = require('uuid');
const fs = require('fs');
const path = require('path');
const Driver = require('./class/Driver.js');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 500,
        minHeight: 800,
        maxHeight: 800,
        minWidth: 500,
        maxWidth: 500,
        autoHideMenuBar: true,
        icon: path.join(__dirname, 'build/logo192.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile('build/index.html')
}


electronApp.whenReady().then(() => {
    createWindow()
    electronApp.on('activate', function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

electronApp.on('window-all-closed', function() {
    if (process.platform !== 'darwin') electronApp.quit()
})

const driver = new Driver()

ipcMain.on('register', (event, params) => {
    const {
        password
    } = params

    if (driver.create( password ))
        event.reply('register-response', {
            success: true,
            message: 'Encrypted container created.'
        })
})

ipcMain.on('auth', (event, params) => {
    const {
        password
    } = params

    if (driver.login( password ))
        event.reply('auth-response', {
            success: true,
            message: 'The password is valid.'
        })
    else
        event.reply('auth-response', {
            success: false,
            message: 'The password is invalid.'
        })
})

ipcMain.on('container-exist', (event, params) => {
    if (driver.containerExist())
        event.reply('container-exist-response', {
            success: true,
            message: 'The container exist.'
        })
    else
        event.reply('container-exist-response', {
            success: false,
            message: 'The container does not exist.'
        })
})

ipcMain.on('reset-container', (event, params) => {
    if (driver.containerExist()) {
        fs.unlinkSync('./containers.encrypted')
        event.reply('reset-container-response', {
            success: true,
            message: 'The container was deleted.'
        })
    } else
        event.reply('delete-container-response', {
            success: false,
            message: 'The container does not exist.'
        })
})

ipcMain.on('get-authenticators', (event, params) => {
    if (!driver.session)
        return response.send({
            success: false,
            message: 'You must authenticate first.'
        })

    const totps = []

    driver.read().map(data => {
        totps.push({
            uuid: data.uuid,
            label: data.label,
            user: data.user,
            password: data.password
        })
    })

    event.reply('get-authenticators-response', totps)

})

ipcMain.on('add-authenticator', (event, params) => {
    if (!driver.session)
        return response.send({
            success: false,
            message: 'You must authenticate first.'
        })

    const {
        labelname,
        user,
        password,
        secret
    } = params

    const totps = driver.read()
    totps.push({
        uuid: uuidv4(),
        label: labelname,
        user: user,
        password: password,
        secret: secret
    })

    if (driver.write(totps))
        event.reply('add-authenticator-response', {
            success: true,
            message: 'The TOTP was created.'
        })
    else
        event.reply('add-authenticator-response', {
            success: false,
            message: 'The TOTP was not created.'
        })
})

ipcMain.on('delete-authenticator', (event, params) => {
    if (!driver.session)
        return response.send({
            success: false,
            message: 'You must authenticate first.'
        })

    const { uuid } = params
    const totps = driver.read()

    const index = totps.findIndex(totp => totp.uuid === uuid)

    if (index === -1)
        event.reply('delete-authenticator-response', {
            success: false,
            message: 'The TOTP does not exist.'
        })
    else
        totps.splice(index, 1)

    if (driver.write(totps))
        event.reply('delete-authenticator-response', {
            success: true,
            message: 'The TOTP was deleted.'
        })
    else
        event.reply('delete-totp-response', {
            success: false,
            message: 'The TOTP was not deleted.'
        })
})

ipcMain.on('get-authenticator', (event, params) => {
    if (!driver.session)
        return response.send({
            success: false,
            message: 'You must authenticate first.'
        })

    const {
        uuid
    } = params
    const totps = driver.read()
    const index = totps.findIndex(totp => totp.uuid === uuid)

    if (index === -1)
        event.reply('get-authenticator-response', {
            success: false,
            message: 'The TOTP does not exist.'
        })
    else
        event.reply('get-authenticator-response', {
            success: true,
            code: totp( totps[index].secret )
        })
})
