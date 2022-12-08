import useSWR from "swr";

import { fetcher } from "../../utils/fetcher";

export interface UseGetReceiptParams {
  id: string;
}

export function useGetReceipt({ id }: UseGetReceiptParams) {
  const { data, error } = useSWR<any>(`/api/receipts/${id}`, fetcher);

  return {
    receipt: data,
    loading: !error && !data,
    error: error,
  };
}
