"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
// import { toast } from "@/components/ui/use-toast"
import { ImageUpload } from "../../components/image-upload";

// Form schema based on the product schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z
    .number()
    .min(1, "Price must be at least 1")
    .max(10000, "Price must be at most 10000"),
  discountPercentage: z
    .number()
    .min(1, "Discount must be at least 1%")
    .max(99, "Discount must be at most 99%")
    .optional(),
  stock: z.number().min(0, "Stock cannot be negative").default(0),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

// Mock data for demonstration
const products = [
  {
    id: "1",
    title: "Smartphone X",
    description: "Latest smartphone with advanced features",
    price: 999,
    discountPercentage: 10,
    rating: 4.5,
    stock: 50,
    brand: "TechBrand",
    category: "electronics",
    images: ["/placeholder.svg?height=200&width=200"],
    deleted: false,
  },
  {
    id: "2",
    title: "Laptop Pro",
    description: "High-performance laptop for professionals",
    price: 1499,
    discountPercentage: 5,
    rating: 4.8,
    stock: 30,
    brand: "ComputerCo",
    category: "electronics",
    images: ["/placeholder.svg?height=200&width=200"],
    deleted: false,
  },
  {
    id: "3",
    title: "Wireless Headphones",
    description: "Premium noise-cancelling headphones",
    price: 299,
    discountPercentage: 15,
    rating: 4.3,
    stock: 100,
    brand: "AudioTech",
    category: "electronics",
    images: ["/placeholder.svg?height=200&width=200"],
    deleted: false,
  },
];

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Find the product by ID
  const product = products.find((p) => p.id === params.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      stock: 0,
      brand: "",
      category: "",
      images: [],
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        images: product.images,
      });
      setImages(product.images);
      setIsLoading(false);
    } else {
      // Handle product not found
      toast({
        title: "Product not found",
        description: "The requested product could not be found.",
        variant: "destructive",
      });
      router.push("/admin/products");
    }
  }, [product, form, router]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would call an API to update the product
    console.log("Form submitted:", values);
    // toast({
    //   title: "Product updated",
    //   description: `Successfully updated product: ${values.title}`,
    // })
    router.push("/products");
  }

  // Handle image upload
  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
    form.setValue("images", newImages);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 flex justify-center items-center h-96">
        <p>Loading product data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Product</h1>
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="home">Home & Kitchen</SelectItem>
                        <SelectItem value="beauty">Beauty</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                        <SelectItem value="toys">Toys</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
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
                render={({ field }) => (
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
            <Button type="submit">Update Product</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
