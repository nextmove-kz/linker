import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";

const ImageDialog = ({
  name,
  title,
  img,
  id,
}: {
  name: string;
  title: string;
  img: string[];
  id: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="mt-2 text-purple-600">{name}</DialogTrigger>
      <DialogContent className="max-w-[390px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="grid grid-cols-2  gap-2">
            {img &&
              img.map((image, index) => (
                <Image
                  src={`http://localhost:8090/api/files/pbc_3816125536/${id}/${image}`}
                  alt={`Image ${index + 1}`}
                  width={200}
                  height={200}
                  key={index}
                />
              ))}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
