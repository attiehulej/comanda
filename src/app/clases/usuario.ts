export enum Perfil {
    DUEÑO = 'DUEÑO',
    SUPERVISOR = 'SUPERVISOR',
    MOZO = 'MOZO',
    COCINERO = 'COCINERO',
    BARTENDER = 'BARTENDER',
    CLIENTE_REGISTRADO = 'CLIENTE_REGISTRADO',
    CLIENTE_ANONIMO = 'CLIENTE_ANONIMO'
}

export class Usuario {
    public id?: string;
    public nombre?: string;
    public apellido?: string;
    public dni?: string;
    public cuil?: string;
    public correo?: string;
    public clave?: string;
    public foto?: string;
    public perfil: Perfil;
    public estado?: string;
    public fechaAlta: Date = new Date();
    public fechaModificado: Date = null;
    public fechaBaja: Date = null;
}
