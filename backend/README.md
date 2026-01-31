# CyberThana Backend

A comprehensive backend API for the CyberThana cyber crime reporting system.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Case Management**: Complete CRUD operations for cyber crime cases
- **User Management**: Victim and Police officer management
- **Evidence Management**: File upload and evidence tracking
- **Audit Logging**: Comprehensive activity tracking
- **Security**: Rate limiting, input sanitization, XSS protection
- **Analytics**: Dashboard and reporting features

## Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **express-validator** for input validation

## Installation

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cyber-thana
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRE=7d
   ```

3. **Start MongoDB**:
   Make sure MongoDB is running on your system.

4. **Create database indexes**:
   ```bash
   npm run create-indexes
   ```

5. **Seed the database** (optional):
   ```bash
   npm run seed
   ```

## Running the Application

- **Development mode**:
  ```bash
  npm run dev
  ```

- **Production mode**:
  ```bash
  npm start
  ```

The API will be available at `http://localhost:5000`

## API Documentation

### Authentication Endpoints

#### Victim Registration
```http
POST /api/auth/victim/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "Password123!",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  }
}
```

#### Victim Login
```http
POST /api/auth/victim/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123!"
}
```

#### Police Login
```http
POST /api/auth/police/login
Content-Type: application/json

{
  "badgeId": "OFC-001",
  "password": "Police123!",
  "department": "cyber_cell"
}
```

### Case Management Endpoints

#### Get All Cases (Police)
```http
GET /api/cases?page=1&limit=10&status=Under%20Verification
Authorization: Bearer <token>
```

#### Create New Case (Victim)
```http
POST /api/victim/cases
Authorization: Bearer <token>
Content-Type: application/json

{
  "incidentType": "Phishing / Social Engineering",
  "priority": "Medium",
  "incidentDetails": {
    "description": "Received suspicious email...",
    "incidentDate": "2026-01-14T10:00:00Z",
    "incidentLocation": "Mumbai",
    "platform": "Email"
  }
}
```

#### Update Case Status (Police)
```http
PUT /api/cases/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Under Verification",
  "comment": "Initial verification started"
}
```

### Evidence Management

#### Upload Evidence
```http
POST /api/evidence/upload/:caseId
Authorization: Bearer <token>
Content-Type: multipart/form-data

files: [File, File, ...]
description: "Screenshots of phishing email"
evidenceType: "Screenshot"
```

#### Get Evidence for Case
```http
GET /api/evidence/case/:caseId
Authorization: Bearer <token>
```

#### Download Evidence
```http
GET /api/evidence/:id/download
Authorization: Bearer <token>
```

## Sample Login Credentials

After running the seed script, you can use these credentials:

### Victim Accounts
- **Email**: rahul.sharma@email.com, **Password**: Password123!
- **Email**: priya.patel@email.com, **Password**: Password123!
- **Email**: amit.kumar@email.com, **Password**: Password123!

### Police Accounts
- **Badge ID**: OFC-001, **Password**: Police123! (Inspector - Full Access)
- **Badge ID**: OFC-002, **Password**: Police123! (SI - Limited Access)
- **Badge ID**: OFC-003, **Password**: Police123! (ASI - Limited Access)

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for victims and police
- **Rate Limiting**: Prevents brute force attacks
- **Input Validation**: Comprehensive input sanitization
- **XSS Protection**: Cross-site scripting prevention
- **File Upload Security**: Safe file handling with type and size limits
- **Audit Logging**: Complete activity tracking

## Database Schema

### Collections
- **victims**: Victim user accounts
- **police**: Police officer accounts
- **cases**: Cyber crime case records
- **evidence**: Evidence files and metadata
- **auditlogs**: System activity logs

## Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `423` - Locked (Account locked)
- `500` - Internal Server Error

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message",
  "details": ["Additional error details"]
}
```

## Development

### Project Structure
```
backend/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Mongoose models
├── routes/          # API routes
├── scripts/         # Database scripts
├── uploads/         # File upload directory
├── utils/           # Utility functions
└── server.js        # Main server file
```

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run create-indexes` - Create database indexes

## Environment Variables

Key environment variables:
- `NODE_ENV` - Application environment
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRE` - Token expiration time
- `MAX_FILE_SIZE` - Maximum file upload size
- `FRONTEND_URL` - Frontend application URL

## Contributing

1. Follow the existing code style
2. Add proper error handling
3. Include input validation
4. Write comprehensive tests
5. Update documentation

## License

MIT License - see LICENSE file for details
