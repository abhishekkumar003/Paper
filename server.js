// import { config } from 'dotenv';
// config(); // Load environment variables from .env file

// //SOCKET IO
// import { Server } from "socket.io";

// //FOR Production
// import express from 'express';
// const app = express();

// import { fileURLToPath } from 'url';
// import path, { dirname, join } from 'path';

// import { createServer } from 'http';



// //DATABASE CONNECTION
// import connectDb from './config/db.js';
// connectDb();

// // CONTROLLERS
// import { getDoc, updateDoc } from './controllers/docController.js'

// //PORT
// const PORT = process.env.PORT;

// // DEPLOYEMT CODE
// // const __dirname1 = path.resolve();
// // if (process.env.NODE_ENV === 'production') {
// //     app.use(express.static(path.join(__dirname1, "client/build")))

// //     app.get("*", (req, res) => {
// //         res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
// //     })
// // }

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// app.use(express.static(join(__dirname, './client/build')));

// app.get('*', (req, res) => {
//     res.sendFile(join(__dirname, './client/build/index.html'));
// });

// const httpServer = createServer(app);
// httpServer.listen(PORT);

// const io = new Server(httpServer);



// //SERVER INTRACTION
// io.on('connection', socket => {

//     socket.on('get-document', async documentId => {
//         const document = await getDoc(documentId);
//         socket.join(documentId);
//         socket.emit('load-document', document.data);

//         socket.on('send-changes', delta => {
//             socket.broadcast.to(documentId).emit('receive-changes', delta);
//         })

//         socket.on('save-document', async data => {
//             await updateDoc(documentId, data);
//         })
//     })

//     // socket.on('send-changes', delta =>{
//     //     // console.log(delta);
//     //     socket.broadcast.emit('receive-changes',delta);
//     // })
//     // console.log("Abhishek");
// })






// Importing Dependencies
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';
import { createServer } from 'http';

import { Server } from 'socket.io';
import connectDb from './config/db.js';
import { getDoc, updateDoc } from './controllers/docController.js';

// Database Connection
connectDb();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware and Static Files for Deployment
app.use(express.static(join(__dirname, './client/build')));
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, './client/build/index.html'));
});

// Socket.IO Server Interaction
io.on('connection', socket => {
    socket.on('get-document', async documentId => {
        const document = await getDoc(documentId);
        socket.join(documentId);
        socket.emit('load-document', document.data);

        socket.on('send-changes', delta => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        })

        socket.on('save-document', async data => {
            await updateDoc(documentId, data);
        })
    })
    // ...
});

// Start the HTTP Server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
