export interface UserCreate {
  user: string;
  password: string;
  type: "User" | "Adm" | "Super";
  name: string;
  lastName: string;
  phone: string;
  email: string;
  restaurantName?: string;
}
