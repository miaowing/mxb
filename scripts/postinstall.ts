const fs = require('fs');
const path = require('path');

try {
    fs.rmdirSync(
        path.resolve(__dirname, '../node_modules/@keystonejs/email/node_modules/keystone-email'),
        { recursive: true }
    );
} catch (e) {
}

