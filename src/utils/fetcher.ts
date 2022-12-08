export const fetcher = (args: RequestInfo | URL) => fetch(args).then(res => res.json());
