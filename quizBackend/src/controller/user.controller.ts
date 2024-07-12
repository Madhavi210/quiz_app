
import Express,{ Request, Response, NextFunction } from 'express';
import mongoose, { ClientSession } from 'mongoose';
import UserService from '../service/user.service';
import AppError from '../utils/errorHandler';
import StatusConstants from '../constant/statusConstant';
import { StatusCode } from '../enum/statusCode';
import { User } from '../model/user.model';
import IUser  from '../interface/user.interface';
import { userRole } from '../enum/userRole';
import multer from 'multer';
import path from 'path';
import upload from '../utils/fileUpload';

export default class UserController {
    public static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {        
        const { name, email, password, role } = req.body;        
        const profilePic = req.file?.path;
        if (!profilePic) {
            throw new AppError('File not uploaded', StatusCode.BAD_REQUEST);
          }             
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const newUser = await UserService.createUser(name, email, password, role, profilePic ,session);            
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.CREATED).json(newUser);
        } catch (error) {
        
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.params.id;
        try {
            const user = await UserService.getUserById(userId);
            if (!user) {
                throw new AppError(
                    StatusConstants.NOT_FOUND.body.message,
                    StatusConstants.NOT_FOUND.httpStatusCode
                );
            }
            res.status(StatusCode.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    public static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {users, totalUser} = await UserService.getAllUsers();
            res.status(StatusCode.OK).json({users, totalUser});
        } catch (error) {
            next(error);
        }
    }

    public static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.params.id;
        const updates = req.body;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const updatedUser = await UserService.updateUser(userId, updates, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.OK).json(updatedUser);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = req.params.id;
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            await UserService.deleteUser(userId, session);
            await session.commitTransaction();
            session.endSession();
            res.status(StatusCode.NO_CONTENT).send();
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            next(error);
        }
    }

    public static async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email, password } = req.body;
        try {
            const { id, role, token } = await UserService.loginUser(email, password);
            res.status(StatusCode.OK).json({ id, role, token });
        } catch (error) {
            next(error);
        }
    }
}

