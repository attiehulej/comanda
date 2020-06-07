export enum Tipo {
    VIP = 'VIP',
    DISCAPACITADO = 'DISCAPACITADO'
}

export class Mesa {
    public id?: string;
    public numero?: string;
    public cantidad?: string;
    public foto?: string;
    public tipo: Tipo;
    public fechaAlta: Date = new Date();
    public fechaModificado: Date = null;
    public fechaBaja: Date = null;
}
