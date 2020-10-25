import { Secret } from "jsonwebtoken";

export const errorCodes = {
    INSERT_FAILED: 9001,
    AUTH_FAILED: 401
}

export const jwtSecretKey = process.env.JWT_SECRETE;

export const jwtExpiryTime = 604800;
