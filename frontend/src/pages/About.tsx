import { Github, Linkedin, FileText } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto text-foreground space-y-10 py-10">

      {/* Title + Description */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">About This Project</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          I started my fantasy season 0–4, getting FRIED every week. So I wrote a few Python scripts that pulled NBA API stats and used XGBoost + KNN models, 
          along with some formulas based on how fantasy scores are calculated (they’re in the research folder in GitHub repo), 
          to recommend better players. It took 15 days to gather data 😰, and 5 days just to train the model 🪦, I eventually got within 10 points of accuracy on my test data.
          After that, I won my next two matchups with the highest score in the league.
          I showed it my friends Jake and Ishaan and they said they would actually use it so I made this for people who got unlucky
          with the draft order. I've never built a UI before so I watched some React-TypeScript videos and used Figma
          to design the UI/UX, and I used FastAPI for the backend. HUGE thanks to Swar for making the NBA API, enjoy and shut up
          if you find any bugs in my app. (Email me about it ryousuf569@gmail.com)
        </p>
      </div>

      {/* Links Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Links</h2>

        <div className="flex flex-col space-y-3 max-w-xs">
          {/* GitHub Button */}
          <a
            href="https://github.com/ryousuf569/fantasy-add-drop-recommender"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 
                       transition-colors border border-neutral-700 text-neutral-200"
          >
            <Github size={18} />
            <span>GitHub Repository</span>
          </a>

          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/in/yousuf-rashid-2730122a5/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700
                       transition-colors border border-neutral-700 text-neutral-200"
          >
            <Linkedin size={18} />
            <span>LinkedIn Profile</span>
          </a>

          {/* README Button */}
          <a
            href="https://github.com/ryousuf569/fantasy-add-drop-recommender/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700
                       transition-colors border border-neutral-700 text-neutral-200"
          >
            <FileText size={18} />
            <span>View README.md</span>
          </a>
        </div>
      </div>
    </div>
  );
}
