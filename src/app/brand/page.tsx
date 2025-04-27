"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LoaderCircle,
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
import { BrandTableAction } from "./components/BrandAction";
import { useQuery } from "@tanstack/react-query";
import { Brand } from "../types/types";
import { BrandForm } from "./components/CreateBrandDialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { fecthAllBrands } from "@/lib/api/brand";
// Mock data for demonstration

export default function BrandsPage() {
  // const router = useRouter();
  const pathanme = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [Brands, setBrands] = useState<Brand[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: fecthAllBrands,
  });

  useEffect(() => {
    if (data) {
      setBrands(data);
    }
  }, [data, pathanme]);

  // Filter Brands based on search query
  const filteredBrands = Brands?.filter(
    (product: Brand) =>
      product.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading || !data || data.Brands) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1>Loading Brnads please wait a moment </h1>{" "}
        <LoaderCircle className="w-4 h-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Brands</h1>
        <Dialog>
          <DialogTrigger>
            <Button>Add Brand</Button>
          </DialogTrigger>
          <DialogContent>
            <BrandForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Brands..."
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

      {/* {isFilterOpen && <BrandsTableFilter />} */}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>createdAt</TableHead>
              <TableHead>updatedAt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBrands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No Brands found.
                </TableCell>
              </TableRow>
            ) : (
              filteredBrands.map((brand: Brand) => (
                <TableRow key={brand.id}>
                  <TableCell>{brand.label}</TableCell>
                  <TableCell className="font-medium">{brand.value}</TableCell>
                  <TableCell>{brand.createdAt}</TableCell>
                  <TableCell>{brand.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <BrandTableAction brand={brand} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing <strong>1</strong> to <strong>{Brands.length}</strong> of{" "}
          <strong>{Brands.length}</strong> results
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
