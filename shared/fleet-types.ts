export interface VehicleLocation {
  accuracy: number;
  altitude: number;
  createdAt: string; // ISO timestamp
  deviceId: string;
  latitude: number;
  longitude: number;
  speed: number;
  timestamp: string; // ISO timestamp
}

export interface VehicleStatus {
  deviceId: string;
  status: 'moving' | 'idle' | 'parked' | 'offline' | 'maintenance';
  lastUpdate: string;
  driver?: string;
  ignitionStatus: boolean;
  fuelLevel?: number;
  engineHours?: number;
}

export interface Vehicle {
  id: string;
  deviceId: string;
  name: string;
  type: 'truck' | 'van' | 'car' | 'bus';
  driver: string;
  location: VehicleLocation;
  status: VehicleStatus;
  efficiency: number;
  score: number;
}

export interface Geofence {
  id: string;
  name: string;
  type: 'depot' | 'warehouse' | 'restricted' | 'customer' | 'service';
  coordinates: [number, number][];
  radius?: number; // for circular geofences
  center?: [number, number]; // for circular geofences
}

export interface DrivingEvent {
  id: string;
  deviceId: string;
  type: 'harsh_braking' | 'rapid_acceleration' | 'sharp_turn' | 'speeding' | 'idling';
  timestamp: string;
  location: [number, number];
  severity: 'low' | 'medium' | 'high';
  details: {
    speed?: number;
    acceleration?: number;
    duration?: number;
  };
}

export interface TripData {
  id: string;
  deviceId: string;
  startTime: string;
  endTime: string;
  startLocation: [number, number];
  endLocation: [number, number];
  route: [number, number][];
  distance: number;
  duration: number;
  events: DrivingEvent[];
  fuelConsumed?: number;
  avgSpeed: number;
  maxSpeed: number;
}

export interface FleetStats {
  active: number;
  idle: number;
  offline: number;
  maintenance: number;
  total: number;
}

export interface FleetKPIs {
  avgFuelConsumption: number;
  fuelChange: number;
  totalDistance: number;
  distanceChange: number;
  avgSafetyScore: number;
  safetyChange: number;
  activeAlerts: number;
}

export interface Alert {
  id: string;
  type: 'speeding' | 'harsh_braking' | 'geofence' | 'maintenance' | 'fuel_low' | 'engine_fault';
  deviceId: string;
  vehicleName: string;
  driver: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  location?: [number, number];
  description: string;
  resolved: boolean;
}
