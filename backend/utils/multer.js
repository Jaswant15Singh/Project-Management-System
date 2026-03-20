const multer = require("multer");
const path = require("path");
const filePath = {
  avatar: path.join(__dirname, "../public/uploads/avatar"),
  projects: path.join(__dirname, "../public/uploads/projects"),
  tasks: path.join(__dirname, "../public/uploads/tasks"),
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    
    cb(null, filePath[file.fieldname]);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;