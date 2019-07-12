const path = require('path');
const multer = require("multer");
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());

//Making public/ statically available
app.use(express.static(path.join(__dirname,'public')));

const HTTP_PORT = 8081;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}  

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
      // we write the filename as the current date down to the millisecond
      // in a large web service this would possibly cause a problem if two people
      // uploaded an image at the exact same time. A better way would be to use GUID's for filenames.
      // this is a simple example.
      cb(null, file.originalname);
    }
});

// tell multer to use the diskStorage function for naming files instead of the default.
const upload = multer({ storage: storage });

app.get("/", (req,res) => {
    res.sendFile(index.html);
});

app.post("/upload", upload.single("uploaded_file"), (req, res) => {
    res.redirect("/");
});


//API For file access
app.get("/upload", function (req, res) 
{
    fs.readdir('./public/uploads', function(err, items) {
    imgData = [];
        for (var i=0; i<items.length; i++) {
            imgData.push(items[i]);
        }
        res.json(imgData);
    });
});

app.delete('/delete/:file', function(req,res)
{
    fs.unlink('./public/uploads/' + req.params.file, (err) => {
        if (err) throw err;
        res.send('delete done!');
    })
});

app.use((req,res) => {
    res.send('404 not found');
})

app.listen(HTTP_PORT, onHttpStart);
