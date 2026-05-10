import type { DatabaseRecordWithId } from '../common/index.js';

export type CreateRequest<
	T extends DatabaseRecordWithId = DatabaseRecordWithId,
> = Omit<T, 'id'> | Partial<T>;

export type CreateResponse = { id: string };
