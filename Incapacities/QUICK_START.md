# 🚀 Quick Start Guide - Incapacities Microservice

## Inicio Rápido con Docker (Recomendado)

### 1. Levantar los servicios
```powershell
docker-compose up -d
```

### 2. Verificar que los servicios están corriendo
```powershell
docker-compose ps
```

### 3. Ver logs
```powershell
docker-compose logs -f app
```

### 4. Probar el servicio
```powershell
curl http://localhost:3000/health
```

### 5. Detener los servicios
```powershell
docker-compose down
```

---

## Inicio Rápido Local (Desarrollo)

### 1. Ejecutar el script de setup
```powershell
.\setup.ps1
```

### 2. Asegúrate de tener PostgreSQL corriendo
```powershell
# Si tienes PostgreSQL local, verifica que esté corriendo
# O usa el contenedor de PostgreSQL solo:
docker-compose up -d postgres
```

### 3. Iniciar el servidor en modo desarrollo
```powershell
npm run dev
```

### 4. El servidor estará disponible en
```
http://localhost:3000
```

---

## 🧪 Probar los Endpoints

### Health Check
```powershell
curl http://localhost:3000/health
```

### Crear una Incapacidad
```powershell
curl -X POST http://localhost:3000/api/incapacities `
  -H "Content-Type: application/json" `
  -d '{
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
  }'
```

### Obtener todas las incapacidades
```powershell
curl http://localhost:3000/api/incapacities
```

### Actualizar una incapacidad
```powershell
# Reemplaza {id} con el UUID de la incapacidad
curl -X PUT http://localhost:3000/api/incapacities/{id} `
  -H "Content-Type: application/json" `
  -d '{
    "status": "confirmada",
    "observacion": "Aprobada por recursos humanos"
  }'
```

---

## 📊 Verificar la Base de Datos

### Conectarse a PostgreSQL (cuando uses Docker)
```powershell
docker exec -it incapacities-postgres psql -U postgres -d incapacities_db
```

### Ver las tablas creadas
```sql
\dt
```

### Ver incapacidades
```sql
SELECT * FROM incapacities;
```

### Salir de psql
```sql
\q
```

---

## 🔧 Comandos Útiles

### Compilar el proyecto
```powershell
npm run build
```

### Ejecutar en producción
```powershell
npm start
```

### Formatear código
```powershell
npm run format
```

### Ejecutar linter
```powershell
npm run lint
```

---

## 🐛 Troubleshooting

### Puerto 3000 ya está en uso
```powershell
# Cambiar el puerto en el archivo .env
PORT=3001
```

### No se puede conectar a la base de datos
1. Verifica que PostgreSQL esté corriendo
2. Verifica las credenciales en `.env`
3. Si usas Docker, asegúrate de que el contenedor de postgres esté corriendo

### Error al instalar dependencias
```powershell
# Limpiar caché y reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Ver logs de Docker
```powershell
docker-compose logs -f app
docker-compose logs -f postgres
```

---

## 📚 Recursos Adicionales

- Ver `README.md` para documentación completa
- Ver `API_EXAMPLES.json` para más ejemplos de peticiones
- Estructura del proyecto detallada en `README.md`

---

## 🎯 Siguientes Pasos

1. ✅ Explorar los endpoints con Postman o Thunder Client
2. ✅ Revisar la estructura del código
3. ✅ Agregar nuevos casos de uso según necesidades
4. ✅ Integrar con microservicios de usuarios y nóminas
5. ✅ Implementar autenticación JWT
6. ✅ Agregar tests unitarios e integración

---

¡Todo listo para empezar a trabajar! 🎉
