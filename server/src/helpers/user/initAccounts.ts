import appDataSource from "../../dataSource";
import { Affiliation, User } from "../../entities/User";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import { encrypt } from "../crypto";
import { logger } from "../logger";
import { USER_TYPES } from "./userTypes";
import { VerificationStatus } from "../enums";

export async function initAccounts() {
    const userRepository = appDataSource.getRepository(User);
    const affiliationRepository = appDataSource.getRepository(Affiliation);

    try {
        const generalAccount = await userRepository.findOne({ 
            where: {
                email: process.env.GENERAL_EMAIL,
            }
        });
    
        if (!generalAccount) {
            logger.info("Creating the general account (@zenith)...");
    
            const encriptedGeneralSecretKey = encrypt(uuidv4());
    
            await userRepository.create({
                username: "zenith",
                email: process.env.GENERAL_EMAIL,
                password: await argon2.hash(process.env.GENERAL_ACCOUNT_PASSWORD!),
                name: "Zenith",
                birthDate: {
                    date: "2025-01-24",
                },
                type: USER_TYPES.ORGANIZATION,
                secretKey: encriptedGeneralSecretKey,
                emailVerified: true,
                userSettings: {
                    twoFactorAuth: true,
                },
                profile: {
                    profilePicture: "https://img.zncdn.net/brand/logo-social.png",
                    bio: "The everything app.",
                    website: "https://about.zenith.to",
                },
                identity: {
                    verified: VerificationStatus.VERIFIED,
                    verifiedSince: new Date(),
                    country: "Italy",
                    fullName: "Zenith",
                    entityIdentifier: "",
                    birthOrCreationDate: "2025-01-24",
                    outcome: "Account identity verified automatically.",
                },
                verification: {
                    verified: VerificationStatus.VERIFIED,
                    verifiedSince: new Date(),
                    outcome: "Account verified automatically.",
                }
            }).save();
    
            logger.info("General account created successfully.");
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
            logger.info("Creating the personal account (@vincent)...");
    
            const encriptedPersonalSecretKey = encrypt(uuidv4());
    
            const newPersonalAccount = await userRepository.create({
                username: "vincent",
                email: process.env.PERSONAL_EMAIL,
                password: await argon2.hash(process.env.PERSONAL_ACCOUNT_PASSWORD!),
                name: "Vincenzo Ingrao Jr.",
                gender: "Male",
                birthDate: {
                    date: "2002-01-24",
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
                identity: {
                    verified: VerificationStatus.VERIFIED,
                    verifiedSince: new Date(),
                    country: "Italy",
                    fullName: "Vincenzo Ingrao Jr.",
                    entityIdentifier: "",
                    birthOrCreationDate: "2002-01-24",
                    outcome: "Account identity verified automatically.",
                },
                verification: {
                    verified: VerificationStatus.VERIFIED,
                    verifiedSince: new Date(),
                    outcome: "Account verified automatically.",
                }
            }).save();

            await affiliationRepository.create({
                affiliationId: uuidv4(),
                organizationId: companyAccount.id,
                userId: newPersonalAccount.id,
                status: true,
            }).save();
    
            logger.info("Personal account created successfully.");
        }
    
        const supportAccount = await userRepository.findOne({ 
            where: {
                email: process.env.SUPPORT_EMAIL,
            }
        });
    
        if (!supportAccount && companyAccount) {
            logger.info("Creating the support account (@support)...");
    
            const encriptedSupportSecretKey = encrypt(uuidv4());
    
            const newSupportAccount = await userRepository.create({
                username: "support",
                email: process.env.SUPPORT_EMAIL,
                password: await argon2.hash(process.env.SUPPORT_ACCOUNT_PASSWORD!),
                name: "Support",
                birthDate: {
                    date: "2025-01-24",
                },
                type: USER_TYPES.ORGANIZATION,
                secretKey: encriptedSupportSecretKey,
                emailVerified: true,
                userSettings: {
                    twoFactorAuth: true,
                },
                profile: {
                    profilePicture: "https://img.zncdn.net/brand/logo-social.png",
                    bio: "We're here to help.",
                    website: "https://help.zenith.to",
                },
                verification: {
                    verified: VerificationStatus.VERIFIED,
                    verifiedSince: new Date(),
                    outcome: "Account verified automatically.",
                }
            }).save();

            await affiliationRepository.create({
                affiliationId: uuidv4(),
                organizationId: companyAccount.id,
                userId: newSupportAccount.id,
                status: true,
            }).save();
    
            logger.info("Support account created successfully.");
        }
    } catch (error) {
        logger.error(error);
    }
}