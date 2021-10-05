import apiClient from '../../../utils/api-client';
import { Ticket, TicketField } from '../types';

export const getMyTickets = async (): Promise<Ticket[]> => {
  const { data } = await apiClient.get('/tickets/me');
  return data.tickets;
};

export const deleteTicket = async (id: number): Promise<{ id: number }> => {
  await apiClient.delete(`/tickets/${id}`);
  return { id };
};

export const createTicket = async (fields: TicketField): Promise<Ticket> => {
  const { data } = await apiClient.post('/tickets', fields);
  return data.ticket;
};
