import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspace[":workspaceId"]["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.workspace[":workspaceId"]["$delete"]>;

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();

    const mutate = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mutationFn: async ({ param }) => {
            const response = await client.api.workspace[":workspaceId"]["$delete"]({ param })
            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success("Workspace deleted successfully")
            queryClient.invalidateQueries({ queryKey: ["workspaces"]});
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id]});
        },
        onError: () => {
            toast.error("failed to delete workspace")
        }
    });

    return mutate
}