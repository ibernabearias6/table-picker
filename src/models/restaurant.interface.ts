export interface RestaurantCreate {
  userId: string;
  name: string;
}

export interface RestaurantEdit {
  id: string;
  name: string;
  available: boolean;
  tables: Array<RestaurantTable>;
}

interface RestaurantTable {
  id?: string;
  order: string;
  capacity: string;
}
