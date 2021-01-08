import Server from './classes/server';
import mongoose from 'mongoose';

import cors from 'cors';

//Midelwere
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import mainRoutes from './routes/main';

const server = new Server();

//body parse
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
//File Upload
server.app.use(fileUpload());

//Configurar CORDS
server.app.use(cors({ origin: true, credentials: true }));
// Este pendiendo del path /user y va trabajar con userRoutes que se exporto
// Rutas de mi aplicacion
server.app.use('/', mainRoutes);
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

//conectar a la DB
mongoose.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true },
    (err) => {
        if (err) throw err;
        console.log('Base de datos ONLINE');
    })

server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
