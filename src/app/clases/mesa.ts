import { TipoMesa } from '../enums/tipo-mesa.enum';

export class Mesa {
    public id?: string;
    public numero?: number;
    public cantidad?: number;
    public foto?: string;
    public tipo: TipoMesa;
    public fechaAlta: Date = new Date();
    public fechaModificado: Date = null;
    public fechaBaja: Date = null;
}
