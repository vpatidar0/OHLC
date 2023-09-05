import { useQuery } from "@/packages/request/hooks/useQuery";
import { getCandlesList } from '@/ui/api/get';

import { useState } from "react";
const useGetData = () => {
    const [zoomRange, setZoomRange] = useState(null);
    console.log(zoomRange,'zoomRange')
    const {data, refetch, isLoading } = useQuery({
        queryKey: 'get_data',
        renderOption:[zoomRange],
        payload: {end:zoomRange,limit:100}, 
        queryFn: getCandlesList,
        options: {
            refetchOnMount: true,
        },
    });
	    return { data,setZoomRange};
};

export default useGetData;
