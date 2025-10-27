# 🧪 Testing Guide & Best Practices

## Preparación para Testing

Este proyecto está estructurado para facilitar el testing. Aunque los tests no están implementados, aquí está la guía de cómo deberían implementarse.

## 📦 Dependencias de Testing (para agregar)

```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@types/jest": "^29.5.11",
    "ts-jest": "^29.1.1",
    "supertest": "^6.3.3",
    "@types/supertest": "^6.0.2"
  }
}
```

## 🎯 Tipos de Tests

### 1. Unit Tests (Domain & Application)

#### Testing Domain Entities
```typescript
// __tests__/domain/entities/Incapacity.test.ts
describe('Incapacity Entity', () => {
  it('should create valid incapacity', () => {
    const incapacity = new Incapacity(
      'uuid',
      'user-id',
      'payroll-id',
      new Date('2025-10-27'),
      new Date('2025-10-30'),
      IncapacityType.ENFERMEDAD,
      IncapacityStatus.PENDIENTE
    );
    
    expect(incapacity.type).toBe(IncapacityType.ENFERMEDAD);
  });

  it('should throw error when end_date before start_date', () => {
    expect(() => {
      new Incapacity(
        'uuid',
        'user-id',
        'payroll-id',
        new Date('2025-10-30'),
        new Date('2025-10-27'), // ❌ Antes de start_date
        IncapacityType.ENFERMEDAD,
        IncapacityStatus.PENDIENTE
      );
    }).toThrow('End date must be after start date');
  });
});
```

#### Testing Use Cases
```typescript
// __tests__/application/CreateIncapacityUseCase.test.ts
describe('CreateIncapacityUseCase', () => {
  let mockRepository: jest.Mocked<IncapacityRepository>;
  let useCase: CreateIncapacityUseCase;

  beforeEach(() => {
    // Mock del repositorio
    mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    
    useCase = new CreateIncapacityUseCase(mockRepository);
  });

  it('should create incapacity successfully', async () => {
    const dto = {
      user: {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        role: 'employee'
      },
      payroll: {
        nameCompany: 'Company',
        NIT: '123',
        adressCompany: 'Address',
        phone: '123456'
      },
      incapacity: {
        start_date: '2025-10-27',
        end_date: '2025-10-30',
        type: IncapacityType.ENFERMEDAD
      }
    };

    const mockIncapacity = new Incapacity(/*...*/);
    mockRepository.create.mockResolvedValue(mockIncapacity);

    const result = await useCase.execute(dto);

    expect(result).toBeDefined();
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw error on invalid data', async () => {
    const invalidDto = {
      user: {
        firstName: '', // ❌ Vacío
        lastName: 'Pérez',
        email: 'invalid-email', // ❌ Email inválido
        role: 'employee'
      },
      // ... resto
    };

    await expect(useCase.execute(invalidDto))
      .rejects.toThrow();
  });
});
```

### 2. Integration Tests (Infrastructure)

```typescript
// __tests__/infrastructure/SequelizeIncapacityRepository.test.ts
describe('SequelizeIncapacityRepository', () => {
  let repository: SequelizeIncapacityRepository;
  
  beforeAll(async () => {
    // Configurar BD de prueba
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    // Limpiar BD entre tests
    await IncapacityModel.destroy({ where: {} });
    repository = new SequelizeIncapacityRepository();
  });

  it('should create and retrieve incapacity', async () => {
    const incapacity = new Incapacity(/*...*/);
    
    const created = await repository.create(incapacity);
    const found = await repository.findById(created.id_incapacity);

    expect(found).toBeDefined();
    expect(found?.id_incapacity).toBe(created.id_incapacity);
  });
});
```

### 3. E2E Tests (API)

```typescript
// __tests__/e2e/incapacity.e2e.test.ts
import request from 'supertest';
import { createApp } from '../../src/presentation/app';

describe('Incapacity API E2E', () => {
  let app: Express.Application;

  beforeAll(() => {
    // Setup de la app
    const mockController = /* ... */;
    app = createApp(mockController);
  });

  describe('POST /api/incapacities', () => {
    it('should create incapacity', async () => {
      const response = await request(app)
        .post('/api/incapacities')
        .send({
          user: {
            firstName: 'Juan',
            lastName: 'Pérez',
            email: 'juan@example.com',
            role: 'employee'
          },
          payroll: {
            nameCompany: 'Company',
            NIT: '123',
            adressCompany: 'Address',
            phone: '123456'
          },
          incapacity: {
            start_date: '2025-10-27',
            end_date: '2025-10-30',
            type: 'enfermedad'
          }
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });

    it('should return 400 on invalid data', async () => {
      const response = await request(app)
        .post('/api/incapacities')
        .send({
          user: {
            firstName: '', // ❌ Inválido
          }
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/incapacities', () => {
    it('should return all incapacities', async () => {
      const response = await request(app)
        .get('/api/incapacities');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
```

## 📁 Estructura de Tests Recomendada

```
__tests__/
├── unit/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── Incapacity.test.ts
│   │   └── value-objects/
│   │       ├── User.test.ts
│   │       └── Payroll.test.ts
│   │
│   └── application/
│       └── use-cases/
│           ├── CreateIncapacityUseCase.test.ts
│           ├── GetAllIncapacitiesUseCase.test.ts
│           ├── GetIncapacitiesByUserUseCase.test.ts
│           └── UpdateIncapacityUseCase.test.ts
│
├── integration/
│   └── infrastructure/
│       └── repositories/
│           └── SequelizeIncapacityRepository.test.ts
│
└── e2e/
    └── api/
        └── incapacity.e2e.test.ts
```

## ⚙️ Configuración Jest

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
  },
};
```

## 🎯 Coverage Goals

- **Domain**: 100% (crítico - lógica de negocio)
- **Application**: 95% (muy importante - casos de uso)
- **Infrastructure**: 80% (importante - implementaciones)
- **Presentation**: 70% (básico - controllers/routes)

## 🛠️ Scripts de Testing (package.json)

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "jest --testPathPattern=e2e"
  }
}
```

## 🔍 Mejores Prácticas

### ✅ DO:
- Testear comportamiento, no implementación
- Usar mocks para dependencias externas
- Nombrar tests claramente (should + comportamiento esperado)
- Seguir patrón AAA (Arrange, Act, Assert)
- Tests independientes entre sí
- Limpiar estado entre tests

### ❌ DON'T:
- No testear frameworks externos
- No testear código generado
- No hacer tests que dependan de orden de ejecución
- No usar datos hardcodeados (usar factories)
- No testear métodos privados directamente

## 🏭 Test Factories (Recomendado)

```typescript
// __tests__/factories/IncapacityFactory.ts
export class IncapacityFactory {
  static create(overrides?: Partial<Incapacity>): Incapacity {
    return new Incapacity(
      overrides?.id_incapacity || uuidv4(),
      overrides?.id_user || uuidv4(),
      overrides?.id_payroll || uuidv4(),
      overrides?.start_date || new Date('2025-10-27'),
      overrides?.end_date || new Date('2025-10-30'),
      overrides?.type || IncapacityType.ENFERMEDAD,
      overrides?.status || IncapacityStatus.PENDIENTE,
      overrides?.observacion
    );
  }

  static createDTO(overrides?: Partial<CreateIncapacityDTO>) {
    return {
      user: {
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@example.com',
        role: 'employee',
        ...overrides?.user
      },
      // ... resto
    };
  }
}
```

## 📊 Métricas de Calidad

### Code Coverage
```bash
npm run test:coverage
```

### Mutation Testing (opcional)
```bash
npm install -D stryker
npx stryker run
```

### Performance Testing
```typescript
it('should create 1000 incapacities in less than 5s', async () => {
  const start = Date.now();
  
  const promises = Array(1000).fill(null).map(() => 
    useCase.execute(dto)
  );
  
  await Promise.all(promises);
  
  const duration = Date.now() - start;
  expect(duration).toBeLessThan(5000);
});
```

## 🔐 Testing de Validaciones

```typescript
describe('Validation Tests', () => {
  it('should reject invalid email', async () => {
    const dto = IncapacityFactory.createDTO({
      user: { email: 'invalid-email' }
    });

    await expect(useCase.execute(dto))
      .rejects.toThrow('Valid email is required');
  });

  it('should reject future dates in the past', async () => {
    const dto = IncapacityFactory.createDTO({
      incapacity: {
        start_date: '2020-01-01', // Fecha pasada
        end_date: '2020-01-05'
      }
    });

    // Dependiendo de las reglas de negocio
    // podría ser válido o no
  });
});
```

## 🌐 Testing de Integración con Microservicios

```typescript
// Cuando se integren otros microservicios
describe('User Service Integration', () => {
  it('should fetch user from user service', async () => {
    // Mock del servicio externo
    nock('http://user-service:3001')
      .get('/api/users/uuid')
      .reply(200, { id: 'uuid', name: 'Juan' });

    const user = await userService.getUser('uuid');
    expect(user.name).toBe('Juan');
  });
});
```

## 🎓 Recursos Adicionales

- Jest Documentation: https://jestjs.io/
- Testing Best Practices: https://github.com/goldbergyoni/javascript-testing-best-practices
- Test Driven Development (TDD)
- Behavior Driven Development (BDD)

---

## ⚡ Quick Start Testing

1. Instalar dependencias:
```bash
npm install -D jest @types/jest ts-jest supertest @types/supertest
```

2. Crear jest.config.js

3. Escribir primer test:
```bash
mkdir -p __tests__/unit/domain/entities
# Crear Incapacity.test.ts
```

4. Ejecutar tests:
```bash
npm test
```

---

**Nota**: Los tests no están implementados en este proyecto base, pero la arquitectura está diseñada para facilitar su implementación siguiendo estas guías.
