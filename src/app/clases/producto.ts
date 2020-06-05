export default class Producto {
    public id?: string;
    public nombre?: string;
    public descripcion?: string;
    public fotos?: [];
    public tiempo?: string;
    public precio?: string;
    public fechaAlta: Date = new Date();
    public fechaModificado: Date = null;
    public fechaBaja: Date = null;
}
