"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (url: string) => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      toast.error("No files selected");
      return;
    }

    // Validation constants for e-commerce
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    const validFiles: File[] = [];
    for (const file of Array.from(files)) {
      // Validate image type
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          `"${file.name}" is not a valid image type. Use JPEG, PNG, GIF, or WebP.`
        );
        continue;
      }

      // Validate file size
      if (file.size > maxSize) {
        toast.error(`"${file.name}" exceeds 5MB limit.`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) {
      toast.error("No valid images to upload");
      return;
    }

    const formData = new FormData();
    validFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const { urls } = await response.json();
      onChange([...value, ...urls]);
    } catch (error) {
      console.error("Upload error:", error);
      toast("failed to upload");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mb-4 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative aspect-square rounded-md overflow-hidden border"
          >
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Product image"
              src={url || "/placeholder.svg"}
            />
          </div>
        ))}
      </div>
      <div>
        <label
          htmlFor="imageUpload"
          className="flex flex-col items-center justify-center w-full aspect-square rounded-md border border-dashed cursor-pointer bg-muted/25 hover:bg-muted/50 transition"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Drag and drop images, or click to upload
            </p>
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onUpload}
          />
        </label>
      </div>
    </div>
  );
}
