"use client";

import { useRef, useState } from "react";
import FormField from "./FormField";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface ImageFile extends File {
  preview: string;
}

// ТРОТИЛ ВЗРЫВООПАСНО
const ImageUploader = ({
  name = "Изображение",
  variant,
}: {
  name?: string;
  variant: "single" | "multiple";
}) => {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ) as ImageFile[];
      if (variant === "multiple") {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      } else {
        setFiles(newFiles);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      const droppedFiles = Array.from(event.dataTransfer.files).map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ) as ImageFile[];
      if (variant === "multiple") {
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      } else {
        setFiles(droppedFiles);
      }
    }
  };

  const removeFile = (fileToRemove: ImageFile) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    URL.revokeObjectURL(fileToRemove.preview);
  };

  return (
    <FormField name={name}>
      <div className="max-w-3xl mx-auto mt-4">
        {files.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-2">
              {files.map((file, index) => (
                <Dialog key={index}>
                  <div className="select-none relative object-cover border rounded min-w-24 h-24 flex items-center justify-center bg-gray-50">
                    <DialogTrigger>
                      <Image
                        src={file.preview}
                        alt={file.name}
                        width={96}
                        height={96}
                        className="rounded w-full h-full aspect-square object-cover select-none"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px]">
                      <DialogTitle></DialogTitle>
                      <div>
                        <Image
                          src={file.preview}
                          alt={file.name}
                          width={96}
                          height={96}
                          className="rounded w-full object-cover select-none"
                        />
                      </div>
                    </DialogContent>

                    <button
                      onClick={() => removeFile(file)}
                      className="absolute top-0 right-0  border border-primary text-white rounded-sm p-1 m-1 bg-white  focus:outline-none"
                    >
                      <X className="h-4 w-4 text-primary" />
                    </button>
                  </div>
                </Dialog>
              ))}
            </div>
          </div>
        )}
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg py-2 text-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-5 w-5 text-gray-400" />
          <p className=" text-xs text-gray-600">
            Сбросьте изображения сюда, или нажмите, чтобы выбрать файлы
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            multiple={variant === "multiple"}
            name={name + "_files"}
            id={name + "_files"}
          />
        </div>
      </div>
    </FormField>
  );
};

export default ImageUploader;
