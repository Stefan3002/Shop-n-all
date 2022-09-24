import ProfilePage from "../components/profile-page/profile-page";
import {Route, Routes} from "react-router-dom";

const ProfileRoutes = () => {
    return (
        <Routes>
            <Route index element={<ProfilePage />} />
        </Routes>
    )
}
export default ProfileRoutes