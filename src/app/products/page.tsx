"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  PlusCircle,
  Search,
  SlidersHorizontal,
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
import { ProductsTableFilter } from "./components/product-table-filters";

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
    category: "Electronics",
    images: ["/placeholder.svg?height=80&width=80"],
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
    category: "Electronics",
    images: ["/placeholder.svg?height=80&width=80"],
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
    category: "Audio",
    images: ["/placeholder.svg?height=80&width=80"],
    deleted: false,
  },
];

export default function ProductsPage() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      !product.deleted &&
      (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {isFilterOpen && <ProductsTableFilter />}

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
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.images[0] || "/placeholder.svg"}
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
                    {product.rating.toFixed(1)}
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
          Showing <strong>1</strong> to{" "}
          <strong>{filteredProducts.length}</strong> of{" "}
          <strong>{filteredProducts.length}</strong> results
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
