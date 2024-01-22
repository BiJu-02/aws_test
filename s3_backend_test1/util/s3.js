const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { getSignedUrl } = require("@aws-sdk/cloudfront-signer");
const { CloudFrontClient, CreateInvalidationCommand } = require("@aws-sdk/client-cloudfront");

require("dotenv").config();

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});

const cf = new CloudFrontClient({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});


const uploadFile = async (fileBuffer, fileName, mimetype) => {
    console.time("upload");
    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Body: fileBuffer,
            Key: fileName,
            ContentType: mimetype
        })
    );
    
    console.timeEnd("upload");
};

const deleteFile = async (fileName) => {
    console.time("delete");
    await s3.send(
        new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName
        })
    );
    console.log("delete works so far");
    console.log("invalidation path: ", encodeURIComponent("/" + fileName));
    const invalidationCommand = new CreateInvalidationCommand({
        DistributionId: process.env.AWS_CLOUDFRONT_DIST_ID,
        InvalidationBatch: {
            CallerReference: fileName,
            Paths: {
                Quantity: 1,
                Items: [
                    "/" + encodeURIComponent(fileName)
                ]
            }
        }
    });
    console.log("works fine here");
    await cf.send(
        invalidationCommand
    );
    console.timeEnd("delete");
};

const getImgURL = async (fileName) => {
    // const command = new GetObjectCommand({
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Key: fileName
    // });
    // const url = await getSignedUrl(s3, command, { expiresIn: 120 });
    // const url = "https://d3omqcr6i9nx1a.cloudfront.net/" + fileName;

    const url = getSignedUrl({
        url: "https://d3omqcr6i9nx1a.cloudfront.net/" + fileName,
        dateLessThan: new Date(Date.now() + 1000 * 60 * 60),
        privateKey: process.env.AWS_CLOUDFRONT_PRIVATE_KEY,
        keyPairId: process.env.AWS_CLOUDFRONT_KEY_PAIR_ID
    });

    return url;
}

module.exports = {
    uploadFile,
    deleteFile,
    getImgURL
};