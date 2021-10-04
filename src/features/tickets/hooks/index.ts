import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../../../lib/react-query';
import { deleteTicket, getMyTickets } from '../api';
import { Ticket } from '../types';

export const useMyTickets = () => {
  return useQuery<Ticket[]>({ queryKey: ['myTickets'], queryFn: () => getMyTickets() });
};

export const useDeleteTicket = () => {
  return useMutation({
    onMutate: async (ticketId) => {
      await queryClient.cancelQueries('myTickets');
      const prevTickets = queryClient.getQueryData<Ticket[]>('myTickets');
      const updatedTickets = prevTickets?.filter((ticket) => ticket.id !== ticketId);
      queryClient.setQueryData('myTickets', updatedTickets);
    },
    mutationFn: deleteTicket,
  });
};
