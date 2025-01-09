"use client";
// "use using"
import { useRef, useState } from "react";
import FormField from "./FormField";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import { uploadImages } from "@/lib/uploadImages";
interface ImageFile extends File {
  preview: string;
}

const ImageUploader = ({ name = "Изображение" }: { name?: string }) => {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedImagePaths, setUploadedImagePaths] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ) as ImageFile[];
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
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
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    }
  };

  const removeFile = (fileToRemove: ImageFile) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    URL.revokeObjectURL(fileToRemove.preview);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const result = await uploadImages(formData);
      if (result.success) {
        setUploadedImagePaths(result.paths);
        setFiles([]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField name={name}>
      <div className="max-w-3xl mx-auto mt-4">
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Сбросьте изображения сюда, или нажмите, чтобы выбрать файлы
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            multiple
          />
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {files.map((file, index) => (
                <div key={index} className="relative w-fit">
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <button
                    onClick={() => removeFile(file)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1 hover:bg-red-600 focus:outline-none"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            {/* <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            >
              {uploading
                ? "Uploading..."
                : `Upload ${files.length} image${files.length > 1 ? "s" : ""}`}
            </button> */}
          </div>
        )}
        {uploadedImagePaths.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Uploaded Images:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedImagePaths.map((path, index) => (
                <div key={index}>
                  <Image
                    src={path}
                    alt={`Uploaded ${index + 1}`}
                    width={150}
                    height={150}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </FormField>
  );
};

export default ImageUploader;
