import { useQuery } from "@/packages/request/hooks/useQuery";
import { getBookList } from '@/ui/api/get';

import { useState} from "react";
const useBookData = () => {
    
    const {data, refetch, isLoading } = useQuery({
        queryKey: 'book_data',
        queryFn: getBookList,
        options: {
            refetchOnMount: true,
            staleTime: 1000, 
            refetchInterval: 1000, 
        },
    });

	return { data};
};

export default useBookData;
