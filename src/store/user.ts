import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AxiosInstance } from "axios";

interface userInterface {
  user_id: string;
  user_name: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  instance: AxiosInstance;
}

const userData: userInterface = {
  user_id: "",
  user_name: "",
  socket: null!,
  instance: null!,
};

export { userData };
