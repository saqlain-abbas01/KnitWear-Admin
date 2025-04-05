"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  MoreHorizontal,
  Search,
  Trash2,
  Edit,
  Eye,
  RefreshCw,
  UserCog,
  Shield,
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
// import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock data for demonstration
const mockUsers = [
  {
    _id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA",
    },
    orders: [
      { id: "ord123", totalAmount: 109.97, status: "DELIVERED" },
      { id: "ord456", totalAmount: 59.99, status: "SHIPPED" },
    ],
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    _id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    address: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90001",
      country: "USA",
    },
    orders: [{ id: "ord789", totalAmount: 19.99, status: "DELIVERED" }],
    createdAt: "2023-02-20T14:20:00Z",
  },
  {
    _id: "user3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "user",
    address: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zipCode: "60007",
      country: "USA",
    },
    orders: [
      { id: "ord101", totalAmount: 169.95, status: "PENDING" },
      { id: "ord102", totalAmount: 49.99, status: "SHIPPED" },
      { id: "ord103", totalAmount: 29.99, status: "DELIVERED" },
    ],
    createdAt: "2023-03-10T09:15:00Z",
  },
  {
    _id: "user4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "user",
    address: null,
    orders: [],
    createdAt: "2023-04-05T16:45:00Z",
  },
  {
    _id: "user5",
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "moderator",
    address: {
      street: "202 Elm St",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA",
    },
    orders: [{ id: "ord104", totalAmount: 94.95, status: "DELIVERED" }],
    createdAt: "2023-05-18T11:30:00Z",
  },
];

// Role badge colors
const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-red-100 text-red-800 border-red-200";
    case "moderator":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "user":
    default:
      return "bg-green-100 text-green-800 border-green-200";
  }
};

// Get initials from name
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  //   const { toast } = useToast();
  const router = useRouter();

  // Filter users based on search term and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Handle user deletion
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user._id !== userId));
    setIsDeleteDialogOpen(false);

    // toast({
    //   title: "User Deleted",
    //   description: `User has been deleted successfully`,
    //   variant: "destructive",
    // });
  };

  // Handle role change
  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      )
    );

    // toast({
    //   title: "Role Updated",
    //   description: `User role changed to ${newRole}`,
    // });
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Users Management</CardTitle>
            <CardDescription>
              View and manage users on your platform
            </CardDescription>
          </div>
          <Button onClick={() => router.refresh()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name or email..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Role
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Joined
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{user.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Select
                          defaultValue={user.role}
                          onValueChange={(value) =>
                            handleRoleChange(user._id, value)
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue>
                              <Badge
                                variant="outline"
                                className={getRoleBadgeColor(user.role)}
                              >
                                {user.role.charAt(0).toUpperCase() +
                                  user.role.slice(1)}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="moderator">Moderator</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>{user.orders.length}</TableCell>
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
                                setSelectedUser(user);
                                setIsDetailsOpen(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(`/admin/users/edit/${user._id}`)
                              }
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => {
                                setUserToDelete(user._id);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
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

      {/* User Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Complete information about this user
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="grid gap-6 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {getInitials(selectedUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.email}</p>
                  <div className="mt-1">
                    <Badge
                      variant="outline"
                      className={getRoleBadgeColor(selectedUser.role)}
                    >
                      {selectedUser.role.charAt(0).toUpperCase() +
                        selectedUser.role.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div className="ml-auto flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  {selectedUser.role !== "admin" && (
                    <Button variant="outline" size="sm">
                      <UserCog className="mr-2 h-4 w-4" />
                      Make Admin
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    Account Information
                  </h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">User ID</div>
                      <div className="col-span-2">{selectedUser._id}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Joined</div>
                      <div className="col-span-2">
                        {formatDate(selectedUser.createdAt)}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Total Orders</div>
                      <div className="col-span-2">
                        {selectedUser.orders.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  {selectedUser.address ? (
                    <div className="space-y-1">
                      <p>{selectedUser.address.street}</p>
                      <p>
                        {selectedUser.address.city},{" "}
                        {selectedUser.address.state}{" "}
                        {selectedUser.address.zipCode}
                      </p>
                      <p>{selectedUser.address.country}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      No address information available
                    </p>
                  )}
                </div>
              </div>

              {selectedUser.orders.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedUser.orders.map((order: any) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>
                              ${order.totalAmount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  order.status === "DELIVERED"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "SHIPPED"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
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
              user account and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => userToDelete && handleDeleteUser(userToDelete)}
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
