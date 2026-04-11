# Local-AI Content Factory (v5)

A fully automated, **zero-API-cost** social media engine built on **n8n**. This system generates high-conversion marketing copy and cinematic images locally on your machine, then routes them to Telegram for human approval before posting to Facebook and Instagram.

## Key Features
* **100% Local Processing:** Uses **AnythingLLM** (Llama 3.1 8B) and **ComfyUI** (Z Image Turbo) for privacy and zero monthly costs.
* **Human-in-the-Loop:** Interactive Telegram bot buttons for "Approve" or "Reject" to ensure quality control.
* **Persona-Locked Copywriting:** Driven by the "Mara" persona—optimized for the Philippine market and HR/Payroll niche.
* **Automated Image Engineering:** Converts LLM descriptions into 4-layer cinematic prompts for ComfyUI.
* **Anti-Repetition Engine:** Stores previous generation details locally to ensure content stays fresh.

## The Stack
* **Orchestration:** [n8n](https://n8n.io/) (Self-hosted via Docker)
* **LLM Engine:** [AnythingLLM](https://useanything.com/) (Running Llama 3.1 8B Q8 recommended)
* **Image Gen:** [ComfyUI](https://github.com/comfyanonymous/ComfyUI) (Z Image Turbo Pipeline)
* **Interface:** Telegram Bot API
* **Destinations:** Facebook Graph API & Instagram Business API

## Quick Start

### 1. Prerequisites
* **Hardware:** Recommended 12GB+ VRAM (e.g., RTX 3060/4060) to run Llama 3.1 and ComfyUI simultaneously.
* **Docker:** Installed and running.
* **External Access:** Use **Cloudflare Tunnel** or **Ngrok** to expose your n8n webhook URL to Telegram for the approval buttons.

### 2. Installation
1.  Clone this repository.
2.  Navigate to the `/docker` folder and run:
    ```bash
    docker-compose up -d
    ```
3.  Import `workflows/content-generator-v5.json` into n8n.

### 3. Configuration
Update the following placeholders in your n8n node parameters:
* `YOUR_TELEGRAM_TOKEN` & `YOUR_CHAT_ID`
* `YOUR_ANYTHINGLLM_API_KEY`
* `YOUR_FB_PAGE_ID` & `YOUR_IG_USER_ID`
* `YOUR_ACCESS_TOKENS`

## 📁 Folder Structure
* `/workflows`: The `.json` logic for n8n.
* `/prompts`: System instructions for the AI persona and image generator.
* `/scripts`: JavaScript snippets for data cleaning and preamble stripping.
* `/docker`: Deployment configuration.

## 📜 License
MIT