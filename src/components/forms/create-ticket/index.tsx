"use client";

import { createTicket } from "@/actions/ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type CreateTicketFormValues, createTicketSchema } from "./schema";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useBoardId } from "@/hooks/use-board-id";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateTicketForm = () => {
  const [isPending, startTransition] = useTransition();

  const { id } = useCurrentUser();

  const boardId = useBoardId();

  const form = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      boardColumnId: "",
      assignedTo: "",
      storyPoints: 0,
      status: "TODO",
    },
  });

  console.log(form.formState.errors);

  if (!boardId || !id) {
    return null;
  }

  const onSubmit = (data: CreateTicketFormValues) => {
    startTransition(() => {
      createTicket(boardId, data, id).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="title">Title</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder="eg. Create a new ticket"
                  {...field}
                />
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
                  placeholder="eg. Create a new ticket"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TODO">Todo</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button loading={isPending}>Create ticket</Button>
      </form>
    </Form>
  );
};

export default CreateTicketForm;
