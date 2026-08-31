# Super Market Backend

Node.js, MongoDB, and ES Modules backend for a multi-organization supermarket system using service-repository architecture.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Architecture

- `controllers`: HTTP request/response handling
- `services`: business logic
- `repositories`: MongoDB queries
- `models`: Mongoose schemas
- `middlewares`: auth, role permissions, validation, errors
- `routes`: API route registration

## Main Capabilities

- Authentication with JWT
- Role-based permissions
- Organization-scoped data access
- Branches, departments, teams, products, categories, suppliers
- Inventory and inventory assignment
- Stock movements
- Purchase orders with status transitions
- Sales and invoices
- Low-stock escalation workflow
- Stock reports
