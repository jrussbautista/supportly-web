import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../../../lib/react-query';
import { deleteTicket, getMyTickets, createTicket } from '../api';
import { Ticket } from '../types';

export const useMyTickets = () => {
  return useQuery<Ticket[]>({ queryKey: ['myTickets'], queryFn: () => getMyTickets() });
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
