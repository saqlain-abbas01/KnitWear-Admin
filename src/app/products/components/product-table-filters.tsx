"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ProductsTableFilter() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Select>
              <SelectTrigger id="brand">
                <SelectValue placeholder="All brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All brands</SelectItem>
                <SelectItem value="techbrand">TechBrand</SelectItem>
                <SelectItem value="computerco">ComputerCo</SelectItem>
                <SelectItem value="audiotech">AudioTech</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger id="category">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="min-price">Min Price</Label>
            <Input id="min-price" type="number" placeholder="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-price">Max Price</Label>
            <Input id="max-price" type="number" placeholder="10000" />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" size="sm" className="text-xs">
            <X className="mr-1 h-3 w-3" />
            Reset Filters
          </Button>
          <Button size="sm" className="text-xs">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
