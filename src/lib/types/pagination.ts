export interface PaginationProps {
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}
