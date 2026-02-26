# API Testing Guide

## New Endpoints Added

### 1. Career Profiles
**GET** `/api/careers`
- Query params: `category`, `demand`, `location`
- No auth required
- Example: `/api/careers?demand=High&location=Kathmandu`

**GET** `/api/careers/:id`
- No auth required
- Returns single career profile

### 2. Career Recommendations (Rule-based)
**GET** `/api/assessments/recommendations/careers`
- Auth required (Bearer token)
- Returns top 5 careers based on assessment + market data
- Combines aptitude score + demand + risk

### 3. Constraint-based Recommendations
**POST** `/api/careers/recommendations/constraints`
- Auth required (Bearer token)
- Body:
```json
{
  "budget_max": 400000,
  "location": "Kathmandu",
  "education_level": "+2",
  "academic_performance": "Medium",
  "risk_tolerance": "Medium"
}
```
- Returns filtered careers matching constraints

### 4. Parent Report
**GET** `/api/assessments/recommendations/parent-report`
- Auth required (Bearer token)
- Returns simplified top 3 career recommendations
- Includes clear reasons, costs, salaries, timelines

## Input Validations

### Budget
- Must be a positive number
- Invalid: negative values, strings

### Risk Tolerance
- Must be: "Low", "Medium", or "High"
- Case-sensitive

### Demand Filter
- Must be: "High", "Medium", or "Low"
- Case-sensitive

### Answers Array
- Must match number of questions in assessment
- Returns clear error with expected vs received count

## Error Responses

### 400 Bad Request
- Missing required fields
- Invalid data types
- Invalid enum values

### 401 Unauthorized
- Missing or invalid JWT token

### 403 Forbidden
- User trying to access another user's progress

### 404 Not Found
- Assessment or career profile not found

### 500 Internal Server Error
- Database or server errors

## Testing Flow

1. **Register/Login**
```
POST /api/auth/register
POST /api/auth/login
```

2. **Get Assessments**
```
GET /api/assessments
```

3. **Start Assessment**
```
POST /api/assessments/start
Authorization: Bearer <token>
Body: { "assessment_id": "..." }
```

4. **Submit Assessment**
```
POST /api/assessments/submit
Authorization: Bearer <token>
Body: {
  "assessment_id": "...",
  "progress_id": "...",
  "answers": ["Agree", "Neutral", ...]
}
```

5. **Get Career Recommendations**
```
GET /api/assessments/recommendations/careers
Authorization: Bearer <token>
```

6. **Apply Constraints**
```
POST /api/careers/recommendations/constraints
Authorization: Bearer <token>
Body: { "budget_max": 400000, "location": "Kathmandu" }
```

7. **Get Parent Report**
```
GET /api/assessments/recommendations/parent-report
Authorization: Bearer <token>
```

## Common Issues

### Authentication Errors
- Ensure JWT token is included: `Authorization: Bearer <token>`
- Token expires after 7 days (check JWT_EXPIRE in .env)

### Answer Count Mismatch
- Fetch assessment first to get `total_questions`
- Provide exactly that many answers
- Each answer must match Likert options: "Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"

### No Recommendations
- Complete at least one assessment first
- Ensure assessment status is "Completed"
- Check that career profiles are seeded

## Seeding Data

Run seed script to populate:
- Assessments (psychometric questions)
- Learning paths
- Career profiles (Nepal labor data)

```bash
node backend/src/seeds/seedDb.js
```

Ensure MongoDB is running and MONGODB_URI is set in backend/.env
