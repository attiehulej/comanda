import { EstadosMesa } from '../enums/estados-mesa.enum';

export class Mesa {
    public id?: string;
    public numero?: number;
    public cantidad?: number;
    public foto?: string;
    public tipo: string;
    public fechaAlta: Date = new Date();
    public fechaModificado: Date = null;
    public fechaBaja: Date = null;
    public estado: string = EstadosMesa[EstadosMesa.LIBRE];
}
