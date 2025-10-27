# 🏗️ Arquitectura del Microservicio de Incapacidades

## Diagrama de Capas (Arquitectura Hexagonal)

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐    │
│  │  Controllers │  │  Middlewares │  │  Validators (Zod) │    │
│  │   - Create   │  │   - Error    │  │   - Schemas       │    │
│  │   - GetAll   │  │   - Logging  │  │   - Rules         │    │
│  │   - GetById  │  │   - CORS     │  └───────────────────┘    │
│  │   - Update   │  │   - Helmet   │                            │
│  └──────────────┘  └──────────────┘                            │
│           │                 │                                    │
│           └────────┬────────┘                                    │
│                    │                                             │
└────────────────────┼─────────────────────────────────────────────┘
                     │
┌────────────────────┼─────────────────────────────────────────────┐
│                    │        APPLICATION LAYER                    │
│           ┌────────▼────────┐                                    │
│           │   Use Cases     │                                    │
│           │  - CreateInc    │                                    │
│           │  - GetAllInc    │                                    │
│           │  - GetByUser    │                                    │
│           │  - UpdateInc    │                                    │
│           └────────┬────────┘                                    │
│                    │                                             │
└────────────────────┼─────────────────────────────────────────────┘
                     │
┌────────────────────┼─────────────────────────────────────────────┐
│                    │         DOMAIN LAYER                        │
│           ┌────────▼────────────────────────────┐               │
│           │  Repository Interface (Port)        │               │
│           └─────────────────────────────────────┘               │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────┐        │
│  │   Entities   │  │ Value Objects│  │  Enumerations  │        │
│  │              │  │              │  │                │        │
│  │  Incapacity  │  │    User      │  │  - Types       │        │
│  │              │  │   Payroll    │  │  - Status      │        │
│  └──────────────┘  └──────────────┘  └────────────────┘        │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
                     │
┌────────────────────┼─────────────────────────────────────────────┐
│                    │      INFRASTRUCTURE LAYER                   │
│           ┌────────▼────────────────────────┐                   │
│           │  Repository Implementation      │                   │
│           │  (SequelizeIncapacityRepository)│                   │
│           └────────┬────────────────────────┘                   │
│                    │                                             │
│  ┌────────────────┼────────────────────────────────┐           │
│  │                │    Database Models             │           │
│  │  ┌─────────────▼──────────┐  ┌──────────────┐  │           │
│  │  │  IncapacityModel       │  │  UserModel   │  │           │
│  │  └────────────────────────┘  └──────────────┘  │           │
│  │  ┌────────────────────────┐  ┌──────────────┐  │           │
│  │  │   PayrollModel         │  │ CompanyModel │  │           │
│  │  └────────────────────────┘  └──────────────┘  │           │
│  └────────────────────────────────────────────────┘           │
│                    │                                             │
│           ┌────────▼────────┐                                   │
│           │   Sequelize     │                                   │
│           │   PostgreSQL    │                                   │
│           └─────────────────┘                                   │
└───────────────────────────────────────────────────────────────────┘
```

## Flujo de Datos

```
HTTP Request
     │
     ▼
┌─────────────┐
│   Routes    │  Valida parámetros y body
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controller  │  Recibe request, llama use case
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Use Case   │  Lógica de negocio
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Domain     │  Validaciones de dominio
│  Entities   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Repository  │  Interfaz (abstracción)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Sequelize  │  Implementación concreta
│ Repository  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Database   │  PostgreSQL
└─────────────┘
       │
       ▼
Response ← ← ← ← ← (Flujo inverso)
```

## Modelo de Datos

```
┌──────────────┐
│    USERS     │
├──────────────┤
│ PK id_user   │───┐
│    firstName │   │
│    lastName  │   │
│    email     │   │
│    role      │   │
└──────────────┘   │
                   │
       ┌───────────┴───────────┐
       │                       │
       │                       │
┌──────▼─────┐         ┌──────▼──────┐
│  PAYROLLS  │         │ INCAPACITIES│
├────────────┤         ├─────────────┤
│PK id_payroll│────────▶│PK id_incap. │
│FK id_user  │         │FK id_user   │
│FK id_company│         │FK id_payroll│
│   status   │         │ start_date  │
└────────────┘         │ end_date    │
       │               │ type        │
       │               │ status      │
┌──────▼─────┐         │ observacion │
│  COMPANIES │         └─────────────┘
├────────────┤
│PK id_company│
│ nameCompany│
│    NIT     │
│adressComp. │
│   phone    │
└────────────┘
```

## Patrones Implementados

### 1. Hexagonal Architecture (Ports & Adapters)
- **Ports**: Interfaces de repositorio
- **Adapters**: Implementaciones concretas (Sequelize, Express)
- **Beneficio**: Desacoplamiento entre capas

### 2. Dependency Injection
```typescript
// Las dependencias se inyectan en constructores
class CreateIncapacityUseCase {
  constructor(
    private repository: IncapacityRepository // ← Interface
  ) {}
}
```

### 3. Repository Pattern
```typescript
// Abstracción de persistencia
interface IncapacityRepository {
  create(incapacity: Incapacity): Promise<Incapacity>
  findAll(): Promise<Incapacity[]>
  // ...
}
```

### 4. Value Objects
```typescript
// Encapsulación de validaciones
class User {
  constructor(/* ... */) {
    this.validate() // ← Validación en construcción
  }
}
```

### 5. Use Case Pattern
- Cada caso de uso es una clase independiente
- Single Responsibility Principle
- Fácil de testear y mantener

## Principios SOLID Aplicados

### 🔹 Single Responsibility Principle (SRP)
- Cada clase tiene una sola responsabilidad
- Controllers solo manejan HTTP
- Use Cases solo contienen lógica de negocio
- Repositories solo manejan persistencia

### 🔹 Open/Closed Principle (OCP)
- Abierto para extensión (nuevos use cases)
- Cerrado para modificación (interfaces estables)

### 🔹 Liskov Substitution Principle (LSP)
- Cualquier implementación de `IncapacityRepository` puede usarse
- El use case no sabe qué implementación usa

### 🔹 Interface Segregation Principle (ISP)
- Interfaces específicas y pequeñas
- Los clientes no dependen de métodos que no usan

### 🔹 Dependency Inversion Principle (DIP)
- Las capas superiores dependen de abstracciones
- No de implementaciones concretas

## Escalabilidad

### Horizontal Scaling
```
┌──────────────┐
│ Load Balancer│
└──────┬───────┘
       │
   ┌───┴────┬────────┬────────┐
   │        │        │        │
┌──▼──┐  ┌──▼──┐  ┌──▼──┐  ┌──▼──┐
│App 1│  │App 2│  │App 3│  │App N│
└──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘
   └────────┴────────┴────────┘
              │
      ┌───────▼────────┐
      │   PostgreSQL   │
      │   (Cluster)    │
      └────────────────┘
```

### Microservices Integration
```
┌───────────────┐      ┌─────────────┐
│   API Gateway │      │  Discovery  │
└───────┬───────┘      │   Service   │
        │              └─────────────┘
   ┌────┴────┬────────┬────────┐
   │         │        │        │
┌──▼────┐ ┌─▼──────┐ ┌▼──────┐ ┌▼──────┐
│ Users │ │Incap.  │ │Payroll│ │Auth   │
│Service│ │Service │ │Service│ │Service│
└───────┘ └────────┘ └───────┘ └───────┘
```

## Extensibilidad Futura

### ✅ Fácil de agregar:
- Nuevos endpoints
- Nuevos use cases
- Cambio de ORM (Prisma, TypeORM)
- Cambio de base de datos
- Autenticación (JWT, OAuth)
- Cache (Redis)
- Message Queue (RabbitMQ, Kafka)
- Event sourcing
- CQRS

### 📦 Puntos de extensión:
1. **Nuevos Use Cases**: `application/use-cases/`
2. **Nuevas Validaciones**: `presentation/validators/`
3. **Nuevos Middlewares**: `presentation/middlewares/`
4. **Nuevos Repositories**: `infrastructure/repositories/`
5. **Servicios externos**: `infrastructure/services/`

---

Esta arquitectura garantiza:
- ✅ Código mantenible y escalable
- ✅ Fácil testing (mocks de interfaces)
- ✅ Desacoplamiento entre capas
- ✅ Independencia de frameworks
- ✅ Lógica de negocio protegida
- ✅ Preparado para microservicios
