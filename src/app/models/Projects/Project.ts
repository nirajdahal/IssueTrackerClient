import { ApplicationUserVm, ProjectManagerVmDto, TicketPriorityVmDto, TicketStatusVmDto, TicketTypeVmDto } from '../Tickets/Ticket';
import { ProjectManager } from '../UserTicket/UserTicketModel';
export class ProjectIdNameVm {
    Id: string
    Title: string
}
export class ProjectVmDto {
    Id: string;
    Title: string;
    Description: string;
    CreatedAt: Date;
    TicketVm: TicketForProjectDto[];
    UsersProjects: UserProjectVmDto[];
    ProjectManagers: ProjectManagerVmDto[];
}
export class TicketForProjectDto {
    Id: string
    Title: string
    TicketTypeVm: TicketTypeVmDto
    TicketStatusVm: TicketStatusVmDto
    TicketPriorityVm: TicketPriorityVmDto
}
export class UserProjectVmDto {
    Id: string;
    ApplicationUser: ApplicationUserVm;
}
export class ProjectForUpdateDto
{

    Title:string;
    Description:string;
     ProjectManagers:ProjectManager[];
}

export class ProjectForCreation
{

   Title :string
   Description :string
   ProjectManagers:ProjectManager[]; // get project managers using action method in user controller
}