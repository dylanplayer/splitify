import type { Guest } from "@prisma/client";
import useSWR from "swr";

import { fetcher } from "../../utils/fetcher";

export function useGetFollowing() {
  const { data, error } = useSWR<Guest[]>("/api/guests/following", fetcher);

  return {
    following: data,
    loading: !error && !data,
    error: error,
  };
}
