import { applyDecorators, UseGuards } from "@nestjs/common";
import { Role } from "../../common/enums/role.enum";
import { Roles } from "./role.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function Auth (role:Role){
    return applyDecorators(
        Roles(role), // Puedes cambiar ROLE.USER por el rol que desees asignar
        UseGuards(AuthGuard, RolesGuard)
    )
}