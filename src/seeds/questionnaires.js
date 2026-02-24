/**
 * Questionnaire Seed Data
 * 
 * This file contains comprehensive psychometric assessments organized by category.
 * Each question uses a 5-point Likert scale with skill weightings.
 * 
 * Skill Categories:
 * - analytical: Logic, data interpretation, systematic thinking
 * - technical: Programming, software, technical concepts
 * - creative: Innovation, design thinking, outside-the-box solutions
 * - communication: Verbal/written skills, presentation, clarity
 * - leadership: Team management, decision-making, influence
 * - problem_solving: Issue resolution, strategic thinking
 * - attention_to_detail: Accuracy, precision, quality focus
 * - teamwork: Collaboration, group dynamics, cooperation
 */

const questionnaires = [
  {
    title: "Career Aptitude Assessment",
    description:
      "Comprehensive assessment to identify your natural talents, interests, and career compatibility",
    category: "aptitude",
    duration_minutes: 20,
    passing_score: 60,
    is_active: true,
    questions: [
      // ANALYTICAL & PROBLEM-SOLVING QUESTIONS
      {
        question: "I enjoy solving logical puzzles and mathematical problems",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          analytical: 9,
          problem_solving: 8,
          technical: 6,
        },
        optionMappings: [
          { optionIndex: 0, weights: { analytical: 1, problem_solving: 1 } },
          { optionIndex: 1, weights: { analytical: 3, problem_solving: 2 } },
          { optionIndex: 2, weights: { analytical: 5, problem_solving: 4 } },
          { optionIndex: 3, weights: { analytical: 7, problem_solving: 7 } },
          { optionIndex: 4, weights: { analytical: 10, problem_solving: 9 } },
        ],
        explanation:
          "Indicates aptitude for analytical roles: Data Analyst, Software Engineer, Architect",
      },
      {
        question: "I prefer working with data and numbers over creative tasks",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          analytical: 8,
          attention_to_detail: 7,
          technical: 7,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: {
              analytical: 1,
              attention_to_detail: 1,
              creative: 9,
            },
          },
          {
            optionIndex: 1,
            weights: {
              analytical: 3,
              attention_to_detail: 2,
              creative: 7,
            },
          },
          {
            optionIndex: 2,
            weights: {
              analytical: 5,
              attention_to_detail: 5,
              creative: 5,
            },
          },
          {
            optionIndex: 3,
            weights: {
              analytical: 7,
              attention_to_detail: 7,
              creative: 2,
            },
          },
          {
            optionIndex: 4,
            weights: {
              analytical: 9,
              attention_to_detail: 9,
              creative: 1,
            },
          },
        ],
        explanation:
          "High score suggests: Data Science, Finance, Actuarial Science, Business Analysis",
      },
      {
        question:
          "I can break down complex problems into smaller, manageable parts",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          problem_solving: 9,
          analytical: 8,
          attention_to_detail: 6,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: { problem_solving: 1, analytical: 1, attention_to_detail: 1 },
          },
          {
            optionIndex: 1,
            weights: { problem_solving: 3, analytical: 3, attention_to_detail: 2 },
          },
          {
            optionIndex: 2,
            weights: { problem_solving: 5, analytical: 5, attention_to_detail: 4 },
          },
          {
            optionIndex: 3,
            weights: { problem_solving: 7, analytical: 7, attention_to_detail: 6 },
          },
          {
            optionIndex: 4,
            weights: { problem_solving: 10, analytical: 9, attention_to_detail: 8 },
          },
        ],
        explanation:
          "Essential for: Project Management, Systems Architects, Operations Manager",
      },
      {
        question: "I can find patterns and connections between disparate ideas",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          analytical: 8,
          problem_solving: 7,
          creative: 6,
        },
        optionMappings: [
          { optionIndex: 0, weights: { analytical: 2, problem_solving: 1 } },
          { optionIndex: 1, weights: { analytical: 4, problem_solving: 3 } },
          { optionIndex: 2, weights: { analytical: 5, problem_solving: 5 } },
          { optionIndex: 3, weights: { analytical: 7, problem_solving: 7 } },
          { optionIndex: 4, weights: { analytical: 9, problem_solving: 9 } },
        ],
        explanation:
          "Valuable in: Research, Data Mining, Business Intelligence, Strategy roles",
      },

      // TECHNICAL APTITUDE QUESTIONS
      {
        question: "I am comfortable learning new software tools and technologies",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          technical: 8,
          problem_solving: 6,
          attention_to_detail: 5,
        },
        optionMappings: [
          { optionIndex: 0, weights: { technical: 1, problem_solving: 1 } },
          { optionIndex: 1, weights: { technical: 3, problem_solving: 2 } },
          { optionIndex: 2, weights: { technical: 5, problem_solving: 4 } },
          { optionIndex: 3, weights: { technical: 7, problem_solving: 6 } },
          { optionIndex: 4, weights: { technical: 10, problem_solving: 8 } },
        ],
        explanation:
          "Indicates suitability for tech roles: Software Dev, IT Support, DevOps, QA",
      },
      {
        question: "I enjoy building or creating things, whether digital or physical",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          creative: 8,
          problem_solving: 7,
          technical: 6,
        },
        optionMappings: [
          { optionIndex: 0, weights: { creative: 1, problem_solving: 1, technical: 1 } },
          {
            optionIndex: 1,
            weights: { creative: 3, problem_solving: 3, technical: 2 },
          },
          {
            optionIndex: 2,
            weights: { creative: 5, problem_solving: 5, technical: 5 },
          },
          {
            optionIndex: 3,
            weights: { creative: 7, problem_solving: 7, technical: 7 },
          },
          {
            optionIndex: 4,
            weights: { creative: 10, problem_solving: 8, technical: 8 },
          },
        ],
        explanation:
          "Good for: Product Development, UX/UI Design, Software Engineering, Innovation roles",
      },
      {
        question:
          "I think I would enjoy programming or coding-related work",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          technical: 9,
          analytical: 8,
          problem_solving: 8,
          attention_to_detail: 7,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: {
              technical: 1,
              analytical: 1,
              problem_solving: 1,
              attention_to_detail: 1,
            },
          },
          {
            optionIndex: 1,
            weights: {
              technical: 3,
              analytical: 3,
              problem_solving: 2,
              attention_to_detail: 2,
            },
          },
          {
            optionIndex: 2,
            weights: {
              technical: 5,
              analytical: 5,
              problem_solving: 5,
              attention_to_detail: 4,
            },
          },
          {
            optionIndex: 3,
            weights: {
              technical: 7,
              analytical: 7,
              problem_solving: 7,
              attention_to_detail: 6,
            },
          },
          {
            optionIndex: 4,
            weights: {
              technical: 10,
              analytical: 9,
              problem_solving: 9,
              attention_to_detail: 8,
            },
          },
        ],
        explanation:
          "Core indicator for: Software Engineering, Web Development, Data Science, DevOps",
      },

      // CREATIVE APTITUDE QUESTIONS
      {
        question:
          "I often come up with original ideas and new ways of doing things",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          creative: 9,
          problem_solving: 7,
          communication: 6,
        },
        optionMappings: [
          { optionIndex: 0, weights: { creative: 1, problem_solving: 1 } },
          { optionIndex: 1, weights: { creative: 3, problem_solving: 2 } },
          { optionIndex: 2, weights: { creative: 5, problem_solving: 4 } },
          { optionIndex: 3, weights: { creative: 7, problem_solving: 6 } },
          { optionIndex: 4, weights: { creative: 10, problem_solving: 8 } },
        ],
        explanation:
          "Suited for: Product Design, UX/UI Design, Marketing, Creative Writing, Strategy",
      },
      {
        question: "I enjoy artistic or design-related activities",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          creative: 9,
          attention_to_detail: 7,
          communication: 5,
        },
        optionMappings: [
          { optionIndex: 0, weights: { creative: 1, attention_to_detail: 1 } },
          { optionIndex: 1, weights: { creative: 3, attention_to_detail: 2 } },
          { optionIndex: 2, weights: { creative: 5, attention_to_detail: 4 } },
          { optionIndex: 3, weights: { creative: 7, attention_to_detail: 6 } },
          { optionIndex: 4, weights: { creative: 10, attention_to_detail: 8 } },
        ],
        explanation:
          "Ideal for: Graphic Design, Web Design, UX Design, Fashion, Architecture",
      },
      {
        question:
          "I prefer roles that allow me flexibility and creative expression",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          creative: 8,
          communication: 6,
          leadership: 5,
        },
        optionMappings: [
          { optionIndex: 0, weights: { creative: 1, communication: 1 } },
          { optionIndex: 1, weights: { creative: 3, communication: 2 } },
          { optionIndex: 2, weights: { creative: 5, communication: 4 } },
          { optionIndex: 3, weights: { creative: 7, communication: 6 } },
          { optionIndex: 4, weights: { creative: 9, communication: 8 } },
        ],
        explanation:
          "Good match for: Startups, Creative Agencies, Freelance Work, Entrepreneurship",
      },

      // COMMUNICATION & LEADERSHIP QUESTIONS
      {
        question:
          "I enjoy explaining complex ideas to others in a clear manner",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          communication: 9,
          teamwork: 7,
          leadership: 6,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: { communication: 1, teamwork: 1, leadership: 1 },
          },
          {
            optionIndex: 1,
            weights: { communication: 3, teamwork: 2, leadership: 2 },
          },
          {
            optionIndex: 2,
            weights: { communication: 5, teamwork: 4, leadership: 4 },
          },
          {
            optionIndex: 3,
            weights: { communication: 7, teamwork: 6, leadership: 6 },
          },
          {
            optionIndex: 4,
            weights: { communication: 10, teamwork: 8, leadership: 8 },
          },
        ],
        explanation:
          "Essential for: Teaching, Consulting, Management, Technical Writing, Public Speaking",
      },
      {
        question: "I naturally take charge and lead group projects or initiatives",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          leadership: 9,
          communication: 8,
          teamwork: 7,
          problem_solving: 7,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: {
              leadership: 1,
              communication: 1,
              teamwork: 1,
              problem_solving: 1,
            },
          },
          {
            optionIndex: 1,
            weights: {
              leadership: 3,
              communication: 2,
              teamwork: 2,
              problem_solving: 2,
            },
          },
          {
            optionIndex: 2,
            weights: {
              leadership: 5,
              communication: 5,
              teamwork: 4,
              problem_solving: 4,
            },
          },
          {
            optionIndex: 3,
            weights: {
              leadership: 7,
              communication: 7,
              teamwork: 6,
              problem_solving: 6,
            },
          },
          {
            optionIndex: 4,
            weights: {
              leadership: 10,
              communication: 9,
              teamwork: 8,
              problem_solving: 8,
            },
          },
        ],
        explanation:
          "Ideal for: Project Manager, Team Lead, Entrepreneur, Executive, Director roles",
      },
      {
        question: "I prefer working with people and collaboration over working alone",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          teamwork: 9,
          communication: 8,
          leadership: 6,
        },
        optionMappings: [
          { optionIndex: 0, weights: { teamwork: 1, communication: 1 } },
          { optionIndex: 1, weights: { teamwork: 3, communication: 2 } },
          { optionIndex: 2, weights: { teamwork: 5, communication: 5 } },
          { optionIndex: 3, weights: { teamwork: 7, communication: 7 } },
          { optionIndex: 4, weights: { teamwork: 10, communication: 9 } },
        ],
        explanation:
          "Suitable for: Sales, HR, Team Roles, Customer Support, Community Management",
      },

      // ATTENTION TO DETAIL & QUALITY
      {
        question: "I pay close attention to details and have high quality standards",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          attention_to_detail: 9,
          analytical: 6,
          technical: 5,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: { attention_to_detail: 1, analytical: 1 },
          },
          {
            optionIndex: 1,
            weights: { attention_to_detail: 3, analytical: 2 },
          },
          {
            optionIndex: 2,
            weights: { attention_to_detail: 5, analytical: 4 },
          },
          {
            optionIndex: 3,
            weights: { attention_to_detail: 7, analytical: 6 },
          },
          {
            optionIndex: 4,
            weights: { attention_to_detail: 10, analytical: 8 },
          },
        ],
        explanation:
          "Critical for: QA Testing, Accounting, Data Entry, Document Review, Code Review",
      },
      {
        question:
          "I notice errors or inconsistencies that others might miss",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          attention_to_detail: 9,
          analytical: 7,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: { attention_to_detail: 1, analytical: 1 },
          },
          {
            optionIndex: 1,
            weights: { attention_to_detail: 3, analytical: 2 },
          },
          {
            optionIndex: 2,
            weights: { attention_to_detail: 5, analytical: 4 },
          },
          {
            optionIndex: 3,
            weights: { attention_to_detail: 7, analytical: 6 },
          },
          {
            optionIndex: 4,
            weights: { attention_to_detail: 10, analytical: 8 },
          },
        ],
        explanation:
          "Valuable for: Auditing, Editing, Testing, Quality Assurance, Compliance roles",
      },

      // WORK STYLE & PREFERENCE
      {
        question: "I enjoy working in structured environments with clear processes",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          attention_to_detail: 7,
          analytical: 6,
          teamwork: 5,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: { attention_to_detail: 1, analytical: 1, teamwork: 1 },
          },
          {
            optionIndex: 1,
            weights: { attention_to_detail: 3, analytical: 2, teamwork: 2 },
          },
          {
            optionIndex: 2,
            weights: { attention_to_detail: 5, analytical: 4, teamwork: 4 },
          },
          {
            optionIndex: 3,
            weights: { attention_to_detail: 7, analytical: 6, teamwork: 6 },
          },
          {
            optionIndex: 4,
            weights: { attention_to_detail: 8, analytical: 7, teamwork: 7 },
          },
        ],
        explanation:
          "Good for: Corporate roles, Finance, Operations, Government, Healthcare administration",
      },
      {
        question:
          "I prefer dynamic, fast-paced environments where I can be innovative",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          creative: 8,
          problem_solving: 7,
          communication: 6,
        },
        optionMappings: [
          { optionIndex: 0, weights: { creative: 1, problem_solving: 1 } },
          { optionIndex: 1, weights: { creative: 2, problem_solving: 2 } },
          { optionIndex: 2, weights: { creative: 5, problem_solving: 5 } },
          { optionIndex: 3, weights: { creative: 8, problem_solving: 7 } },
          { optionIndex: 4, weights: { creative: 10, problem_solving: 9 } },
        ],
        explanation:
          "Ideal for: Startups, Tech companies, Consulting, Advertising, Entrepreneurship",
      },
      {
        question: "I am driven by helping others and making a positive impact",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          communication: 8,
          teamwork: 8,
          leadership: 6,
        },
        optionMappings: [
          { optionIndex: 0, weights: { communication: 1, teamwork: 1 } },
          { optionIndex: 1, weights: { communication: 2, teamwork: 2 } },
          { optionIndex: 2, weights: { communication: 5, teamwork: 5 } },
          { optionIndex: 3, weights: { communication: 8, teamwork: 8 } },
          { optionIndex: 4, weights: { communication: 10, teamwork: 10 } },
        ],
        explanation:
          "Suitable for: Healthcare, Education, NGO, Social Work, Counseling, Community roles",
      },
    ],
  },

  // TECHNICAL SKILLS ASSESSMENT
  {
    title: "Technical Skills Assessment",
    description:
      "Evaluate your technical aptitude and readiness for technology careers",
    category: "technical",
    duration_minutes: 15,
    passing_score: 60,
    is_active: true,
    questions: [
      {
        question: "I have hands-on experience with programming languages",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          technical: 9,
          problem_solving: 8,
          analytical: 7,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: { technical: 1, problem_solving: 1, analytical: 1 },
          },
          {
            optionIndex: 1,
            weights: { technical: 3, problem_solving: 2, analytical: 2 },
          },
          {
            optionIndex: 2,
            weights: { technical: 5, problem_solving: 5, analytical: 4 },
          },
          {
            optionIndex: 3,
            weights: { technical: 7, problem_solving: 7, analytical: 6 },
          },
          {
            optionIndex: 4,
            weights: { technical: 10, problem_solving: 9, analytical: 8 },
          },
        ],
        explanation: "Directly assesses coding/programming experience",
      },
      {
        question:
          "I understand databases, APIs, and how web applications work",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "hard",
        skillWeights: {
          technical: 10,
          analytical: 9,
          problem_solving: 8,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: { technical: 1, analytical: 1, problem_solving: 1 },
          },
          {
            optionIndex: 1,
            weights: { technical: 2, analytical: 2, problem_solving: 2 },
          },
          {
            optionIndex: 2,
            weights: { technical: 5, analytical: 5, problem_solving: 4 },
          },
          {
            optionIndex: 3,
            weights: { technical: 8, analytical: 8, problem_solving: 7 },
          },
          {
            optionIndex: 4,
            weights: { technical: 10, analytical: 10, problem_solving: 9 },
          },
        ],
        explanation:
          "Tests deeper technical knowledge required for backend development",
      },
      {
        question:
          "I am comfortable with version control systems like Git",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "medium",
        skillWeights: {
          technical: 8,
          teamwork: 6,
          attention_to_detail: 7,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: {
              technical: 1,
              teamwork: 1,
              attention_to_detail: 1,
            },
          },
          {
            optionIndex: 1,
            weights: {
              technical: 3,
              teamwork: 2,
              attention_to_detail: 2,
            },
          },
          {
            optionIndex: 2,
            weights: {
              technical: 5,
              teamwork: 4,
              attention_to_detail: 4,
            },
          },
          {
            optionIndex: 3,
            weights: {
              technical: 7,
              teamwork: 6,
              attention_to_detail: 6,
            },
          },
          {
            optionIndex: 4,
            weights: {
              technical: 9,
              teamwork: 7,
              attention_to_detail: 8,
            },
          },
        ],
        explanation:
          "Essential for: Software Development, DevOps, Team collaboration",
      },
    ],
  },

  // PERSONALITY & WORK STYLE
  {
    title: "Personality & Work Style Assessment",
    description:
      "Understand your personality traits and preferred work environments",
    category: "personality",
    duration_minutes: 15,
    passing_score: 60,
    is_active: true,
    questions: [
      {
        question: "I prefer to work independently rather than in groups",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          teamwork: 5,
          attention_to_detail: 7,
          analytical: 5,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: { teamwork: 10, attention_to_detail: 5, analytical: 5 },
          },
          {
            optionIndex: 1,
            weights: { teamwork: 8, attention_to_detail: 6, analytical: 5 },
          },
          {
            optionIndex: 2,
            weights: { teamwork: 5, attention_to_detail: 7, analytical: 5 },
          },
          {
            optionIndex: 3,
            weights: { teamwork: 3, attention_to_detail: 8, analytical: 6 },
          },
          {
            optionIndex: 4,
            weights: { teamwork: 1, attention_to_detail: 10, analytical: 7 },
          },
        ],
        explanation: "Indicates preference for independent/remote roles",
      },
      {
        question:
          "I am energized by social interaction and working with diverse teams",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          teamwork: 9,
          communication: 8,
          leadership: 6,
        },
        optionMappings: [
          { optionIndex: 0, weights: { teamwork: 1, communication: 1 } },
          { optionIndex: 1, weights: { teamwork: 3, communication: 2 } },
          { optionIndex: 2, weights: { teamwork: 5, communication: 5 } },
          { optionIndex: 3, weights: { teamwork: 8, communication: 8 } },
          { optionIndex: 4, weights: { teamwork: 10, communication: 10 } },
        ],
        explanation:
          "Suitable for customer-facing or highly collaborative roles",
      },
      {
        question: "I tend to plan things carefully in advance",
        questionType: "likert",
        options: [
          "Strongly Disagree",
          "Disagree",
          "Neutral",
          "Agree",
          "Strongly Agree",
        ],
        difficulty: "easy",
        skillWeights: {
          analytical: 7,
          attention_to_detail: 8,
          problem_solving: 6,
        },
        optionMappings: [
          {
            optionIndex: 0,
            weights: { analytical: 2, attention_to_detail: 1, problem_solving: 1 },
          },
          {
            optionIndex: 1,
            weights: { analytical: 4, attention_to_detail: 3, problem_solving: 2 },
          },
          {
            optionIndex: 2,
            weights: { analytical: 5, attention_to_detail: 5, problem_solving: 5 },
          },
          {
            optionIndex: 3,
            weights: { analytical: 7, attention_to_detail: 8, problem_solving: 7 },
          },
          {
            optionIndex: 4,
            weights: { analytical: 9, attention_to_detail: 10, problem_solving: 8 },
          },
        ],
        explanation:
          "Good for: Project Management, Planning roles, Structured environments",
      },
    ],
  },
];

module.exports = questionnaires;
