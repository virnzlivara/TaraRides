export const RideRequest = [{
    id: "1",
    userId: "1",
    driverId: null,
    pickupLocation: { //SM MOLINO
        latitude: 14.384019949999999,
        longitude: 120.97697465101861
    },
    destination: {  //EVIA MALL
        latitude: 14.3754474 ,
        longitude: 121.0117115,
    },
    status: 'pending', //pending' | 'accepted' | 'declined' | 'started' |'picked-up' | 'dropped-off', // Status of the ride request
    pickupTime: Date.now, // Time when the ride is scheduled for pickup
    timestamp: Date.now, // Timestamp of when the ride request was made
},
{
    id: "1",
    userId: "1",
    driverId: null,
    pickupLocation: { //SM BACOOR
        latitude: 14.4578,
        longitude: 120.9425
    },
    destination: { //St. Charbel Dasmariñas Cavite, Saint Charbel Avenue, Sampaloc IV, Dasmariñas, 4115 Cavite, Philippines
        latitude: 14.303991317749023,
        longitude: 120.96922302246094 
    },
    status: 'pending', //pending' | 'accepted' | 'declined' | 'started' |'picked-up' | 'dropped-off', // Status of the ride request
    pickupTime: Date.now, // Time when the ride is scheduled for pickup
    timestamp: Date.now, // Timestamp of when the ride request was made
},{
    id: "1",
    userId: "1",
    driverId: null,
    pickupLocation: { //Saint Dominic Street, Bacoor, 4102 Calabarzon Cavite, Philippines
        latitude: 14.3724903,
        longitude: 120.9778322
    },
    destination: { //SM South Mall, Alabang-Zapote Road, Southern Manila District, 1750 2nd District Metro Manila, Philippines
        latitude: 14.4330297,
        longitude: 121.0106633 
    },
    status: 'pending', //pending' | 'accepted' | 'declined' | 'started' |'picked-up' | 'dropped-off', // Status of the ride request
    pickupTime: Date.now, // Time when the ride is scheduled for pickup
    timestamp: Date.now, // Timestamp of when the ride request was made
}]

// [
//     {
//         id: 'R1',  
//         userId: 'U1',  
//         driverId: null, //this needs to populated when accepted
        
//         pickupLocation: {
//         latitude: number, // Latitude of the pickup location
//         longitude: number, // Longitude of the pickup location
//         },
//         destination: {
//         latitude: number, // Latitude of the destination
//         longitude: number, // Longitude of the destination
//         },
//         status: 'pending' | 'accepted' | 'declined' | 'started' |
//         'picked-up' | 'dropped-off', // Status of the ride request
//         pickupTime: Date, // Time when the ride is scheduled for pickup
//         timestamp: Date, // Timestamp of when the ride request was made
//         }
// ]