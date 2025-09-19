// hooks/useDocument.js
export const useDocument = (id, type) => {
  return useQuery({
    queryKey: ['document', type, id],
    queryFn: () => {
      switch(type) {
        case 'journal-officiel':
          return apiService.getJournalOfficielById(id);
        default:
          return apiService.getJournalOfficielById(id);
      }
    },
    enabled: !!id,
  });
};
