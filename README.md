
# AI NFT Description Generator

A web application where users can upload an image of an NFT or provide keywords, and the Gemini API generates creative and engaging descriptions, including a name, lore, and rarity traits.

![NFT Generator Screenshot](https://storage.googleapis.com/aip-dev-source-public/assets/nft-generator-screenshot.png)

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
    git clone https://github.com/YOUR_USERNAME/ai-nft-generator.git
    cd ai-nft-generator
    ```

2.  **API Key Configuration (Crucial!)**

    The application requires a Google Gemini API key to function. This key **MUST** be provided as an environment variable.

    **⚠️ IMPORTANT: NEVER commit your API key to your GitHub repository or hardcode it in the source files.**

    This project is designed to be run in an environment where `process.env.API_KEY` is already defined. For local development or deployment, you will need to ensure this environment variable is available when the application runs. How you do this depends on your hosting provider or local server setup.

3.  **Serve the files:**
    You can use any simple static file server. If you have Python installed, you can run:
    ```bash
    python -m http.server
    ```
    Then, open your browser and navigate to `http://localhost:8000`.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini API (`@google/genai`)
- **Dependencies**: Served via ESM (`esm.sh`) - no `npm install` required.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
