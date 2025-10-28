# Microservicio de Incapacidades# Incapacities Microservice



Microservicio para la gestión de incapacidades de empleados, desarrollado con Express, TypeScript, Sequelize y PostgreSQL siguiendo arquitectura hexagonal.Microservicio para la gestión de incapacidades laborales desarrollado con arquitectura hexagonal.



## 🏗️ Estructura del Proyecto## 🏗️ Arquitectura



```Este proyecto implementa Clean Architecture (Arquitectura Hexagonal) con las siguientes capas:

src/

├── config/- **Domain**: Entidades, objetos de valor e interfaces de repositorio

│   ├── config.ts                      # Configuración de la aplicación- **Application**: Casos de uso (lógica de negocio)

│   └── database.ts                    # Conexión a la base de datos- **Infrastructure**: Implementaciones de repositorios, base de datos

│- **Presentation**: Controllers, rutas, validadores, middlewares

├── microservices/

│   └── incapacities/## 🚀 Tecnologías

│       ├── index.ts                   # Barrel exports

│       │- **Node.js** con **TypeScript**

│       ├── application/- **Express** para el servidor HTTP

│       │   ├── incapacity.service.ts  # Lógica de negocio- **Sequelize** como ORM

│       │   └── dto/- **PostgreSQL** como base de datos

│       │       └── incapacity.request.ts- **Zod** para validación de datos

│       │- **Docker** y **Docker Compose** para contenedores

│       ├── domain/

│       │   ├── incapacity.entity.ts   # Entidad con validaciones## 📋 Prerequisitos

│       │   ├── model/                 # Modelos Sequelize

│       │   │   ├── user.model.ts- Node.js 20+

│       │   │   ├── company.model.ts- PostgreSQL 15+ (o Docker)

│       │   │   ├── payroll.model.ts- npm o yarn

│       │   │   └── incapacity.model.ts

│       │   └── ports/## 🔧 Instalación

│       │       └── incapacity.repository.interface.ts

│       │### Opción 1: Desarrollo Local

│       └── infrastructure/

│           ├── controllers/1. Clonar el repositorio

│           │   └── incapacity.controller.ts2. Instalar dependencias:

│           ├── repositories/```bash

│           │   └── incapacity.repository.tsnpm install

│           └── routers/```

│               └── incapacity.router.ts

│3. Copiar el archivo de ejemplo de variables de entorno:

├── shared/```bash

│   ├── interfaces/copy .env.example .env

│   │   └── api-response.interface.ts```

│   ├── middleware/

│   │   └── error-handler.middleware.ts4. Configurar las variables de entorno en `.env`

│   └── utils/

│       └── response-handler.util.ts5. Iniciar el servidor en modo desarrollo:

│```bash

├── app.ts                              # Configuración Expressnpm run dev

└── index.ts                            # Punto de entrada```

```

### Opción 2: Con Docker

## 🚀 Características

1. Asegurarse de tener Docker y Docker Compose instalados

- ✅ Arquitectura hexagonal (puertos y adaptadores)

- ✅ TypeScript para tipado estático2. Construir y ejecutar los contenedores:

- ✅ Sequelize ORM con PostgreSQL```bash

- ✅ Validaciones de dominiodocker-compose up -d

- ✅ Manejo centralizado de errores```

- ✅ Respuestas HTTP estandarizadas

- ✅ CORS y Helmet para seguridadEl servicio estará disponible en `http://localhost:3000`

- ✅ Docker y Docker Compose

## 📡 Endpoints

## 📋 Requisitos

### Health Check

- Node.js 20+```

- PostgreSQL 15+GET /health

- npm o yarn```



## ⚙️ Instalación### Radicar Incapacidad

```

1. **Clonar el repositorio**POST /api/incapacities

```bashContent-Type: application/json

git clone <repository-url>

cd Incapacities{

```  "user": {

    "firstName": "Juan",

2. **Instalar dependencias**    "lastName": "Pérez",

```bash    "email": "juan.perez@example.com",

npm install    "role": "employee"

```  },

  "payroll": {

3. **Configurar variables de entorno**    "nameCompany": "Empresa XYZ",

```bash    "NIT": "900123456-7",

cp .env.example .env    "adressCompany": "Calle 123 #45-67",

```    "phone": "+573001234567"

  },

Editar `.env`:  "incapacity": {

```env    "start_date": "2025-10-27",

PORT=3000    "end_date": "2025-10-30",

NODE_ENV=development    "type": "enfermedad",

    "observacion": "Gripe común"

DB_HOST=localhost  }

DB_PORT=5432}

DB_NAME=incapacities_db```

DB_USER=postgres

DB_PASSWORD=postgres### Obtener Todas las Incapacidades

DB_DIALECT=postgres```

```GET /api/incapacities

```

4. **Crear base de datos**

```bash### Obtener Incapacidades por Usuario

psql -U postgres```

CREATE DATABASE incapacities_db;GET /api/incapacities/user/:userId

\q```

```

### Editar Incapacidad

## 🏃 Ejecución```

PUT /api/incapacities/:id

### DesarrolloContent-Type: application/json

```bash

npm run dev{

```  "start_date": "2025-10-28",

  "end_date": "2025-10-31",

### Producción  "type": "enfermedad",

```bash  "status": "confirmada",

npm run build  "observacion": "Actualización de fechas"

npm start}

``````



### Docker## 🔐 Validaciones

```bash

docker-compose up -d### Tipos de Incapacidad

```- `accidente`

- `maternidad`

## 📡 API Endpoints- `enfermedad`



### Health Check### Estados de Incapacidad

```http- `pendiente` (por defecto)

GET /health- `en trámite`

```- `confirmada`

- `negada`

### Crear Incapacidad

```http## 📁 Estructura del Proyecto

POST /api/incapacities/create

Content-Type: application/json```

src/

{├── domain/              # Capa de dominio

  "user": {│   ├── entities/        # Entidades del negocio

    "firstName": "Juan",│   ├── value-objects/   # Objetos de valor

    "lastName": "Pérez",│   └── repositories/    # Interfaces de repositorio

    "email": "juan@example.com",├── application/         # Capa de aplicación

    "role": "empleado"│   └── use-cases/       # Casos de uso

  },├── infrastructure/      # Capa de infraestructura

  "payroll": {│   ├── database/        # Configuración de BD

    "nameCompany": "Tech Corp",│   ├── models/          # Modelos Sequelize

    "NIT": "900123456",│   └── repositories/    # Implementaciones de repositorio

    "adressCompany": "Calle 123",├── presentation/        # Capa de presentación

    "phone": "3001234567"│   ├── controllers/     # Controladores

  },│   ├── routes/          # Rutas

  "incapacity": {│   ├── middlewares/     # Middlewares

    "start_date": "2024-01-15",│   └── validators/      # Esquemas de validación

    "end_date": "2024-01-20",├── shared/              # Código compartido

    "type": "enfermedad",│   └── config/          # Configuración

    "observacion": "Gripe fuerte"└── index.ts             # Punto de entrada

  }```

}

```## 🧪 Scripts Disponibles



### Obtener Todas las Incapacidades```bash

```httpnpm run dev      # Iniciar en modo desarrollo

GET /api/incapacities/getAllnpm run build    # Compilar TypeScript

```npm start        # Iniciar en producción

npm run lint     # Ejecutar linter

### Obtener Incapacidades por Usuarionpm run format   # Formatear código

```http```

GET /api/incapacities/getByUser/:userId

```## 🐳 Docker



### Actualizar Incapacidad### Construir imagen

```http```bash

PUT /api/incapacities/update/:iddocker build -t incapacities-service .

Content-Type: application/json```



{### Ejecutar con Docker Compose

  "start_date": "2024-01-16",```bash

  "end_date": "2024-01-22",docker-compose up -d

  "type": "enfermedad",```

  "status": "confirmada",

  "observacion": "Actualizado"### Detener servicios

}```bash

```docker-compose down

```

## 📊 Tipos y Estados

### Ver logs

### Tipos de Incapacidad```bash

- `accidente`docker-compose logs -f app

- `maternidad````

- `enfermedad`

## 🔄 Escalabilidad

### Estados

- `pendiente` (default)El proyecto está diseñado para crecer fácilmente:

- `en trámite`

- `confirmada`- **Arquitectura desacoplada**: Las capas están claramente separadas

- `negada`- **Inyección de dependencias**: Facilita testing y cambios de implementación

- **Repositorio abstracto**: Permite cambiar de ORM sin afectar la lógica de negocio

## 🗄️ Base de Datos- **Validaciones centralizadas**: Fácil de extender con nuevas reglas

- **Containerizado**: Listo para orquestación con Kubernetes

El microservicio utiliza Sequelize con sincronización automática. Las tablas se crean automáticamente al iniciar:- **Preparado para microservicios**: Fácil integración con otros servicios



- `users` - Usuarios## 🔮 Futuras Integraciones

- `companies` - Empresas

- `payrolls` - NóminasEl diseño permite fácil integración con:

- `incapacities` - Incapacidades- Microservicio de usuarios

- Microservicio de nóminas

## 🛠️ Scripts Disponibles- Sistema de autenticación (JWT)

- Message brokers (RabbitMQ, Kafka)

```bash- Cache (Redis)

npm run dev       # Desarrollo con hot-reload- API Gateway

npm run build     # Compilar TypeScript

npm start         # Ejecutar versión compilada## 📝 Variables de Entorno

npm run lint      # Verificar código

npm run format    # Formatear código| Variable | Descripción | Default |

```|----------|-------------|---------|

| PORT | Puerto del servidor | 3000 |

## 🏛️ Arquitectura| NODE_ENV | Entorno de ejecución | development |

| DB_HOST | Host de PostgreSQL | localhost |

### Capa de Dominio| DB_PORT | Puerto de PostgreSQL | 5432 |

Contiene la lógica de negocio pura:| DB_NAME | Nombre de la base de datos | incapacities_db |

- **Entidades**: `Incapacity` con validaciones| DB_USER | Usuario de PostgreSQL | postgres |

- **Modelos**: Representación de datos con Sequelize| DB_PASSWORD | Contraseña de PostgreSQL | postgres |

- **Ports**: Interfaces (contratos)| DB_DIALECT | Dialecto de Sequelize | postgres |



### Capa de Aplicación## 🤝 Mejores Prácticas Implementadas

Orquesta casos de uso:

- **Service**: Lógica de aplicación✅ Clean Architecture / Hexagonal Architecture  

- **DTOs**: Transferencia de datos✅ SOLID Principles  

✅ Validación robusta con Zod  

### Capa de Infraestructura✅ Manejo de errores centralizado  

Implementaciones concretas:✅ TypeScript estricto  

- **Controllers**: Manejo de HTTP✅ Logging estructurado  

- **Repositories**: Acceso a datos✅ Docker multi-stage builds  

- **Routers**: Definición de rutas✅ Health checks  

✅ Variables de entorno  

### Capa Compartida✅ Código autodocumentado (sin comentarios innecesarios)

Utilidades reutilizables:

- **Middleware**: Manejo de errores## 📄 Licencia

- **Utils**: ResponseHandler

- **Interfaces**: Tipos compartidosMIT


## 🔒 Seguridad

- Helmet para headers de seguridad
- CORS configurado
- Validación de datos de entrada
- Manejo seguro de errores

## 📝 Licencia

MIT
