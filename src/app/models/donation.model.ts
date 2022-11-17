export class Donation {

    id: number;
    fixed_cost_id: number;
    mount: number;
    status: number;
    way_to_pay: number;
    code: string;
    payment_id: number;

    constructor(data?:any){
        Object.assign(this, data)
    }

}
