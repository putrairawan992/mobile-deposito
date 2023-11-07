import io from 'socket.io-client'

const socket = io('https://depositosyariah.id:3000',{path:"*"})

export default socket;