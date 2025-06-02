import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
    route('sign-in', 'routes/root/sign-in.tsx'),
    layout("routes/admin/admin-layout.tsx", [
        route( 'dashboard', 'routes/admin/dashboard.tsx'),
        route( 'all-users', 'routes/admin/all-users.tsx'),
        route( 'zin', 'routes/admin/zin.tsx'),
        route( 'trips', 'routes/admin/trips.tsx'),
        route( 'trips/create', 'routes/admin/create-trip.tsx'),
        route('*', 'routes/admin/not-found.tsx'),  // Catch all unmatched routes
        
    ]),
    
] satisfies RouteConfig;