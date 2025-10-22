import { Router } from "express";
import { AuthRouters } from "../modules/auth/auth.route";

export const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRouters,
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});