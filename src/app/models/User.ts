import * as internal from "events";

export class RegisterUser{
    Name:string;
    Email:string;
    Password:string;
}

export class LoginUser{

    Email:string;
    Password:string;
}

export class UserVm
{
    Id :string
    Name :string

}

export class ChangePassword
{
    OldPassword:string
    NewPassword:string
}
export class UserRoleForModification
{
    UserId : string;

    Role : string
}

export class UserRoles{
    Id: number;
    Name: string;
}
export class UserDetails{
    Id:string;
    Email:string;
    Name:string;
}

