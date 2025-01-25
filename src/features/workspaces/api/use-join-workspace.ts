import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspace[":workspaceId"]["join"]["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.workspace[":workspaceId"]["join"]["$post"]>;

export const useJoinWorkspace = () => {
    const queryClient = useQueryClient();

    const mutate = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mutationFn: async ({ param, json }) => {
            const response = await client.api.workspace[":workspaceId"]["join"]["$post"]({ param, json })
            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success("Joined workspace")
            queryClient.invalidateQueries({ queryKey: ["workspaces"]});
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id]});
        },
        onError: () => {
            toast.error("failed to join workspace")
        }
    });

    return mutate
}