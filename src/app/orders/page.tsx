"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpDown,
  MoreHorizontal,
  Search,
  Trash2,
  Eye,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { fetchAllOrders } from "@/lib/api/orders";
import { Order } from "../types/types";
// import { useToast } from "@/hooks/use-toast"

// Mock data for demonstration
const mockOrders = [
  {
    _id: "ord123",
    items: [
      { name: "Product 1", price: 29.99, quantity: 2 },
      { name: "Product 2", price: 49.99, quantity: 1 },
    ],
    totalAmount: 109.97,
    totalItems: 3,
    user: { _id: "user1", name: "John Doe", email: "john@example.com" },
    paymentMethod: "CREDIT_CARD",
    status: "PENDING",
    selectedAddress: [
      {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      },
    ],
    createdAt: "2023-10-15T10:30:00Z",
  },
  {
    _id: "ord124",
    items: [{ name: "Product 3", price: 19.99, quantity: 1 }],
    totalAmount: 19.99,
    totalItems: 1,
    user: { _id: "user2", name: "Jane Smith", email: "jane@example.com" },
    paymentMethod: "PAYPAL",
    status: "DELIVERED",
    selectedAddress: [
      {
        street: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        country: "USA",
      },
    ],
    createdAt: "2023-10-14T14:20:00Z",
  },
  {
    _id: "ord125",
    items: [
      { name: "Product 4", price: 39.99, quantity: 3 },
      { name: "Product 5", price: 24.99, quantity: 2 },
    ],
    totalAmount: 169.95,
    totalItems: 5,
    user: { _id: "user3", name: "Robert Johnson", email: "robert@example.com" },
    paymentMethod: "CREDIT_CARD",
    status: "SHIPPED",
    selectedAddress: [
      {
        street: "789 Pine St",
        city: "Chicago",
        state: "IL",
        zipCode: "60007",
        country: "USA",
      },
    ],
    createdAt: "2023-10-13T09:15:00Z",
  },
  {
    _id: "ord126",
    items: [{ name: "Product 6", price: 59.99, quantity: 1 }],
    totalAmount: 59.99,
    totalItems: 1,
    user: { _id: "user4", name: "Emily Davis", email: "emily@example.com" },
    paymentMethod: "CASH_ON_DELIVERY",
    status: "PENDING",
    selectedAddress: [
      {
        street: "101 Maple Rd",
        city: "Houston",
        state: "TX",
        zipCode: "77001",
        country: "USA",
      },
    ],
    createdAt: "2023-10-12T16:45:00Z",
  },
  {
    _id: "ord127",
    items: [
      { name: "Product 7", price: 14.99, quantity: 4 },
      { name: "Product 8", price: 34.99, quantity: 1 },
    ],
    totalAmount: 94.95,
    totalItems: 5,
    user: {
      _id: "user5",
      name: "Michael Wilson",
      email: "michael@example.com",
    },
    paymentMethod: "PAYPAL",
    status: "CANCELLED",
    selectedAddress: [
      {
        street: "202 Elm St",
        city: "Miami",
        state: "FL",
        zipCode: "33101",
        country: "USA",
      },
    ],
    createdAt: "2023-10-11T11:30:00Z",
  },
];

// Status badge colors
const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-500";
    case "SHIPPED":
      return "bg-blue-500";
    case "DELIVERED":
      return "bg-green-500";
    case "CANCELLED":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  //   const { toast } = useToast()
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchAllOrders,
  });

  useEffect(() => {
    if (data) {
      setOrders(data.order);
    }
  }, [data]);
  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    // toast({
    //   title: "Status Updated",
    //   description: `Order ${orderId} status changed to ${newStatus}`,
    // })
  };

  // Handle order deletion
  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter((order) => order._id !== orderId));
    setIsDeleteDialogOpen(false);

    // toast({
    //   title: "Order Deleted",
    //   description: `Order ${orderId} has been deleted`,
    //   variant: "destructive",
    // })
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  console.log("order:", orders);
  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Orders Management</CardTitle>
            <CardDescription>
              Manage customer orders, update status, and process orders
            </CardDescription>
          </div>
          <Button onClick={() => router.refresh()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by order ID, customer name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Total
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.user.email}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
                      <TableCell>{order.totalItems}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        {order.paymentMethod.replace(/_/g, " ")}
                      </TableCell>
                      <TableCell>
                        <Select
                          defaultValue={order.status}
                          onValueChange={(value) =>
                            handleStatusChange(order._id, value)
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue>
                              <Badge
                                className={`${getStatusColor(
                                  order.status
                                )} text-white`}
                              >
                                {order.status}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">PENDING</SelectItem>
                            <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                            <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrder(order);
                                setIsDetailsOpen(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setOrderToDelete(order._id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?._id}</DialogTitle>
            <DialogDescription>
              Complete information about this order
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Customer Information
                  </h3>
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {selectedOrder.user.name}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedOrder.user.email}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Shipping Address
                  </h3>
                  <p>{selectedOrder.selectedAddress[0].street}</p>
                  <p>
                    {selectedOrder.selectedAddress[0].city},{" "}
                    {selectedOrder.selectedAddress[0].state}{" "}
                    {selectedOrder.selectedAddress[0].zipCode}
                  </p>
                  <p>{selectedOrder.selectedAddress[0].country}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-right font-medium"
                        >
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          ${selectedOrder.totalAmount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-1">Payment Method</h3>
                  <p>{selectedOrder.paymentMethod.replace(/_/g, " ")}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Order Date</h3>
                  <p>{formatDate(selectedOrder.createdAt)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1">Status</h3>
                  <Select
                    defaultValue={selectedOrder.status}
                    onValueChange={(value) =>
                      handleStatusChange(selectedOrder._id, value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue>
                        <Badge
                          className={`${getStatusColor(
                            selectedOrder.status
                          )} text-white`}
                        >
                          {selectedOrder.status}
                        </Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                      <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                      <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              order and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => orderToDelete && handleDeleteOrder(orderToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
