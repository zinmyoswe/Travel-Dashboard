import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route( 'dashboard', 'routes/admin/dashboard.tsx'),
    route( 'zin', 'routes/admin/zin.tsx')
] satisfies RouteConfig;