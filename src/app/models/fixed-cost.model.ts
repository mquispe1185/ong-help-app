import { Period } from "./period.model";

export class FixedCost {
  id: number;
  title: string;
  description: string;
  mount: number;
  balance: number;
  raised: number;
  created_by_id: number;
  status: number;
  status_updated_by_id: number;
  chargeable_type: string;
  chargeable_id: number;
  period_id: number;
  period: Period = new Period();
  //for serializer
  editable: boolean;

  constructor(data?: any) {
    Object.assign(this, data);
  }

  getTitle() {
    return this.title[0].toUpperCase() + this.title.slice(1);
  }

  getDescription() {
    return this.description[0].toUpperCase() + this.description.slice(1);
  }
}
