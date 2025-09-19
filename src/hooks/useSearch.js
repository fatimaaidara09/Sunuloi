// hooks/useSearch.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';

export const useSearch = (query, options = {}) => {
  return useQuery({
    queryKey: ['search', query, options],
    queryFn: () => apiService.search(query, options),
    enabled: !!query,
    staleTime: 5 * 60 * 1000,
  });
};

export const useVoiceSearch = () => {
  return useMutation({
    mutationFn: ({ audioData, language }) => 
      apiService.voiceSearch(audioData, language),
  });
};
