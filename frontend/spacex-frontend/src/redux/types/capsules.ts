export interface Capsules {
  id: string;
  land_landings: number;
  last_update: string;
  launches: Array<string>;
  reuse_count: number;
  serial: string;
  status: string;
  type: string;
  water_landings: number;
  length?: number;
}

export interface MockData {
  docs: Capsules[];
  totalDocs?: number;
  limit?: number;
  totalPages?: any;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: null | number;
  nextPage: number;
}
