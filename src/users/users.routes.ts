import { Router } from "express";
import { UserController } from "./users.controller";

export class UserRoutes {
  public readonly router = Router();

  constructor(private readonly userController: UserController) {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post("/admin", (req, res) =>
      this.userController.createAdmin(req, res),
    );
    this.router.post("/", (req, res) =>
      this.userController.createUser(req, res),
    );
    this.router.get("/", (req, res) => this.userController.getAll(req, res));
    this.router.get("/:id", (req, res) =>
      this.userController.getById(req, res),
    );
    this.router.put("/:id", (req, res) =>
      this.userController.updateUser(req, res),
    );
    this.router.delete("/:id", (req, res) =>
      this.userController.deleteUser(req, res),
    );
  }
}
