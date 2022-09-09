export class Province {

    id: number;
    name: string;
    active: boolean;

    constructor(data?:any){
        Object.assign(this, data)
    }

}
