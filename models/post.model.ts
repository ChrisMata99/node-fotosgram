import { Schema, Document, model } from 'mongoose';

const postShcema = new Schema({

    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    imgs: [{
        type: String
    }],
    coords: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una referencia a un usuario']
    }
});

postShcema.pre<IPost>('save', function (next) {
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created: Date;
    mensaje: String;
    imgs: string[];
    coords: String;
    usuario: string;
}

export const Post = model<IPost>('Post', postShcema);