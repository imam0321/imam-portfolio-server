import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: string;
    NODE_ENV: "development" | "production";
    FRONTEND_URL: string,
    DATABASE_URL: string,
    CLOUDINARY: {
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_CLOUD_API_KEY: string;
        CLOUDINARY_CLOUD_API_SECRET: string;
    };
    JWT: {
        JWT_ACCESS_SECRET: string;
        JWT_ACCESS_EXPIRES: string;
        JWT_REFRESH_SECRET: string;
        JWT_REFRESH_EXPIRES: string;
    }
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariable: string[] = [
        "PORT",
        "NODE_ENV",
        "FRONTEND_URL",
        "DATABASE_URL",
        "CLOUDINARY_CLOUD_NAME",
        "CLOUDINARY_CLOUD_API_KEY",
        "CLOUDINARY_CLOUD_API_SECRET",
        "JWT_ACCESS_SECRET",
        "JWT_ACCESS_EXPIRES",
        "JWT_REFRESH_SECRET",
        "JWT_REFRESH_EXPIRES",
    ];

    requiredEnvVariable.forEach((key) => {
        if (!process.env[key]) {
            throw new Error(`Missing require environment variable ${key}`);
        }
    });

    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        DATABASE_URL: process.env.DATABASE_URL as string,
        CLOUDINARY: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
            CLOUDINARY_CLOUD_API_KEY: process.env.CLOUDINARY_CLOUD_API_KEY as string,
            CLOUDINARY_CLOUD_API_SECRET: process.env.CLOUDINARY_CLOUD_API_SECRET as string,
        },
        JWT: {
            JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
            JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
            JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
            JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        }

    };
};

export const envVars = loadEnvVariables();