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

    constructor(data?:any){
        Object.assign(this, data)
    }
    
}
