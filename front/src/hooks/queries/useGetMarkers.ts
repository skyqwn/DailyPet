import {getMarkers} from '@/api';
import {queryKeys} from '@/constants';
import {Marker} from '@/types';
import {UseQueryCustomOptions} from '@/types/common';
import {useQuery} from '@tanstack/react-query';

function useGetMarkers(queryOptions?: UseQueryCustomOptions<Marker[]>) {
  return useQuery({
    queryFn: getMarkers,
    queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
    ...queryOptions,
  });
}

export default useGetMarkers;
