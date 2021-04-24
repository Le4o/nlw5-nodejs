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

        const settings = await settingsService.findByUsername(username);
        return response.json(settings);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { username } = request.params;
        const { chat } = request.body;
        const settingsService = new SettingService();
        try {
            const newSetting = await settingsService.update(username, chat);
            return response.json(newSetting);
        } catch(err) {
            return response.status(404).json({
                message: err.message
            });
        }
    }
}

export { SettingsController };