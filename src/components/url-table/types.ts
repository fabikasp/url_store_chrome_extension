import { Url } from "../shared/types";

export type UrlTableProps = {
    urls: Url[],
    deleteUrl: (id: number) => void
};
