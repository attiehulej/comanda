import { TipoUsuario } from '../enums/tipo-usuario.enum';

export class Notificacion {
    public id?: string;
    public idPedido?: string;
    public fechaAlta: Date = new Date();
    public fechaModificado?: Date = null;
    public fechaBaja?: Date = null;
    public mensaje?: string;
    public receptor?: TipoUsuario;
    public firstApparition: boolean = true;
    //public emisor?: [{nombre: string, idEmisor: string}];
}
