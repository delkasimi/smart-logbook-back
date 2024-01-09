const multer = require('multer');
const path = require('path');

// Set up storage options for multer
const storage = multer.diskStorage({
    // Destination is used to determine within which folder the uploaded files should be stored
    destination: function(req, file, cb) {
        cb(null, 'media/'); // Make sure this folder exists
    },

    // Filename is used to determine what the file should be named inside the folder
    filename: function(req, file, cb) {
        // Create a unique filename with the original extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
