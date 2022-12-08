import type { Receipt } from "@prisma/client";
import useSWR from "swr";

import { fetcher } from "../../utils/fetcher";

export function useGetReceipts() {
  const { data, error } = useSWR<Receipt[]>("/api/receipts", fetcher);

  return {
    receipts: data,
    loading: !error && !data,
    error: error,
  };
}
