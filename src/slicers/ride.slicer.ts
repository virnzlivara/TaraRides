 
import { IRide } from './../../types/IRide';
import { RootState } from './../store';
 
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";  

export interface IRider {
    rideList: IRide[]  
    
}

const initialState = {
    rideList: []
     
}

const RideSlicer =  createSlice({
    name: 'Users',
    initialState,
    reducers: {
        addRides: (_state, action: PayloadAction<IRider>)=> {   
            return {
                ..._state,rideList: action.payload.rideList
              }
        },
        mockGoToDropOff: (_state, action: PayloadAction<IRider>)=> {   
            const updated = _state.rideList.map((ride: IRide) => {
                if (ride.userId == action.payload.id) {
                    return {
                        ...ride, 
                        pickupLocation: action.payload.pickupLocation,
                        
                    }
                }
                return ride
            }) 
            return {
                ..._state, rideList: updated
            }
        },
        updateDetails: (_state, action: PayloadAction<Partial<IRide>>) => {
             
            if (action.payload.status === "declined") {
                
                const updateDelete = _state.rideList.filter((ride: IRide)=> {
                    return ride.userId !== action.payload.id
                }) 
                return {
                    ..._state, rideList: updateDelete
                  }
            } else {
                const driverId = action.payload.driverId 
                const updated = _state.rideList.map((ride: IRide) => {
                    if (ride.userId == action.payload.id) {
                        return {
                            ...ride,
                            status: action.payload.status,
                            driverId,
                            
                        }
                    }
                    return ride
                }) 
                return {
                    ..._state, rideList: updated
                }
            }
            
        }
         
    }
});

// Actions
export const { addRides, updateDetails, mockGoToDropOff } = RideSlicer.actions

// Reducer
export default RideSlicer.reducer;

export const selectRidelist = (state: RootState) => state.ride.rideList

export const selectActiveRide = createSelector(
    selectRidelist,
    rideList => rideList.filter(todo => todo)
  );

 
  const rideSelector = (state:RootState)=>state.ride; 

  
//   const approveSelector1 = createSelector(rideSelector, (state: RootState) => state.ride.rideList.filter((ride : IRide)=>ride.status === "approved"))
// const selectDriverInfo = (state: RootState) => state;
const approveSelector = createSelector(rideSelector, (state)  => state.rideList.find((ride : IRide)=>
    ride.status === "accepted"
))
const startedSelector = createSelector(rideSelector, (state)  => state.rideList.find((ride : IRide) =>
    ride.status === "started"
))
const pickedUpSelector = createSelector(rideSelector, (state)  => state.rideList.find((ride : IRide)=>
    ride.status === "picked-up"
))
const droppedOffSelector = createSelector(rideSelector, (state)  => state.rideList.find((ride : IRide)=>
    ride.status === "dropped-off"
))

const inProgressRideSelector = createSelector(rideSelector, (state)  => state.rideList.find((ride : IRide)=>
    ride.status === "accepted" || ride.status === "started" || ride.status === "picked-up"
))

const pendingRideSelector = createSelector(rideSelector, (state)  => state.rideList.filter((ride : IRide)=>
    ride.status === 'dropped-off' || []
))

const within1KMSelector = createSelector(rideSelector, (state)  => state.rideList.filter((ride : IRide)=>
    ride
))



 export {approveSelector, startedSelector, pickedUpSelector, droppedOffSelector, inProgressRideSelector, pendingRideSelector, within1KMSelector}