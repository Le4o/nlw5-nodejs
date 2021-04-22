import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UsersController {
    async create(request: Request, response: Response): Promise<Response> {
        const data = request.body;
        
        const usersService = new UserService();
        try {
            const settings = await usersService.create(data);
            return response.json(settings);

        } catch(err) {
            return response.status(400).json({
                message: err.message
            });
        }
        
    }
}

export { UsersController };