export class Period {

    id: number;
    month: number;
    year: number;

    constructor(data?: any) {
        Object.assign(this, data)
    }

}
