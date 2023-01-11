import { Condition } from "./condition";

export class CurrentCondition {
    zipCode: string;
    data: Condition;

    constructor(zipCode: string, data: any) {
        this.zipCode = zipCode;
        this.data = data;
    }
}