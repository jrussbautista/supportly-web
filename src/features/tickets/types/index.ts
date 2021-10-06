export enum Priority {
  low,
  medium,
  high,
}

export enum Status {
  open,
  closed,
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
}

export interface TicketField {
  title: string;
  description: string;
  priority: Priority;
}
