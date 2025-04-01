const { Storage } = require('@google-cloud/storage');
const path = require('path');
const uuid = require('uuid');

// Initialize Google Cloud Storage (without specifying keyFilename, it uses GOOGLE_APPLICATION_CREDENTIALS from environment)
const decodedCredentials = JSON.parse(
  Buffer.from(process.env.BASE64_ENCODED_SERVICE_ACCOUNT, 'base64').toString('utf8')
);

const storage = new Storage({
    projectId: decodedCredentials.project_id,
    credentials: {
      client_email: decodedCredentials.client_email,
      private_key: decodedCredentials.private_key.replace(/\\n/g, '\n')
    }
});

const bucketName = process.env.GCS_BUCKET_NAME; // Your GCS bucket name
const bucket = storage.bucket(bucketName);

// Middleware to Upload File to GCS
const uploadToGCS = (req, res, next) => {
    if (!req.file) return next();

    const filename = `${uuid.v1()}.${req.file.mimetype.split('/')[1]}`; // Generate unique filename
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
    });

    blobStream.on('error', (err) => next(err));

    blobStream.on('finish', async () => {
        // Remove the makePublic call that was causing the error
        // Instead, use the public URL directly (assuming bucket has proper IAM permissions)
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        next();
    });

    blobStream.end(req.file.buffer);
};

module.exports = uploadToGCS;
