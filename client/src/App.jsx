import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homePage/homePage";
import { Layout, RequireAuth } from "./routes/layout/layout";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import EventsPage from "./routes/homePage/eventsPage/eventsPage";
import LecturePage from "./routes/leacturePage/leacturePage";
import MinicoursePage from "./routes/minicoursePage/MinicoursePage";
import Certificates from "./routes/certificatePage/Certificate";
import Inscricoes from "./components/subscriptions/Subscriptions";
import Configurations from "./routes/configUser/Configurations";
import ConfirmPresence from "./components/confirmPresence/ConfirmPresence";
import StorePage from "./routes/storePage/StorePage";
import ProgramPage from "./routes/programPage/ProgramPage";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import About from "./routes/about/About";

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
          path:"/confirm-presence/:type/:eventId",
          element: <ConfirmPresence />
        },
        {
          path:"/storepage",
          element: <StorePage />
        },
        {
          path:"/programpage",
          element: <ProgramPage />
        },
        {
          path:"/about",
          element: <About />
        }
      ],
    }
  ]);

  return (
    <RouterProvider router={router}>
      <ScrollToTop />
    </RouterProvider>
  );
}

export default App;
