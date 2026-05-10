import type { DatabaseRecordWithId } from '../common/index.js';

export interface ListRequest {
	limit?: number;
	offset?: number;
	orderBy?: string;
	orderDirection?: 'ASC' | 'DESC';
}

export type ListResponse<
	T extends DatabaseRecordWithId = DatabaseRecordWithId,
> = T[];
