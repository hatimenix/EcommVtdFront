// userMiddleware.js
import { firstNameChanged } from '../slices/userSlice';

let previousFirstName = null;

const firstNameMiddleware = (store) => (next) => (action) => {
    if (action.type === 'user/fetchUser/fulfilled') {
        // Only handle the action when user data is fetched
        const state = store.getState();
        const currentFirstName = state.user.first_name; // Correct property name

        if (currentFirstName !== previousFirstName) {
            store.dispatch(firstNameChanged(currentFirstName));
            previousFirstName = currentFirstName;
        }
    }

    return next(action);
};

export default firstNameMiddleware;
