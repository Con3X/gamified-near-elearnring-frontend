import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.REACT_APP_S3_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
  },
});

const dataUrlToBlob = (dataUrl) => {
  const byteString = atob(dataUrl.split(",")[1]);
  const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

export const uploadImage = async (file) => {
  // If Crop Image Convert From DataUrl To Blob
  if (file.name === undefined) file = dataUrlToBlob(file);

  try {
    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET,
      Key: `${Date.now()}`,
      Body: file,
      ContentType: file.type,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    const fileUrl = `https://${process.env.REACT_APP_S3_BUCKET}.s3.${process.env.REACT_APP_S3_REGION}.amazonaws.com/${params.Key}`;

    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
