# API de Gestion de Marcas - Backend

Este proyecto es el backend para el sistema de gestion de marcas y descuentos, desarrollado con NestJS y PostgreSQL.

## Requisitos Previos

* Node.js (Version 22 o superior recomendada)
* Docker y Docker Compose
* PostgreSQL (si se opta por instalacion local)

## Configuracion del Entorno

1. Copie el archivo de ejemplo para crear su configuracion local:
   ```bash
   cp .env.example .env
   ```
2. Edite el archivo `.env` con sus credenciales de base de datos y secreto JWT.

## Instalacion y Despliegue con Docker

La forma recomendada de levantar el proyecto es mediante Docker Compose, lo cual configurara tanto la API como la base de datos:

```bash
docker compose up --build -d
```

La API estara disponible en `http://localhost:3000`.

## Instalacion Local (Desarrollo)

Si prefiere ejecutarlo sin Docker:

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar la aplicacion en modo desarrollo:
   ```bash
   npm run start:dev
   ```

La sincronizacion de la base de datos se realiza automaticamente mediante TypeORM al iniciar la aplicacion (`synchronize: true`).

## Documentacion de la API (Swagger)

Una vez levantado el proyecto, puede acceder a la documentacion interactiva en:
`http://localhost:3000/api`

Desde esta interfaz podra probar todos los endpoints y ver los esquemas de datos.

## Endpoints Principales

### Autenticacion
* POST /auth/register - Registro de nuevos usuarios.
* POST /auth/login - Inicio de sesion y obtencion de JWT.
* GET /auth/profile - Obtencion de datos del usuario autenticado (Requiere Bearer Token).

### Marcas
* GET /marcas - Listado de marcas pertenecientes al usuario autenticado.
* POST /marcas - Creacion de una nueva marca con sus descuentos asociados.
* PATCH /marcas/:id - Actualizacion parcial de una marca.
* DELETE /marcas/:id - Eliminacion de una marca.

## Ejemplos de Uso (cURL)

### Registro de Usuario
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@ejemplo.com", "password": "password123", "fullName": "Usuario Prueba"}'
```

### Inicio de Sesion (Obtener Token)
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@ejemplo.com", "password": "password123"}'
```

### Crear Marca con Descuentos
```bash
curl -X POST http://localhost:3000/marcas \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Nike",
    "descripcion": "Ropa deportiva",
    "descuentos": [
      {"etiqueta": "A", "valor": 10},
      {"etiqueta": "B", "valor": 15},
      {"etiqueta": "C", "valor": 20},
      {"etiqueta": "D", "valor": 25},
      {"etiqueta": "E", "valor": 30}
    ]
  }'
```

### Listar Marcas
```bash
curl -X GET http://localhost:3000/marcas \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

## Seguridad

* Hasheo de contraseñas mediante Bcrypt.
* Proteccion de rutas mediante JWT (Passport Strategy).
* Aislamiento de datos: Los usuarios solo pueden interactuar con registros que les pertenecen.
