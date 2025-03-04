export const IUserSearchableFields = [
    'email',
    'name',
    'role'
];

export enum IUserRole {
   ADMIN = 'admin',
   LANDLORD = 'landlord',
   TENANT = 'tenant'
}

export interface FullName  {
    firstName:string;
    middleName?:string;
    lastName?:string
}
export interface Address  {
    street:string;
    city?:string;
    zipCode?:string;
    country?:string
}