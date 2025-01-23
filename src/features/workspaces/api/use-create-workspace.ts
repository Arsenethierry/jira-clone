import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspace["$post"]>;
type RequestType = InferRequestType<typeof client.api.workspace["$post"]>;

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();

    const mutate = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            const response = await client.api.workspace["$post"]({ json })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Workspace created")
            queryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
        onError: () => {
            toast.error("failed to create workspace")
        }
    });

    return mutate
}