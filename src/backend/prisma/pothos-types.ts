/* eslint-disable */
import type { Prisma, User, Assignment } from "@prisma/client";
export default interface PrismaTypes {
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: "Assignment";
        ListRelations: "Assignment";
        Relations: {
            Assignment: {
                Shape: Assignment[];
                Types: PrismaTypes["Assignment"];
            };
        };
    };
    Assignment: {
        Name: "Assignment";
        Shape: Assignment;
        Include: Prisma.AssignmentInclude;
        Select: Prisma.AssignmentSelect;
        OrderBy: Prisma.AssignmentOrderByWithRelationInput;
        WhereUnique: Prisma.AssignmentWhereUniqueInput;
        Where: Prisma.AssignmentWhereInput;
        RelationName: "creator";
        ListRelations: never;
        Relations: {
            creator: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
}