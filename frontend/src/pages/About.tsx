import { Github, Linkedin, FileText } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto text-foreground space-y-10 py-10">

      {/* Title + Description */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">About This Project</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Fantasy NBA Insights is a full-stack analytics tool built with FastAPI, React,
          TypeScript, and machine learning. Designed to help fantasy basketball players
          make better add/drop, trade, and matchup decisions.
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

      {/* README Preview */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Project README (Preview)</h2>

        <div className="p-4 rounded-md bg-neutral-900 border border-neutral-700 text-sm leading-relaxed text-neutral-300">
          <p className="font-semibold">Fantasy NBA Player Insights</p>
          <p>
            A full-stack fantasy basketball analytics platform leveraging machine learning, 
            real-time NBA statistics, and predictive modeling to help users make optimized 
            roster decisions.
          </p>

          <p className="mt-3 italic text-neutral-500">
            Click “View README.md” above to read the full documentation.
          </p>
        </div>
      </div>
    </div>
  );
}
