import type { DatabaseRecordWithId } from '../common/index.js';

export type UpdateRequest<
	T extends DatabaseRecordWithId = DatabaseRecordWithId,
> = Partial<Omit<T, 'id'>> & { id: string };

export type UpdateResponse = void;
