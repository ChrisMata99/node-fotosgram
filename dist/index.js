"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
//Midelwere
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const post_1 = __importDefault(require("./routes/post"));
const main_1 = __importDefault(require("./routes/main"));
const server = new server_1.default();
//body parse
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//File Upload
server.app.use(express_fileupload_1.default());
//Configurar CORDS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Este pendiendo del path /user y va trabajar con userRoutes que se exporto
// Rutas de mi aplicacion
server.app.use('/', main_1.default);
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
//conectar a la DB
mongoose_1.default.connect('mongodb://localhost:27017/fotosgram', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err)
        throw err;
    console.log('Base de datos ONLINE');
});
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
