# Installation Instructions

## Required npm packages

Run this command in the backend directory:

```bash
npm install cloudinary multer nodemailer
```

## Environment Variables Setup

### 1. Cloudinary (Profile Picture Upload)

1. Go to https://cloudinary.com
2. Sign up for free account
3. Go to Dashboard
4. Copy your:
   - Cloud Name
   - API Key
   - API Secret
5. Add to `backend/.env`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Brevo (Email/OTP Service)

1. Go to https://www.brevo.com
2. Sign up for free account (300 emails/day)
3. Go to Settings → SMTP & API
4. Generate SMTP Key
5. Your login is your signup email
6. Add to `backend/.env`:
```
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_signup_email@example.com
EMAIL_PASS=your_smtp_key_here
EMAIL_FROM="KnowYourPotential" <noreply@knowyourpotential.com>
```

## Testing the New Features

### 1. Test Interest Options
```
GET http://localhost:5000/api/interests/options
```

### 2. Test Profile Picture Upload
```
POST http://localhost:5000/api/users/profile/avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data
Body: avatar=<image_file>
```

### 3. Test Forgot Password Flow

**Step 1: Request OTP**
```
POST http://localhost:5000/api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Step 2: Verify OTP**
```
POST http://localhost:5000/api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Step 3: Reset Password**
```
POST http://localhost:5000/api/auth/reset-password
Content-Type: application/json

{
  "resetToken": "token_from_step_2",
  "newPassword": "newpassword123"
}
```

### 4. Test Enhanced Profile Update
```
PATCH http://localhost:5000/api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "education_level": "+2",
  "interests": ["Technology & IT", "Business & Management"],
  "phone": "+977-9801234567",
  "city": "Kathmandu",
  "gender": "Male",
  "academic_performance": "High",
  "budget_preference": 500000,
  "bio": "Aspiring software engineer",
  "profile_completed": true
}
```

### 5. Test Career Profile CRUD (Admin Only)

**Create Career**
```
POST http://localhost:5000/api/careers
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "title": "Blockchain Developer",
  "category": "Technology",
  "description": "Develops blockchain solutions",
  "salary_range": {
    "entry_min": 40000,
    "entry_max": 70000,
    "currency": "NPR"
  },
  "demand_indicator": "High",
  "qualification_required": ["Bachelor's"],
  "time_to_employment_months": 6,
  "risk_index": "Medium",
  "locations": ["Kathmandu"],
  "required_skills": ["Solidity", "Web3"],
  "education_cost_range": {
    "min": 600000,
    "max": 1000000,
    "currency": "NPR"
  },
  "education_duration_years": 4
}
```

**Update Career**
```
PUT http://localhost:5000/api/careers/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "demand_indicator": "High"
}
```

**Delete (Deactivate) Career**
```
DELETE http://localhost:5000/api/careers/:id
Authorization: Bearer <admin_token>
```

## Troubleshooting

### Cloudinary errors
- Check cloud name, API key, API secret are correct
- Ensure file size < 5MB
- Ensure file is an image (jpg, png, webp)

### Email/OTP errors
- Verify Brevo SMTP credentials
- Check EMAIL_USER is your signup email
- Check EMAIL_PASS is your SMTP key (not account password)
- Brevo free tier: 300 emails/day limit

### MongoDB errors
- Ensure MongoDB is running `docker compose up -d`
- Check MONGODB_URI in .env is correct
- Run seed script to populate data

## Next Steps

1. Install packages: `npm install cloudinary multer nodemailer`
2. Configure .env with Cloudinary and Brevo credentials
3. Restart backend server
4. Test new endpoints
5. Integrate with frontend
