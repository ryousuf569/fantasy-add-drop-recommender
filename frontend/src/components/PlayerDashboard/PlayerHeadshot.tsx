interface PlayerHeadshotProps {
  playerId: number;
  name: string;
}

export default function PlayerHeadshot({ playerId, name }: PlayerHeadshotProps) {
  const url = `https://cdn.nba.com/headshots/nba/latest/1040x760/${playerId}.png`;

  return (
    <div className="w-32 h-32 rounded-lg overflow-hidden border border-neutral-700 shadow">
      <img
        src={url}
        alt={name}
        className="object-cover w-full h-full"
        onError={(e) => {
          e.currentTarget.src = "/fallback_headshot.png"; // optional fallback
        }}
      />
    </div>
  );
}
