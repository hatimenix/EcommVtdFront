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

        // Check if a package with the same combination exists
        // const exists = await axiosClient.get('/packages/exists/', {
        //     params: {
        //         pack_articles: JSON.stringify(packageData.pack_articles),
        //         customer_id: packageData.customer_id,
        //     },
        // });

        // if (exists.data.exists) {
        //     // Package with the same combination exists, show an error message or handle it as needed
        //     dispatch(createPackageFailure('Package already exists'));
        //     cogoToast.error('Package already exists', { position: 'top-right' });
        // } else {
        // Package with the same combination doesn't exist, proceed with creation
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
