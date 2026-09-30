export enum RoleType {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: RoleType;
}

export interface UpdateProfileRequest {
  username: string;
  email: string;
}

export interface UpdateRoleRequest {
  id: string;
  role: RoleType;
}
