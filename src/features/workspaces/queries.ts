import { DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { getMember } from "../members/utils";
import { Workspace } from "./types";
import { createSessionClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";

export const getWorkspacesAction = async () => {
    try {
        const { account, databases } = await createSessionClient();

        const user = await account.get();

        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [Query.equal("userId", user.$id)]
        );

        if (members.total === 0) {
            return { documents: [], total: 0 }
        }

        const workspaceIds = members.documents.map((member) => member.workspaceId);

        const workspaces = await databases.listDocuments(
            DATABASE_ID,
            WORKSPACE_ID,
            [
                Query.orderDesc("$createdAt"),
                Query.contains("$id", workspaceIds)
            ]
        );

        return workspaces
    } catch (error) {
        console.log(error);
        return { documents: [], total: 0 };
    }
}

type GetWorkspaceProps = {
    workspaceId: string
}

export const getWorkspace = async ({ workspaceId }: GetWorkspaceProps) => {
    try {
        const { account, databases } = await createSessionClient();

        const user = await account.get();

        const member = await getMember({
            databases,
            userId: user.$id,
            workspaceId
        });

        if (!member) return null;

        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACE_ID,
            workspaceId
        );

        return workspace
    } catch {
        return null;
    }
}

export const getWorkspaceInfo = async ({ workspaceId }: GetWorkspaceProps) => {
    try {
        const { databases } = await createSessionClient();

        const workspace = await databases.getDocument<Workspace>(
            DATABASE_ID,
            WORKSPACE_ID,
            workspaceId
        );

        return {
            name: workspace.name,
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}