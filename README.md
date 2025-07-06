# AI NFT Description Generator

A web application where users can upload an image of an NFT or provide keywords, and the Gemini API generates creative and engaging descriptions, including a name, lore, and rarity traits.

![NFT Generator Screenshot](https://i.ibb.co/fd9qZFqW/image.png)

---

## ✨ Features

- **Image-based Generation**: Upload an NFT image to inspire the AI.
- **Keyword-driven**: Use keywords to guide the generation process.
- **Rich Metadata**: Generates a complete set of metadata including Name, Description, Lore, and Traits.
- **Modern UI**: Clean, responsive, and intuitive interface built with Tailwind CSS.
- **No Backend Needed**: Runs entirely in the browser, communicating directly with the Gemini API.

---

## 🚀 Getting Started

This project is a static web application that runs entirely in the browser. You don't need a complex build setup to run it.

### Prerequisites

- A modern web browser.
- A **Google Gemini API Key**. You can get one from [Google AI Studio](https://aistudio.google.com/).

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/iamaanahmad/AI-NFT-Description-Generator.git
cd AI-NFT-Description-Generator
    ```

2.  **API Key Configuration (Crucial!)**

    The application requires a Google Gemini API key to function. This key **MUST** be provided as an environment variable.

    **⚠️ IMPORTANT: NEVER commit your API key to your GitHub repository or hardcode it in the source files.**

    This project is designed to be run in an environment where `process.env.API_KEY` is already defined. For local development or deployment, you will need to ensure this environment variable is available when the application runs. How you do this depends on your hosting provider or local server setup.

3.  **Run the development server:**
    If you are developing or testing locally, use the built-in dev server:

    For Vite:
    ```bash
    npm install
    npm run dev
    ```

    For Create React App:
    ```bash
    npm install
    npm start
    ```

    Then, open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173` for Vite or `http://localhost:3000` for CRA).

    ---
    **Note:**  
    `python -m http.server` only works if you have already built the project using `npm run build` and want to serve the static files from the `dist` or `build` folder.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`@google/genai`)
- **Dependencies**: Served via ESM (`esm.sh`) - no `npm install` required.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
