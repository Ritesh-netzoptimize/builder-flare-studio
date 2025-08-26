import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  ArrowLeft,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Download,
  FileText,
  Calendar as CalendarIcon,
  Filter,
  Plus,
  Fuel,
  Route,
  Clock,
  AlertTriangle,
  Wrench,
  Star,
  DollarSign,
  Target,
  Users,
  Activity,
  Settings,
  RefreshCw,
  Zap,
  Award,
  TrendingDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import type {
  Report,
  ReportTemplate,
  ReportFilter,
  DashboardMetrics,
  FuelUsageData,
  ViolationData,
  IdleTimeData,
  DriverPerformanceData,
  ExportOptions,
} from "@shared/fleet-types";

export default function Reports() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] =
    useState<ReportTemplate | null>(null);
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [selectedFilters, setSelectedFilters] = useState<Partial<ReportFilter>>(
    {},
  );
  const [activeTab, setActiveTab] = useState("overview");

  // Mock dashboard metrics
  const dashboardMetrics: DashboardMetrics = {
    totalFuelCost: 45780,
    totalDistance: 125430,
    totalIdleTime: 2340,
    totalViolations: 28,
    averageEfficiency: 87.5,
    maintenanceCosts: 18650,
    topPerformingDriver: "Akshay Kumar",
    worstPerformingVehicle: "TRK-299",
  };

  // Pre-built report templates
  const reportTemplates: ReportTemplate[] = [
    {
      id: "fuel-usage",
      name: "Fuel Usage Analysis",
      description:
        "Comprehensive fuel consumption and cost analysis by vehicle and time period",
      type: "fuel_usage",
      category: "operational",
      defaultFilters: {},
      chartConfigs: [
        {
          type: "bar",
          title: "Fuel Consumption by Vehicle",
          xAxis: { label: "Vehicle", field: "vehicleName" },
          yAxis: { label: "Fuel (L)", field: "fuelConsumed" },
        },
      ],
      icon: "fuel",
      color: "text-orange-600 bg-orange-50 border-orange-200",
    },
    {
      id: "mileage-report",
      name: "Mileage Report",
      description:
        "Total distance covered, business vs personal usage breakdown",
      type: "mileage",
      category: "operational",
      defaultFilters: {},
      chartConfigs: [
        {
          type: "line",
          title: "Daily Mileage Trends",
          xAxis: { label: "Date", field: "date" },
          yAxis: { label: "Distance (km)", field: "totalDistance" },
        },
      ],
      icon: "route",
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      id: "idle-time",
      name: "Idle Time Analysis",
      description: "Vehicle idle time monitoring and fuel waste analysis",
      type: "idle_time",
      category: "operational",
      defaultFilters: {},
      chartConfigs: [
        {
          type: "bar",
          title: "Idle Time by Vehicle",
          xAxis: { label: "Vehicle", field: "vehicleName" },
          yAxis: { label: "Idle Time (hrs)", field: "totalIdleTime" },
        },
      ],
      icon: "clock",
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    },
    {
      id: "violations",
      name: "Safety Violations",
      description:
        "Speeding, harsh braking, and other driving violations tracking",
      type: "violations",
      category: "safety",
      defaultFilters: {},
      chartConfigs: [
        {
          type: "pie",
          title: "Violations by Type",
          xAxis: { label: "Type", field: "type" },
          yAxis: { label: "Count", field: "count" },
        },
      ],
      icon: "alert",
      color: "text-red-600 bg-red-50 border-red-200",
    },
    {
      id: "maintenance-costs",
      name: "Maintenance Costs",
      description: "Detailed breakdown of maintenance expenses and scheduling",
      type: "maintenance_costs",
      category: "financial",
      defaultFilters: {},
      chartConfigs: [
        {
          type: "area",
          title: "Monthly Maintenance Costs",
          xAxis: { label: "Month", field: "month" },
          yAxis: { label: "Cost ($)", field: "cost" },
        },
      ],
      icon: "wrench",
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
    {
      id: "driver-performance",
      name: "Driver Performance",
      description: "Individual driver scoring, efficiency, and safety metrics",
      type: "driver_performance",
      category: "safety",
      defaultFilters: {},
      chartConfigs: [
        {
          type: "bar",
          title: "Driver Safety Scores",
          xAxis: { label: "Driver", field: "driverName" },
          yAxis: { label: "Score", field: "safetyScore" },
        },
      ],
      icon: "star",
      color: "text-green-600 bg-green-50 border-green-200",
    },
  ];

  // Mock chart data
  const fuelUsageData = [
    { vehicleName: "TRK-401", fuelConsumed: 450, cost: 540, efficiency: 12.5 },
    { vehicleName: "VAN-203", fuelConsumed: 320, cost: 384, efficiency: 15.2 },
    { vehicleName: "TRK-515", fuelConsumed: 520, cost: 624, efficiency: 11.8 },
    { vehicleName: "VAN-187", fuelConsumed: 290, cost: 348, efficiency: 16.1 },
    { vehicleName: "CAR-112", fuelConsumed: 180, cost: 216, efficiency: 18.3 },
  ];

  const violationsData = [
    { type: "Speeding", count: 15, percentage: 53.6 },
    { type: "Harsh Braking", count: 8, percentage: 28.6 },
    { type: "Rapid Acceleration", count: 3, percentage: 10.7 },
    { type: "Geofence Violation", count: 2, percentage: 7.1 },
  ];

  const idleTimeData = [
    { vehicleName: "TRK-401", totalIdleTime: 45, fuelWasted: 12.5 },
    { vehicleName: "VAN-203", totalIdleTime: 32, fuelWasted: 8.9 },
    { vehicleName: "TRK-515", totalIdleTime: 68, fuelWasted: 18.7 },
    { vehicleName: "VAN-187", totalIdleTime: 28, fuelWasted: 7.2 },
    { vehicleName: "CAR-112", totalIdleTime: 15, fuelWasted: 3.8 },
  ];

  const driverPerformanceData = [
    {
      driverName: "Akshay Kumar",
      safetyScore: 95,
      efficiency: 92,
      violations: 1,
    },
    {
      driverName: "Sarah Wilson",
      safetyScore: 94,
      efficiency: 89,
      violations: 2,
    },
    {
      driverName: "Mike Johnson",
      safetyScore: 88,
      efficiency: 78,
      violations: 8,
    },
    {
      driverName: "Emma Davis",
      safetyScore: 93,
      efficiency: 91,
      violations: 1,
    },
    {
      driverName: "David Brown",
      safetyScore: 85,
      efficiency: 82,
      violations: 5,
    },
  ];

  const maintenanceData = [
    { month: "Jan", cost: 2400, vehicles: 3 },
    { month: "Feb", cost: 1800, vehicles: 2 },
    { month: "Mar", cost: 3200, vehicles: 4 },
    { month: "Apr", cost: 2100, vehicles: 2 },
    { month: "May", cost: 2800, vehicles: 3 },
    { month: "Jun", cost: 3600, vehicles: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const getTemplateIcon = (iconName: string) => {
    switch (iconName) {
      case "fuel":
        return <Fuel className="h-6 w-6" />;
      case "route":
        return <Route className="h-6 w-6" />;
      case "clock":
        return <Clock className="h-6 w-6" />;
      case "alert":
        return <AlertTriangle className="h-6 w-6" />;
      case "wrench":
        return <Wrench className="h-6 w-6" />;
      case "star":
        return <Star className="h-6 w-6" />;
      default:
        return <BarChart3 className="h-6 w-6" />;
    }
  };

  const handleExport = (format: ExportOptions["format"]) => {
    // Mock export functionality
    const fileName = `fleet_report_${format}_${format("yyyy-MM-dd", new Date())}`;
    console.log(`Exporting report as ${format}: ${fileName}`);

    // In a real app, this would trigger the actual export
    const link = document.createElement("a");
    link.href = "#";
    link.download = fileName;
    link.click();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    Reports & Analytics
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Business Intelligence Dashboard
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate("/vehicles")}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Users className="h-4 w-4" />
                  Vehicles
                </Button>
                <Button
                  onClick={() => navigate("/live-map")}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Activity className="h-4 w-4" />
                  Live Map
                </Button>
              </div>
              <Badge variant="outline" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                Real-time Analytics
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium">Fleet Manager</p>
                <p className="text-xs text-muted-foreground">
                  Data Updated: Live
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              <FileText className="h-4 w-4" />
              Report Templates
            </TabsTrigger>
            <TabsTrigger value="custom" className="gap-2">
              <Plus className="h-4 w-4" />
              Custom Reports
            </TabsTrigger>
            <TabsTrigger value="exports" className="gap-2">
              <Download className="h-4 w-4" />
              Export Center
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">
                        Total Distance
                      </p>
                      <p className="text-2xl font-bold text-blue-900">
                        {formatNumber(dashboardMetrics.totalDistance)} km
                      </p>
                    </div>
                    <Route className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">
                        +5.2% vs last month
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-700">
                        Fuel Costs
                      </p>
                      <p className="text-2xl font-bold text-orange-900">
                        {formatCurrency(dashboardMetrics.totalFuelCost)}
                      </p>
                    </div>
                    <Fuel className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">
                        -2.1% vs last month
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-700">
                        Safety Violations
                      </p>
                      <p className="text-2xl font-bold text-red-900">
                        {dashboardMetrics.totalViolations}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-1">
                      <TrendingDown className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">
                        -15% vs last month
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700">
                        Fleet Efficiency
                      </p>
                      <p className="text-2xl font-bold text-green-900">
                        {dashboardMetrics.averageEfficiency}%
                      </p>
                    </div>
                    <Zap className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-green-600">
                        +3.1% vs last month
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fuel Usage Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-orange-500" />
                    Fuel Consumption by Vehicle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={fuelUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="vehicleName" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="fuelConsumed" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Violations Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Safety Violations Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={violationsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ type, percentage }) =>
                          `${type}: ${percentage}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {violationsData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Driver Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Driver Safety Scores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={driverPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="driverName" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="safetyScore" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Maintenance Costs Trend */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-purple-500" />
                    Monthly Maintenance Costs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={maintenanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="cost"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Report Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTemplate(template)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${template.color}`}>
                        {getTemplateIcon(template.icon)}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BarChart3 className="h-4 w-4" />
                        <span>
                          {template.chartConfigs.length} chart
                          {template.chartConfigs.length !== 1 ? "s" : ""}{" "}
                          included
                        </span>
                      </div>
                      <Button className="w-full gap-2">
                        <FileText className="h-4 w-4" />
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Custom Reports Tab */}
          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Custom Report Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="report-name">Report Name</Label>
                      <Input
                        id="report-name"
                        placeholder="Enter report name..."
                      />
                    </div>

                    <div>
                      <Label>Date Range</Label>
                      <div className="flex gap-2 mt-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="justify-start gap-2"
                            >
                              <CalendarIcon className="h-4 w-4" />
                              {dateRange.from
                                ? format(dateRange.from, "PPP")
                                : "Start date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dateRange.from}
                              onSelect={(date) =>
                                date &&
                                setDateRange((prev) => ({
                                  ...prev,
                                  from: date,
                                }))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="justify-start gap-2"
                            >
                              <CalendarIcon className="h-4 w-4" />
                              {dateRange.to
                                ? format(dateRange.to, "PPP")
                                : "End date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dateRange.to}
                              onSelect={(date) =>
                                date &&
                                setDateRange((prev) => ({ ...prev, to: date }))
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div>
                      <Label>Report Type</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fuel_usage">Fuel Usage</SelectItem>
                          <SelectItem value="mileage">
                            Mileage Report
                          </SelectItem>
                          <SelectItem value="idle_time">
                            Idle Time Analysis
                          </SelectItem>
                          <SelectItem value="violations">
                            Safety Violations
                          </SelectItem>
                          <SelectItem value="maintenance">
                            Maintenance Costs
                          </SelectItem>
                          <SelectItem value="driver_performance">
                            Driver Performance
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Filter by Vehicles</Label>
                      <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                        {[
                          "TRK-401",
                          "VAN-203",
                          "TRK-515",
                          "VAN-187",
                          "CAR-112",
                        ].map((vehicle) => (
                          <div
                            key={vehicle}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`vehicle-${vehicle}`} />
                            <Label
                              htmlFor={`vehicle-${vehicle}`}
                              className="text-sm"
                            >
                              {vehicle}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Chart Type</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select chart type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">Bar Chart</SelectItem>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="pie">Pie Chart</SelectItem>
                          <SelectItem value="area">Area Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Generate Report
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Settings className="h-4 w-4" />
                        Save Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Center Tab */}
          <TabsContent value="exports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleExport("pdf")}
              >
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-red-500" />
                  <h3 className="font-semibold mb-2">Export to PDF</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Professional reports with charts and formatting
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleExport("csv")}
              >
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="font-semibold mb-2">Export to CSV</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Raw data for analysis in Excel or other tools
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download CSV
                  </Button>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleExport("excel")}
              >
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="font-semibold mb-2">Export to Excel</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Formatted spreadsheet with charts and tables
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download Excel
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <RefreshCw className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="font-semibold mb-2">Scheduled Reports</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Set up automatic report generation and delivery
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Settings className="h-4 w-4" />
                    Configure
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Export History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "Monthly Fuel Report - June 2025",
                      date: "2025-06-30",
                      format: "PDF",
                      size: "2.3 MB",
                    },
                    {
                      name: "Driver Performance Analysis",
                      date: "2025-06-28",
                      format: "Excel",
                      size: "1.8 MB",
                    },
                    {
                      name: "Safety Violations Report",
                      date: "2025-06-25",
                      format: "CSV",
                      size: "156 KB",
                    },
                    {
                      name: "Fleet Efficiency Report",
                      date: "2025-06-22",
                      format: "PDF",
                      size: "3.1 MB",
                    },
                  ].map((export_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{export_.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {export_.date} • {export_.format} • {export_.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
