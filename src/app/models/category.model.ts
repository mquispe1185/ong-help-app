export class Category {

    id: number;
    name: string;
    active: boolean;

    constructor(data?:any){
        Object.assign(this, data)
    }

}
