"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateChannelFormValues, CreateChannelSchema } from "./schema";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { useSpaceId } from "@/hooks/use-space-id";
import { createChannel } from "@/actions/channels";

const CreateChannelForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const spaceId = useSpaceId();

  const { id } = useCurrentUser();

  const form = useForm<CreateChannelFormValues>({
    resolver: zodResolver(CreateChannelSchema),
    defaultValues: { name: "", description: "" },
  });

  if (!id) return null;

  const onSubmit = (data: CreateChannelFormValues) => {
    if (!spaceId) return;

    startTransition(() => {
      createChannel(id, spaceId, data).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push(`/space/${spaceId}/channel/${data.channel.id}`);
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormControl>
                <Input id="name" placeholder="eg. galaxy-space" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="description">Description</FormLabel>
              <FormControl>
                <Input
                  id="description"
                  placeholder="eg. A space for the galaxy"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" loading={isPending}>
          Create space
        </Button>
      </form>
    </Form>
  );
};

export default CreateChannelForm;
