const router = require("express").Router();
const { delImg } = require("../util/db");
const { deleteFile } = require("../util/s3");

router.delete("/delImg", async (req, res) => {
    console.log(req.query);
    const fileName = req.query.imgName;
    console.log(typeof(fileName));
    if ((await delImg(fileName))) {
        await deleteFile(fileName);
        res.send({message: `${fileName} deleted successfully`});
    } else {
        res.status(400).send({message: "database error"});
    }
});

module.exports = router;