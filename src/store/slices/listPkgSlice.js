import { createSlice } from '@reduxjs/toolkit';
import { fetchCst } from '../../services/fetchData';
import cogoToast from 'cogo-toast';

const listPkgSlice = createSlice({
    name: 'lpkg',
    initialState: {
        lpackages: [], // Initial state for sellers
    },
    reducers: {
        addToList(state, action) {

            const arPkg = action.payload
            const arItems = state.lpackages.find(item => item.id_art === arPkg.id_art);
            console.log("arPkg.....................", arPkg);

            if (!arItems) {
                state.lpackages.push({
                    ...arPkg

                });

            } else {
                cogoToast.success("Already exists", { position: "bottom-right" });

            }

            cogoToast.success("Added To List", { position: "bottom-right" });

        },

        deleteFromList(state, action) {

            state.lpackages = state.lpackages.filter(item => item.id_art !== action.payload);
            console.log("remove.....................", action.payload);

            cogoToast.error("Removed From List", { position: "bottom-right" });

        }
    }

});
export const { addToList, deleteFromList } = listPkgSlice.actions;

export default listPkgSlice.reducer;
