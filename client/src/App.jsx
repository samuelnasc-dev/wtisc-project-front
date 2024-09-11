import { createBrowserRouter, RouterProvider } from "react-router-dom";
import profilePageLoader from "./lib/loaders";
import HomePage from "./routes/homePage/homePage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import Login from "./routes/login/login";
import ProfilePage from "./routes/profilePage/profilePage";
import ProfileUpdatePage from "./routes/profileUpdatePage/profileUpdatePage";
import Register from "./routes/register/register";
import EventsPage from "./routes/homePage/eventsPage/eventsPage";
import LecturePage from "./routes/leacturePage/leacturePage";
import MinicoursePage from "./routes/minicoursePage/MinicoursePage";
import Certificates from "./components/certificatePage/Certificate";
import Inscricoes from "./components/subscriptions/Subscriptions";
import Configurations from "./components/configUser/Configurations";
import ConfirmPresence from "./components/confirmPresence/ConfirmPresence";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/eventsPage/:type",
          element: <EventsPage />,
        },
        {
          path:"/lecturePage/:id",
          element: <LecturePage />
        },
        {
          path:"/minicoursePage/:id",
          element: <MinicoursePage />,
        },
        {
          path:"/certificates",
          element: <Certificates />
        },
        {
          path: "/inscricoes",
          element: <Inscricoes />
        },
        {
          path: "/configurations",
          element: <Configurations />
        },
        {
          path: "/minicourses/auth/:minicourseId",
          element: <ConfirmPresence />
        }
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
