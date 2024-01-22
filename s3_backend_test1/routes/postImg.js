const router = require("express").Router();
const upload = require("../util/uploader");
const { uploadFile } = require("../util/s3");
const { postImg } = require("../util/db");

router.post("/postImg", upload.single("image"), async (req, res) => {
    if ((await postImg(req.file.originalname))) {
        await uploadFile(req.file.buffer, req.file.originalname, req.file.mimetype);
        res.send({message: "sucessfully uploaded to s3?!"});
    } else {
        res.status(400).send({message: "database error"});
    }
});

module.exports = router;