// packageActions.js

import axios from 'axios';
import {
    createPackageRequest,
    createPackageSuccess,
    createPackageFailure,
} from '../slices/pkgSlice__';
import axiosClient from '../../axios-client';
import cogoToast from 'cogo-toast';

export const createPackage = (packageData) => {
    return async (dispatch) => {
        dispatch(createPackageRequest());


        axiosClient
            .post('packages/', packageData)
            .then((response) => {
                const createdPackage = response.data;
                dispatch(createPackageSuccess(createdPackage));
                cogoToast.success('Lot created successfully', { position: 'bottom-right' });
            })
            .catch((error) => {
                console.error('Error creating package:', error);
                dispatch(createPackageFailure('Failed to create package'));
                cogoToast.error('Failed to create package', { position: 'top-right' });
            });
        // }
    };
};
