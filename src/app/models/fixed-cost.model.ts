import { Period } from "./period.model";

export class FixedCost {

    id: number;
    title: string;
    description: string;
    mount: number;
    balance: number;
    raised: number;
    created_by_id: number;
    status: number;
    period_id: number;
    period: Period;


    constructor(data?:any){
        Object.assign(this, data)
    }
    
}
