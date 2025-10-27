# 📁 Estructura Completa del Proyecto

```
Incapacities/
│
├── 📄 package.json                    # Dependencias y scripts
├── 📄 tsconfig.json                   # Configuración TypeScript
├── 📄 .env                            # Variables de entorno
├── 📄 .env.example                    # Ejemplo de variables de entorno
├── 📄 .gitignore                      # Archivos ignorados por Git
├── 📄 .eslintrc.json                  # Configuración ESLint
├── 📄 .prettierrc                     # Configuración Prettier
├── 📄 .dockerignore                   # Archivos ignorados por Docker
│
├── 🐳 Dockerfile                      # Configuración contenedor aplicación
├── 🐳 docker-compose.yml              # Orquestación de servicios
│
├── 📖 README.md                       # Documentación principal
├── 📖 QUICK_START.md                  # Guía de inicio rápido
├── 📖 ARCHITECTURE.md                 # Documentación de arquitectura
├── 📖 API_EXAMPLES.json               # Ejemplos de API
├── 🔧 setup.ps1                       # Script de instalación
│
└── 📂 src/                            # Código fuente
    │
    ├── 📄 index.ts                    # Punto de entrada de la aplicación
    │
    ├── 📂 domain/                     # 🔵 CAPA DE DOMINIO
    │   │
    │   ├── 📂 entities/               # Entidades del negocio
    │   │   └── 📄 Incapacity.ts       # Entidad Incapacity con lógica
    │   │
    │   ├── 📂 value-objects/          # Objetos de valor
    │   │   ├── 📄 User.ts             # Value Object User
    │   │   ├── 📄 Payroll.ts          # Value Object Payroll
    │   │   └── 📄 IncapacityEnums.ts  # Enumeraciones (Type, Status)
    │   │
    │   └── 📂 repositories/           # Interfaces de repositorio (Ports)
    │       └── 📄 IncapacityRepository.ts  # Interface del repositorio
    │
    ├── 📂 application/                # 🟢 CAPA DE APLICACIÓN
    │   │
    │   └── 📂 use-cases/              # Casos de uso (lógica de negocio)
    │       ├── 📄 CreateIncapacityUseCase.ts      # Radicar incapacidad
    │       ├── 📄 GetAllIncapacitiesUseCase.ts    # Obtener todas
    │       ├── 📄 GetIncapacitiesByUserUseCase.ts # Obtener por usuario
    │       └── 📄 UpdateIncapacityUseCase.ts      # Actualizar incapacidad
    │
    ├── 📂 infrastructure/             # 🟡 CAPA DE INFRAESTRUCTURA
    │   │
    │   ├── 📂 database/               # Configuración base de datos
    │   │   └── 📄 sequelize.ts        # Conexión Sequelize y PostgreSQL
    │   │
    │   ├── 📂 models/                 # Modelos Sequelize (ORM)
    │   │   ├── 📄 IncapacityModel.ts  # Modelo Incapacity
    │   │   ├── 📄 UserModel.ts        # Modelo User
    │   │   ├── 📄 PayrollModel.ts     # Modelo Payroll
    │   │   └── 📄 CompanyModel.ts     # Modelo Company
    │   │
    │   ├── 📂 repositories/           # Implementaciones de repositorio (Adapters)
    │   │   └── 📄 SequelizeIncapacityRepository.ts  # Implementación Sequelize
    │   │
    │   └── 📂 services/               # Servicios auxiliares
    │       └── 📄 UserPayrollService.ts  # Servicio para User/Payroll
    │
    ├── 📂 presentation/               # 🔴 CAPA DE PRESENTACIÓN
    │   │
    │   ├── 📄 app.ts                  # Configuración Express
    │   │
    │   ├── 📂 controllers/            # Controladores HTTP
    │   │   └── 📄 IncapacityController.ts  # Controlador de incapacidades
    │   │
    │   ├── 📂 routes/                 # Rutas de la API
    │   │   └── 📄 incapacity.routes.ts     # Rutas /api/incapacities
    │   │
    │   ├── 📂 middlewares/            # Middlewares
    │   │   ├── 📄 error.middleware.ts      # Manejo de errores
    │   │   └── 📄 validation.middleware.ts # Validación de requests
    │   │
    │   └── 📂 validators/             # Validadores con Zod
    │       └── 📄 schemas.ts          # Esquemas de validación
    │
    └── 📂 shared/                     # ⚪ CÓDIGO COMPARTIDO
        │
        └── 📂 config/                 # Configuración global
            └── 📄 config.ts           # Variables de entorno tipadas
```

## 📊 Estadísticas del Proyecto

### Archivos por Capa:
- **Domain**: 5 archivos (Entities, Value Objects, Repository Interface)
- **Application**: 4 archivos (Use Cases)
- **Infrastructure**: 7 archivos (Database, Models, Repositories, Services)
- **Presentation**: 6 archivos (App, Controllers, Routes, Middlewares, Validators)
- **Shared**: 1 archivo (Config)
- **Root**: 13 archivos (Config, Docker, Docs)

**Total: ~36 archivos**

### Líneas de Código (aproximado):
- Domain Layer: ~250 líneas
- Application Layer: ~200 líneas
- Infrastructure Layer: ~400 líneas
- Presentation Layer: ~300 líneas
- Configuration: ~150 líneas

**Total: ~1,300 líneas de código TypeScript**

## 🎯 Responsabilidades por Capa

### 🔵 Domain (Núcleo del negocio)
- ✅ Definir entidades y sus reglas
- ✅ Objetos de valor con validaciones
- ✅ Interfaces de repositorio (contratos)
- ✅ Enumeraciones del dominio
- ❌ NO conoce frameworks
- ❌ NO conoce base de datos

### 🟢 Application (Casos de uso)
- ✅ Orquestar lógica de negocio
- ✅ Coordinar entre dominio e infraestructura
- ✅ Implementar reglas de aplicación
- ❌ NO conoce HTTP
- ❌ NO conoce base de datos directamente

### 🟡 Infrastructure (Implementaciones)
- ✅ Implementar repositorios
- ✅ Configurar base de datos
- ✅ Definir modelos ORM
- ✅ Servicios externos
- ❌ NO contiene lógica de negocio

### 🔴 Presentation (Interfaz)
- ✅ Manejar HTTP requests/responses
- ✅ Validar entrada del usuario
- ✅ Formatear respuestas
- ✅ Manejo de errores HTTP
- ❌ NO contiene lógica de negocio

### ⚪ Shared (Transversal)
- ✅ Configuración global
- ✅ Utilidades compartidas
- ✅ Constantes de aplicación

## 🔄 Flujo de una Request (Ejemplo: POST /api/incapacities)

```
1. 📨 HTTP Request llega
         ↓
2. 🛡️ Middleware de validación (Zod)
         ↓
3. 🎮 Controller recibe request
         ↓
4. 🔧 Use Case ejecuta lógica
         ↓
5. ✨ Domain valida entidades
         ↓
6. 💾 Repository guarda en BD
         ↓
7. 📤 Response formateada
         ↓
8. ✅ HTTP Response enviada
```

## 🔐 Validaciones en Múltiples Niveles

### Nivel 1: Schema Validation (Zod)
- Formato de datos
- Tipos correctos
- Campos requeridos

### Nivel 2: Domain Validation
- Reglas de negocio
- Validaciones complejas
- Invariantes del dominio

### Nivel 3: Repository/Database
- Constraints de BD
- Relaciones
- Unicidad

## 🚀 Tecnologías y Versiones

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 20+ | Runtime |
| TypeScript | 5.3+ | Lenguaje |
| Express | 4.18+ | Framework HTTP |
| Sequelize | 6.35+ | ORM |
| PostgreSQL | 15+ | Base de datos |
| Zod | 3.22+ | Validación |
| Docker | Latest | Containerización |
| Helmet | 7.1+ | Seguridad HTTP |
| CORS | 2.8+ | CORS |
| Morgan | 1.10+ | Logging HTTP |

## 📦 Patrones de Diseño Implementados

1. **Hexagonal Architecture** - Estructura general
2. **Repository Pattern** - Abstracción de datos
3. **Dependency Injection** - Desacoplamiento
4. **Use Case Pattern** - Lógica de negocio
5. **Value Object Pattern** - Encapsulación
6. **Factory Pattern** - Creación de objetos
7. **Middleware Pattern** - Express middlewares
8. **Builder Pattern** - Configuración de app

## 🎓 Principios Aplicados

- ✅ SOLID (todos los principios)
- ✅ Clean Code
- ✅ DRY (Don't Repeat Yourself)
- ✅ KISS (Keep It Simple, Stupid)
- ✅ YAGNI (You Aren't Gonna Need It)
- ✅ Separation of Concerns
- ✅ Single Source of Truth
- ✅ Fail Fast

## 🌟 Características Destacadas

1. **Type Safety**: TypeScript estricto en todo el proyecto
2. **Validation**: Múltiples niveles de validación
3. **Error Handling**: Centralizado y consistente
4. **Scalability**: Preparado para crecer
5. **Testability**: Fácil de testear (interfaces mockeables)
6. **Maintainability**: Código limpio y organizado
7. **Documentation**: Completa y actualizada
8. **Docker Ready**: Containerizado y listo para deploy

---

Esta estructura garantiza un proyecto profesional, escalable y mantenible. 🎉
