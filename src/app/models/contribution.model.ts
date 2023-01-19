import { ItemDonation } from "./item-donation.model";

export class Contribution {

    id: number;
    mount: number;
    status: number;
    code: string;
    created_at: string;

    item_donation: ItemDonation;
    entity_name: string;

    constructor(data?:any){
        Object.assign(this, data)
    }

}
