## Clinic Management Software (CMS) - Modular Microservices Skeleton

### Stack
- API Gateway (Express) fronting microservices: Auth, Patient, Appointments, Billing, AI Prescription, Manual Prescription, Accounts, Analytics
- Shared `@cms/common` package for types, validation, and RBAC
- Next.js frontend (`apps/web`) for agentic flow and dashboards
- Docker Compose for local; Kubernetes manifests in `k8s/`

### Quickstart
```bash
npm i
npm run build
docker compose up --build
# Web:     http://localhost:3000
# Gateway: http://localhost:4000/health
```

Login and call APIs:
```bash
curl -s -X POST http://localhost:4001/auth/login -H 'Content-Type: application/json' -d '{"email":"admin@clinic.com","password":"admin123"}'
```

### Add a new module
- Create a new service under `services/<name>` exposing REST APIs
- Add route mapping in `gateway/src/index.ts`
- Build and deploy independently; gateway wires traffic via env URLs

### Production notes
- Deploy with `k8s/gateway.yaml` and `k8s/services.yaml` (set images and secrets)
- Use managed Postgres + a message bus (Kafka/NATS) for real-time analytics
- Enforce TLS, rotate JWT secrets, and implement audit logs

