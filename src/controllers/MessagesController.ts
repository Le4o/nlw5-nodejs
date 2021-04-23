import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";

class MessagesController {
    async create(request: Request, response: Response): Promise<Response>  {
        const data = request.body;
        
        const messageService = new MessageService();
        try {
            const message = await messageService.create(data);
            return response.json(message);

        } catch(err) {
            return response.status(400).json({
                message: err.message
            });
        }
        
    }

    async showByUser(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const messageService = new MessageService();

        try {
            const listMessages = await messageService.listByUser(id);
            return response.json(listMessages);

        } catch(err) {
            return response.status(400).json({
                message: err.message
            });
        }
    }
}

export { MessagesController };