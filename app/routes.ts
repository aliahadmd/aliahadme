import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("throughts", "routes/throughts.tsx"),
  route("throughts/:slug", "routes/throughts.$slug.tsx"),
  route("projects", "routes/projects.tsx"),
  route("projects/:slug", "routes/projects.$slug.tsx"),
  route("awards", "routes/awards.tsx"),
  route("podcasts", "routes/podcasts.tsx"),
] satisfies RouteConfig;
