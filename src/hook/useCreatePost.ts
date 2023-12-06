import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePost } from "@/service/post";
import toast from "react-hot-toast";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      toast.success("New post successfully created");
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createPost, isCreating };
}
