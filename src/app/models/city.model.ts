import { Province } from "./province.model";

export class City {

    id: number;
    province_id: number;
    province: Province;
    name: string;
    active: boolean;

    constructor(data?:any){
        Object.assign(this, data)
    }

}
