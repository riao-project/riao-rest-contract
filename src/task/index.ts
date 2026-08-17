export interface TaskRequest<T = unknown> {
	type: string;
	payload?: T;
}

export interface TaskResponse {
	taskId: string;
	status: 'pending' | 'running' | 'completed' | 'failed';
}

export interface ProgressResponse {
	taskId: string;
	status: 'pending' | 'running' | 'completed' | 'failed';
	totalRows: number;
	completedRows: number;
	failedRows: number;
	errorMessage?: string;
}
