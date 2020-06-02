import { TipoMesa } from '../enums/tipo-mesa.enum';

export class Mesa {
    public uid: string;
    public numeroMesa: number;
    public cantidadComensales: number;
    public tipoMesa: TipoMesa;
    public foto: string[];
    public qr: string;
}
