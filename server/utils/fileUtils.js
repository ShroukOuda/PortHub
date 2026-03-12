const fs = require('fs');
const path = require('path');



const deleteFile = (filePath, defaultFile = null) => {
    if (!filePath) return Promise.resolve(false);
    
    if (defaultFile && filePath.includes(defaultFile)) {
        console.log(`Skipping deletion of default file: ${filePath}`);
        return Promise.resolve(false);
    }

    // Strip full URL prefix if present (e.g. http://localhost:3000/uploads/... → uploads/...)
    let relativePath = filePath;
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
        try {
            const url = new URL(relativePath);
            relativePath = url.pathname.replace(/^\//, ''); // remove leading slash
        } catch {
            // If URL parsing fails, try to extract uploads/ path
            const uploadsIdx = relativePath.indexOf('uploads/');
            if (uploadsIdx !== -1) {
                relativePath = relativePath.substring(uploadsIdx);
            }
        }
    }

    const fullPath = path.join(__dirname, '..', relativePath);
    
    return new Promise((resolve) => {
        fs.unlink(fullPath, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.log(`File already gone: ${fullPath}`);
                } else {
                    console.error(`Failed to delete file: ${fullPath}`, err.message);
                }
                resolve(false);
            } else {
                console.log(`Successfully deleted file: ${fullPath}`);
                resolve(true);
            }
        });
    });
};


module.exports = {
    deleteFile,
};