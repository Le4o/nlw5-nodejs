import { Request, Response } from "express";
import { SettingService } from "../services/SettingsService";

class SettingsController {
    async create(request: Request, response: Response): Promise<Response>  {
        const data = request.body;
        
        const settingsService = new SettingService();
        try {
            const settings = await settingsService.create(data);
            return response.json(settings);

        } catch(err) {
            return response.status(400).json({
                message: err.message
            });
        }
        
    }

    async findByUsername(request: Request, response: Response): Promise<Response> {
        const { username } = request.params;
        const settingsService = new SettingService();
        const settings = settingsService.findByUsername(username);
        return response.json(settings);
    }
}

export { SettingsController };