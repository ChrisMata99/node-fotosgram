import jwt, { decode } from 'jsonwebtoken';
// import { Usuario } from '../models/usuario.model';

export default class Token {
    private static seed: string = 'christopher-mata';
    private static caducidad: string = '30d';

    constructor() { }

    static getJwtToken(payload: any): string {

        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad })
    }

    static comprobarToken(userToken: string) {

        return new Promise((resolve, reject) => {
            jwt.verify(userToken, this.seed, (err, decoded) => {
                if (err) {
                    reject();
                } else {
                    //token valido
                    resolve(decoded);
                }
            })
        });

    }
}