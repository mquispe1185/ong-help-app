import { Category } from "./category.model";
import { City } from "./city.model";
import { Province } from "./province.model";
import { User } from "./user.model";

export class Ong {

  id: number;
  name: string;
  description: string;
  street: string;
  city_id: number;
  province_id: number;
  phone: number;
  email: string;
  facebook: string;
  instagram: string;
  twitter: string;
  longitude: string;
  latitude: string;
  user_id: number;
  category_id: number;
  status: number;
  tags: string;
  video_url: string;

  user: User;
  province: Province;
  city: City = new City();
  category: Category;

  photos: string[];
  new_tags: string[] = [];

  constructor(data?: any) {
    Object.assign(this, data);
  }

  concatTags() {
    this.tags = this.new_tags.join(' ');
  }

  splitTags() {
    this.new_tags = this.tags.split(' ');
  }

}
