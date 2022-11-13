const { google } = require('googleapis')
const multer = require('multer')
const GoogleDriveStorage = require('multer-google-drive')
const path = require('path')
const fs = require('fs')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', './storage/images'))
    },
    filename: (req, file, cb) => {
        cb(null, new Date().valueOf() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const fileUploader = multer({
    storage: fileStorageEngine,
    fileFilter: fileFilter
})

// const auth2Client = new google.auth.OAuth2(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.CLIENT_REDIRECT_URI
// )

// auth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN_API})

// const drive = google.drive({
//     version : 'v3',
//     auth: auth2Client
// })

// const filefilter = (req, file, cb, res) => {
//   if(!file) return res.status(400).json({message: 'File is required'})
// }

// const fileUploader = multer({
//     storage: GoogleDriveStorage({
//       drive: drive,
//       parents: 'root',
//       fileName: function (req, file, cb) {
//         let filename = `test-${file.originalname}`;
//         cb(null, filename);
//       }
//     }),
//     fileFilter: filefilter
//   })


module.exports = fileUploader


