export interface UserCreate {
        user: string;
        password: string;
        type: "User" | "Adm" | "SuperAdm";
        name: String;
        lastName:String;
        phone:String
        email:String;
}