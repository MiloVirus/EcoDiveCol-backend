import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Upload } from '@aws-sdk/lib-storage';
import { promises as fs } from 'fs';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
    private s3Client: S3Client
    private bucketName: string;

    constructor() {
        this.s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }

    async uploadFileToS3(filePath: string, fileName: string): Promise<string> {
        try {
            const fileContent = await fs.readFile(filePath);
            const uploadParams = {
                Bucket: this.bucketName,
                Key: fileName,
                Body: fileContent,
            };

            const upload = new Upload({
                client: this.s3Client,
                params: uploadParams,
            })

            const data = await upload.done();
            console.log(`File uploaded successfully at ${data.Location}`);
            return data.Location;
        }
        catch(error)
        {
            console.error("Error uploading file to S3:", error);
            throw new Error('Could not upload file to S3.');
        }
    }
    async convertImageToBase64(filePath: string): Promise<string> {
        try {
            const imageBuffer = await fs.readFile(filePath);
            console.log("Imagen convertida a Base64 exitosamente.");
            return imageBuffer.toString('base64');
        } catch (error) {
            console.error("Error al convertir la imagen a Base64:", error);
            throw new Error('No se pudo convertir la imagen a Base64.');
        }
    }

    async processImageWithApiKey(imageBase64: string): Promise<string[]> {
        const apiKey = process.env.GOOGLE_API_KEY;
    
        const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
        const requestBody = {
            requests: [
                {
                    image: {
                        content: imageBase64,
                    },
                    features: [
                        {
                            type: 'LABEL_DETECTION',
                        },
                        {
                            type: 'OBJECT_LOCALIZATION',
                        },
                        {
                            type: 'IMAGE_PROPERTIES',
                        },
                    ],
                },
            ],
        };
    
        try {
            const response = await axios.post(url, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const labels = response.data.responses[0]?.labelAnnotations?.map(
                (annotation: { description: string }) => annotation.description
            ) || [];
    
            return labels;
        } catch (error) {
            console.error("Error al procesar la imagen con la API:", error.response?.data || error.message);
            throw new Error('No se pudo procesar la imagen con la API.');
        }
    }
    
}
