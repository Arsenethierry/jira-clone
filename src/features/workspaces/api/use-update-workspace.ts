import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspace[":workspaceId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.workspace[":workspaceId"]["$patch"]>;

export const useUpdateWorkspace = () => {
    const queryClient = useQueryClient();

    const mutate = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mutationFn: async ({ form, param }) => {
            const response = await client.api.workspace[":workspaceId"]["$patch"]({ form, param })
            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success("Workspace updated successfully")
            queryClient.invalidateQueries({ queryKey: ["workspaces"]});
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id]});
        },
        onError: (error) => {
            console.log("$$$$$$$$$",error);
            toast.error("failed to update workspace")
        }
    });

    return mutate
}