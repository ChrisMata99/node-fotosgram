import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniquid from 'uniqid';

export default class FileSystem {

    constructor() { };

    guardarImagenTemporal(file: FileUpload, userId: string) {

        return new Promise((resolve, reject) => {
            //crear carpeta
            const path = this.crearCarpetaUsuario(userId);

            //Nombre del archivo
            const nombreArchivo = this.generarNombreUnico(file.name);

            // Mover el archivo del Temp a nuestra carpeta 
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {

                if (err) {
                    //no se pudo mover
                    reject(err);
                } else {
                    //todo salio bien
                    resolve();
                }
            });

        })
    }

    crearCarpetaUsuario(userId: string) {

        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);

        const existe = fs.existsSync(pathUser);

        if (!existe) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }

        return pathUserTemp;
    }

    private generarNombreUnico(nombreOriginal: string) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];

        const idUnico = uniquid();

        return `${idUnico}.${extension}`;
    }

    imagenesDeTempHaciaPost(userId: string) {
        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve(__dirname, '../uploads/', userId, 'post');

        if (!fs.existsSync(pathTemp)) {
            return [];
        }

        if (!fs.existsSync(pathPost)) {
            fs.mkdirSync(pathPost);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(userId);

        console.log(imagenesTemp);

        imagenesTemp.forEach(imagen => {
            fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
            console.log(imagen);
        });

        return imagenesTemp;
    }


    private obtenerImagenesEnTemp(userId: string) {
        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs.readdirSync(pathTemp) || [];
    }

    getFotoUrl(userId: string, img: string) {

        const pathFoto = path.resolve(__dirname, '../uploads/', userId, 'post', img);
        console.log(pathFoto);

        if (!fs.existsSync(pathFoto)) {
            return path.resolve(__dirname, '../assets/400x250.jpg');
        }

        return pathFoto;
    }
}