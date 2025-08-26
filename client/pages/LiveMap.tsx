import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  MapPin, 
  Truck, 
  Navigation,
  Clock,
  Fuel,
  User,
  Activity,
  AlertTriangle,
  Route,
  Play,
  Square,
  Zap,
  Target,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Vehicle, Geofence, TripData, VehicleLocation } from "@shared/fleet-types";

export default function LiveMap() {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);
  const [showGeofences, setShowGeofences] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([30.6763796, 76.7399375]);
  const [zoomLevel, setZoomLevel] = useState(12);

  // Real vehicle data matching the server structure
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
    {
      id: "VEH-003",
      deviceId: "driver_003",
      name: "TRK-515",
      type: "truck",
      driver: "Mike Johnson",
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
      score: 88
    },
    {
      id: "VEH-004",
      deviceId: "driver_004",
      name: "VAN-187",
      type: "van",
      driver: "Emma Davis",
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
      score: 93
    }
  ];

  const geofences: Geofence[] = [
    {
      id: "GF-001",
      name: "Main Depot",
      type: "depot",
      center: [30.6763796, 76.7399375],
      radius: 500,
      coordinates: []
    },
    {
      id: "GF-002",
      name: "Customer Zone A",
      type: "customer",
      center: [30.6850123, 76.7401234],
      radius: 300,
      coordinates: []
    },
    {
      id: "GF-003",
      name: "Restricted Area",
      type: "restricted",
      coordinates: [
        [30.6900, 76.7450],
        [30.6950, 76.7450],
        [30.6950, 76.7500],
        [30.6900, 76.7500]
      ]
    },
    {
      id: "GF-004",
      name: "Service Center",
      type: "service",
      center: [30.6700456, 76.7250789],
      radius: 200,
      coordinates: []
    }
  ];

  const mockTripData: TripData[] = [
    {
      id: "TRIP-001",
      deviceId: "akshay",
      startTime: "2025-08-26T06:30:00.000Z",
      endTime: "2025-08-26T08:15:00.000Z",
      startLocation: [30.6763796, 76.7399375],
      endLocation: [30.6850123, 76.7401234],
      route: [
        [30.6763796, 76.7399375],
        [30.6780000, 76.7410000],
        [30.6820000, 76.7420000],
        [30.6850123, 76.7401234]
      ],
      distance: 12.5,
      duration: 105,
      events: [],
      fuelConsumed: 2.1,
      avgSpeed: 35,
      maxSpeed: 55
    }
  ];

  const getVehicleIcon = (vehicle: Vehicle) => {
    const baseClasses = "h-8 w-8 p-1.5 rounded-full text-white";
    
    switch (vehicle.status.status) {
      case "moving":
        return <Navigation className={`${baseClasses} bg-green-500`} />;
      case "idle":
        return <Clock className={`${baseClasses} bg-yellow-500`} />;
      case "parked":
        return <Square className={`${baseClasses} bg-blue-500`} />;
      case "offline":
        return <AlertTriangle className={`${baseClasses} bg-red-500`} />;
      default:
        return <Truck className={`${baseClasses} bg-gray-500`} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "moving": return "text-green-600 bg-green-50";
      case "idle": return "text-yellow-600 bg-yellow-50";
      case "parked": return "text-blue-600 bg-blue-50";
      case "offline": return "text-red-600 bg-red-50";
      case "maintenance": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const formatSpeed = (speed: number) => {
    return `${speed.toFixed(1)} km/h`;
  };

  const formatCoordinates = (lat: number, lng: number) => {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
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
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Live Map</h1>
                  <p className="text-sm text-muted-foreground">Real-time Fleet Tracking</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={showGeofences ? "default" : "outline"}
                size="sm"
                onClick={() => setShowGeofences(!showGeofences)}
                className="gap-2"
              >
                <Target className="h-4 w-4" />
                {showGeofences ? "Hide" : "Show"} Geofences
              </Button>
              <Badge variant="outline" className="gap-1">
                <Activity className="h-3 w-3" />
                {vehicles.length} Vehicles Tracked
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Vehicle List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Fleet Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vehicles.map((vehicle) => (
                    <div
                      key={vehicle.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedVehicle?.id === vehicle.id 
                          ? 'ring-2 ring-primary bg-primary/5' 
                          : 'hover:bg-slate-50'
                      }`}
                      onClick={() => setSelectedVehicle(vehicle)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getVehicleIcon(vehicle)}
                          <div>
                            <p className="font-medium text-sm">{vehicle.name}</p>
                            <p className="text-xs text-muted-foreground">{vehicle.driver}</p>
                          </div>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getStatusColor(vehicle.status.status)}`}
                        >
                          {vehicle.status.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex justify-between">
                          <span>Speed:</span>
                          <span>{formatSpeed(vehicle.location.speed)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fuel:</span>
                          <span>{vehicle.status.fuelLevel}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Updated:</span>
                          <span>{formatTimeAgo(vehicle.status.lastUpdate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geofences */}
            {showGeofences && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Geofences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {geofences.map((geofence) => (
                      <div key={geofence.id} className="p-2 rounded border">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{geofence.name}</p>
                          <Badge variant="outline" className="text-xs">
                            {geofence.type}
                          </Badge>
                        </div>
                        {geofence.radius && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Radius: {geofence.radius}m
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Interactive Map
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={selectedVehicle?.deviceId || ""} onValueChange={(deviceId) => {
                      const vehicle = vehicles.find(v => v.deviceId === deviceId);
                      if (vehicle) {
                        setSelectedVehicle(vehicle);
                        setMapCenter([vehicle.location.latitude, vehicle.location.longitude]);
                      }
                    }}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Center on vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicles.map((vehicle) => (
                          <SelectItem key={vehicle.deviceId} value={vehicle.deviceId}>
                            {vehicle.name} - {vehicle.driver}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="h-full bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center relative border-2 border-dashed border-blue-200">
                  {/* Placeholder for actual map */}
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">Interactive Map View</h3>
                    <p className="text-blue-600 mb-4">Real map integration would show vehicles at:</p>
                    <div className="bg-white/80 p-4 rounded-lg max-w-md">
                      {vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="flex items-center justify-between py-1 text-sm">
                          <span className="flex items-center gap-2">
                            {getVehicleIcon(vehicle)}
                            {vehicle.name}
                          </span>
                          <span className="text-muted-foreground">
                            {formatCoordinates(vehicle.location.latitude, vehicle.location.longitude)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Detail Popup */}
                  {selectedVehicle && (
                    <div className="absolute top-4 right-4 w-72">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between text-lg">
                            <div className="flex items-center gap-2">
                              {getVehicleIcon(selectedVehicle)}
                              {selectedVehicle.name}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedVehicle(null)}
                            >
                              ×
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-blue-500" />
                              <span>{selectedVehicle.driver}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Navigation className="h-4 w-4 text-green-500" />
                              <span>{formatSpeed(selectedVehicle.location.speed)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Fuel className="h-4 w-4 text-orange-500" />
                              <span>{selectedVehicle.status.fuelLevel}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-purple-500" />
                              <span>{selectedVehicle.status.ignitionStatus ? 'On' : 'Off'}</span>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Coordinates:</span>
                              <span>{formatCoordinates(selectedVehicle.location.latitude, selectedVehicle.location.longitude)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Altitude:</span>
                              <span>{selectedVehicle.location.altitude.toFixed(1)} m</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Accuracy:</span>
                              <span>{selectedVehicle.location.accuracy.toFixed(1)} m</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Last Update:</span>
                              <span>{formatTimeAgo(selectedVehicle.status.lastUpdate)}</span>
                            </div>
                          </div>

                          <Separator />

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="w-full gap-2">
                                <Route className="h-4 w-4" />
                                View Trip History
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Trip History - {selectedVehicle.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                {mockTripData
                                  .filter(trip => trip.deviceId === selectedVehicle.deviceId)
                                  .map((trip) => (
                                  <div key={trip.id} className="p-4 border rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                      <h4 className="font-medium">Trip {trip.id}</h4>
                                      <Badge variant="outline">
                                        {new Date(trip.startTime).toLocaleDateString()}
                                      </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                        <p className="text-muted-foreground">Distance</p>
                                        <p className="font-medium">{trip.distance} km</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Duration</p>
                                        <p className="font-medium">{trip.duration} min</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Avg Speed</p>
                                        <p className="font-medium">{trip.avgSpeed} km/h</p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">Max Speed</p>
                                        <p className="font-medium">{trip.maxSpeed} km/h</p>
                                      </div>
                                    </div>
                                    <div className="mt-3 pt-3 border-t">
                                      <p className="text-sm text-muted-foreground mb-2">Route</p>
                                      <div className="space-y-1 text-xs">
                                        <div>Start: {formatCoordinates(trip.startLocation[0], trip.startLocation[1])}</div>
                                        <div>End: {formatCoordinates(trip.endLocation[0], trip.endLocation[1])}</div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                {mockTripData.filter(trip => trip.deviceId === selectedVehicle.deviceId).length === 0 && (
                                  <div className="text-center py-8 text-muted-foreground">
                                    <Route className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>No trip history available for this vehicle</p>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
