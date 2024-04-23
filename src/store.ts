// import RecipeSlicer from "./slicers/RecipeSlicer";
// import SelectRecipeSlicer from "./slicers/SelectRecipeSlicer";
// import ToastSlicer from "./slicers/ToastSlicer";
// import UserPreferenceSlicer from "./slicers/UserPreferenceSlicer";
import { configureStore } from "@reduxjs/toolkit"; 
import userSlicer from "./slicers/user.slicer";
import rideSlicer from "./slicers/ride.slicer";

export const store = configureStore({
    reducer: {
        user: userSlicer,
        ride: rideSlicer
        // recipes: RecipeSlicer,
        // userPreference: UserPreferenceSlicer,
        // selectRecipe: SelectRecipeSlicer,
        // toast: ToastSlicer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch