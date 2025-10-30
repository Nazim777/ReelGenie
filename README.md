# 🎬 ReelGenie — AI Short Video Generator

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?logo=tailwindcss)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe)
![Remotion](https://img.shields.io/badge/Remotion-Video%20Engine-FF4C00?logo=remotion)
![License: MIT](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

---

**ReelGenie** is a powerful **AI-driven short video generator** that lets users create professional-quality short videos using **AI narration**, **dynamic styles**, and **text-to-video automation**.  
Built using **Next.js 15**, **Remotion**, **Drizzle ORM**, and **Stripe**, it integrates **ElevenLabs**, **AssemblyAI**, and **Gemini AI** to handle voice synthesis, transcription, and content generation — with **GitHub Actions** automating the rendering process.

---

## 🚀 Features

### 🎥 AI-Powered Video Creation
- Create short, engaging AI-generated videos from your text or topic.  
- Customize **video styles**, **voices**, and **durations**.  
- Automatic video rendering using **GitHub Actions**.

### 🧠 AI Integrations
- **🗣️ ElevenLabs** — Generates natural human-like AI voiceovers.  
- **🎧 AssemblyAI** — Transcribes, processes, or refines audio.  
- **💡 Gemini AI** — Generates creative content, captions, or scripts from prompts.  

### 🎨 Dynamic Color Modes
Switch between visually stunning modes:
- 🧁 Default  
- 🌙 Dark  
- 🟢 Green  
- 🟠 Orange  

Each mode automatically adjusts text color for visibility.

### 💳 Credit System with Stripe
- Users get free starter credits.  
- Each video generation consumes credits.  
- Secure checkout powered by **Stripe** for purchasing more credits.

### 🗃️ Database Integration
- **Drizzle ORM + Neon PostgreSQL** for structured data storage (users, videos, credits, etc.)

### 👤 Authentication
- **Clerk** handles sign-up, sign-in, and session management securely.

### 🧩 Automated Video Rendering
- **GitHub Actions** workflow automatically renders and uploads generated videos to the cloud.

---

## 🧠 How It Works

1. **User enters a topic** → Gemini AI generates a script.  
2. **ElevenLabs** converts that script into a realistic voiceover.  
3. **AssemblyAI** processes or enhances audio if needed and generate catpion.  
4. **Remotion** combines visuals + voice + text overlays.  
5. **GitHub Actions** runs the rendering process remotely and stores the video.  
6. **User previews and downloads** their video from the dashboard.

---

## 🧩 Tech Stack

| Layer              | Technology |
| ------------------ | ----------- |
| Frontend UI        | Next.js 15 (App Router) |
| Styling            | Tailwind CSS + ShadCN UI |
| Animation          | Framer Motion |
| Auth               | Clerk |
| Database           | Drizzle ORM + Neon DB |
| Payments           | Stripe |
| AI Voice           | ElevenLabs |
| AI Audio/Text      | AssemblyAI |
| AI Script Generation | Gemini AI |
| Video Rendering    | Remotion + GitHub Actions |
| Hosting (optional) | Vercel |

---

## 🛠️ Folder Structure

/app
├── _context/ # Global contexts (User, ColorMode)
├── api/ # Server routes (e.g. /verify-user, /create-checkout-session)
├── dashboard/ # Dashboard pages (video list, create-new, etc.)
└── components/ # Shared UI components (Selects, Toggle, Header, etc.)

/components/ui # ShadCN components
/config/ # DB, schema, etc.



---

## ⚙️ Environment Variables

Create a `.env.local` file at the project root:

```env
NEXT_PUBLIC_DRIZZLE_DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

ELEVENLABS_API_KEY=

NEXT_PUBLIC_ASSEMBLY_API_KEY=
NEXT_PUBLIC_GEMINI_API_KEY=
NEXT_PUBLIC_ASSEMBLY_API_KEY=

UNSPLASH_ACCESS_KEY=
NEXT_PUBLIC_UNSPLASH_SECRET_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_BASE_URL=

GITHUB_REPO_OWNER=
GITHUB_REPO_NAME=
# Personal access token with workflows scope (required for GitHub Actions)
PERSONAL_ACCESS_TOKEN=
```

## 📦 Installation & Setup
### 1️⃣ Clone the repo
git clone https://github.com/Nazim777/reelgenie.git
cd reelgenie

### 2️⃣ Install dependencies
npm install

### 3️⃣ Setup database
npm run db:push

### 4️⃣ Run the dev server
npm run dev


# 💳 Stripe Test Mode

To test the payment flow:
Use Stripe’s test card:

### 4242 4242 4242 4242
### Exp: Any future date
### CVC: Any 3 digits



# 🖼️ Light/Dark/Color Modes

The app supports 4 color modes via ColorModeContext:

| Mode    | Background | Text Color |
| ------- | ---------- | ---------- |
| Default | White      | Black      |
| Dark    | #111       | White      |
| Green   | #d1fae5    | #065f46    |
| Orange  | #ffedd5    | #7c2d12    |

You can toggle modes using the ColorModeDropdown in the header.


# 🧩 Key Components

| Component                      | Purpose                                           |
| ------------------------------ | ------------------------------------------------- |
| `SelectTopic.tsx`              | Choose or input a topic                           |
| `SelectStyle.tsx`              | Select visual style (e.g., Realistic, Cartoon)    |
| `SelectVoice.tsx`              | Pick AI voice from ElevenLabs                     |
| `SelectDuration.tsx`           | Choose video duration                             |
| `BuyCreditsPage.tsx`           | Stripe checkout integration                       |
| `Dashboard.tsx`                | View all generated videos                         |
| `PlayerDialog.tsx`             | Preview and download video                        |
| `ColorModeDropdown.tsx`        | Switch between color modes                        |
| `.github/workflows/render.yml` | GitHub Actions workflow to render videos remotely |


# ⚙️ GitHub Actions Video Rendering

### ReelGenie offloads video rendering to GitHub Actions for scalability and reliability.
### Workflow: .github/workflows/render.yml
### Runs automatically when a user triggers “Export”
### Builds the Remotion project
### Renders the video
### Uploads the result to Cloudinary
### Updates database with download URL
### You can manually trigger this workflow for testing

You can manually trigger this workflow for testing:

```
gh workflow run render.yml
```

# 🧪 Example Workflow

### User logs in with Clerk.
### Selects topic, style, voice, and duration.
### Gemini AI generates the script.
### ElevenLabs generates voice audio.
### AssemlblyAI generate caption
### Unsplash for dynamic image 
### Remotion composes the final video.
### GitHub Action renders and uploads the video.
### User previews and downloads the finished clip.


# 🧰 Commands
| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start local server             |
| `npm run build`   | Build for production           |
| `npm run start`   | Run production build           |
| `npm run db:push` | Push schema changes to Neon DB |


# 🧑‍💻 Author
### Mohammad Nazim Hossain



---

✅ That’s the **entire README in one context** — just copy it and paste into your `README.md`.  
Would you like me to add a **preview screenshot or demo GIF section** at the top (e.g. “🎥 Demo Preview”)? It looks great for GitHub landing pages.