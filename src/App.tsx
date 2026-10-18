import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import MainLayout from "./components/layout/MainLayout";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./components/layout/AuthLayout";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute";
import ProtectedAuthRoute from "./protectedRoutes/ProtectedAuthRoute";
import AuthContextProvider from "./context/authContext";
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: (
            <ProtectedAuthRoute>
              <Login />
            </ProtectedAuthRoute>
          ),
        },
        {
          path: "/register",
          element: (
            <ProtectedAuthRoute>
              <Register />
            </ProtectedAuthRoute>
          ),
        },
      ],
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile/:profileId",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "posts/:postId",
          element: (
            <ProtectedRoute>
              <PostDetailPage />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <HeroUIProvider>
          <RouterProvider router={routes} />
        </HeroUIProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
