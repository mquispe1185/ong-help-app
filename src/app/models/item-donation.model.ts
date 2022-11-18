export class ItemDonation {

    id: number;
    title: string;
    description: string;
    mount: number;
    balance: number;
    raised: number;
    created_by_id: number;
    status: number;
    status_updated_by_id: number;
    donatable_type: string;
    donatable_id: number;
    period_id: number;

    constructor(data?:any){
        Object.assign(this, data)
    }

}
