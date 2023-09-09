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
    length: number;
}

export interface Capsule {
    docs: Capsules;
    haxNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    pagingCounter: number;
    prevPage: number;
    totalDocs: number;
    totalPages:number;
}