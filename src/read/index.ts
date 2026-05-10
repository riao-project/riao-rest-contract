import type { DatabaseRecordWithId } from '../common/index.js';

export interface ReadRequest {
	id: string;
}

export type ReadResponse<
	T extends DatabaseRecordWithId = DatabaseRecordWithId,
> = T;
