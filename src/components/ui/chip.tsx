import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

type ChipProps = {
  value: number;
  label: string;
  onClose?: (value: number) => void;
};

export const Chip = ({ value, label, onClose }: ChipProps) => {
  return (
    <Badge key={value}>
      {label}
      {onClose && (
        <Button
          variant="ghost"
          className="size-6"
          onClick={() => onClose(value)}
        >
          <XIcon />
        </Button>
      )}
    </Badge>
  );
};
