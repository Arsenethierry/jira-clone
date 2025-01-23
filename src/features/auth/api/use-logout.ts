import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>;

export const useLogout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutate = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.auth.logout["$post"]();
            return await response.json();
        },
        onSuccess: () => {
            toast.success("User logged out")
            queryClient.invalidateQueries({ queryKey: "currentUser" });
            router.refresh();
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    });

    return mutate
}