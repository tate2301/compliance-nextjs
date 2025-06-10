"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Home,
  LayoutGrid,
  LogOut,
  Menu,
  MessageSquare,
  PieChart,
  Plus,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";

interface ExampleCardProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
}

function ExampleCard({
  title,
  children,
  description,
  className = "",
}: ExampleCardProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-sand-12">{title}</h3>
        {description && <p className="text-sm text-sand-11">{description}</p>}
      </div>
      <div
        className={`border border-sand-6 rounded-lg bg-sand-2 overflow-hidden ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default function LayoutExamples() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-sand-12">
          Page Layouts
        </h2>
        <p className="text-sand-11">
          Examples of common admin dashboard page layouts and UI patterns.
        </p>
      </div>

      {/* Dashboard Header */}
      <ExampleCard
        title="Dashboard Header"
        description="Standard admin dashboard header with navigation and user controls"
      >
        <div className="p-4 border-b border-sand-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md bg-primary-9 flex items-center justify-center">
                  <LayoutGrid className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-sand-12">Mercury</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                <a
                  href="#"
                  className="text-sm font-medium text-primary-11 hover:text-primary-12 transition-all duration-300"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-sand-11 hover:text-sand-12 transition-all duration-300"
                >
                  Users
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-sand-11 hover:text-sand-12 transition-all duration-300"
                >
                  Reports
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-sand-11 hover:text-sand-12 transition-all duration-300"
                >
                  Settings
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-sand-11 hover:text-sand-12 cursor-pointer transition-all duration-300" />
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-9 border-2 border-sand-2 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">3</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-primary-3 text-primary-11">
                        SC
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="h-4 w-4 text-sand-11" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="border-sand-6 bg-sand-2"
                >
                  <DropdownMenuLabel className="text-sand-12">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-sand-6" />
                  <DropdownMenuItem className="text-sand-11 focus:text-sand-12 focus:bg-sand-3 cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sand-11 focus:text-sand-12 focus:bg-sand-3 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-sand-6" />
                  <DropdownMenuItem className="text-red-11 focus:text-red-11 focus:bg-red-3 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="icon"
                className="block md:hidden transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </ExampleCard>

      {/* Dashboard Grid Layout */}
      <ExampleCard
        title="Dashboard Grid Layout"
        description="Grid-based layout for dashboard statistics and data cards"
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-sand-12">
              Dashboard Overview
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="transition-all duration-300"
              >
                <PieChart className="mr-2 h-4 w-4" /> Reports
              </Button>
              <Button
                size="sm"
                className="text-white transition-all duration-300"
              >
                <Plus className="mr-2 h-4 w-4" /> New View
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 border-sand-6 bg-sand-1 transition-all duration-300 hover:border-primary-7 hover:shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-sand-11">
                    Total Users
                  </p>
                  <Users className="h-4 w-4 text-primary-9" />
                </div>
                <p className="text-2xl font-bold text-sand-12">8,249</p>
                <div className="flex items-center gap-1">
                  <Badge className="bg-green-9 hover:bg-green-10 text-sand-1">
                    +12.5%
                  </Badge>
                  <span className="text-xs text-sand-11">from last month</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-sand-6 bg-sand-1 transition-all duration-300 hover:border-primary-7 hover:shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-sand-11">Revenue</p>
                  <CreditCard className="h-4 w-4 text-indigo-9" />
                </div>
                <p className="text-2xl font-bold text-sand-12">$24,780</p>
                <div className="flex items-center gap-1">
                  <Badge className="bg-green-9 hover:bg-green-10 text-sand-1">
                    +18.2%
                  </Badge>
                  <span className="text-xs text-sand-11">from last month</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-sand-6 bg-sand-1 transition-all duration-300 hover:border-primary-7 hover:shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-sand-11">
                    Active Projects
                  </p>
                  <LayoutGrid className="h-4 w-4 text-blue-9" />
                </div>
                <p className="text-2xl font-bold text-sand-12">136</p>
                <div className="flex items-center gap-1">
                  <Badge className="bg-amber-9 hover:bg-amber-10 text-sand-1">
                    +3.1%
                  </Badge>
                  <span className="text-xs text-sand-11">from last month</span>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-sand-6 bg-sand-1 transition-all duration-300 hover:border-primary-7 hover:shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-sand-11">
                    Support Tickets
                  </p>
                  <MessageSquare className="h-4 w-4 text-red-9" />
                </div>
                <p className="text-2xl font-bold text-sand-12">42</p>
                <div className="flex items-center gap-1">
                  <Badge className="bg-red-9 hover:bg-red-10">-8.4%</Badge>
                  <span className="text-xs text-sand-11">from last month</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="col-span-1 lg:col-span-2 border-sand-6 bg-sand-1 transition-all duration-300 hover:border-primary-7 hover:shadow-sm">
              <div className="p-4 border-b border-sand-6">
                <h3 className="font-medium text-sand-12">Recent Activity</h3>
              </div>
              <div className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-sand-3">
                      <TableHead className="text-sand-11">User</TableHead>
                      <TableHead className="text-sand-11">Action</TableHead>
                      <TableHead className="text-sand-11">Date</TableHead>
                      <TableHead className="text-sand-11 text-right">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-sand-3">
                      <TableCell className="font-medium text-sand-12">
                        Sophia Chen
                      </TableCell>
                      <TableCell>Created project</TableCell>
                      <TableCell>10 min ago</TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-green-9 hover:bg-green-10 text-sand-1">
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-sand-3">
                      <TableCell className="font-medium text-sand-12">
                        Alex Johnson
                      </TableCell>
                      <TableCell>Updated document</TableCell>
                      <TableCell>2 hours ago</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="border-green-7 text-green-11"
                        >
                          Approved
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-sand-3">
                      <TableCell className="font-medium text-sand-12">
                        Sam Wilson
                      </TableCell>
                      <TableCell>Submitted report</TableCell>
                      <TableCell>Yesterday</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="border-amber-7 text-amber-11"
                        >
                          Pending
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-sand-3">
                      <TableCell className="font-medium text-sand-12">
                        Maria Garcia
                      </TableCell>
                      <TableCell>Deleted task</TableCell>
                      <TableCell>2 days ago</TableCell>
                      <TableCell className="text-right">
                        <Badge className="bg-red-9 hover:bg-red-10">
                          Rejected
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>

            <Card className="border-sand-6 bg-sand-1 transition-all duration-300 hover:border-primary-7 hover:shadow-sm">
              <div className="p-4 border-b border-sand-6">
                <h3 className="font-medium text-sand-12">Project Status</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-sand-12">
                      Website Redesign
                    </span>
                    <span className="text-sand-11">75%</span>
                  </div>
                  <Progress
                    value={75}
                    className="h-2 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-sand-12">
                      Mobile App
                    </span>
                    <span className="text-sand-11">48%</span>
                  </div>
                  <Progress
                    value={48}
                    className="h-2 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-sand-12">
                      API Integration
                    </span>
                    <span className="text-sand-11">92%</span>
                  </div>
                  <Progress
                    value={92}
                    className="h-2 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-sand-12">
                      Documentation
                    </span>
                    <span className="text-sand-11">34%</span>
                  </div>
                  <Progress
                    value={34}
                    className="h-2 transition-all duration-300"
                  />
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-2 transition-all duration-300"
                >
                  View All Projects
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </ExampleCard>

      {/* Sidebar Layout */}
      <ExampleCard
        title="Sidebar Navigation Layout"
        description="Common admin dashboard layout with sidebar navigation"
      >
        <div className="flex h-[500px]">
          <div className="w-64 border-r border-sand-6 bg-sand-2 p-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-md bg-primary-9 flex items-center justify-center">
                <LayoutGrid className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-sand-12">Mercury</span>
            </div>

            <div className="space-y-1 mb-6">
              <Input
                placeholder="Search..."
                className="h-9 transition-all duration-300"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary-4 text-primary-11">
                <Home className="h-5 w-5" />
                <span className="text-sm font-medium">Dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sand-11 hover:bg-sand-3 hover:text-sand-12 transition-all duration-300 cursor-pointer">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">Users</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sand-11 hover:bg-sand-3 hover:text-sand-12 transition-all duration-300 cursor-pointer">
                <LayoutGrid className="h-5 w-5" />
                <span className="text-sm font-medium">Projects</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sand-11 hover:bg-sand-3 hover:text-sand-12 transition-all duration-300 cursor-pointer">
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm font-medium">Messages</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sand-11 hover:bg-sand-3 hover:text-sand-12 transition-all duration-300 cursor-pointer">
                <PieChart className="h-5 w-5" />
                <span className="text-sm font-medium">Analytics</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md text-sand-11 hover:bg-sand-3 hover:text-sand-12 transition-all duration-300 cursor-pointer">
                <Settings className="h-5 w-5" />
                <span className="text-sm font-medium">Settings</span>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md text-red-11 hover:bg-red-3 transition-all duration-300 cursor-pointer">
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Log out</span>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-sand-1 p-6">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-sand-12">Dashboard</h2>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-sand-3 text-sand-11">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-sand-1 data-[state=active]:text-sand-12"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="data-[state=active]:bg-sand-1 data-[state=active]:text-sand-12"
                  >
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger
                    value="reports"
                    className="data-[state=active]:bg-sand-1 data-[state=active]:text-sand-12"
                  >
                    Reports
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="data-[state=active]:bg-sand-1 data-[state=active]:text-sand-12"
                  >
                    Notifications
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card className="border-sand-6 mt-6">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-sand-12 mb-4">
                        Welcome back, Admin
                      </h3>
                      <p className="text-sand-11">
                        This is your dashboard overview. Here you can see a
                        summary of your most important data.
                      </p>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </ExampleCard>

      {/* Content Layout */}
      <ExampleCard
        title="Content Page Layout"
        description="Layout for content-focused admin pages"
      >
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-sand-12">
                User Management
              </h2>
              <p className="text-sm text-sand-11">
                Manage and organize your system users.
              </p>
            </div>
            <Button className="text-white transition-all duration-300">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -transand-y-1/2 h-4 w-4 text-sand-11" />
              <Input
                placeholder="Search users..."
                className="pl-9 transition-all duration-300"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="transition-all duration-300"
                ></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-sand-6 bg-sand-2"
              >
                <DropdownMenuLabel className="text-sand-12">
                  Filter Users
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-sand-6" />
                <DropdownMenuItem className="text-sand-11 focus:text-sand-12 focus:bg-sand-3 cursor-pointer">
                  All Users
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sand-11 focus:text-sand-12 focus:bg-sand-3 cursor-pointer">
                  Administrators
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sand-11 focus:text-sand-12 focus:bg-sand-3 cursor-pointer">
                  Active Users
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sand-11 focus:text-sand-12 focus:bg-sand-3 cursor-pointer">
                  Inactive Users
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Card className="border-sand-6 bg-sand-1 transition-all duration-300">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-sand-3">
                  <TableHead className="w-[60px]"></TableHead>
                  <TableHead className="text-sand-11">Name</TableHead>
                  <TableHead className="text-sand-11">Email</TableHead>
                  <TableHead className="text-sand-11">Role</TableHead>
                  <TableHead className="text-sand-11">Status</TableHead>
                  <TableHead className="text-sand-11 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i} className="hover:bg-sand-3">
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary-3 text-primary-11">
                          {`U${i}`}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium text-sand-12">
                      User {i}
                    </TableCell>
                    <TableCell>user{i}@example.com</TableCell>
                    <TableCell>{i % 3 === 0 ? "Admin" : "User"}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          i % 4 === 0
                            ? "bg-amber-9 hover:bg-amber-10 text-sand-1"
                            : "bg-green-9 hover:bg-green-10 text-sand-1"
                        }
                      >
                        {i % 4 === 0 ? "Pending" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          ></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="border-sand-6 bg-sand-2"
                        >
                          <DropdownMenuItem className="text-sand-11 focus:text-sand-12 focus:bg-sand-3 cursor-pointer">
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-sand-11 focus:text-sand-12 focus:bg-sand-3 cursor-pointer">
                            View
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-sand-6" />
                          <DropdownMenuItem className="text-red-11 focus:text-red-11 focus:bg-red-3 cursor-pointer">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="flex items-center justify-between">
            <div className="text-sm text-sand-11">
              Showing <span className="font-medium text-sand-12">1</span> to{" "}
              <span className="font-medium text-sand-12">5</span> of{" "}
              <span className="font-medium text-sand-12">42</span> users
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="transition-all duration-300"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="transition-all duration-300"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </ExampleCard>
    </div>
  );
}
