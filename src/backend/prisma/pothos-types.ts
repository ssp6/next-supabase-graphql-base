/* eslint-disable */
import type { Prisma, Account, Session, User, VerificationToken, Assignment } from "@prisma/client";
export default interface PrismaTypes {
    Account: {
        Name: "Account";
        Shape: Account;
        Include: Prisma.AccountInclude;
        Select: Prisma.AccountSelect;
        OrderBy: Prisma.AccountOrderByWithRelationInput;
        WhereUnique: Prisma.AccountWhereUniqueInput;
        Where: Prisma.AccountWhereInput;
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        OrderBy: Prisma.SessionOrderByWithRelationInput;
        WhereUnique: Prisma.SessionWhereUniqueInput;
        Where: Prisma.SessionWhereInput;
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Types: PrismaTypes["User"];
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        RelationName: "accounts" | "sessions" | "Assignment";
        ListRelations: "accounts" | "sessions" | "Assignment";
        Relations: {
            accounts: {
                Shape: Account[];
                Types: PrismaTypes["Account"];
            };
            sessions: {
                Shape: Session[];
                Types: PrismaTypes["Session"];
            };
            Assignment: {
                Shape: Assignment[];
                Types: PrismaTypes["Assignment"];
            };
        };
    };
    VerificationToken: {
        Name: "VerificationToken";
        Shape: VerificationToken;
        Include: never;
        Select: Prisma.VerificationTokenSelect;
        OrderBy: Prisma.VerificationTokenOrderByWithRelationInput;
        WhereUnique: Prisma.VerificationTokenWhereUniqueInput;
        Where: Prisma.VerificationTokenWhereInput;
        RelationName: never;
        ListRelations: never;
        Relations: {};
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