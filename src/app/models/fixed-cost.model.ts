export class FixedCost {

    id: number;
    title: string;
    description: string;
    mount: number;
    balance: number;
    raised: number;
    created_by_id: number;
    month: number;
    year: number;
    status: number;
    chargeable_type: string;
    chargeable_id: number;
    status_updated_by_id: number;
    period_id: number;
    //for serializer
    editable: boolean;

    constructor(data?:any){
        Object.assign(this, data)
    }
    
}
