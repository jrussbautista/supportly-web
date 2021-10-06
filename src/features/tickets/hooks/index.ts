import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../../../lib/react-query';
import { deleteTicket, getMyTickets, createTicket, updateTicket, getTicket } from '../api';
import { Ticket } from '../types';

export const useMyTickets = () => {
  return useQuery<Ticket[]>({ queryKey: ['myTickets'], queryFn: () => getMyTickets() });
};

export const useTicket = (id: number) => {
  return useQuery<Ticket>({ queryKey: ['ticket', id], queryFn: () => getTicket(id) });
};

export const useCreateTicket = () => {
  return useMutation({
    onSuccess: (ticket) => {
      const prevTickets = queryClient.getQueryData<Ticket[]>('myTickets');
      if (!prevTickets) {
        return;
      }
      const newTickets: Ticket[] = [...prevTickets, ticket];
      queryClient.setQueryData<Ticket[]>('myTickets', newTickets);
    },
    mutationFn: createTicket,
  });
};

export const useDeleteTicket = () => {
  return useMutation({
    onSuccess: ({ id }) => {
      const prevTickets = queryClient.getQueryData<Ticket[]>('myTickets');
      if (!prevTickets) {
        return;
      }
      const newTickets: Ticket[] = prevTickets.filter((ticket) => ticket.id !== id);
      queryClient.setQueryData<Ticket[]>('myTickets', newTickets);
    },

    mutationFn: deleteTicket,
  });
};

export const useUpdateTicket = () => {
  return useMutation({
    onSuccess: (newTicket) => {
      const prevTickets = queryClient.getQueryData<Ticket[]>('myTickets');
      if (!prevTickets) {
        return;
      }
      const newTickets: Ticket[] = prevTickets.map((ticket) =>
        ticket.id === newTicket.id ? { ...ticket, ...newTicket } : ticket
      );
      queryClient.setQueryData<Ticket[]>('myTickets', newTickets);
      queryClient.setQueryData(['ticket', newTicket.id], newTicket);
    },

    mutationFn: updateTicket,
  });
};
