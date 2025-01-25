import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspace[":workspaceId"]["reset-invite-code"]["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.workspace[":workspaceId"]["reset-invite-code"]["$post"]>;

export const useResetInviteCode = () => {
    const queryClient = useQueryClient();

    const mutate = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mutationFn: async ({ param }) => {
            const response = await client.api.workspace[":workspaceId"]["reset-invite-code"]["$post"]({ param })
            return await response.json();
        },
        onSuccess: ({data}) => {
            toast.success("Invite code reset")
            queryClient.invalidateQueries({ queryKey: ["workspaces"]});
            queryClient.invalidateQueries({ queryKey: ["workspace", data.$id]});
        },
        onError: () => {
            toast.error("failed to reset invite code")
        }
    });

    return mutate
}