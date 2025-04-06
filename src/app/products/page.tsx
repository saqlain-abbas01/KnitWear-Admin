"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LoaderCircle,
  PlusCircle,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductsTableActions } from "./components/product-table-actions";
// import { ProductsTableFilter } from "./components/product-table-filters";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/lib/api/products";
import { Product } from "../types/types";

// Mock data for demonstration

export default function ProductsPage() {
  const router = useRouter();
  const pathanme = usePathname();
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });
  console.log("fetched data:", data?.products);
  useEffect(() => {
    if (data.products) {
      setProducts(data.products);
    }
  }, [data, pathanme]);

  // Filter products based on search query
  // const filteredProducts = products?.filter(
  //   (product: Product) =>
  //     !product.deleted &&
  //     (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  // );

  if (isLoading || !data || data.Products) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1>Loading Products please wait a moment </h1>{" "}
        <LoaderCircle className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => router.push("/products/new")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter
        </Button> */}
      </div>

      {/* {isFilterOpen && <ProductsTableFilter />} */}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">Discount</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead className="hidden md:table-cell">Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product: Product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      width={120}
                      height={100}
                      alt={product.title}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.discountPercentage}%
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.stock}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.rating ?? 0}
                  </TableCell>
                  <TableCell className="text-right">
                    <ProductsTableActions product={product} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>{products.length}</strong> of{" "}
          <strong>{products.length}</strong> results
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" disabled>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
