import appDataSource from "../../dataSource";
import { User, UserVerification } from "../../entities/User";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { encrypt } from "../crypto";
import { logger } from "../logger";

export async function initAccounts() {
    const userRepository = appDataSource.getRepository(User);
    const userVerificationRepository = appDataSource.getRepository(UserVerification);

    const generalAccount = await userRepository.findOne({ 
        where: {
            email: process.env.GENERAL_EMAIL,
        }    
    });

    if (!generalAccount) {     
        try {
            logger.warn("Creating the general account (@zenith)...");

            const encriptedGeneralSecretKey = encrypt(uuidv4());

            const newGeneralAccount = await userRepository.create({
                username: "zenith",
                email: process.env.GENERAL_EMAIL,
                password: await argon2.hash(process.env.GENERAL_ACCOUNT_PASSWORD!),
                name: "Zenith",
                gender: "Non-binary",
                birthDate: {
                    date: "2002-01-24",
                    monthAndDayVisibility: "Only you",
                    yearVisibility: "Only you",
                },
                type: "organization",
                secretKey: encriptedGeneralSecretKey,
                emailVerified: true,
                userSettings: {
                    twoFactorAuth: true,
                },
                profile: {
                    profilePicture: "https://img.zncdn.net/brand/logo.png",
                    bio: "The everything app.",
                    website: "https://about.zenith.to",
                },
            }).save();
    
            await userVerificationRepository.create({
                userId: newGeneralAccount.id,
                verified: true,
                type: newGeneralAccount.type,
                verifiedSince: new Date(),
                outcome: "Account verified automatically.",
            }).save();

            logger.warn("General account created successfully.");
        } catch (error) {
            logger.error(error);
        }
    }

    const personalAccount = await userRepository.findOne({ 
        where: {
            email: process.env.PERSONAL_EMAIL,
        }    
    });

    const companyAccount = await userRepository.findOne({ 
        where: {
            email: process.env.GENERAL_EMAIL,
        }    
    });

    if (!personalAccount && companyAccount) {
        try {
            logger.warn("Creating the personal account (@vincent)...");

            const encriptedPersonalSecretKey = encrypt(uuidv4());

            const newPersonalAccount = await userRepository.create({
                username: "vincent",
                email: process.env.PERSONAL_EMAIL,
                password: await argon2.hash(process.env.PERSONAL_ACCOUNT_PASSWORD!),
                name: "Vincenzo Ingrao Jr.",
                gender: "Male",
                birthDate: {
                    date: "2002-01-24",
                    monthAndDayVisibility: "Public",
                    yearVisibility: "Public",
                },
                secretKey: encriptedPersonalSecretKey,
                emailVerified: true,
                userSettings: {
                    twoFactorAuth: true,
                },
                profile: {
                    bio: "Founder at @zenith",
                    website: "https://blog.zenith.to",
                },
                isAffiliatedTo: companyAccount.id,
            }).save();
    
            await userVerificationRepository.create({
                userId: newPersonalAccount.id,
                verified: true,
                type: newPersonalAccount.type,
                verifiedSince: new Date(),
                outcome: "Account verified automatically.",
            }).save();

            logger.warn("Personal account created successfully.");
        } catch (error) {
            logger.error(error);
        }
    }

    const supportAccount = await userRepository.findOne({ 
        where: {
            email: process.env.SUPPORT_EMAIL,
        }    
    });

    if (!supportAccount && companyAccount) {
        try {
            logger.warn("Creating the support account (@support)...");

            const encriptedSupportSecretKey = encrypt(uuidv4());

            const newSupportAccount = await userRepository.create({
                username: "support",
                email: process.env.SUPPORT_EMAIL,
                password: await argon2.hash(process.env.SUPPORT_ACCOUNT_PASSWORD!),
                name: "Support",
                gender: "Non-binary",
                birthDate: {
                    date: "2002-01-24",
                    monthAndDayVisibility: "Only you",
                    yearVisibility: "Only you",
                },
                type: "organization",
                secretKey: encriptedSupportSecretKey,
                emailVerified: true,
                userSettings: {
                    twoFactorAuth: true,
                },
                profile: {
                    profilePicture: "https://img.zncdn.net/brand/logo.png",
                    bio: "We're here to help.",
                    website: "https://help.zenith.to",
                },
                isAffiliatedTo: companyAccount.id,
            }).save();
    
            await userVerificationRepository.create({
                userId: newSupportAccount.id,
                verified: true,
                type: newSupportAccount.type,
                verifiedSince: new Date(),
                outcome: "Account verified automatically.",
            }).save();

            logger.warn("Support account created successfully.");
        } catch (error) {
            logger.error(error);
        }
    }
}