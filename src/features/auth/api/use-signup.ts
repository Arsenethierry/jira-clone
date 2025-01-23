import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;

export const useRegister = () => {
    const router = useRouter();

    const mutate = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            const response = await client.api.auth.register["$post"]({ json })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account successfully registered")
            router.refresh();
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    });

    return mutate
}