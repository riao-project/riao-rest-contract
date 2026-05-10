# Architecture Overview

## Goals

- **Framework-agnostic** — works with Express, Fastify, NestJS, Hono, or any other HTTP library on the server, and with fetch, axios, or any HTTP client on the front-end.
- **Zero runtime footprint** — the package contains only TypeScript types. Nothing is shipped to production JavaScript bundles.
- **Convention-based** — every resource follows the same six operations (Create, Read, Update, Delete, List, Search), making API surfaces predictable and self-documenting.

