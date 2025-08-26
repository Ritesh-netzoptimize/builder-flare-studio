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
  status: "moving" | "idle" | "parked" | "offline" | "maintenance";
  lastUpdate: string;
  driver?: string;
  ignitionStatus: boolean;
  fuelLevel?: number;
  engineHours?: number;
}

export interface VehicleSpecs {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  color: string;
  fuelType: "gasoline" | "diesel" | "electric" | "hybrid";
  capacity: {
    passengers?: number;
    cargo?: number; // in cubic meters
    weight?: number; // in tons
  };
}

export interface MaintenanceRecord {
  id: string;
  type: "scheduled" | "repair" | "inspection" | "emergency";
  description: string;
  date: string;
  nextDue?: string;
  cost?: number;
  mileage: number;
  status: "completed" | "pending" | "overdue";
  servicedBy?: string;
}

export interface Vehicle {
  id: string;
  deviceId: string;
  name: string;
  type: "truck" | "van" | "car" | "bus" | "motorcycle" | "trailer";
  specs: VehicleSpecs;
  driver: string;
  assignedDriverId?: string;
  location: VehicleLocation;
  status: VehicleStatus;
  efficiency: number;
  score: number;
  odometer: number;
  maintenanceRecords: MaintenanceRecord[];
  lastMaintenance?: string;
  nextMaintenance?: string;
  insuranceExpiry: string;
  registrationExpiry: string;
  fuelCapacity: number;
  purchaseDate: string;
  warrantyExpiry?: string;
  notes?: string;
}

export interface Geofence {
  id: string;
  name: string;
  type: "depot" | "warehouse" | "restricted" | "customer" | "service";
  coordinates: [number, number][];
  radius?: number; // for circular geofences
  center?: [number, number]; // for circular geofences
}

export interface DrivingEvent {
  id: string;
  deviceId: string;
  type:
    | "harsh_braking"
    | "rapid_acceleration"
    | "sharp_turn"
    | "speeding"
    | "idling";
  timestamp: string;
  location: [number, number];
  severity: "low" | "medium" | "high";
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

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  employeeId: string;
  status: "active" | "inactive" | "on_leave" | "suspended";
  assignedVehicles: string[];
  currentVehicle?: string;
  rating: number;
  totalDistance: number;
  safetyScore: number;
  joiningDate: string;
  avatar?: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  vehicleId?: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "normal" | "high" | "urgent";
  type: "text" | "alert" | "instruction";
}

export interface Alert {
  id: string;
  type:
    | "speeding"
    | "harsh_braking"
    | "geofence"
    | "maintenance"
    | "fuel_low"
    | "engine_fault";
  deviceId: string;
  vehicleName: string;
  driver: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
  location?: [number, number];
  description: string;
  resolved: boolean;
}

export interface VehicleFilter {
  status?: string[];
  type?: string[];
  driver?: string[];
  maintenance?: string[];
  location?: string;
  fuelLevel?: [number, number];
  efficiency?: [number, number];
}

export interface ReportFilter {
  dateRange: {
    start: string;
    end: string;
  };
  vehicles?: string[];
  drivers?: string[];
  vehicleTypes?: string[];
  regions?: string[];
}

export interface FuelUsageData {
  vehicleId: string;
  vehicleName: string;
  date: string;
  fuelConsumed: number;
  distance: number;
  efficiency: number;
  cost: number;
}

export interface MileageData {
  vehicleId: string;
  vehicleName: string;
  date: string;
  totalDistance: number;
  businessDistance: number;
  personalDistance: number;
  averageSpeed: number;
}

export interface IdleTimeData {
  vehicleId: string;
  vehicleName: string;
  driver: string;
  date: string;
  totalIdleTime: number; // in minutes
  idleEvents: number;
  fuelWasted: number;
  location: string;
}

export interface ViolationData {
  vehicleId: string;
  vehicleName: string;
  driver: string;
  date: string;
  type:
    | "speeding"
    | "harsh_braking"
    | "rapid_acceleration"
    | "geofence_violation";
  severity: "low" | "medium" | "high";
  location: [number, number];
  details: string;
  resolved: boolean;
}

export interface MaintenanceCostData {
  vehicleId: string;
  vehicleName: string;
  date: string;
  type: "scheduled" | "repair" | "inspection" | "emergency";
  cost: number;
  description: string;
  servicedBy: string;
  mileage: number;
}

export interface DriverPerformanceData {
  driverId: string;
  driverName: string;
  date: string;
  totalDistance: number;
  fuelEfficiency: number;
  safetyScore: number;
  violations: number;
  idleTime: number;
  rating: number;
}

export interface Report {
  id: string;
  name: string;
  type:
    | "fuel_usage"
    | "mileage"
    | "idle_time"
    | "violations"
    | "maintenance_costs"
    | "driver_performance"
    | "custom";
  description: string;
  filters: ReportFilter;
  data: any[];
  chartConfig?: ChartConfig;
  createdAt: string;
  createdBy: string;
  lastGenerated: string;
  isScheduled: boolean;
  scheduleFrequency?: "daily" | "weekly" | "monthly";
}

export interface ChartConfig {
  type: "bar" | "line" | "pie" | "doughnut" | "area" | "scatter";
  title: string;
  xAxis: {
    label: string;
    field: string;
  };
  yAxis: {
    label: string;
    field: string;
  };
  groupBy?: string;
  colors?: string[];
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type:
    | "fuel_usage"
    | "mileage"
    | "idle_time"
    | "violations"
    | "maintenance_costs"
    | "driver_performance";
  category: "operational" | "financial" | "safety" | "maintenance";
  defaultFilters: Partial<ReportFilter>;
  chartConfigs: ChartConfig[];
  icon: string;
  color: string;
}

export interface DashboardMetrics {
  totalFuelCost: number;
  totalDistance: number;
  totalIdleTime: number;
  totalViolations: number;
  averageEfficiency: number;
  maintenanceCosts: number;
  topPerformingDriver: string;
  worstPerformingVehicle: string;
}

export interface ExportOptions {
  format: "pdf" | "csv" | "excel" | "json";
  includeCharts: boolean;
  includeRawData: boolean;
  fileName?: string;
}
