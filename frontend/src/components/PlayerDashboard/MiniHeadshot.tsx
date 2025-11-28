interface MiniHeadshotProps {
  name: string;
  playerId: number;
  onSelect?: () => void;
}

export default function MiniHeadshot({ name, playerId, onSelect }: MiniHeadshotProps) {
  const url = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;

  return (
    <div
      className="flex items-center gap-2 px-2 py-1 rounded-md bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 cursor-pointer"
      onClick={onSelect}
    >
      <div className="w-10 h-10 rounded-md overflow-hidden">
        <img
          src={url}
          alt={name}
          className="object-cover w-full h-full"
          onError={(e) => (e.currentTarget.src = "/fallback_headshot.png")}
        />
      </div>

      <p className="text-sm text-white">{name}</p>
    </div>
  );
}
