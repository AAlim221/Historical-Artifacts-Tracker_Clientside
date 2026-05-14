import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../../layout/MainLayout";

import Home from "../../pages/Home/Home";
import Register from "../../pages/Register/Register";
import SignIn from "../../pages/SingIn/SignIn";

import AllArtifacts from "../../pages/AllArtifacts/AllArtifacts";
import AddArtifact from "../../pages/AddArtifact/AddArtifact";
import ArtifactDetails from "../../pages/ArtifactDetails/ArtifactDetails";
import MyArtifacts from "../../pages/MyArtifacts/MyArtifacts";
import LikedArtifacts from "../../pages/LikedArtifacts/LikedArtifacts";
import UpdateArtifact from "../../pages/UpdateArtifact/UpdateArtifact";
import ErrorPage from "../../ErrorPage/ErrorPage";

import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/all-artifacts",
        element: <AllArtifacts />,
      },
      {
        path: "/add-artifact",
        element: (
          <PrivateRoute>
            <AddArtifact />
          </PrivateRoute>
        ),
      },
      {
        path: "/artifact/:id",
        element: (
          <PrivateRoute>
            <ArtifactDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-artifacts",
        element: (
          <PrivateRoute>
            <MyArtifacts />
          </PrivateRoute>
        ),
      },
      {
        path: "/liked-artifacts",
        element: (
          <PrivateRoute>
            <LikedArtifacts />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-artifact/:id",
        element: (
          <PrivateRoute>
            <UpdateArtifact />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;