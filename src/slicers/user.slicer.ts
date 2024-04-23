 
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export interface User {
    driverId: string,
    currentLocation: {
        latitude: number
        longitude: number
    }
}

const initialState: User = {
    driverId: "",
    currentLocation: {
        latitude: 0,
        longitude: 0
    }
}

const UserSlicer =  createSlice({
    name: 'Users',
    initialState,
    reducers: {
        setupDriverDetail: (_state, action: PayloadAction<User>) => {
            
            return {
                ..._state, ...action.payload
              }
        }
         
    }
});

// Actions
export const { setupDriverDetail } = UserSlicer.actions

// Reducer
export default UserSlicer.reducer

// const selectDriverInfo = (state: RootState) => state;
// export const driverInfoSelector = createSelector(selectDriverInfo, (state) => state.driverId)
// export const driverCurrentLocationSelector = createSelector(selectDriverInfo, (state) => state.currentLocation)
// export const driverInfoSelector = useSelector((state: RootState)=>state.user)
