 
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { IRide } from "../../types/IRide";

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
        addRides: (_state, action: PayloadAction<IRide>) => { 
           
            return {
                ..._state, rideList: action.payload
              }
        },
        updateDetails: (_state, action: PayloadAction<Partial<IRide>>) => { 
            action
            return {
                ..._state, ...action.payload
              }
        }
         
    }
});

// Actions
export const { addRides, updateDetails } = RideSlicer.actions

// Reducer
export default RideSlicer.reducer

// const selectDriverInfo = (state: RootState) => state;
// export const driverInfoSelector = createSelector(selectDriverInfo, (state) => state.driverId)
// export const driverCurrentLocationSelector = createSelector(selectDriverInfo, (state) => state.currentLocation)
// export const driverInfoSelector = useSelector((state: RootState)=>state.user)
