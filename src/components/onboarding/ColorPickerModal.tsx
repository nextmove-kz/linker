import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ColorPicker from "./ColorPicker";

const ColorPickerModal = ({
  trigger,
  label,
  name,
  selectedColor,
  onColorChange,
}: {
  trigger: string;
  label?: string;
  name: string;
  selectedColor: string;
  onColorChange: (color: string) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="text-primary">{trigger}</DialogTrigger>
      <DialogContent className="max-w-[400px] rounded-xl">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <ColorPicker
          name={name}
          selectedColor={selectedColor}
          onColorChange={onColorChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ColorPickerModal;
