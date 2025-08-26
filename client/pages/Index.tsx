import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Truck,
  MapPin,
  Users,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Fuel,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  Pause,
  Wrench,
  Star,
  AlertCircle,
  Map,
  Navigation
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Vehicle, FleetStats, FleetKPIs, Alert } from "@shared/fleet-types";

export default function Index() {
  const navigate = useNavigate();

  // Real data structure matching server format
  const vehicles: Vehicle[] = [
    {
      id: "VEH-001",
      deviceId: "akshay",
      name: "TRK-401",
      type: "truck",
      driver: "Akshay Kumar",
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
      score: 95
    },
    {
      id: "VEH-002",
      deviceId: "driver_002",
      name: "VAN-203",
      type: "van",
      driver: "Sarah Wilson",
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
      score: 94
    },
    // Add more vehicles with similar structure...
  ];

  // Calculate fleet stats from real vehicle data
  const fleetStats: FleetStats = {
    active: vehicles.filter(v => v.status.status === 'moving').length,
    idle: vehicles.filter(v => v.status.status === 'idle').length,
    offline: vehicles.filter(v => v.status.status === 'offline').length,
    maintenance: vehicles.filter(v => v.status.status === 'maintenance').length,
    total: vehicles.length
  };

  // Expand fleet stats for realistic dashboard
  fleetStats.active = 142;
  fleetStats.idle = 23;
  fleetStats.offline = 8;
  fleetStats.maintenance = 12;
  fleetStats.total = 185;

  const kpis: FleetKPIs = {
    avgFuelConsumption: 8.2,
    fuelChange: -2.3,
    totalDistance: 15420,
    distanceChange: 5.8,
    avgSafetyScore: 87,
    safetyChange: 3.2,
    activeAlerts: 7
  };

  const alerts: Alert[] = [
    {
      id: "ALT-001",
      type: "speeding",
      deviceId: "driver_003",
      vehicleName: "TRK-515",
      driver: "Mike Johnson",
      timestamp: "2025-08-26T08:20:26.000Z",
      severity: "high",
      location: [30.6800123, 76.7450234],
      description: "Vehicle exceeded speed limit by 15 km/h",
      resolved: false
    },
    {
      id: "ALT-002",
      type: "harsh_braking",
      deviceId: "driver_002",
      vehicleName: "VAN-203",
      driver: "Sarah Wilson",
      timestamp: "2025-08-26T08:17:26.000Z",
      severity: "medium",
      location: [30.6850123, 76.7401234],
      description: "Harsh braking detected",
      resolved: false
    },
    {
      id: "ALT-003",
      type: "geofence",
      deviceId: "driver_004",
      vehicleName: "TRK-299",
      driver: "David Brown",
      timestamp: "2025-08-26T08:10:26.000Z",
      severity: "high",
      location: [30.6900456, 76.7500789],
      description: "Vehicle left authorized zone",
      resolved: false
    },
    {
      id: "ALT-004",
      type: "maintenance",
      deviceId: "driver_005",
      vehicleName: "VAN-187",
      driver: "Emma Davis",
      timestamp: "2025-08-26T07:57:26.000Z",
      severity: "medium",
      location: [30.6950789, 76.7600123],
      description: "Scheduled maintenance due",
      resolved: false
    },
    {
      id: "ALT-005",
      type: "fuel_low",
      deviceId: "driver_006",
      vehicleName: "TRK-188",
      driver: "Tom Wilson",
      timestamp: "2025-08-26T07:47:26.000Z",
      severity: "low",
      location: [30.7000123, 76.7700456],
      description: "Fuel level below 15%",
      resolved: false
    }
  ];

  const topVehicles = vehicles.slice(0, 3);
  const bottomVehicles = [
    { id: "TRK-299", score: 72, efficiency: 68, driver: "David Brown" },
    { id: "VAN-187", score: 75, efficiency: 71, driver: "Emma Davis" },
    { id: "TRK-188", score: 78, efficiency: 74, driver: "Tom Wilson" }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "speeding": return <TrendingUp className="h-4 w-4" />;
      case "harsh_braking": return <AlertTriangle className="h-4 w-4" />;
      case "geofence": return <MapPin className="h-4 w-4" />;
      case "maintenance": return <Wrench className="h-4 w-4" />;
      case "fuel_low": return <Fuel className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-fleet-danger text-white";
      case "medium": return "bg-fleet-warning text-black";
      case "low": return "bg-fleet-info text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg">
                <Truck className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">FleetTracker Pro</h1>
                <p className="text-sm text-muted-foreground">Fleet Management Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Activity className="h-3 w-3" />
                Live Tracking Active
              </Badge>
              <div className="text-right">
                <p className="text-sm font-medium">Fleet Manager</p>
                <p className="text-xs text-muted-foreground">Last updated: 30 sec ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Fleet Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Active Vehicles</p>
                  <p className="text-2xl font-bold text-green-900">{fleetStats.active}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2">
                <Progress value={(fleetStats.active / fleetStats.total) * 100} className="h-2" />
                <p className="text-xs text-green-600 mt-1">{((fleetStats.active / fleetStats.total) * 100).toFixed(1)}% of fleet</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700">Idle Vehicles</p>
                  <p className="text-2xl font-bold text-yellow-900">{fleetStats.idle}</p>
                </div>
                <Pause className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="mt-2">
                <Progress value={(fleetStats.idle / fleetStats.total) * 100} className="h-2" />
                <p className="text-xs text-yellow-600 mt-1">{((fleetStats.idle / fleetStats.total) * 100).toFixed(1)}% of fleet</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700">Offline Vehicles</p>
                  <p className="text-2xl font-bold text-red-900">{fleetStats.offline}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="mt-2">
                <Progress value={(fleetStats.offline / fleetStats.total) * 100} className="h-2" />
                <p className="text-xs text-red-600 mt-1">{((fleetStats.offline / fleetStats.total) * 100).toFixed(1)}% of fleet</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">In Maintenance</p>
                  <p className="text-2xl font-bold text-blue-900">{fleetStats.maintenance}</p>
                </div>
                <Wrench className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2">
                <Progress value={(fleetStats.maintenance / fleetStats.total) * 100} className="h-2" />
                <p className="text-xs text-blue-600 mt-1">{((fleetStats.maintenance / fleetStats.total) * 100).toFixed(1)}% of fleet</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Avg Fuel Consumption</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{kpis.avgFuelConsumption} L/100km</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">{Math.abs(kpis.fuelChange)}% improvement</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Total Distance</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{kpis.totalDistance.toLocaleString()} km</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+{kpis.distanceChange}% this week</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Safety Score</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold">{kpis.avgSafetyScore}/100</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+{kpis.safetyChange}% this month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">Active Alerts</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-red-600">{kpis.activeAlerts}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Requires attention</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row - Alerts and Scorecards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alerts and Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Recent Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {alert.type.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {alert.vehicle} • {alert.driver}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {alert.time}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle and Driver Scorecards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Vehicle & Driver Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-green-700 mb-3">Top Performers</h4>
                  <div className="space-y-2">
                    {topVehicles.map((vehicle, index) => (
                      <div key={vehicle.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{vehicle.id}</p>
                            <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-green-700">{vehicle.score}%</p>
                          <p className="text-xs text-muted-foreground">{vehicle.efficiency}% efficiency</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-sm text-red-700 mb-3">Needs Improvement</h4>
                  <div className="space-y-2">
                    {bottomVehicles.map((vehicle, index) => (
                      <div key={vehicle.id} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full">
                            {bottomVehicles.length - index}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{vehicle.id}</p>
                            <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-red-700">{vehicle.score}%</p>
                          <p className="text-xs text-muted-foreground">{vehicle.efficiency}% efficiency</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
