"use client";

import { useState, useEffect } from 'react';
import { Search, Plus, RefreshCw, Calendar, Bell, User, Menu, HelpCircle, Edit, Link, ChevronLeft, ChevronRight, Filter, Download, Upload, Settings, MoreVertical, Eye, Trash2, Star, TrendingUp, Users, Activity, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

interface Agent {
  id: number;
  name: string;
  mobile: string;
  email: string;
  personalEmail: string;
  bitrixId: string;
  wappLicenseId: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  performance: number;
  lastActive: string;
  totalTickets: number;
  resolvedTickets: number;
}

const mockAgents: Agent[] = [
  {
    id: 1,
    name: 'Levishka',
    mobile: '+91 7017799424',
    email: 'Levishka@bambinos.live',
    personalEmail: 'levish29katiyar@gmail.com',
    bitrixId: '1',
    wappLicenseId: '',
    status: 'Active',
    performance: 95,
    lastActive: '2 mins ago',
    totalTickets: 245,
    resolvedTickets: 232
  },
  {
    id: 2,
    name: 'Pooja Sethi',
    mobile: '+91 8637845121',
    email: 'PoojaSethi@bambinos.live',
    personalEmail: 'poojasethi11122000@gmail.com',
    bitrixId: '1',
    wappLicenseId: '',
    status: 'Active',
    performance: 88,
    lastActive: '5 mins ago',
    totalTickets: 189,
    resolvedTickets: 166
  },
  {
    id: 3,
    name: 'Ullas S',
    mobile: '+91 9663890904',
    email: 'ullas.s.1729@gmail.com',
    personalEmail: 'ullas.s.1729@gmail.com',
    bitrixId: '',
    wappLicenseId: '',
    status: 'Active',
    performance: 92,
    lastActive: '1 min ago',
    totalTickets: 312,
    resolvedTickets: 287
  },
  {
    id: 4,
    name: 'Siddhartha Prabhakar',
    mobile: '+91 8792801507',
    email: 'siddhartha.p@bambinos.live',
    personalEmail: 'siddharthprabhakar943@gmail.com',
    bitrixId: '112258',
    wappLicenseId: '',
    status: 'Active',
    performance: 85,
    lastActive: '10 mins ago',
    totalTickets: 156,
    resolvedTickets: 133
  },
  {
    id: 5,
    name: 'Urvi Sharma',
    mobile: '+91 62612 66279',
    email: 'urvi@bambinos.live',
    personalEmail: 'urvi82876@gmail.com',
    bitrixId: '112260',
    wappLicenseId: '',
    status: 'Active',
    performance: 90,
    lastActive: '3 mins ago',
    totalTickets: 203,
    resolvedTickets: 183
  }
];

const stats = [
  { title: 'Total Agents', value: '5', change: '+2', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { title: 'Active Now', value: '5', change: '100%', icon: Activity, color: 'from-green-500 to-emerald-500' },
  { title: 'Avg Performance', value: '90%', change: '+5%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
  { title: 'Total Tickets', value: '1,105', change: '+12%', icon: Zap, color: 'from-orange-500 to-red-500' },
];

export default function Home() {
  const [searchName, setSearchName] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [bitrixId, setBitrixId] = useState('');
  const [wappLicenseId, setWappLicenseId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedAgents, setSelectedAgents] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleReset = () => {
    setSearchName('');
    setStatusFilter('All');
    setBitrixId('');
    setWappLicenseId('');
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600 bg-green-50';
    if (performance >= 80) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Premium Header with Glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo Section */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">bambinos</span>
                  <p className="text-xs text-gray-500 font-medium">Customer Support Portal</p>
                </div>
              </div>
              
              {/* Premium Menu Button */}
              <Button 
                variant="outline" 
                size="sm"
                className="group border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 backdrop-blur-sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
                Menu
              </Button>
            </div>

            {/* Enhanced User Section */}
            <div className="flex items-center space-x-4">
              {/* Quick Actions */}
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-all duration-300">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-all duration-300">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-all duration-300">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              {/* Premium Profile Button */}
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300">
                <User className="h-4 w-4 mr-2" />
                My Profile
              </Button>
              
              {/* Enhanced Notification */}
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative hover:bg-blue-50 transition-all duration-300">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs text-white flex items-center justify-center animate-bounce">
                    3
                  </span>
                </Button>
              </div>

              {/* Premium User Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 hover:bg-blue-50 transition-all duration-300 p-2">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-semibold text-gray-900">Ullas S</p>
                      <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <Avatar className="h-10 w-10 ring-2 ring-blue-200 hover:ring-blue-400 transition-all duration-300">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">US</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 backdrop-blur-xl bg-white/95 border border-white/20">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuItem>Security</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-white/20 backdrop-blur-xl bg-white/90">
            <div className="px-4 py-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start hover:bg-blue-50 transition-all duration-300">
                <Shield className="h-4 w-4 mr-3" />
                Customer Support
              </Button>
              <Button variant="ghost" className="w-full justify-start hover:bg-blue-50 transition-all duration-300">
                <Calendar className="h-4 w-4 mr-3" />
                Bookings List
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Premium Navigation Tabs */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <Button variant="ghost" className="text-white hover:bg-white/20 py-6 px-0 rounded-none border-b-2 border-white font-semibold whitespace-nowrap backdrop-blur-sm transition-all duration-300">
              <Shield className="h-4 w-4 mr-2" />
              Customer Support
            </Button>
            <Button variant="ghost" className="text-blue-200 hover:bg-white/10 hover:text-white py-6 px-0 rounded-none border-b-2 border-transparent whitespace-nowrap transition-all duration-300">
              <Calendar className="h-4 w-4 mr-2" />
              Bookings List
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Premium Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="group relative overflow-hidden backdrop-blur-xl bg-white/70 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-semibold flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">CSR Agents</h1>
            <p className="text-gray-600 text-lg">Manage your customer support representatives</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
              <RefreshCw className="h-4 w-4 mr-2" />
              Update CSR
            </Button>
            <Button variant="outline" className="border-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 backdrop-blur-sm transition-all duration-300">
              <Calendar className="h-4 w-4 mr-2" />
              CSR Holiday
            </Button>
          </div>
        </div>

        {/* Premium Search Filters */}
        <Card className="mb-8 backdrop-blur-xl bg-white/80 border border-white/20 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                Advanced Filters
              </CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">View:</span>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="transition-all duration-300"
                >
                  Table
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="transition-all duration-300"
                >
                  Grid
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Search className="h-4 w-4 mr-2 text-blue-600" />
                  Agent Name
                </label>
                <Input
                  placeholder="Search agent name..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="backdrop-blur-sm bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-green-600" />
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="backdrop-blur-sm bg-white/50 border-gray-200 focus:border-blue-400 transition-all duration-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-xl bg-white/95">
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-orange-600" />
                  Bitrix ID
                </label>
                <Input
                  placeholder="Enter Bitrix ID"
                  value={bitrixId}
                  onChange={(e) => setBitrixId(e.target.value)}
                  className="backdrop-blur-sm bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-purple-600" />
                  Wapp License ID
                </label>
                <Input
                  placeholder="Enter Wapp License ID"
                  value={wappLicenseId}
                  onChange={(e) => setWappLicenseId(e.target.value)}
                  className="backdrop-blur-sm bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400 transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Search
              </Button>
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="border-2 border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" className="border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all duration-300">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Premium Data Table */}
        <Card className="backdrop-blur-xl bg-white/80 border border-white/20 shadow-2xl">
          <CardContent className="p-0">
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                  <span className="text-blue-600 font-medium">Loading...</span>
                </div>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300">
                    <TableHead className="text-white font-bold py-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Agent</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-white font-bold">Mobile</TableHead>
                    <TableHead className="text-white font-bold">Email</TableHead>
                    <TableHead className="text-white font-bold">Personal Email</TableHead>
                    <TableHead className="text-white font-bold">Performance</TableHead>
                    <TableHead className="text-white font-bold">Bitrix ID</TableHead>
                    <TableHead className="text-white font-bold">Wapp License</TableHead>
                    <TableHead className="text-white font-bold">Status</TableHead>
                    <TableHead className="text-white font-bold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAgents.map((agent, index) => (
                    <TableRow 
                      key={agent.id} 
                      className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-b border-gray-100"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <Avatar className="h-12 w-12 ring-2 ring-blue-200 group-hover:ring-blue-400 transition-all duration-300">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                                {getInitials(agent.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{agent.name}</p>
                            <p className="text-sm text-gray-500">{agent.lastActive}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700 font-medium">{agent.mobile}</TableCell>
                      <TableCell className="text-gray-700">{agent.email}</TableCell>
                      <TableCell className="text-gray-700">{agent.personalEmail}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${agent.performance}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-semibold px-2 py-1 rounded-full ${getPerformanceColor(agent.performance)}`}>
                            {agent.performance}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {agent.bitrixId || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-mono">
                          {agent.wappLicenseId || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25">
                          <Activity className="h-3 w-3 mr-1" />
                          {agent.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transform hover:scale-105 transition-all duration-300"
                          >
                            <Link className="h-3 w-3 mr-1" />
                            Login
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-all duration-300">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="backdrop-blur-xl bg-white/95">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Star className="h-4 w-4 mr-2" />
                                Mark as Favorite
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Premium Pagination */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Showing</span>
                <Badge variant="outline" className="font-semibold">1-5</Badge>
                <span className="text-sm text-gray-600">of</span>
                <Badge variant="outline" className="font-semibold">5</Badge>
                <span className="text-sm text-gray-600">entries</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={currentPage === 1}
                  className="hover:bg-blue-50 transition-all duration-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5, 6].map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      className={`w-10 h-10 transition-all duration-300 ${
                        currentPage === page 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/25 transform scale-110' 
                          : 'hover:bg-blue-50 hover:scale-105'
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-blue-50 transition-all duration-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Floating Help Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full h-16 w-16 shadow-2xl shadow-blue-500/25 transform hover:scale-110 transition-all duration-300 animate-pulse">
            <HelpCircle className="h-6 w-6" />
          </Button>
          <div className="absolute bottom-20 right-0 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl backdrop-blur-xl">
            Need Help? Chat with us!
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
          </div>
        </div>
      </div>

      {/* Premium Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg font-semibold text-gray-900">Processing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}