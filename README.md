```diff
- This repo is deprecated and the new version is written in rust, the project has moved to: 
+ https://github.com/SystemVll/tauth
```

# 2FA Manager for Windows - Secure AES Encryption
![Download For Windows](https://github.com/SystemVll/pc-auth/releases/download/Windows/pc-auth.Setup.0.1.0.exe)

- ✅ AES Security* ( Don't forget to use a good password. Everything is securized in an AES container. )
- ✅ Portable App
- ✅ 100% Open Source
- ✅ Privacy Friendly ( you don't even need internet )

<div align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="100">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/electron/electron-original.svg" height="100">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" height="100">
</div>
<br>
<br>

https://github.com/SystemVll/pc-auth/assets/69421356/88e185c1-61a6-4a8a-86d9-f377f757025c


## Introduction

2FA Manager for Windows is a secure and user-friendly application that allows users to manage their Two-Factor Authentication (2FA) credentials efficiently. This project is built using React, Electron, and React-Bootstrap, providing a modern and responsive user interface for managing 2FA credentials. The user data is encrypted using AES encryption, ensuring that the data remains secure and confidential.

## Features

- Add, edit, and delete 2FA authenticators with ease.
- Securely store account credentials, 2FA secrets (TOTP), and other necessary information.
- AES encryption ensures that user data is stored securely and cannot be accessed without the correct decryption key.
- Search functionality to quickly find specific authenticators.
- Customizable authenticator labels for easy identification.
- User-friendly and intuitive interface.
- Support for multiple accounts on the same website.

## Installation

1. Clone the repository to your local machine.
2. Install dependencies using npm:
```
npm install
```

## Usage
1. Run the application using the following command:
```
npm start
```
2. The 2FA Manager window will appear, allowing you to add and delete authenticators.
3. To add a new authenticator, click on the "Add Authenticator" button and fill in the required fields.
4. To delete an existing authenticator, click on the corresponding authenticator card and make the necessary changes.
5. The user data is encrypted using AES encryption, ensuring that it remains secure and confidential.

## Build from source
1 - Build the React App and the Electron App
```
npm i electron-builder -g
npm run build
```
2 - Get your installer in `./dist/`

## Security

The 2FA Manager employs AES encryption to safeguard user data. AES encryption is a robust and widely recognized encryption algorithm, providing strong protection against unauthorized access. The encryption key is derived from the user's master password, which is not stored anywhere, ensuring that only the user can decrypt their data.

**Note**: It is essential to use a strong and unique master password to enhance the security of your data.

## Contributions

Contributions to this project are welcome! If you find any bugs or have suggestions for improvements, feel free to create an issue or submit a pull request.

## License

This project is licensed under the [GNU License](https://github.com/SystemVll/pc-auth/LICENSE), it requires that any modifications or derivative works of your project be released under the same license, thus preserving the open-source nature of the software.

## Disclaimer

The 2FA Manager is provided as-is, without any warranties or guarantees. While AES encryption is a strong security measure, it is essential to exercise caution and use a strong master password. The developers are not responsible for any data loss or security breaches that may occur due to improper usage or vulnerabilities outside the project's scope. Users are encouraged to back up their data regularly and follow best practices for password management and security.
