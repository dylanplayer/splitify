import type { Guest } from "@prisma/client";
import useSWR from "swr";

import { fetcher } from "../../utils/fetcher";

export function useGetCurrentGuest() {
  const { data, error } = useSWR<Guest>("/api/guests/current", fetcher);

  return {
    guest: data,
    loading: !error && !data,
    error: error,
  };
}
