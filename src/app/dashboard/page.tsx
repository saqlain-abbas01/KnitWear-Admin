"use client";
import Link from "next/link";
import { ArrowUpRight, Package, ShoppingCart, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchRecentProducts, fetchProductsCount } from "@/lib/api/products";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Product } from "../types/types";
import { usePathname } from "next/navigation";

export default function Home() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const pathname = usePathname();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchRecentProducts,
  });
  const { data: totalCount } = useQuery({
    queryKey: ["allProductsCount"],
    queryFn: fetchProductsCount,
  });
  console.log(totalCount);
  useEffect(() => {
    if (data) {
      setRecentProducts(data.recentProducts);
    }
  }, [data, pathname]);
  console.log("recent products:", recentProducts);
  return (
    <div className="container mx-auto  py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCount ?? "no products"}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +10% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              +180 new users this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-3 from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>
              Recently added products to your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <Skeleton />
                    <div className="flex-1 space-y-2">
                      <Skeleton />
                      <Skeleton />
                    </div>
                    <Skeleton />
                  </div>
                ))}
              </div>
            ) : recentProducts?.length === 0 ? (
              <p>No recent products to show</p>
            ) : (
              <>
                <div className="space-y-4">
                  {recentProducts?.map((i) => (
                    <div key={i.id} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                        <Package className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          Product {i.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Added on {new Date(i?.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="font-medium">${i.price}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/products" className="flex items-center gap-1">
                      View all products
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Most popular product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Men Underwear", "Women Underwear"].map((category, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">
                        {category}
                      </p>
                      <p className="text-sm font-medium">
                        {Math.floor(Math.random() * 100)}%
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
