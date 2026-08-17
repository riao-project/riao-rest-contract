export interface BulkDeleteRequest {
	ids: string[];
}

export interface BulkDeleteResponse {
	deletedCount: number;
	failureCount: number;
	failures?: Array<{ id: string; error: string }>;
}
