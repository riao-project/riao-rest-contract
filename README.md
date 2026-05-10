# @riao/rest-contract

TypeScript type definitions that define a shared REST API contract between clients and servers. By sharing these types across your front-end and back-end, both sides agree on the exact shape of request and response payloads for standard CRUD operations (Create, Read, Update, Delete, List, Search) without coupling them to any framework or runtime.

## Installation

```bash
npm install @riao/rest-contract
```

## Quick Start

### Basic Usage

Import the types you need and use them to annotate your API handler functions and client calls:

```typescript
import type {
	CreateRequest,
	CreateResponse,
	ReadRequest,
	ReadResponse,
	UpdateRequest,
	UpdateResponse,
	DeleteRequest,
	DeleteResponse,
	ListRequest,
	ListResponse,
	SearchRequest,
	SearchResponse,
	DatabaseRecordWithId,
} from '@riao/rest-contract';
```

### Define a Record Type

Extend `DatabaseRecordWithId` to describe the shape of your resource:

```typescript
import type { DatabaseRecordWithId } from '@riao/rest-contract';

interface User extends DatabaseRecordWithId {
	id: string;
	email: string;
	name: string;
}
```

### Create

```typescript
import type { CreateRequest, CreateResponse } from '@riao/rest-contract';

// Request body — id is omitted (assigned by the server)
const body: CreateRequest<User> = { email: 'alice@example.com', name: 'Alice' };

// Response — the server returns the new record's id
const response: CreateResponse = { id: '1' };
```

### Read

```typescript
import type { ReadRequest, ReadResponse } from '@riao/rest-contract';

const request: ReadRequest = { id: '1' };

const response: ReadResponse<User> = { id: '1', email: 'alice@example.com', name: 'Alice' };
```

### Update

```typescript
import type { UpdateRequest, UpdateResponse } from '@riao/rest-contract';

// id is required; all other fields are optional
const request: UpdateRequest<User> = { id: '1', name: 'Alice Smith' };

const response: UpdateResponse = undefined; // void
```

### Delete

```typescript
import type { DeleteRequest, DeleteResponse } from '@riao/rest-contract';

const request: DeleteRequest = { id: '1' };

const response: DeleteResponse = undefined; // void
```

### List

```typescript
import type { ListRequest, ListResponse } from '@riao/rest-contract';

const request: ListRequest = {
	limit: 20,
	offset: 0,
	orderBy: 'name',
	orderDirection: 'ASC',
};

const response: ListResponse<User> = [
	{ id: '1', email: 'alice@example.com', name: 'Alice' },
];
```

### Search

Search extends `ListRequest` with filtering, column selection, aggregation, and multi-column ordering:

```typescript
import type { SearchRequest, SearchResponse } from '@riao/rest-contract';

const request: SearchRequest = {
	limit: 50,
	columns: ['id', 'name'],
	where: [{ column: 'active', operator: '=', value: true }],
	aggregates: [{ column: 'id', function: 'count', alias: 'total' }],
	groupBy: ['department'],
	order: [{ column: 'name', direction: 'ASC' }],
};

const response: SearchResponse<User> = {
	records: [{ id: '1', email: 'alice@example.com', name: 'Alice' }],
	count: 1,
};
```

## API Reference

### Common

| Type | Description |
|---|---|
| `DatabaseRecordWithId` | Base record type — a `Record<string, any>` that requires an `id: string` field. All resource interfaces should extend this. |

### Create

| Type | Description |
|---|---|
| `CreateRequest<T>` | Request payload for creating a record. `id` is omitted (or partial). |
| `CreateResponse` | `{ id: string }` — the server-assigned id of the newly created record. |

### Read

| Type | Description |
|---|---|
| `ReadRequest` | `{ id: string }` — identifies the record to fetch. |
| `ReadResponse<T>` | The full record of type `T`. |

### Update

| Type | Description |
|---|---|
| `UpdateRequest<T>` | `id` is required; all other fields of `T` are optional. |
| `UpdateResponse` | `void` |

### Delete

| Type | Description |
|---|---|
| `DeleteRequest` | `{ id: string }` — identifies the record to delete. |
| `DeleteResponse` | `void` |

### List

| Type | Description |
|---|---|
| `ListRequest` | Pagination and simple ordering (`limit`, `offset`, `orderBy`, `orderDirection`). |
| `ListResponse<T>` | `T[]` — an array of records. |

### Search

| Type | Description |
|---|---|
| `SearchRequest` | Extends `ListRequest` with `columns`, `where`, `aggregates`, `groupBy`, and `order`. |
| `SearchResponse<T>` | `{ records: T[]; count: number }` |
| `RiaoSearchCondition` | A single filter condition: `{ column, operator, value, minValue?, maxValue? }`. Supported operators: `=`, `<`, `<=`, `>`, `>=`, `LIKE`, `INARRAY`, `BETWEEN`. |
| `RiaoAggregateColumn` | `{ column, function, alias? }`. Supported functions: `count`, `sum`, `avg`, `min`, `max`. |
| `RiaoOrderItem` | `{ column, direction? }` where `direction` is `'ASC'` or `'DESC'`. |

## Contributing

- [Contributing Guide](./CONTRIBUTING.md)
- [Setup Guide](./docs/guides/setup.md)
- [Development Guide](./docs/guides/development.md)

## License

Licensed under the [MIT](LICENSE.md).
