import { Badge } from "@/components/ui/badge";

type Props = {
  players: string[];
  onSelect: (name: string) => void;
};

export const SimilarPlayersList = ({ players, onSelect }: Props) => {
  return players.map((p) => (
    <Badge onClick={() => onSelect(p)}>
      {p}
    </Badge>
  ));
};

