export const RideRequest = [{
    id: "0",
    userId: "Rider1",
    driverId: null,
    pickupLocation: { //SM MOLINO
        latitude: 14.384019949999999,
        longitude: 120.97697465101861
    },
    destination: {  
        latitude: 14.484019945999959,
        longitude: 120.97697465101861
    },
    status: 'pending', //pending' | 'accepted' | 'declined' | 'started' |'picked-up' | 'dropped-off', // Status of the ride request
    pickupTime: new Date().toDateString(), // Time when the ride is scheduled for pickup
    timestamp: new Date().toDateString(), // Timestamp of when the ride request was made,
    note: "please pick me"
},
{
    id: "1",
    userId: "Rider2",
    driverId: null,
    pickupLocation: { //SM BACOOR
        latitude: 14.3754474 ,
        longitude: 121.0117115,
    },
    destination: { //St. Charbel Dasmariñas Cavite, Saint Charbel Avenue, Sampaloc IV, Dasmariñas, 4115 Cavite, Philippines
        latitude: 14.303991317749023,
        longitude: 120.96922302246094 
    },
    status: 'pending', //pending' | 'accepted' | 'declined' | 'started' |'picked-up' | 'dropped-off', // Status of the ride request
    pickupTime: new Date().toDateString(), // Time when the ride is scheduled for pickup
    timestamp: new Date().toDateString(), // Timestamp of when the ride request was made
    note: "Im late"
}
,{
    id: "2",
    userId: "Rider3",
    driverId: null,
    pickupLocation: { //Saint Dominic Street, Bacoor, 4102 Calabarzon Cavite, Philippines
        latitude: 14.40,
        longitude: 120.974795,
    },
    destination: { //SM South Mall, Alabang-Zapote Road, Southern Manila District, 1750 2nd District Metro Manila, Philippines
        latitude: 14.4330297,
        longitude: 121.0106633 
    },
    status: 'pending', //pending' | 'accepted' | 'declined' | 'started' |'picked-up' | 'dropped-off', // Status of the ride request
    pickupTime: new Date().toDateString(), // Time when the ride is scheduled for pickup
    timestamp: new Date().toDateString(), // Timestamp of when the ride request was made
    note: "I will give you a tip!"
}
,{
    id: "3",
    userId: "Rider4",
    driverId: null,
    pickupLocation: {  
        latitude: 15.50,
        longitude: 120.974795,
    },
    destination: { //SM South Mall, Alabang-Zapote Road, Southern Manila District, 1750 2nd District Metro Manila, Philippines
        latitude: 15.4330297,
        longitude: 121.0106633 
    },
    status: 'pending', //pending' | 'accepted' | 'declined' | 'started' |'picked-up' | 'dropped-off', // Status of the ride request
    pickupTime: new Date().toDateString(), // Time when the ride is scheduled for pickup
    timestamp: new Date().toDateString(), // Timestamp of when the ride request was made
    note: "I will give you a tip!"
}
,{
    id: "4",
    userId: "Rider5",
    driverId: null,
    pickupLocation: {  
        latitude: 13.40,
        longitude: 120.974795,
    },
    destination: { 
        latitude: 13.4330297,
        longitude: 121.0106633 
    },
    status: 'pending', //pending' | 'accepted' | 'declined' | 'started' |'picked-up' | 'dropped-off', // Status of the ride request
    pickupTime: new Date().toDateString(), // Time when the ride is scheduled for pickup
    timestamp: new Date().toDateString(), // Timestamp of when the ride request was made
    note: "I will give you a tip!"
}
]

// SM MANILA
// SM MEGAMALL
// SM MOA

// KFC PAGASA
// MCDO RFC
// WALTERMART
// JOLIBEE MOLINO

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