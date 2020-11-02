import { ProjectManager, UserTicket } from '../UserTicket/UserTicketModel';
import { TicketCommentVmDto } from './Comment';
export class TicketForCreation {
    Title: string;
    Description: string;
    TTypeId: string;
    TPriorityId: string;
    ProjectId: string;
}
export class TicketStatusVmDto {
    Id?: string;
    Name: string;
}
export class TicketPriorityVmDto {
    Id?: string;
    Name: string;
}
export class TicketTypeVmDto {
    Id?: string;
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
    ProjectManagers: ProjectManagerVmDto[]
}
export class ProjectManagerVmDto {
    Id: string;
    ApplicationUser: ApplicationUserVm
}
export class TicketForUpdateDto {
    Title: string;
    Description: string;
    TTypeId: string;
    TPriorityId: string;
    TStatusId: string;
    ProjectId: string;
    UsersTickets: UserTicket[];
}
export class DataForTicketDashboardVm {
    TicketPriorityData: DashboardDataForTicket[];
    TicketTypeData: DashboardDataForTicket[];
    TicketStatusData: DashboardDataForTicket[];
    totalTickets: number
}
export class DashboardDataForTicket {
    Name: string
    Count: number
}

