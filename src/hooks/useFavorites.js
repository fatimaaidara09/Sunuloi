// hooks/useFavorites.js
export const useFavorites = () => {
  const queryClient = useQueryClient();

  const { data: favorites, ...query } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => apiService.getFavorites(),
  });

  const addToFavorites = useMutation({
    mutationFn: ({ documentId, documentType }) => 
      apiService.addToFavorites(documentId, documentType),
    onSuccess: () => {
      queryClient.invalidateQueries(['favorites']);
    },
  });

  return {
    favorites,
    addToFavorites,
    ...query
  };
};
