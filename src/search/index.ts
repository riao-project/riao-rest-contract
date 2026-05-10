import type { DatabaseRecordWithId } from '../common/index.js';
import type { ListRequest } from '../list/index.js';

export interface RiaoSearchCondition {
	column: string;
	operator: '=' | '<' | '<=' | '>' | '>=' | 'LIKE' | 'INARRAY' | 'BETWEEN';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: string | number | boolean | null | any[];
	minValue?: string | number;
	maxValue?: string | number;
}

export type AggregateFunction = 'count' | 'sum' | 'avg' | 'min' | 'max';

export interface RiaoAggregateColumn {
	column: string;
	function: AggregateFunction;
	alias?: string;
}

export interface RiaoOrderItem {
	column: string;
	direction?: 'ASC' | 'DESC';
}

export interface SearchRequest extends ListRequest {
	columns?: string[];
	where?: RiaoSearchCondition[];
	aggregates?: RiaoAggregateColumn[];
	groupBy?: string[];
	order?: RiaoOrderItem[];
}

export interface SearchResponse<
	T extends DatabaseRecordWithId = DatabaseRecordWithId,
> {
	records: T[];
	count: number;
}
