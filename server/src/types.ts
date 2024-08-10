import { Request, Response } from "express";

export interface AuthContext {
    context: any;
    req: Request;
    res: Response;
    payload?: { 
        id: number,
        sessionId: string,
    };
}
