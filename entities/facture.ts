export interface Facture {
    id?: string;
    creanceId?:number
    userId?:number
    montant?: number;
    fraisPenalite?:number
    dateLimit?:Date
    payee?:boolean
    description?: string;

}
