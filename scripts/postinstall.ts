const fs = require('fs');
const path = require('path');

try {
    fs.rmdirSync(
        path.resolve(__dirname, '../node_modules/@keystonejs/email/node_modules/keystone-email'),
        { recursive: true }
    );
    fs.rmdirSync(
        path.resolve(__dirname, '../node_modules/@types/keystonejs__auth-password/node_modules/@types/keystonejs__keystone'),
        { recursive: true }
    );
} catch (e) {
}

