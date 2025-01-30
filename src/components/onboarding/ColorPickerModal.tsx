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
}: {
  trigger: string;
  label?: string;
  name: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="text-primary">{trigger}</DialogTrigger>
      <DialogContent className="max-w-[400px] rounded-xl">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
        </DialogHeader>
        <ColorPicker name={name} />
      </DialogContent>
    </Dialog>
  );
};

export default ColorPickerModal;
