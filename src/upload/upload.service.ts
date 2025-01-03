import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { promises as fs } from 'fs';

@Injectable()
export class UploadService {

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
