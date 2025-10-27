# Incapacities Microservice

Microservicio para la gestión de incapacidades laborales desarrollado con arquitectura hexagonal.

## 🏗️ Arquitectura

Este proyecto implementa Clean Architecture (Arquitectura Hexagonal) con las siguientes capas:

- **Domain**: Entidades, objetos de valor e interfaces de repositorio
- **Application**: Casos de uso (lógica de negocio)
- **Infrastructure**: Implementaciones de repositorios, base de datos
- **Presentation**: Controllers, rutas, validadores, middlewares

## 🚀 Tecnologías

- **Node.js** con **TypeScript**
- **Express** para el servidor HTTP
- **Sequelize** como ORM
- **PostgreSQL** como base de datos
- **Zod** para validación de datos
- **Docker** y **Docker Compose** para contenedores

## 📋 Prerequisitos

- Node.js 20+
- PostgreSQL 15+ (o Docker)
- npm o yarn

## 🔧 Instalación

### Opción 1: Desarrollo Local

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

3. Copiar el archivo de ejemplo de variables de entorno:
```bash
copy .env.example .env
```

4. Configurar las variables de entorno en `.env`

5. Iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

### Opción 2: Con Docker

1. Asegurarse de tener Docker y Docker Compose instalados

2. Construir y ejecutar los contenedores:
```bash
docker-compose up -d
```

El servicio estará disponible en `http://localhost:3000`

## 📡 Endpoints

### Health Check
```
GET /health
```

### Radicar Incapacidad
```
POST /api/incapacities
Content-Type: application/json

{
  "user": {
    "firstName": "Juan",
    "lastName": "Pérez",
    "email": "juan.perez@example.com",
    "role": "employee"
  },
  "payroll": {
    "nameCompany": "Empresa XYZ",
    "NIT": "900123456-7",
    "adressCompany": "Calle 123 #45-67",
    "phone": "+573001234567"
  },
  "incapacity": {
    "start_date": "2025-10-27",
    "end_date": "2025-10-30",
    "type": "enfermedad",
    "observacion": "Gripe común"
  }
}
```

### Obtener Todas las Incapacidades
```
GET /api/incapacities
```

### Obtener Incapacidades por Usuario
```
GET /api/incapacities/user/:userId
```

### Editar Incapacidad
```
PUT /api/incapacities/:id
Content-Type: application/json

{
  "start_date": "2025-10-28",
  "end_date": "2025-10-31",
  "type": "enfermedad",
  "status": "confirmada",
  "observacion": "Actualización de fechas"
}
```

## 🔐 Validaciones

### Tipos de Incapacidad
- `accidente`
- `maternidad`
- `enfermedad`

### Estados de Incapacidad
- `pendiente` (por defecto)
- `en trámite`
- `confirmada`
- `negada`

## 📁 Estructura del Proyecto

```
src/
├── domain/              # Capa de dominio
│   ├── entities/        # Entidades del negocio
│   ├── value-objects/   # Objetos de valor
│   └── repositories/    # Interfaces de repositorio
├── application/         # Capa de aplicación
│   └── use-cases/       # Casos de uso
├── infrastructure/      # Capa de infraestructura
│   ├── database/        # Configuración de BD
│   ├── models/          # Modelos Sequelize
│   └── repositories/    # Implementaciones de repositorio
├── presentation/        # Capa de presentación
│   ├── controllers/     # Controladores
│   ├── routes/          # Rutas
│   ├── middlewares/     # Middlewares
│   └── validators/      # Esquemas de validación
├── shared/              # Código compartido
│   └── config/          # Configuración
└── index.ts             # Punto de entrada
```

## 🧪 Scripts Disponibles

```bash
npm run dev      # Iniciar en modo desarrollo
npm run build    # Compilar TypeScript
npm start        # Iniciar en producción
npm run lint     # Ejecutar linter
npm run format   # Formatear código
```

## 🐳 Docker

### Construir imagen
```bash
docker build -t incapacities-service .
```

### Ejecutar con Docker Compose
```bash
docker-compose up -d
```

### Detener servicios
```bash
docker-compose down
```

### Ver logs
```bash
docker-compose logs -f app
```

## 🔄 Escalabilidad

El proyecto está diseñado para crecer fácilmente:

- **Arquitectura desacoplada**: Las capas están claramente separadas
- **Inyección de dependencias**: Facilita testing y cambios de implementación
- **Repositorio abstracto**: Permite cambiar de ORM sin afectar la lógica de negocio
- **Validaciones centralizadas**: Fácil de extender con nuevas reglas
- **Containerizado**: Listo para orquestación con Kubernetes
- **Preparado para microservicios**: Fácil integración con otros servicios

## 🔮 Futuras Integraciones

El diseño permite fácil integración con:
- Microservicio de usuarios
- Microservicio de nóminas
- Sistema de autenticación (JWT)
- Message brokers (RabbitMQ, Kafka)
- Cache (Redis)
- API Gateway

## 📝 Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| PORT | Puerto del servidor | 3000 |
| NODE_ENV | Entorno de ejecución | development |
| DB_HOST | Host de PostgreSQL | localhost |
| DB_PORT | Puerto de PostgreSQL | 5432 |
| DB_NAME | Nombre de la base de datos | incapacities_db |
| DB_USER | Usuario de PostgreSQL | postgres |
| DB_PASSWORD | Contraseña de PostgreSQL | postgres |
| DB_DIALECT | Dialecto de Sequelize | postgres |

## 🤝 Mejores Prácticas Implementadas

✅ Clean Architecture / Hexagonal Architecture  
✅ SOLID Principles  
✅ Validación robusta con Zod  
✅ Manejo de errores centralizado  
✅ TypeScript estricto  
✅ Logging estructurado  
✅ Docker multi-stage builds  
✅ Health checks  
✅ Variables de entorno  
✅ Código autodocumentado (sin comentarios innecesarios)

## 📄 Licencia

MIT
