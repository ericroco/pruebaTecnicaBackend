# Backend - Panel Administrativo de Marcas

Este proyecto es el backend para un sistema de gestión de marcas y descuentos, desarrollado con NestJS, TypeORM y PostgreSQL. Incluye autenticación mediante JWT y documentación interactiva con Swagger.

## Requisitos Previos

- **Node.js**: v18 o superior
- **NPM**: v9 o superior
- **Docker** y **Docker Compose** (recomendado para la base de datos)

## Instalación y Configuración

1. **Clonar el repositorio** e instalar dependencias:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   Copia el archivo `.env.example` a un nuevo archivo `.env` y ajusta los valores si es necesario:
   ```bash
   cp .env.example .env
   ```

3. **Levantar la base de datos** (usando Docker):
   ```bash
   docker-compose up -d
   ```

## Ejecución del Proyecto

- **Modo desarrollo**:
  ```bash
  docker compose up -d --build
  ```


## Base de Datos y Migraciones

Este proyecto utiliza `synchronize: true` en el entorno de desarrollo para sincronizar automáticamente las entidades con la base de datos. Para producción, se recomienda desactivar esta opción y utilizar migraciones de TypeORM.

- **Sincronización automática**: Se ejecuta al iniciar la aplicación en modo dev.
- **Limpieza de volúmenes**: Si necesitas resetear la base de datos:
  ```bash
  docker-compose down -v
  ```

## Documentación de la API

Una vez que la aplicación esté corriendo, puedes acceder a la documentación interactiva de Swagger en:

[http://localhost:3000/api](http://localhost:3000/api)

### Pruebas con cURL (Ejemplos)

**1. Registro de usuario:**
```bash
curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "password123"}'
```

**2. Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "password123"}'
```

**3. Crear Marca (requiere Token):**
```bash
curl -X POST http://localhost:3000/marcas \
     -H "Authorization: Bearer TU_TOKEN_AQUI" \
     -H "Content-Type: application/json" \
     -d '{"nombre": "Nike", "descripcion": "Deportes", "descuentos": [{"etiqueta": "PROMO", "valor": 10}]}'
```

## Tecnologías Utilizadas

- **NestJS**: Framework principal.
- **TypeORM**: ORM para interactuar con PostgreSQL.
- **Passport + JWT**: Para la seguridad y protección de rutas.
- **Swagger**: Para la documentación de la API.
- **Bcrypt**: Para el hashing de contraseñas.
- **Docker**: Para la virtualización de la base de datos.
