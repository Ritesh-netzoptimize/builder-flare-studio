import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Truck, 
  MapPin, 
  User,
  MessageSquare,
  Settings,
  Eye,
  UserPlus,
  Wrench,
  Fuel,
  Calendar,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Car,
  Bus,
  Bike
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Vehicle, Driver, Message, VehicleFilter, MaintenanceRecord } from "@shared/fleet-types";

export default function Vehicles() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filters, setFilters] = useState<VehicleFilter>({});
  const [showAssignDriver, setShowAssignDriver] = useState(false);
  const [showSendMessage, setShowSendMessage] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Enhanced vehicle data with comprehensive details
  const vehicles: Vehicle[] = [
    {
      id: "VEH-001",
      deviceId: "akshay",
      name: "TRK-401",
      type: "truck",
      specs: {
        make: "Volvo",
        model: "FH16",
        year: 2022,
        licensePlate: "PB-05-HZ-1234",
        vin: "YV2R630CB6A123456",
        color: "White",
        fuelType: "diesel",
        capacity: {
          cargo: 45,
          weight: 25
        }
      },
      driver: "Akshay Kumar",
      assignedDriverId: "DRV-001",
      location: {
        accuracy: 15.510000228881836,
        altitude: 295.3000183105469,
        createdAt: "2025-08-26T08:22:26.000Z",
        deviceId: "akshay",
        latitude: 30.6763796,
        longitude: 76.7399375,
        speed: 0,
        timestamp: "2025-08-26T08:22:10.000Z"
      },
      status: {
        deviceId: "akshay",
        status: "idle",
        lastUpdate: "2025-08-26T08:22:26.000Z",
        driver: "Akshay Kumar",
        ignitionStatus: true,
        fuelLevel: 85,
        engineHours: 2450
      },
      efficiency: 92,
      score: 95,
      odometer: 125000,
      maintenanceRecords: [
        {
          id: "MAINT-001",
          type: "scheduled",
          description: "Regular maintenance and oil change",
          date: "2025-08-20T00:00:00.000Z",
          nextDue: "2025-11-20T00:00:00.000Z",
          cost: 1500,
          mileage: 124500,
          status: "completed",
          servicedBy: "AutoCare Services"
        }
      ],
      lastMaintenance: "2025-08-20T00:00:00.000Z",
      nextMaintenance: "2025-11-20T00:00:00.000Z",
      insuranceExpiry: "2026-03-15T00:00:00.000Z",
      registrationExpiry: "2026-01-30T00:00:00.000Z",
      fuelCapacity: 400,
      purchaseDate: "2022-01-15T00:00:00.000Z",
      warrantyExpiry: "2025-01-15T00:00:00.000Z"
    },
    {
      id: "VEH-002",
      deviceId: "driver_002",
      name: "VAN-203",
      type: "van",
      specs: {
        make: "Mercedes",
        model: "Sprinter",
        year: 2023,
        licensePlate: "HR-26-DL-5678",
        vin: "WD3PE7CC5EP123456",
        color: "Silver",
        fuelType: "diesel",
        capacity: {
          passengers: 12,
          cargo: 15
        }
      },
      driver: "Sarah Wilson",
      assignedDriverId: "DRV-002",
      location: {
        accuracy: 12.2,
        altitude: 280.5,
        createdAt: "2025-08-26T08:20:15.000Z",
        deviceId: "driver_002",
        latitude: 30.6850123,
        longitude: 76.7401234,
        speed: 45,
        timestamp: "2025-08-26T08:20:00.000Z"
      },
      status: {
        deviceId: "driver_002",
        status: "moving",
        lastUpdate: "2025-08-26T08:20:15.000Z",
        driver: "Sarah Wilson",
        ignitionStatus: true,
        fuelLevel: 72,
        engineHours: 1890
      },
      efficiency: 89,
      score: 94,
      odometer: 89500,
      maintenanceRecords: [
        {
          id: "MAINT-002",
          type: "inspection",
          description: "Annual safety inspection",
          date: "2025-08-15T00:00:00.000Z",
          nextDue: "2026-08-15T00:00:00.000Z",
          cost: 500,
          mileage: 89000,
          status: "completed",
          servicedBy: "Official Service Center"
        }
      ],
      lastMaintenance: "2025-08-15T00:00:00.000Z",
      nextMaintenance: "2025-10-15T00:00:00.000Z",
      insuranceExpiry: "2026-05-20T00:00:00.000Z",
      registrationExpiry: "2026-02-28T00:00:00.000Z",
      fuelCapacity: 70,
      purchaseDate: "2023-03-10T00:00:00.000Z",
      warrantyExpiry: "2026-03-10T00:00:00.000Z"
    },
    {
      id: "VEH-003",
      deviceId: "driver_003",
      name: "TRK-515",
      type: "truck",
      specs: {
        make: "Tata",
        model: "Prima",
        year: 2021,
        licensePlate: "UP-80-AH-9012",
        vin: "MAT123456789012345",
        color: "Blue",
        fuelType: "diesel",
        capacity: {
          cargo: 38,
          weight: 20
        }
      },
      driver: "Mike Johnson",
      assignedDriverId: "DRV-003",
      location: {
        accuracy: 18.3,
        altitude: 310.2,
        createdAt: "2025-08-26T08:19:45.000Z",
        deviceId: "driver_003",
        latitude: 30.6920456,
        longitude: 76.7500789,
        speed: 65,
        timestamp: "2025-08-26T08:19:30.000Z"
      },
      status: {
        deviceId: "driver_003",
        status: "moving",
        lastUpdate: "2025-08-26T08:19:45.000Z",
        driver: "Mike Johnson",
        ignitionStatus: true,
        fuelLevel: 45,
        engineHours: 3200
      },
      efficiency: 78,
      score: 88,
      odometer: 156700,
      maintenanceRecords: [
        {
          id: "MAINT-003",
          type: "repair",
          description: "Brake system repair",
          date: "2025-08-10T00:00:00.000Z",
          nextDue: "2025-09-15T00:00:00.000Z",
          cost: 2800,
          mileage: 156200,
          status: "completed",
          servicedBy: "QuickFix Garage"
        }
      ],
      lastMaintenance: "2025-08-10T00:00:00.000Z",
      nextMaintenance: "2025-09-15T00:00:00.000Z",
      insuranceExpiry: "2025-12-10T00:00:00.000Z",
      registrationExpiry: "2025-11-15T00:00:00.000Z",
      fuelCapacity: 300,
      purchaseDate: "2021-05-20T00:00:00.000Z",
      warrantyExpiry: "2024-05-20T00:00:00.000Z"
    },
    {
      id: "VEH-004",
      deviceId: "driver_004",
      name: "VAN-187",
      type: "van",
      specs: {
        make: "Ford",
        model: "Transit",
        year: 2022,
        licensePlate: "MH-12-KL-3456",
        vin: "WF0MXXBDGMPR123456",
        color: "Red",
        fuelType: "diesel",
        capacity: {
          passengers: 8,
          cargo: 12
        }
      },
      driver: "Emma Davis",
      assignedDriverId: "DRV-004",
      location: {
        accuracy: 14.8,
        altitude: 275.8,
        createdAt: "2025-08-26T08:15:30.000Z",
        deviceId: "driver_004",
        latitude: 30.6600123,
        longitude: 76.7300456,
        speed: 0,
        timestamp: "2025-08-26T08:15:15.000Z"
      },
      status: {
        deviceId: "driver_004",
        status: "parked",
        lastUpdate: "2025-08-26T08:15:30.000Z",
        driver: "Emma Davis",
        ignitionStatus: false,
        fuelLevel: 90,
        engineHours: 1560
      },
      efficiency: 91,
      score: 93,
      odometer: 78300,
      maintenanceRecords: [
        {
          id: "MAINT-004",
          type: "scheduled",
          description: "Routine service and tire rotation",
          date: "2025-08-25T00:00:00.000Z",
          nextDue: "2025-11-25T00:00:00.000Z",
          cost: 800,
          mileage: 78000,
          status: "completed",
          servicedBy: "City Service Station"
        }
      ],
      lastMaintenance: "2025-08-25T00:00:00.000Z",
      nextMaintenance: "2025-11-25T00:00:00.000Z",
      insuranceExpiry: "2026-04-12T00:00:00.000Z",
      registrationExpiry: "2026-01-08T00:00:00.000Z",
      fuelCapacity: 80,
      purchaseDate: "2022-02-28T00:00:00.000Z",
      warrantyExpiry: "2025-02-28T00:00:00.000Z"
    },
    {
      id: "VEH-005",
      deviceId: "driver_005",
      name: "CAR-112",
      type: "car",
      specs: {
        make: "Toyota",
        model: "Camry",
        year: 2023,
        licensePlate: "DL-8C-AN-7890",
        vin: "4T1BE46K23U123456",
        color: "Black",
        fuelType: "gasoline",
        capacity: {
          passengers: 5
        }
      },
      driver: "David Brown",
      assignedDriverId: "DRV-005",
      location: {
        accuracy: 10.5,
        altitude: 250.2,
        createdAt: "2025-08-26T08:18:00.000Z",
        deviceId: "driver_005",
        latitude: 30.6580789,
        longitude: 76.7250123,
        speed: 25,
        timestamp: "2025-08-26T08:17:45.000Z"
      },
      status: {
        deviceId: "driver_005",
        status: "moving",
        lastUpdate: "2025-08-26T08:18:00.000Z",
        driver: "David Brown",
        ignitionStatus: true,
        fuelLevel: 60,
        engineHours: 890
      },
      efficiency: 88,
      score: 85,
      odometer: 45200,
      maintenanceRecords: [
        {
          id: "MAINT-005",
          type: "scheduled",
          description: "Oil change and filter replacement",
          date: "2025-08-22T00:00:00.000Z",
          nextDue: "2025-11-22T00:00:00.000Z",
          cost: 350,
          mileage: 45000,
          status: "completed",
          servicedBy: "Express Lube"
        }
      ],
      lastMaintenance: "2025-08-22T00:00:00.000Z",
      nextMaintenance: "2025-11-22T00:00:00.000Z",
      insuranceExpiry: "2026-06-30T00:00:00.000Z",
      registrationExpiry: "2026-03-15T00:00:00.000Z",
      fuelCapacity: 60,
      purchaseDate: "2023-04-15T00:00:00.000Z",
      warrantyExpiry: "2026-04-15T00:00:00.000Z"
    }
  ];

  const availableDrivers: Driver[] = [
    {
      id: "DRV-006",
      name: "James Wilson",
      email: "james.wilson@fleet.com",
      phone: "+91-9876543210",
      licenseNumber: "DL-1234567890",
      licenseExpiry: "2027-06-15T00:00:00.000Z",
      employeeId: "EMP-006",
      status: "active",
      assignedVehicles: [],
      rating: 4.8,
      totalDistance: 85000,
      safetyScore: 92,
      joiningDate: "2022-03-10T00:00:00.000Z"
    },
    {
      id: "DRV-007",
      name: "Lisa Anderson",
      email: "lisa.anderson@fleet.com",
      phone: "+91-9876543211",
      licenseNumber: "DL-1234567891",
      licenseExpiry: "2026-12-20T00:00:00.000Z",
      employeeId: "EMP-007",
      status: "active",
      assignedVehicles: [],
      rating: 4.6,
      totalDistance: 72000,
      safetyScore: 89,
      joiningDate: "2022-08-05T00:00:00.000Z"
    }
  ];

  // Filter and sort logic
  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = !searchTerm || 
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.specs.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.specs.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.specs.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = !filters.status?.length || filters.status.includes(vehicle.status.status);
      const matchesType = !filters.type?.length || filters.type.includes(vehicle.type);
      const matchesDriver = !filters.driver?.length || filters.driver.includes(vehicle.driver);
      
      return matchesSearch && matchesStatus && matchesType && matchesDriver;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortField) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "driver":
          aValue = a.driver;
          bValue = b.driver;
          break;
        case "status":
          aValue = a.status.status;
          bValue = b.status.status;
          break;
        case "fuel":
          aValue = a.status.fuelLevel;
          bValue = b.status.fuelLevel;
          break;
        case "efficiency":
          aValue = a.efficiency;
          bValue = b.efficiency;
          break;
        case "odometer":
          aValue = a.odometer;
          bValue = b.odometer;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [vehicles, searchTerm, filters, sortField, sortDirection]);

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "truck": return <Truck className="h-5 w-5" />;
      case "van": return <Car className="h-5 w-5" />;
      case "car": return <Car className="h-5 w-5" />;
      case "bus": return <Bus className="h-5 w-5" />;
      case "motorcycle": return <Bike className="h-5 w-5" />;
      default: return <Truck className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "moving": return "text-green-600 bg-green-50 border-green-200";
      case "idle": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "parked": return "text-blue-600 bg-blue-50 border-blue-200";
      case "offline": return "text-red-600 bg-red-50 border-red-200";
      case "maintenance": return "text-purple-600 bg-purple-50 border-purple-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "moving": return <CheckCircle2 className="h-4 w-4" />;
      case "idle": return <Clock className="h-4 w-4" />;
      case "parked": return <XCircle className="h-4 w-4" />;
      case "offline": return <AlertTriangle className="h-4 w-4" />;
      case "maintenance": return <Wrench className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const isMaintenanceDue = (vehicle: Vehicle) => {
    if (!vehicle.nextMaintenance) return false;
    const nextDate = new Date(vehicle.nextMaintenance);
    const today = new Date();
    const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30;
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
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
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <Truck className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Vehicles & Assets</h1>
                  <p className="text-sm text-muted-foreground">Fleet Management System</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Truck className="h-3 w-3" />
                {vehicles.length} Total Vehicles
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium">Fleet Manager</p>
                <p className="text-xs text-muted-foreground">Live Status</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vehicles, drivers, or license plates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <Select value={`${sortField}-${sortDirection}`} onValueChange={(value) => {
              const [field, direction] = value.split('-');
              setSortField(field);
              setSortDirection(direction as "asc" | "desc");
            }}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="driver-asc">Driver (A-Z)</SelectItem>
                <SelectItem value="driver-desc">Driver (Z-A)</SelectItem>
                <SelectItem value="status-asc">Status (A-Z)</SelectItem>
                <SelectItem value="fuel-desc">Fuel (High-Low)</SelectItem>
                <SelectItem value="efficiency-desc">Efficiency (High-Low)</SelectItem>
                <SelectItem value="odometer-desc">Mileage (High-Low)</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Advanced Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Status</Label>
                  <div className="space-y-2">
                    {["moving", "idle", "parked", "offline", "maintenance"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox
                          id={`status-${status}`}
                          checked={filters.status?.includes(status) || false}
                          onCheckedChange={(checked) => {
                            const newStatuses = filters.status || [];
                            if (checked) {
                              setFilters({...filters, status: [...newStatuses, status]});
                            } else {
                              setFilters({...filters, status: newStatuses.filter(s => s !== status)});
                            }
                          }}
                        />
                        <Label htmlFor={`status-${status}`} className="text-sm capitalize">
                          {status.replace("_", " ")}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Vehicle Type</Label>
                  <div className="space-y-2">
                    {["truck", "van", "car", "bus", "motorcycle"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={filters.type?.includes(type) || false}
                          onCheckedChange={(checked) => {
                            const newTypes = filters.type || [];
                            if (checked) {
                              setFilters({...filters, type: [...newTypes, type]});
                            } else {
                              setFilters({...filters, type: newTypes.filter(t => t !== type)});
                            }
                          }}
                        />
                        <Label htmlFor={`type-${type}`} className="text-sm capitalize">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Maintenance Due</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="maintenance-due" />
                      <Label htmlFor="maintenance-due" className="text-sm">
                        Due in 30 days
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="maintenance-overdue" />
                      <Label htmlFor="maintenance-overdue" className="text-sm">
                        Overdue
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Quick Actions</Label>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start gap-2"
                      onClick={() => setFilters({})}
                    >
                      <XCircle className="h-4 w-4" />
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vehicles Grid/List */}
        <div className={viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredAndSortedVehicles.map((vehicle) => (
            <Card 
              key={vehicle.id} 
              className={`hover:shadow-lg transition-shadow cursor-pointer ${
                isMaintenanceDue(vehicle) ? 'border-amber-200 bg-amber-50' : ''
              }`}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary p-2 rounded-lg text-primary-foreground">
                      {getVehicleIcon(vehicle.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {vehicle.specs.make} {vehicle.specs.model}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(vehicle.status.status)} border`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(vehicle.status.status)}
                      <span className="capitalize">{vehicle.status.status}</span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Driver</p>
                      <p className="font-medium">{vehicle.driver}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">License Plate</p>
                      <p className="font-medium">{vehicle.specs.licensePlate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fuel Level</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              vehicle.status.fuelLevel > 50 ? 'bg-green-500' :
                              vehicle.status.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${vehicle.status.fuelLevel}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{vehicle.status.fuelLevel}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Efficiency</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="font-medium">{vehicle.efficiency}%</span>
                      </div>
                    </div>
                  </div>

                  {isMaintenanceDue(vehicle) && (
                    <div className="bg-amber-100 border border-amber-200 rounded-lg p-2">
                      <div className="flex items-center gap-2 text-amber-800">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-xs font-medium">Maintenance due soon</span>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/live-map');
                      }}
                    >
                      <MapPin className="h-3 w-3" />
                      View on Map
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MessageSquare className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Send Message to {vehicle.driver}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="message-subject">Subject</Label>
                            <Input id="message-subject" placeholder="Enter message subject..." />
                          </div>
                          <div>
                            <Label htmlFor="message-content">Message</Label>
                            <Textarea 
                              id="message-content" 
                              placeholder="Type your message here..."
                              rows={4}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1">Send Message</Button>
                            <Button variant="outline">Save Draft</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <UserPlus className="h-3 w-3" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Driver to {vehicle.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="current-driver">Current Driver</Label>
                            <Input 
                              id="current-driver" 
                              value={vehicle.driver}
                              disabled
                            />
                          </div>
                          <div>
                            <Label htmlFor="new-driver">New Driver</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a driver" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableDrivers.map((driver) => (
                                  <SelectItem key={driver.id} value={driver.id}>
                                    <div className="flex items-center gap-2">
                                      <span>{driver.name}</span>
                                      <Badge variant="outline" className="text-xs">
                                        Rating: {driver.rating}
                                      </Badge>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex gap-2">
                            <Button className="flex-1">Assign Driver</Button>
                            <Button variant="outline">Cancel</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <Dialog open={!!selectedVehicle} onOpenChange={() => setSelectedVehicle(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg text-primary-foreground">
                  {getVehicleIcon(selectedVehicle.type)}
                </div>
                <div>
                  <span>{selectedVehicle.name} - {selectedVehicle.specs.make} {selectedVehicle.specs.model}</span>
                  <p className="text-sm text-muted-foreground font-normal">
                    {selectedVehicle.specs.licensePlate}
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Driver Information</span>
                      </div>
                      <p className="font-semibold">{selectedVehicle.driver}</p>
                      <Badge className={`mt-1 ${getStatusColor(selectedVehicle.status.status)} border`}>
                        {selectedVehicle.status.status}
                      </Badge>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Fuel className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Fuel Status</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Current Level:</span>
                          <span className="font-semibold">{selectedVehicle.status.fuelLevel}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedVehicle.status.fuelLevel > 50 ? 'bg-green-500' :
                              selectedVehicle.status.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedVehicle.status.fuelLevel}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Capacity: {selectedVehicle.fuelCapacity}L</span>
                          <span>Type: {selectedVehicle.specs.fuelType}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Performance</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">Efficiency:</span>
                          <span className="font-semibold">{selectedVehicle.efficiency}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Safety Score:</span>
                          <span className="font-semibold">{selectedVehicle.score}/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Odometer:</span>
                          <span className="font-semibold">{selectedVehicle.odometer.toLocaleString()} km</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="specs" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Vehicle Specifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Make & Model</p>
                          <p className="font-medium">{selectedVehicle.specs.make} {selectedVehicle.specs.model}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Year</p>
                          <p className="font-medium">{selectedVehicle.specs.year}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">License Plate</p>
                          <p className="font-medium">{selectedVehicle.specs.licensePlate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Color</p>
                          <p className="font-medium">{selectedVehicle.specs.color}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">VIN</p>
                          <p className="font-medium text-xs">{selectedVehicle.specs.vin}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Fuel Type</p>
                          <p className="font-medium capitalize">{selectedVehicle.specs.fuelType}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Capacity & Registration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {selectedVehicle.specs.capacity.passengers && (
                          <div>
                            <p className="text-muted-foreground">Passengers</p>
                            <p className="font-medium">{selectedVehicle.specs.capacity.passengers}</p>
                          </div>
                        )}
                        {selectedVehicle.specs.capacity.cargo && (
                          <div>
                            <p className="text-muted-foreground">Cargo</p>
                            <p className="font-medium">{selectedVehicle.specs.capacity.cargo} m³</p>
                          </div>
                        )}
                        {selectedVehicle.specs.capacity.weight && (
                          <div>
                            <p className="text-muted-foreground">Weight</p>
                            <p className="font-medium">{selectedVehicle.specs.capacity.weight} tons</p>
                          </div>
                        )}
                        <div>
                          <p className="text-muted-foreground">Insurance Expiry</p>
                          <p className="font-medium">{formatDate(selectedVehicle.insuranceExpiry)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Registration Expiry</p>
                          <p className="font-medium">{formatDate(selectedVehicle.registrationExpiry)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Purchase Date</p>
                          <p className="font-medium">{formatDate(selectedVehicle.purchaseDate)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Maintenance Schedule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Last Maintenance</p>
                          <p className="font-medium">{selectedVehicle.lastMaintenance ? formatDate(selectedVehicle.lastMaintenance) : 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Next Maintenance</p>
                          <p className="font-medium">{selectedVehicle.nextMaintenance ? formatDate(selectedVehicle.nextMaintenance) : 'N/A'}</p>
                          {isMaintenanceDue(selectedVehicle) && (
                            <Badge className="mt-1 bg-amber-100 text-amber-800 border-amber-200">
                              Due Soon
                            </Badge>
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Engine Hours</p>
                          <p className="font-medium">{selectedVehicle.status.engineHours?.toLocaleString() || 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Maintenance History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedVehicle.maintenanceRecords.map((record) => (
                          <div key={record.id} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <Badge 
                                variant="outline" 
                                className={record.status === 'completed' ? 'text-green-600 border-green-200' : 'text-yellow-600 border-yellow-200'}
                              >
                                {record.type}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {formatDate(record.date)}
                              </span>
                            </div>
                            <p className="text-sm font-medium mb-1">{record.description}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                              <span>Cost: ${record.cost || 'N/A'}</span>
                              <span>Mileage: {record.mileage.toLocaleString()} km</span>
                            </div>
                            {record.servicedBy && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Serviced by: {record.servicedBy}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Current Location
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Latitude</p>
                          <p className="font-medium">{selectedVehicle.location.latitude.toFixed(6)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Longitude</p>
                          <p className="font-medium">{selectedVehicle.location.longitude.toFixed(6)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Altitude</p>
                          <p className="font-medium">{selectedVehicle.location.altitude.toFixed(1)} m</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Accuracy</p>
                          <p className="font-medium">{selectedVehicle.location.accuracy.toFixed(1)} m</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Speed</p>
                          <p className="font-medium">{selectedVehicle.location.speed} km/h</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Update</p>
                          <p className="font-medium">{formatDate(selectedVehicle.location.timestamp)}</p>
                        </div>
                      </div>
                      <Separator />
                      <Button 
                        className="w-full gap-2"
                        onClick={() => {
                          setSelectedVehicle(null);
                          navigate('/live-map');
                        }}
                      >
                        <MapPin className="h-4 w-4" />
                        View on Live Map
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full gap-2">
                        <UserPlus className="h-4 w-4" />
                        Assign Driver
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Send Message
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <Wrench className="h-4 w-4" />
                        Schedule Maintenance
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <Settings className="h-4 w-4" />
                        Vehicle Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
