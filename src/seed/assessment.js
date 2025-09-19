export let assessmentData = [
  {
    id: 1,
    assessmentTitle: "Frontend Developer Assessment",
    associatedJob: "Senior React Developer",
    estimatedTime: 60,
    status: "active",
    description: "This assessment tests React, JavaScript, CSS skills.",
    sections: [
      {
        title: "React Basics",
        questions: [
          {
            type: "multipleChoice",
            text: "What is JSX?",
            options: ["A template", "JavaScript XML", "A CSS style", "A database"],
            correctOptions: [1],
          },
          {
            type: "text",
            text: "Explain React hooks.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which hook is used to manage state?",
            options: ["useEffect", "useState", "useRef", "useReducer"],
            correctOptions: [1],
          },
          {
            type: "multipleChoice",
            text: "What does useEffect do?",
            options: [
              "Manages state",
              "Performs side effects",
              "Renders JSX",
              "Creates context",
            ],
            correctOptions: [1],
          },
          {
            type: "text",
            text: "Explain the difference between props and state.",
            options: [],
            correctOptions: [],
          },
        ],
      },
      {
        title: "JavaScript & CSS",
        questions: [
          {
            type: "multipleChoice",
            text: "Which method converts JSON to a JS object?",
            options: ["JSON.stringify", "JSON.parse", "JSON.object", "JSON.convert"],
            correctOptions: [1],
          },
          {
            type: "text",
            text: "Explain event delegation in JavaScript.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which CSS property is used for flex layout?",
            options: ["display", "position", "float", "margin"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "What is the difference between relative and absolute positioning?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which of these is a JavaScript data type?",
            options: ["String", "Number", "Boolean", "All of the above"],
            correctOptions: [3],
          },
        ],
      },
    ],
  },

  {
    id: 2,
    assessmentTitle: "Backend Developer Assessment",
    associatedJob: "Node.js Developer",
    estimatedTime: 70,
    status: "inactive",
    description: "This assessment tests Node.js, Express, and database skills.",
    sections: [
      {
        title: "Node.js Basics",
        questions: [
          {
            type: "multipleChoice",
            text: "Which module is used to create a server in Node.js?",
            options: ["http", "fs", "path", "express"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain event loop in Node.js.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "What does npm stand for?",
            options: [
              "Node Package Manager",
              "Node Program Module",
              "New Package Module",
              "Node Public Manager",
            ],
            correctOptions: [0],
          },
          {
            type: "multipleChoice",
            text: "Which of the following is a framework for Node.js?",
            options: ["Express", "Django", "Rails", "Laravel"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain middleware in Express.",
            options: [],
            correctOptions: [],
          },
        ],
      },
      {
        title: "Database & APIs",
        questions: [
          {
            type: "multipleChoice",
            text: "Which database is NoSQL?",
            options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain REST API principles.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which HTTP method is used to update data?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correctOptions: [2],
          },
          {
            type: "text",
            text: "What is the difference between SQL and NoSQL databases?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which of these is a common Node.js ORM?",
            options: ["Sequelize", "Hibernate", "Mongoose", "Django ORM"],
            correctOptions: [0],
          },
        ],
      },
    ],
  },

  {
    id: 3,
    assessmentTitle: "Full Stack Developer Assessment",
    associatedJob: "Full Stack Engineer",
    estimatedTime: 90,
    status: "active",
    description: "This assessment covers frontend, backend, and database skills.",
    sections: [
      {
        title: "Frontend",
        questions: [
          {
            type: "multipleChoice",
            text: "Which is a state management library?",
            options: ["Redux", "Express", "Node", "MongoDB"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain virtual DOM in React.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which hook is used for side effects?",
            options: ["useState", "useEffect", "useReducer", "useMemo"],
            correctOptions: [1],
          },
          {
            type: "text",
            text: "What is the difference between props and state?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "What does CSS Flexbox help with?",
            options: ["Layout", "Database", "API", "Server"],
            correctOptions: [0],
          },
        ],
      },
      {
        title: "Backend & Database",
        questions: [
          {
            type: "multipleChoice",
            text: "Which database is document-oriented?",
            options: ["MongoDB", "PostgreSQL", "MySQL", "SQLite"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain middleware in Express.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which HTTP status code means success?",
            options: ["200", "404", "500", "301"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Difference between SQL and NoSQL databases?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which command initializes a Node.js project?",
            options: ["npm init", "npm start", "node init", "node start"],
            correctOptions: [0],
          },
        ],
      },
    ],
  },

  {
    id: 4,
    assessmentTitle: "QA Engineer Assessment",
    associatedJob: "QA Engineer",
    estimatedTime: 50,
    status: "active",
    description: "This assessment tests manual and automated testing skills.",
    sections: [
      {
        title: "Manual Testing",
        questions: [
          {
            type: "multipleChoice",
            text: "What is a test case?",
            options: [
              "A piece of code",
              "A document describing test steps",
              "A database",
              "A server",
            ],
            correctOptions: [1],
          },
          {
            type: "text",
            text: "Explain the difference between smoke and regression testing.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which is a type of testing?",
            options: ["Unit", "Integration", "System", "All of the above"],
            correctOptions: [3],
          },
          {
            type: "text",
            text: "What is boundary value analysis?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which testing is done without code?",
            options: ["Manual Testing", "Automated Testing", "Unit Testing", "Integration Testing"],
            correctOptions: [0],
          },
        ],
      },
      {
        title: "Automation Testing",
        questions: [
          {
            type: "multipleChoice",
            text: "Which tool is used for web automation?",
            options: ["Selenium", "Photoshop", "Jira", "Figma"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain writing a test script.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which language is commonly used in Selenium?",
            options: ["Python", "C++", "JavaScript", "All of the above"],
            correctOptions: [3],
          },
          {
            type: "text",
            text: "Difference between automated and manual testing?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "What is a test suite?",
            options: ["Collection of test cases", "Database", "Server", "Framework"],
            correctOptions: [0],
          },
        ],
      },
    ],
  },

  {
    id: 5,
    assessmentTitle: "Data Scientist Assessment",
    associatedJob: "Data Scientist",
    estimatedTime: 80,
    status: "inactive",
    description: "This assessment tests Python, ML, and statistics knowledge.",
    sections: [
      {
        title: "Python & Data Manipulation",
        questions: [
          {
            type: "multipleChoice",
            text: "Which library is used for data manipulation?",
            options: ["NumPy", "React", "Express", "Docker"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain pandas DataFrame.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which operator is used for element-wise multiplication in NumPy?",
            options: ["*", "@", "dot", "x"],
            correctOptions: [1],
          },
          {
            type: "text",
            text: "Difference between Series and DataFrame in pandas?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which library is for ML in Python?",
            options: ["scikit-learn", "Express", "Django", "Flask"],
            correctOptions: [0],
          },
        ],
      },
      {
        title: "Statistics & Machine Learning",
        questions: [
          {
            type: "multipleChoice",
            text: "What is supervised learning?",
            options: [
              "Model learns with labeled data",
              "Model learns without labels",
              "Database operation",
              "Frontend design",
            ],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain overfitting in ML.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which is a regression algorithm?",
            options: ["Linear Regression", "K-Means", "Apriori", "Decision Tree"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Difference between classification and regression.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which metric is used for classification?",
            options: ["Accuracy", "MSE", "RMSE", "Variance"],
            correctOptions: [0],
          },
        ],
      },
    ],
  },

  {
    id: 6,
    assessmentTitle: "DevOps Engineer Assessment",
    associatedJob: "DevOps Engineer",
    estimatedTime: 60,
    status: "active",
    description: "This assessment tests CI/CD, cloud, and container skills.",
    sections: [
      {
        title: "CI/CD & Deployment",
        questions: [
          {
            type: "multipleChoice",
            text: "What does CI stand for?",
            options: ["Continuous Integration", "Continuous Improvement", "Code Injection", "Code Integration"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain what a pipeline is in CI/CD.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which tool is for CI/CD?",
            options: ["Jenkins", "React", "Node.js", "Docker"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Difference between CI and CD?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which command deploys Docker containers?",
            options: ["docker run", "docker build", "npm start", "git push"],
            correctOptions: [0],
          },
        ],
      },
      {
        title: "Cloud & Containers",
        questions: [
          {
            type: "multipleChoice",
            text: "Which is a cloud provider?",
            options: ["AWS", "React", "Node.js", "MySQL"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain Kubernetes pods.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which command lists Docker containers?",
            options: ["docker ps", "docker ls", "docker list", "docker show"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Difference between Docker and VM?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which AWS service is for compute?",
            options: ["EC2", "S3", "Lambda", "RDS"],
            correctOptions: [0],
          },
        ],
      },
    ],
  },

  {
    id: 7,
    assessmentTitle: "UI/UX Designer Assessment",
    associatedJob: "UI/UX Designer",
    estimatedTime: 50,
    status: "inactive",
    description: "This assessment tests design principles, tools, and UX knowledge.",
    sections: [
      {
        title: "Design Principles",
        questions: [
          {
            type: "multipleChoice",
            text: "Which is a design principle?",
            options: ["Consistency", "Database", "API", "Server"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain the importance of user-centered design.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which color scheme is complementary?",
            options: ["Colors opposite on color wheel", "Adjacent colors", "Monochrome", "Random colors"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Difference between UX and UI.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which tool is used for wireframing?",
            options: ["Figma", "Node.js", "Express", "Python"],
            correctOptions: [0],
          },
        ],
      },
      {
        title: "Prototyping & Tools",
        questions: [
          {
            type: "multipleChoice",
            text: "Which tool is for high-fidelity prototypes?",
            options: ["Adobe XD", "React", "MySQL", "Git"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain usability testing.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which tool supports collaborative design?",
            options: ["Figma", "Docker", "AWS", "Jenkins"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Difference between wireframe and prototype.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which principle helps with accessibility?",
            options: ["Contrast", "Database", "Backend", "Server"],
            correctOptions: [0],
          },
        ],
      },
    ],
  },

  {
    id: 8,
    assessmentTitle: "Product Manager Assessment",
    associatedJob: "Product Manager",
    estimatedTime: 60,
    status: "active",
    description: "This assessment tests product management, strategy, and Agile knowledge.",
    sections: [
      {
        title: "Product Strategy",
        questions: [
          {
            type: "multipleChoice",
            text: "Which is part of product lifecycle?",
            options: ["Introduction", "Growth", "Maturity", "All of the above"],
            correctOptions: [3],
          },
          {
            type: "text",
            text: "Explain MVP (Minimum Viable Product).",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which analysis evaluates competition?",
            options: ["SWOT", "PEST", "Porter's Five Forces", "Benchmarking"],
            correctOptions: [2],
          },
          {
            type: "text",
            text: "Difference between roadmap and backlog?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which method helps prioritize features?",
            options: ["MoSCoW", "Kanban", "Scrum", "Agile"],
            correctOptions: [0],
          },
        ],
      },
      {
        title: "Agile & Management",
        questions: [
          {
            type: "multipleChoice",
            text: "Which is an Agile framework?",
            options: ["Scrum", "Waterfall", "V-Model", "PRINCE2"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Explain sprint planning.",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which role manages backlog in Scrum?",
            options: ["Product Owner", "Scrum Master", "Developer", "Tester"],
            correctOptions: [0],
          },
          {
            type: "text",
            text: "Difference between Scrum Master and Product Owner?",
            options: [],
            correctOptions: [],
          },
          {
            type: "multipleChoice",
            text: "Which Agile ceremony is for daily updates?",
            options: ["Daily Standup", "Sprint Review", "Sprint Retrospective", "Planning Poker"],
            correctOptions: [0],
          },
        ],
      },
    ],
    },
];
