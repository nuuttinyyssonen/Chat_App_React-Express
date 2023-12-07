const AWS = require('aws-sdk');
const { AWS_KEY, AWS_REGION, AWS_KEY_ID } = require('./config');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: AWS_KEY,
    region: AWS_REGION,
});
  
const s3 = new AWS.S3();
  
module.exports = s3;
  