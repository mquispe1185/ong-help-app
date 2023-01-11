export class EntityLink {
  id: number;
  url: string;
  created_at: string;
  linkeable_type: string;
  linkeable_id: number;

  constructor(data?: any) {
    Object.assign(this, data);
  }
}
