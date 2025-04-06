"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ImageUpload } from "../components/image-upload";
import {
  createProduct,
  updateProduct,
  fetchProductsById,
} from "@/lib/api/products";
import { formSchema } from "@/app/schema/createProductFormSchema";
import { LoaderCircle } from "lucide-react";

// Union type for form values
type FormValues = z.infer<typeof formSchema>;

export default function AddEditProduct() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [images, setImages] = useState<string[]>([]);
  const isEditMode = pathname.startsWith("/products/edit/");
  const productId = isEditMode ? (params.id as string) : null;

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductsById(productId!),
    enabled: !!productId,
    refetchOnWindowFocus: false,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      discountPercentage: undefined,
      stock: undefined,
      brand: "",
      category: "",
      images: [],
    },
  });

  useEffect(() => {
    if (isEditMode && product) {
      form.reset({
        title: product.title || "",
        description: product.description || "",
        price: product.price || undefined,
        discountPercentage: product.discountPercentage || undefined,
        stock: product.stock || undefined,
        brand: product.brand || "",
        category: product.category || "",
        images: product.images || [],
      });
      setImages(product.images || []);
    }
  }, [product, isEditMode, form]);

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      form.reset();
      toast("Product created successfully");
    },
    onError: () => {
      toast("Failed to create product");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast("Product updated successfully");
    },
    onError: () => {
      console.error("Error updating product:");
      toast("Failed to update product");
    },
  });

  function onSubmit(values: FormValues) {
    if (pathname === "/products/new") {
      createMutation.mutate(values as z.infer<typeof formSchema>);
    } else if (isEditMode && productId) {
      updateMutation.mutate({ id: productId, data: values });
    }
  }

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
    form.setValue("images", newImages);
  };

  if (isEditMode && isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1>Loading product data...</h1>
        <LoaderCircle className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  if (isEditMode && !product) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Selected Product has no data!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h1>
        <Button
          variant="outline"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Product title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Product description"
                        className="min-h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value) || undefined)
                          }
                        />
                      </FormControl>
                      <FormDescription>Min: $1, Max: $10,000</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value) || undefined)
                          }
                        />
                      </FormControl>
                      <FormDescription>Min: 1%, Max: 99%</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value) || undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input placeholder="Brand name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Men underwear">
                          Men Underwear
                        </SelectItem>
                        <SelectItem value="Women underwear">
                          Women Underwear
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="images"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Product Images</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={images}
                        onChange={handleImagesChange}
                        onRemove={(url) => {
                          const newImages = images.filter(
                            (image) => image !== url
                          );
                          handleImagesChange(newImages);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload at least one product image
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {isEditMode
                ? updateMutation.isPending
                  ? "Updating..."
                  : "Update Product"
                : createMutation.isPending
                ? "Creating..."
                : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
