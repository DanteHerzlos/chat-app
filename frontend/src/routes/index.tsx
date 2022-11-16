import AuthPage from "../pages/AuthPage/AuthPage";
import ChatPage from "../pages/ChatPage/ChatPage";
import MainPage from "../pages/MainPage/MainPage";
import { RouteProps } from "react-router-dom";


export const privateRoutes: RouteProps[] = [
  { path: "/", element: <MainPage /> },
  { path: "/*", element: <MainPage /> },
  { path: "/room/:id", element: <ChatPage /> },
];

export const publicRoutes: RouteProps[] = [
  { path: "/login", element: <AuthPage /> },
  { path: "/*", element: <AuthPage /> },
];