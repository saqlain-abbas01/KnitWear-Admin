"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

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

  // This would be replaced with a real image upload function in a production app
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // In a real app, you would upload the file to a storage service
    // and get back a URL. For this demo, we'll use placeholder images.
    const newImages = Array.from(files).map(
      (_, index) =>
        `/placeholder.svg?height=200&width=200&text=Image ${
          value.length + index + 1
        }`
    );

    onChange([...value, ...newImages]);
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
