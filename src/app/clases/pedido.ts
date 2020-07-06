import { Producto } from './producto';
import { EstadoPedido } from '../enums/estado-pedido.enum';

export class Pedido {
    public id?: string;
    public productos?: [{ cantidad: number, producto: Producto }];
    public tieneDescuento?: boolean;
    public usuarioId?: string;
    public mesaId?: string;
    public estado?: EstadoPedido = EstadoPedido.PENDIENTE;
    public fechaAlta: Date = new Date();
    public fechaModificado: Date = null;
    public fechaBaja: Date = null;
}
