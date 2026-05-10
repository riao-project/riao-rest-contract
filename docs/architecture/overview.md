# Architecture Overview

`@riao/rest-contract` is a zero-dependency TypeScript library that exports shared type definitions for a standard REST API. Its sole purpose is to give clients and servers a common language for request/response payloads, without tying either side to a specific framework.

## Goals

- **Framework-agnostic** — works with Express, Fastify, NestJS, Hono, or any other HTTP library on the server, and with fetch, axios, or any HTTP client on the front-end.
- **Zero runtime footprint** — the package contains only TypeScript types. Nothing is shipped to production JavaScript bundles.
- **Convention-based** — every resource follows the same six operations (Create, Read, Update, Delete, List, Search), making API surfaces predictable and self-documenting.

## Module Structure

```
src/
├── index.ts          # Barrel export — re-exports every public type
├── common/           # Shared base types
│   └── index.ts      # DatabaseRecordWithId
├── create/           # POST / create a new record
│   └── index.ts      # CreateRequest<T>, CreateResponse
├── read/             # GET a single record by id
│   └── index.ts      # ReadRequest, ReadResponse<T>
├── update/           # PUT/PATCH — update an existing record
│   └── index.ts      # UpdateRequest<T>, UpdateResponse
├── delete/           # DELETE a record
│   └── index.ts      # DeleteRequest, DeleteResponse
├── list/             # GET a paginated list of records
│   └── index.ts      # ListRequest, ListResponse<T>
└── search/           # POST / advanced filtered query
    └── index.ts      # SearchRequest, SearchResponse<T>,
                      # RiaoSearchCondition, RiaoAggregateColumn,
                      # RiaoOrderItem
```

Each sub-module is independently importable via the package sub-path exports defined in `package.json` (e.g. `@riao/rest-contract/search`), or everything can be imported from the root (`@riao/rest-contract`).

## Data Flow

```
Client                          Server
──────                          ──────
CreateRequest<T>   ──────────►  handler receives CreateRequest<T>
                   ◄──────────  handler returns CreateResponse

ListRequest        ──────────►  handler receives ListRequest
                   ◄──────────  handler returns ListResponse<T>

SearchRequest      ──────────►  handler receives SearchRequest
                   ◄──────────  handler returns SearchResponse<T>
```

Both sides import from the same package, so a mismatch in field names or types becomes a compile-time error rather than a runtime bug.

## Type Hierarchy

```
DatabaseRecordWithId   (base: Record<string, any> & { id: string })
        │
        ├── CreateRequest<T>     Omit<T, 'id'> | Partial<T>
        ├── CreateResponse       { id: string }
        │
        ├── ReadRequest          { id: string }
        ├── ReadResponse<T>      T
        │
        ├── UpdateRequest<T>     Partial<Omit<T, 'id'>> & { id: string }
        ├── UpdateResponse       void
        │
        ├── DeleteRequest        { id: string }
        ├── DeleteResponse       void
        │
        ├── ListRequest          { limit?, offset?, orderBy?, orderDirection? }
        ├── ListResponse<T>      T[]
        │
        ├── SearchRequest        ListRequest + columns?, where?,
        │                        aggregates?, groupBy?, order?
        └── SearchResponse<T>    { records: T[]; count: number }
```

## Key Design Decisions

### id is always a string

All records use `id: string`. Using a string (rather than a number) keeps the type compatible with UUIDs, ULID, CUID, and other identifier schemes.

### UpdateRequest requires id, makes other fields optional

`UpdateRequest<T>` is typed as `Partial<Omit<T, 'id'>> & { id: string }`, which allows partial updates (PATCH semantics) while always requiring the record identifier.

### SearchRequest extends ListRequest

Search is a superset of list: every search endpoint also supports pagination, so `SearchRequest` extends `ListRequest` rather than duplicating those fields.

### SearchResponse wraps records with a count

Unlike `ListResponse` (a plain array), `SearchResponse` is `{ records: T[]; count: number }`. The `count` field represents the total number of matching records (before pagination), which is necessary for building paginated UIs.

