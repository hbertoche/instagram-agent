## **📸 Homework Assignment: Instagram Agent with A/B Testing**

### **Objective**

Build a simple **Instagram Agent** web app that helps users generate and post content (Post or Story) using an AI model (OpenAI or Gemini) and stores the data in a PostgreSQL database.

---

## **🧠 Requirements**

### **1\. Functionality**

* **User Input**: A user can type a prompt (e.g., *"Post about summer skincare"*) and choose:

  * Content type: `Post` or `Story`

* **AI Generation (A/B Test)**: Use **OpenAI** or **Gemini** API to generate **two different versions** of the content based on the same prompt:

  * Each version includes:

    * A caption

    * (Bonus) Suggested hashtags

* **User Selection**:

  * After generation, the user must **pick one of the two AI-generated options**.

  * The selection will help you **"learn" which version performed better** (i.e., which AI prompt was more effective).

* **Database**: Save the following:

   id: string  
* prompt: string  
* type: "POST" | "STORY"  
* optionA: { caption: string; hashtags: string\[\] }  
* optionB: { caption: string; hashtags: string\[\] }  
* selectedOption: "A" | "B" | null  
* createdAt: Date  
* 

  ### **2\. Frontend**

* Form to:

  * Input prompt

  * Select type: Post or Story

* Display AI-generated options side-by-side (A/B style)

* Let the user choose one (highlight on selection)

* Display history of previously generated content with selected option

  ---

  ## **🛠 Tech Stack**

You must use:

* **Frontend**: React JS

* **Backend**: Nest.js

* **Database**: PostgreSQL

* **ORM**: Prisma

  ---

  ## **🔄 API Endpoints (Example)**

* `POST /generate` – Accepts prompt \+ type, returns two AI-generated options

* `POST /select` – Accepts selected option (A or B) for a generated entry

* `GET /history` – Returns past generated results with selected choices

  ---

  ## **🧪 Bonus Points**

* ✅ Deployed version (e.g. on **Render**, **Railway**, **Vercel** or **Heroku**)

* ✅ Basic auth (mock login or token-based)

* ✅ Loading states and error handling

* ✅ Responsive UI or polished design

* ✅ TypeScript everywhere

* ✅ Logging or insight into "which prompts perform better" (e.g., count A vs. B selections)

  ---

  ## **📦 Submission Guidelines**

1. Create a **public GitHub repository** with the full source code.

2. Include a clear **README** with:

   * Setup instructions

   * How to run locally

   * API key configuration (OpenAI/Gemini)

   * Link to deployed app (if available)

3. Push your work and share the GitHub repo link.

   ---

   ## **🕒 Estimated Time**

\~6–8 hours total. This isn’t a test of perfection — focus on functionality, code quality, and clarity of thought.

---

## **💡 Tips**

* You can use OpenAI’s `gpt-3.5-turbo` or Gemini’s free-tier API.

* Use `.env` to securely manage API keys.

* Prisma’s SQLite is okay for local dev, but PostgreSQL is preferred.

* Track `selectedOption` to improve prompt/response tuning over time.

  ---

Would you like me to generate a starter project structure or Prisma schema for this?

* 

