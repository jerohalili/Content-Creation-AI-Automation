# 🤖 Local-AI Social Media Factory (v5)

A powerful, **zero-API-cost** automation engine for marketing content. This system runs entirely on your hardware using local AI models. It combines a local Llama 3.1 language model and ComfyUI for image generation, orchestrated by n8n. A Telegram-based **Human-in-the-Loop** approval step ensures each post meets your quality standards.

## ⚡ The "Zero-Cost" Architecture

This stack avoids expensive cloud credits by using local compute (an economic strategy to cut costs). It includes:  

- **Copywriting:** Local Llama 3.1 (8B Q8) model for text. It runs via the AnythingLLM API for fast, on-prem inference (no external API calls).  
- **Visuals:** ComfyUI with **Z Image Turbo** (a lightning-fast Stable Diffusion XL engine) to create images. All models and prompts are stored locally.  
- **Orchestration:** n8n (self-hosted) coordinates the workflow. This containerized automation tool lets you chain steps without coding.  
- **Gatekeeping:** A Telegram Bot (Human-in-the-Loop) that sends draft posts for one-tap approvals. This adds a human strategy layer, blending automation with manual review for safety and compliance.

By keeping everything local, you save money and maintain full control. This approach also boosts data privacy and ensures compliance with local marketing and advertising regulations (Philippine BIR, SSS, PhilHealth contexts).

## 🛠️ Hardware Requirements

Running these AI models together needs a beefy setup (resources roughly translate to Philippine peso cost savings vs cloud):  

- **GPU:** NVIDIA RTX 3060 (12GB VRAM) or better. A dedicated GPU accelerates image generation (Stable Diffusion) and LLM inference.  
- **RAM:** 16 GB or more system RAM. Each model and n8n workflows run in memory.  
- **Storage:** ~20 GB free (for model weights and images). Llama 3.1 and SDXL models each take several GB.  

These specs ensure smooth operation. If you use smaller models or lower precision (e.g., 4-bit GGUF), you could get away with less GPU memory.

## 🚀 Installation & Setup

Follow these steps to deploy the system on your machine:

1. **Local AI Environment:**  
   - **AnythingLLM:** Install and run AnythingLLM on your PC. In settings, enable the API and create a workspace named `content-planner`. This will host Llama 3.1 locally.  
   - **ComfyUI:** Download and run ComfyUI with the `--listen` flag (`python main.py --listen`). This makes ComfyUI listen on port 8188 (e.g. `http://localhost:8188`). It allows n8n to send image generation requests.  

2. **Deployment:**  
   ```bash
   git clone https://github.com/your-username/Local-AI-Content-Factory.git
   cd Local-AI-Content-Factory/docker
   docker-compose up -d

## n8n Deployment

This starts n8n in Docker. Docker is a virtualization strategy that isolates the workflow engine. Using `docker-compose` brings up the container quickly. Make sure Docker is installed and running on your system.

## n8n Configuration

### Import Workflow
Open the n8n web interface, usually at `http://localhost:5678`. Use the top-right menu to **Import from File** and load `workflows/content-generator-v5.json`. This contains the automation blueprint.

### Credentials
In the imported workflow, update the required keys and IDs:

- **AnythingLLM API Key:** Replace `YOUR_ANYTHINGLLM_API_KEY` with your key from the AnythingLLM workspace.
- **Telegram Bot:** Replace `YOUR_TELEGRAM_TOKEN` (bot token) and `YOUR_CHAT_ID` (your Telegram user or group ID). This configures the bot for human approvals.
- **Social Media:** Insert your `YOUR_FB_PAGE_ID`, `YOUR_IG_USER_ID`, and the respective Access Tokens. These enable auto-posting to Facebook and Instagram via their APIs.

After configuring, run a test trigger in n8n to ensure everything connects. The workflow will now generate a post and image draft, then send it to your Telegram for approval.

## 🧠 The "Mara" Persona & Prompt Logic

The `prompts/` folder defines a character named **Mara**, giving the AI a consistent marketing voice. The four-layer prompting engine applies marketing strategy and psychology to content:

- **Sensory Hooks:** Posts begin with a vivid sensory cue, such as a sound, feeling, or scene, to grab attention. This uses basic psychology: humans respond strongly to sensory details.
- **Compliance-First:** Every post weaves in local regulatory context, like mentions of BIR, SSS, or PhilHealth compliance, to ensure trust and legality. Addressing laws directly speaks to consumers’ sense of security and builds credibility.
- **Visual Consistency:** Image prompts avoid generic “stock photo” looks. Instead, they use detailed, cinematic descriptions tailored to the local market. This strategy aligns visuals with copy tone and demographics, improving overall engagement.
- **No AI Fluff:** The chain of prompts forces the model to skip generic filler. Each step refines the content toward specific goals, a strategic layer that saves time and boosts conversion.

Together, these tactics create marketing posts that sound local, feel authentic, and follow advertising standards. The `prompts/` folder includes Markdown templates and examples showing how each layer enhances the output.

## 🔧 Troubleshooting & Tips

If you run into issues, check these common scenarios:

### Connection Refused
If n8n is in Docker, `localhost` may not work. Use `http://host.docker.internal:3001` (or whatever port your n8n tunnel is on) instead of `localhost`. This uses Docker’s internal host alias to reach your machine.

### Telegram Buttons Fail
Telegram webhooks need a public callback URL. Ensure your n8n instance is exposed via a tool like Ngrok or Cloudflare Tunnel, so Telegram can reach it. This is a networking strategy that forwards requests from the internet to your local service.

### GPU Out of Memory
If Llama 3.1 or ComfyUI uses too much GPU memory, lower the model precision. For example, use a 4-bit GGUF Llama model or run AnythingLLM in CPU mode using system RAM. This is a trade-off between precision and memory, which is a common engineering strategy.

### Stripping Preamble
Llama 3.1 sometimes starts replies with “Here is your post: ...”. The `scripts/parse-utils.js` included in this repo automatically removes those phrases. If you customize the model or prompts, ensure similar cleanup so outputs stay neat.

Each tip above addresses a specific technical snag. They combine practical strategies, such as lowering quality for memory savings, with knowledge of the tools’ quirks. Read error messages carefully and adjust settings as needed.

## 📂 Project Structure

- `workflows/` – n8n workflow definitions (JSON). Contains automation blueprints and logic.
- `prompts/` – Mara Persona and prompt templates. Markdown files defining prompts and content guidelines.
- `scripts/` – Utility scripts (JavaScript). Includes helpers for stripping extra text and parsing JSON.
- `docker/` – Docker Compose files. Configuration for launching n8n and related services in containers.
- `README.md` – This documentation. Use it to set up and understand the project.

The structure is organized so you can easily locate the automation flows in `workflows/`, customize prompts in `prompts/`, and tweak deployment in `docker/`.

## 📜 License

This project is open-source under the MIT License. See the `LICENSE` file for details. You are free to use, modify, and distribute the code as permitted by MIT terms.