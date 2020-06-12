import { TipoUsuario } from '../enums/tipo-usuario.enum';

export class Usuario {
    public id?: string;
    public nombre?: string;
    public apellido?: string;
    public dni?: string;
    public cuil?: string;
    public correo?: string;
    public clave?: string;
    public foto?: string;
    public perfil: TipoUsuario;
    public estado?: string;
    public fechaAlta: Date = new Date();
    public fechaModificado: Date = null;
    public fechaBaja: Date = null;
}
