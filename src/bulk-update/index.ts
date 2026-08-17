import type { DatabaseRecordWithId } from '../common/index.js';

export interface BulkUpdateRequest<
	T extends DatabaseRecordWithId = DatabaseRecordWithId,
> {
	items: Array<Partial<Omit<T, 'id'>> & { id: string }>;
}

export interface BulkUpdateResponse {
	successCount: number;
	failureCount: number;
	failures?: Array<{ id: string; error: string }>;
}
