import { UserTicket } from '../UserTicket/UserTicketModel';

export class TicketForCreation {
    Title: string;
    Description: string;
    TTypeId: string;
    TPriorityId: string;
    ProjectId: string;
}
export class TicketStatusVmDto {
    Id: string;
    Name: string;
}
export class TicketPriorityVmDto {
    Id: string;
    Name: string;
}
export class TicketTypeVmDto {
    Id: string;
    Name: string;
}
export class GetAllTicketVmDto {
    Id: string;
    Title: string;
    Description: string;
    UpdatedByName: string;
    UpdatedByEmail: string;
    SubmittedByName: string;
    SubmittedByEmail: string;
    TicketTypeVm: TicketTypeVmDto;
    TicketStatusVm: TicketStatusVmDto;
    TicketPriorityVm: TicketPriorityVmDto;
    ProjectVm: ProjectForTicketDto;
    UsersTicketsVm: UserTicketVmDto[];
    CreatedAt: Date;
    DateTime: Date;
}
export class UserTicketVmDto {
    Id: string;
    ApplicationUser: ApplicationUserVm
}
export class ApplicationUserVm {
    userName: string;
    userEmail: string;
    userRole: string[]
}
export class ProjectForTicketDto {
    Id: string;
    Title: string;
}

export class TicketForUpdateDto {

    Title: string;
    Description: string;
    UpdatedByName: string;
    UpdatedByEmail: string;
    SubmittedByName: string;
    SubmittedByEmail: string;
    TTypeId: string;
    TPriorityId: string;
    ProjectId: string;
    UpdatedAt :Date;
    UserTicket:UserTicket[];
}