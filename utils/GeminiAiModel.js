// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

// import {
//     GoogleGenAI,
//   } from '@google/genai';

//   async function main() {
//     const ai = new GoogleGenAI({
//       apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
//     });
//     const config = {
//       responseMimeType: 'text/plain',
//     };
//     const model = 'gemini-2.5-pro-preview-05-06';
//     const contents = [
//       {
//         role: 'user',
//         parts: [
//           {
//             text: `Job position: Full Stack Developer, Job Description: React, NodeJS, MySql , Years of Experience 6 , using this info give me 5 general not so hard 
//   interview questions with answers  in JSON format give question answers as fields in JSON`,
//           },
//         ],
//       },
//       {
//         role: 'model',
//         parts: [
//           {
//             text: `Here's my thinking process to arrive at the JSON output:

//   1.  **Deconstruct the Request:**
//       *   **Role:** Full Stack Developer
//       *   **Key Technologies:** React, NodeJS, MySQL
//       *   **Experience:** 6 years
//       *   **Output Format:** JSON
//       *   **JSON Structure:** "question" and "answer" fields for each item.
//       *   **Quantity:** 5 questions
//       *   **Difficulty:** "General, not so hard" – this is key. For 6 years of experience, "not so hard" still means beyond absolute beginner. It implies questions that test fundamental understanding and practical application rather than obscure edge cases or deep algorithmic complexity. They should be things a 6-year experienced dev *should* know without much thought.

//   2.  **Brainstorming Categories (based on tech stack and "general"):**
//       *   **React:** Core concepts, component lifecycle (or hooks equivalent), state management, common patterns.
//       *   **Node.js:** Event loop, asynchronous operations, module system, basic API building.
//       *   **MySQL:** Basic querying, indexing, transactions (maybe too deep for "not so hard"? let's see).
//       *   **Full Stack / General:** Version control (Git), REST APIs, debugging, common development practices, maybe a bit about deployment or testing.
//       *   **Experience Level (6 years):** Questions should allow them to draw on experience, not just recite definitions. "Tell me about a time..." or "How would you approach..." are good.

//   3.  **Drafting Questions (Iterative Process):**

//       *   **Q1 (React):**
//           *   Initial thought: "What is JSX?" (Too basic for 6 years)
//           *   Better: "What are React Hooks and why were they introduced?" (Good, tests understanding of modern React)
//           *   Answer idea: Solved class component complexities (this binding, wrapper hell), promote reusability of stateful logic. Key hooks: \`useState\`, \`useEffect\`.

//       *   **Q2 (Node.js):**
//           *   Initial thought: "What is Node.js?" (Too basic)
//           *   Better: "Can you explain the Node.js event loop in simple terms and why it's important for I/O operations?" (Fundamental, crucial for Node's performance).
//           *   Answer idea: Single-threaded, non-blocking I/O, offloads operations to system kernel, uses callbacks/promises/async-await to manage completions.

//       *   **Q3 (MySQL/Database):**
//           *   Initial thought: "What is a primary key?" (Too basic)
//           *   Better: "When designing a MySQL schema for a new feature, what are some key considerations you'd keep in mind regarding table relationships and indexing?" (More practical, draws on experience).
//           *   Answer idea: Normalization, foreign keys for relationships, indexing common query columns (WHERE, JOIN), data types.

//       *   **Q4 (Full Stack / General Web):**
//           *   Initial thought: "What is HTTP?" (Too basic)
//           *   Better: "Describe the difference between \`localStorage\`, \`sessionStorage\`, and cookies. When might you use each?" (Common web dev knowledge, practical application).
//           *   Answer idea: Scope (tab/window vs browser vs server-controlled), persistence, size limits, typical use cases.

//       *   **Q5 (Problem Solving / Experience):**
//           *   Initial thought: "How do you debug code?" (A bit too open-ended, might not be "not so hard" to answer well).
//           *   Better, tying into full-stack: "Imagine a user reports a bug where data they submitted isn't appearing correctly. Briefly outline your debugging process, touching on both frontend (React) and backend (Node.js/MySQL)." (Tests systematic thinking, touches all parts of the stack, allows for a general but comprehensive answer).
//           *   Answer idea: Reproduce, check browser console/network, check server logs, inspect API request/response, query database, use debugger.

//   4.  **Refining Answers (for clarity and conciseness, fitting "not so hard"):**

//       *   **Q1 Answer:** Focus on the "why" (class component issues) and the "what" (reusable stateful logic, key examples like \`useState\`, \`useEffect\`).
//       *   **Q2 Answer:** Emphasize non-blocking I/O and how it enables concurrency without threads.
//       *   **Q3 Answer:** Keep it high-level: normalization, relationships (foreign keys), performance (indexes).
//       *   **Q4 Answer:** Clear distinctions based on scope, persistence, and typical use cases.
//       *   **Q5 Answer:** A logical flow from frontend to backend, mentioning common debugging tools/techniques at each stage.

//   5.  **Formatting as JSON:**
//       *   Create an array of objects.
//       *   Each object has a "question" key and an "answer" key.
//       *   Copy-paste the refined questions and answers into the structure.
//       *   Validate the JSON (e.g., using an online validator or just careful checking of brackets, commas, quotes).

//       \`\`\`json
//       [
//         {
//           "question": "...",
//           "answer": "..."
//         },
//         // ... 4 more times
//       ]
//       \`\`\`

//   6.  **Final Review:**
//       *   Are there 5 questions? Yes.
//       *   Are they "general, not so hard" for 6 YoE? Yes, they cover fundamentals and common practices.
//       *   Do they touch on React, Node, MySQL? Yes, directly or indirectly.
//       *   Is the JSON format correct? Yes.
//       *   Are the answers reasonably concise and accurate? Yes.

//   This systematic approach ensures all constraints of the prompt are met and the quality of the questions is appropriate.`,
//           },
//           {
//             text: `\`\`\`json
//   [
//     {
//       "question": "Can you explain the concept of props drilling in React and one common way to mitigate it?",
//       "answer": "Props drilling is when you pass props down through multiple layers of nested components, even if some intermediate components don't directly use those props. This can make components less reusable and harder to maintain. A common way to mitigate it is by using the Context API, which allows you to share state across the component tree without explicitly passing props through every level. Other solutions include state management libraries like Redux or Zustand, or component composition."
//     },
//     {
//       "question": "In Node.js, what is the difference between \`require()\` and \`import\`? When would you typically use each?",
//       "answer": "\`require()\` is part of the CommonJS module system, which is the traditional module system for Node.js. It's synchronous. \`import\` (and \`export\`) are part of the ECMAScript (ES) module system, which is the standard for JavaScript. ES modules are asynchronous and offer features like static analysis and tree shaking. You'd typically use \`require()\` in older Node.js projects or files that haven't been configured for ES modules. \`import\` is preferred in modern Node.js development, especially when using ES6+ features, and requires either setting \`\\"type\\": \\"module\\"\` in \`package.json\` or using the \`.mjs\` file extension."
//     },
//     {
//       "question": "What is an index in MySQL, and why is it important for database performance?",
//       "answer": "An index in MySQL is a special lookup table that the database search engine can use to speed up data retrieval. Essentially, it's a data structure (often a B-tree) that stores a small subset of a table's columns, along with pointers to the full rows. It's important because, without an index, MySQL would have to scan the entire table (a full table scan) to find rows matching a query's \`WHERE\` clause. Indexes allow the database to quickly locate the relevant rows, significantly improving query performance, especially on large tables."
//     },
//     {
//       "question": "Describe a situation where you might prefer to use \`async/await\` over traditional Promises with \`.then()\` and \`.catch()\` in Node.js.",
//       "answer": "\`async/await\` provides a more synchronous-looking way to write asynchronous code, making it often easier to read and reason about, especially when dealing with multiple sequential asynchronous operations. For example, if you need to make an API call, then based on its result, make another API call, and then process that result, \`async/await\` can make the code look cleaner and less nested than a chain of \`.then()\` calls. It also simplifies error handling with standard \`try...catch\` blocks."
//     },
//     {
//       "question": "How would you handle API versioning for a Node.js backend that serves a React frontend and potentially other clients?",
//       "answer": "There are a few common strategies: 1. URL Path Versioning (e.g., \`/api/v1/users\`, \`/api/v2/users\`): This is explicit and easy for clients to understand. 2. Query Parameter Versioning (e.g., \`/api/users?version=1\`): Less common for major versions but can be useful for minor changes. 3. Custom Header Versioning (e.g., \`Accept-Version: v1\`): Keeps URLs clean but requires clients to set headers. For a React frontend and other clients, URL path versioning is often the most straightforward and widely adopted approach as it's clear and doesn't require special client configurations beyond changing the base URL path."
//     }
//   ]
//   \`\`\``,
//           },
//         ],
//       },
//       {
//         role: 'user',
//         parts: [
//           {
//             text: `INSERT_INPUT_HERE`,
//           },
//         ],
//       },
//     ];

//     const response = await ai.models.generateContentStream({
//       model,
//       config,
//       contents,
//     });
//     for await (const chunk of response) {
//       console.log(chunk.text);
//     }
//   }

//   main();



import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

async function GenerateQA(content) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
    });
    return response.text.replace('```json', '').replace('```', '')
    
}


export default GenerateQA;