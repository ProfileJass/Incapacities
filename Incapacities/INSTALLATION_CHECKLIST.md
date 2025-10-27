# ✅ Verificación y Checklist de Instalación

## 📋 Checklist Pre-Instalación

Antes de iniciar, verifica que tienes instalado:

- [ ] Node.js 20+ (`node --version`)
- [ ] npm 9+ (`npm --version`)
- [ ] Docker Desktop (opcional pero recomendado)
- [ ] PostgreSQL 15+ (si no usas Docker)
- [ ] Git (para clonar el proyecto)

## 🚀 Pasos de Instalación

### 1. Instalación de Dependencias

```powershell
# Navegar al directorio del proyecto
cd Incapacities

# Instalar dependencias
npm install
```

**Verificación:**
```powershell
# Deberías ver node_modules/ creado
ls node_modules
```

### 2. Configuración de Variables de Entorno

```powershell
# Si no existe .env, créalo desde .env.example
if (!(Test-Path .env)) { Copy-Item .env.example .env }
```

**Editar .env si es necesario:**
```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=incapacities_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_DIALECT=postgres
```

### 3. Verificar Compilación TypeScript

```powershell
# Compilar el proyecto
npm run build
```

**Resultado esperado:**
- Carpeta `dist/` creada
- No errores de compilación
- Archivos .js y .d.ts generados

### 4. Iniciar con Docker (Recomendado)

```powershell
# Iniciar todos los servicios
docker-compose up -d

# Verificar que los contenedores están corriendo
docker-compose ps
```

**Resultado esperado:**
```
NAME                      STATUS
incapacities-service      Up (healthy)
incapacities-postgres     Up (healthy)
```

**Ver logs:**
```powershell
docker-compose logs -f app
```

### 5. Iniciar sin Docker (Desarrollo Local)

```powershell
# Asegurarse de que PostgreSQL está corriendo
# Luego iniciar el servidor
npm run dev
```

**Resultado esperado:**
```
🚀 Server running on port 3000
📍 Environment: development
Database connection established successfully
Database synchronized
🏥 Incapacities microservice is ready
```

## ✅ Verificaciones Post-Instalación

### 1. Health Check

```powershell
curl http://localhost:3000/health
```

**Respuesta esperada:**
```json
{
  "status": "ok",
  "message": "Service is running"
}
```

### 2. Crear una Incapacidad de Prueba

```powershell
$body = @{
  user = @{
    firstName = "Test"
    lastName = "User"
    email = "test@example.com"
    role = "employee"
  }
  payroll = @{
    nameCompany = "Test Company"
    NIT = "123456789"
    adressCompany = "Test Address"
    phone = "1234567890"
  }
  incapacity = @{
    start_date = "2025-10-27"
    end_date = "2025-10-30"
    type = "enfermedad"
    observacion = "Test incapacity"
  }
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:3000/api/incapacities" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

$response.Content | ConvertFrom-Json
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Incapacity created successfully",
  "data": {
    "id_incapacity": "uuid-here",
    "status": "pendiente",
    ...
  }
}
```

### 3. Obtener Todas las Incapacidades

```powershell
curl http://localhost:3000/api/incapacities
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Incapacities retrieved successfully",
  "data": [...],
  "count": 1
}
```

### 4. Verificar Base de Datos

```powershell
# Conectar a PostgreSQL (con Docker)
docker exec -it incapacities-postgres psql -U postgres -d incapacities_db

# Dentro de psql:
# Ver tablas
\dt

# Ver incapacidades
SELECT * FROM incapacities;

# Salir
\q
```

**Tablas esperadas:**
- `incapacities`
- `users`
- `payrolls`
- `companies`

## 🔍 Troubleshooting

### Error: Puerto 3000 ya está en uso

**Solución 1**: Cambiar puerto en .env
```env
PORT=3001
```

**Solución 2**: Detener proceso en puerto 3000
```powershell
# Ver qué está usando el puerto
netstat -ano | findstr :3000

# Matar el proceso (reemplazar PID)
taskkill /PID <PID> /F
```

### Error: No se puede conectar a la base de datos

**Verificar que PostgreSQL está corriendo:**
```powershell
# Con Docker
docker-compose ps

# Sin Docker (servicio local)
Get-Service postgresql*
```

**Verificar credenciales en .env:**
- DB_HOST correcto
- DB_PORT correcto (5432)
- DB_USER correcto
- DB_PASSWORD correcto

### Error: Module not found

**Limpiar e instalar de nuevo:**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Error: TypeScript compilation errors

**Verificar versión de Node:**
```powershell
node --version  # Debe ser 20+
```

**Verificar tsconfig.json existe y es correcto**

### Error: Docker no puede iniciar contenedores

**Verificar Docker Desktop está corriendo**

**Limpiar volúmenes y reintentar:**
```powershell
docker-compose down -v
docker-compose up -d
```

## 📊 Checklist de Verificación Final

Marca cada item cuando esté funcionando:

### Instalación Base
- [ ] Node.js instalado correctamente
- [ ] npm install ejecutado sin errores
- [ ] .env creado y configurado
- [ ] npm run build compiló exitosamente

### Servicios
- [ ] Docker contenedores corriendo (si se usa Docker)
- [ ] PostgreSQL accesible
- [ ] Servidor iniciado sin errores
- [ ] Puerto 3000 disponible y respondiendo

### Endpoints
- [ ] GET /health retorna 200
- [ ] POST /api/incapacities crea incapacidad
- [ ] GET /api/incapacities retorna lista
- [ ] PUT /api/incapacities/:id actualiza
- [ ] Validaciones funcionando (rechaza datos inválidos)

### Base de Datos
- [ ] Tablas creadas automáticamente
- [ ] Datos se guardan correctamente
- [ ] Relaciones entre tablas funcionan
- [ ] Queries funcionan

### Logs
- [ ] Logs de servidor visibles
- [ ] Errores se muestran claramente
- [ ] Conexión a BD confirmada en logs

## 🎉 ¡Todo Funcionando!

Si todos los checks están marcados, el microservicio está completamente funcional.

### Siguientes Pasos:

1. **Explorar el código**: Lee la estructura en PROJECT_STRUCTURE.md
2. **Entender arquitectura**: Lee ARCHITECTURE.md
3. **Probar API**: Usa ejemplos de API_EXAMPLES.json
4. **Agregar features**: Sigue los patrones establecidos

## 📞 Soporte

Si encuentras problemas no listados aquí:

1. Revisar logs: `docker-compose logs -f app`
2. Revisar documentación: README.md
3. Revisar quick start: QUICK_START.md
4. Verificar variables de entorno
5. Limpiar e reinstalar

---

**¡Felicidades!** Tu microservicio de incapacidades está listo para usar. 🚀
