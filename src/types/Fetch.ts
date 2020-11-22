import { RadioType } from './Station';

export type FetchWithPagination = {
  items: RadioType[];
  totalItems: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
};
