import { useQuery } from 'react-query';

import { getMyTickets } from '../api';
import { Ticket } from '../types/index';

export const useMyTickets = ({ config }: any = {}) => {
  return useQuery<Ticket[]>({ queryKey: ['myTickets'], queryFn: () => getMyTickets(), ...config });
};
