import { useQuery as query } from 'react-query';

const useQuery = ({ queryKey='', renderOption=[], payload={}, queryFn = () => {}, options = {} }) => {
	const data = query(
		[queryKey, renderOption],
		() => queryFn(payload),
		{
			refetchOnMount       : false,
			keepPreviousData     : true,
			refetchOnWindowFocus : false,
			select               : (item) => item?.data,
			...options,
		},
	);
	return data;
};

export { useQuery };
