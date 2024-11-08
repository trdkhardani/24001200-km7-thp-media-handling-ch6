const multer = require('multer');

const validateFile = (file) => {
    const maxFileSize = 2 * 1024 * 1024;
    const allowideFileTypes = ['image/jpeg', 'image/jpg', 'image/png']

    if(!allowideFileTypes.includes(file.mimetype)){
        throw new Error("Please upload only jpg, jpeg, or png")
    }

    if(file.size > maxFileSize){
        throw new Error("Image file exceeds 2 MB")
    }

    return true;
}

// module.exports = {
//     image: multer({
//         limits: {
//             fileSize: 2 * 1024 * 1024
//         },
//         fileFilter: (req, file, callback) => {
//             const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

//             if (allowedMimeTypes.includes(file.mimetype)) {
//                 callback(null, true);
//             } else {
//                 const err = new Error(`Please upload only ${allowedMimeTypes.join(", ")}`)
//                 callback(err, false);
//             }
//         },
//         onError: (err, next) => {
//             next(err)
//         }
//     })
// }

module.exports = validateFile;