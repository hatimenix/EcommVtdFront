import { useDispatch } from "react-redux";
import { useCurrentUserSelector } from "../store/selectors/selectors";
import { fetchUser } from "../store/slices/userSlice";
import { useEffect } from "react";


const UserData = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
      }, [dispatch]);


const user = useCurrentUserSelector()
console.log("le user: ", user);
return user

}

export default UserData