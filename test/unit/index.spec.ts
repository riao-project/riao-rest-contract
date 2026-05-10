import { describe, it, expect } from 'vitest';
import type {
	DatabaseRecordWithId,
	ListRequest,
	ListResponse,
	RiaoSearchCondition,
	RiaoAggregateColumn,
	RiaoOrderItem,
	SearchRequest,
	SearchResponse,
	CreateRequest,
	CreateResponse,
	ReadRequest,
	ReadResponse,
	UpdateRequest,
	UpdateResponse,
	DeleteRequest,
	DeleteResponse,
} from '../../src/index';

describe('rest-contract types', () => {
	it('should allow valid assignments to DatabaseRecordWithId', () => {
		const record: DatabaseRecordWithId = {
			id: '123',
			name: 'Test Record',
			customField: true,
		};

		expect(record.id).toBe('123');
		expect(record['name']).toBe('Test Record');
	});

	it('should allow valid assignments to CreateRequest and Response', () => {
		interface User extends DatabaseRecordWithId {
			email: string;
		}

		const req: CreateRequest<User> = {
			email: 'test@example.com',
		};

		const res: CreateResponse = {
			id: '1',
		};

		expect(req.email).toBe('test@example.com');
		expect(res.id).toBe('1');
	});

	it('should allow valid assignments to ReadRequest and Response', () => {
		const req: ReadRequest = {
			id: '1',
		};

		const res: ReadResponse = {
			id: '1',
			foo: 'bar',
		};

		expect(req.id).toBe('1');
		expect(res.id).toBe('1');
	});

	it('should allow valid assignments to UpdateRequest and Response', () => {
		const req: UpdateRequest = {
			id: '1',
			foo: 'bar',
		};

		const res: UpdateResponse = undefined;

		expect(req.id).toBe('1');
		expect(res).toBeUndefined();
	});

	it('should allow valid assignments to DeleteRequest and Response', () => {
		const req: DeleteRequest = {
			id: '1',
		};

		const res: DeleteResponse = undefined;

		expect(req.id).toBe('1');
		expect(res).toBeUndefined();
	});

	it('should allow valid assignments to ListRequest and Response', () => {
		const req: ListRequest = {
			limit: 10,
			offset: 0,
			orderBy: 'createdAt',
			orderDirection: 'DESC',
		};

		const res: ListResponse = [{ id: '1' }];

		expect(req.limit).toBe(10);
		expect(res.length).toBe(1);
	});

	it('should allow valid assignments to SearchConditions', () => {
		const stringSearch: RiaoSearchCondition = {
			column: 'name',
			operator: 'LIKE',
			value: '%test%',
		};

		const inArraySearch: RiaoSearchCondition = {
			column: 'status',
			operator: 'INARRAY',
			value: ['active', 'pending'],
		};

		const betweenSearch: RiaoSearchCondition = {
			column: 'age',
			operator: 'BETWEEN',
			value: [18, 65],
			minValue: 18,
			maxValue: 65,
		};

		expect(stringSearch).toBeDefined();
		expect(inArraySearch).toBeDefined();
		expect(betweenSearch).toBeDefined();
	});

	it('should allow valid assignments to Aggregates', () => {
		const aggregate: RiaoAggregateColumn = {
			column: 'id',
			function: 'count',
			alias: 'total_users',
		};

		expect(aggregate.function).toBe('count');
	});

	it('should allow valid assignments to Order Items', () => {
		const order: RiaoOrderItem = {
			column: 'updatedAt',
			direction: 'ASC',
		};

		expect(order.direction).toBe('ASC');
	});

	it('should allow valid assignments to SearchRequest', () => {
		const query: SearchRequest = {
			limit: 50,
			columns: ['id', 'name'],
			where: [{ column: 'active', operator: '=', value: true }],
			groupBy: ['departmentId'],
			order: [{ column: 'joinDate', direction: 'DESC' }],
		};

		expect(query.columns?.length).toBe(2);
	});

	it('should allow valid assignments to SearchResponse', () => {
		interface User extends DatabaseRecordWithId {
			email: string;
		}

		const response: SearchResponse<User> = {
			records: [{ id: '1', email: 'user@test.io' }],
			count: 1,
		};

		expect(response.count).toBe(1);
		expect(response.records[0].email).toBe('user@test.io');
	});
});
