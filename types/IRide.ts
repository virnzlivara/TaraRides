export interface IRide {
    id: string, // Unique identifier for the ride
    userId: string, // ID of the user requesting the ride
    driverId: string | null, // ID of the driver accepting the ride  (null if not accepted)
    
    pickupLocation: ICoordinates,
    destination: ICoordinates
    status: string, // Status of the ride request
    pickupTime: string, // Time when the ride is scheduled for pickup
    timestamp: string, // Timestamp of when the ride request was made
    note: string,
    distance: number
}

export interface ICoordinates {
    latitude: number, // Latitude of the destination
    longitude: number, // Longitude of the destination
}