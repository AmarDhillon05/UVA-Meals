import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/auth/register", "routes/auth/register.tsx"),
  route("/auth/log-in", "routes/auth/log-in.tsx"),
  route("/auth/profile", "routes/auth/profile.tsx"),
  route("/info/menu", "routes/menu.tsx"),
] satisfies RouteConfig;
