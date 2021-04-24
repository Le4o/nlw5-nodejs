import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Settings";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

class SettingService {
    private settingsRepository: Repository<Setting>;

    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    }

    async create({ chat, username }: ISettingsCreate) {

        const userAlreadyExists = await this.settingsRepository.findOne({ username })

        if (userAlreadyExists) {
            throw new Error("User already exists!")
        }

        const settings = await this.settingsRepository.create({ chat, username });
        await this.settingsRepository.save(settings);
        return settings;
    }

    async findByUsername(username: string) {
        const settings = await this.settingsRepository.findOne({
            username
        });
        return settings;
    }

    async update(username: string, chat: boolean) {
     
        const settings = await this.settingsRepository.findOne({
            username
        });

        if (!settings) {
            throw new Error("Username not found!")
        }
        
        settings.chat = chat;

        const newSetting = this.settingsRepository.create(settings);
        return newSetting;
    }
}

export { SettingService };