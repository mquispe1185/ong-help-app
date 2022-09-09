export class User {

    id: number;
    name: string;
    nickname: string;
    image: string;
    email: string;
    last_name: string;
    first_name: string;

    constructor(data?:any){
        Object.assign(this, data)
    }

}
