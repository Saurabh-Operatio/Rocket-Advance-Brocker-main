import { Dashbaord, Home, Login, Profile, Register } from "./LazyRoutes";
import { PublicRoutesPath, PrivateRoutesPath } from "./StaticPaths.jsx";

export const publicRoutesData = [
  {
    path: PublicRoutesPath.login,
    component: <Login />,
  },
];

export const privateRoutesData = [
  {
    path: PrivateRoutesPath.dashboard,
    component: <Dashbaord />,
  },
  {
    path: PrivateRoutesPath.profile,
    component: <Profile />,
  },
];
