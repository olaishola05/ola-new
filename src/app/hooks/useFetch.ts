'use client'

import axios from 'axios';
import useSWR from 'swr';


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useFetch = (url: string) => {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFetch;