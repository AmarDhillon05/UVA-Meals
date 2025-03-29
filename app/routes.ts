import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/auth/register", "routes/auth/register.tsx"),
  route("/auth/log-in", "routes/auth/log-in.tsx"),
] satisfies RouteConfig;
