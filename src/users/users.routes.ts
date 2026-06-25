import { Router } from "express";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { PostgresUserRepository } from "./users.repository.postgres";
import { pool } from "../config";

const router = Router();

const userRepository = new PostgresUserRepository(pool);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/admin", (req, res) => userController.createAdmin(req, res));
router.post("/", (req, res) => userController.createUser(req, res));
router.get("/", (req, res) => userController.getAll(req, res));
router.get("/:id", (req, res) => userController.getById(req, res));
router.put("/:id", (req, res) => userController.updateUser(req, res));
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

export default router;
