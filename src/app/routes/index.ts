import { Router } from "express";
import { AuthRouters } from "../modules/auth/auth.route";
import { ProjectRouters } from "../modules/project/project.route";

export const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRouters,
    },
    {
        path: "/project",
        route: ProjectRouters,
    },
];

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});