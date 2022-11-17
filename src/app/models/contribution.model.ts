export class Contribution {

    id: number;
    item_donation_id: number;
    mount: number;
    status: number;
    code: string;

    constructor(data?:any){
        Object.assign(this, data)
    }

}
