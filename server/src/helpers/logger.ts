import winston from "winston";

export const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.errors({ stack: true }),
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message, stack }) => {
                    if (message instanceof Error) {
                        return `${timestamp} [${level}]: ${message.message} \n${stack}`;
                    }
                    return `${timestamp} [${level}]: ${message}`;
                })
            )
        }),
        new winston.transports.File({ 
            filename: "../../logs/combined.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message, stack }) => {
                    if (message instanceof Error) {
                        return JSON.stringify({
                            timestamp,
                            level,
                            message: message.message,
                            stack
                        });
                    }
                    return JSON.stringify({
                        timestamp,
                        level,
                        message
                    });
                })
            )
        })
    ]
});
