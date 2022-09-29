export const s3Config= {
  bucketName: process.env.REACT_APP_BUCKET_NAME as string,
  // dirName: 'directory-name',      /* Optional */
  region: process.env.REACT_APP_REGION  as string,
  accessKeyId: process.env.REACT_APP_ACCESS  as string,
  secretAccessKey: process.env.REACT_APP_SECRET  as string,
  // s3Url: 'https:/your-aws-s3-bucket-url/'     /* Optional */
}