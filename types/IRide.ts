export interface IRide {
    id: string, // Unique identifier for the ride
    userId: string, // ID of the user requesting the ride
    driverId: string | null, // ID of the driver accepting the ride  (null if not accepted)
    
    pickupLocation: {
        latitude: number, // Latitude of the pickup location
        longitude: number, // Longitude of the pickup location
    },
    destination: {
        latitude: number, // Latitude of the destination
        longitude: number, // Longitude of the destination
    },
    status: string, // Status of the ride request
    pickupTime: string, // Time when the ride is scheduled for pickup
    timestamp: string, // Timestamp of when the ride request was made
}