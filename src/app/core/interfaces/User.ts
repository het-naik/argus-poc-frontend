export enum RoleType {
    CUSTOMER,
    ADMIN,
    SELLER
}

export interface User {
    id: String;
    username: String;
    email: String;
    role: RoleType;
}