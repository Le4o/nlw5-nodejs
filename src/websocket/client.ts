import { Socket } from "socket.io";
import { io } from "../http";
import { ConnectionService } from "../services/ConnectionsService";
import { UserService } from "../services/UserService";
import { MessageService } from "../services/MessageService";

interface IParams {
    text: string;
    email: string;
}

io.on("connect", (socket: Socket) => {
    const connectionService = new ConnectionService();
    const usersService = new UserService();
    const messagesService = new MessageService();

    socket.on("client_first_access", async (params) => {
        const { text, email } = params as IParams;

        const user = await usersService.create({ email });
        const connection = await connectionService.findByUserId(user.id);

        if (!connection) {
            await connectionService.create({
                socket_id: socket.id,
                user_id: user.id
            });
        } else {
            connection.socket_id = socket.id;
            await connectionService.create(connection);
        }

        await messagesService.create({
            text: text,
            user_id: user.id
        });
    });
});