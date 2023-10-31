import { io } from "socket.io-client";
const socket = io("https://depositosyariah.id:3000");
export default socket;