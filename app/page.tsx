'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Tiptap from "@/components/Tiptap";

export default function Home() {

  const formSchema = z.object({
    title: z
      .string()
      .min(5, { message: "Title is not long enough" })
      .max(50, { message: "Its too long" }),
    price: z
      .number()
      .min(3, { message: "Price is too low" }),
    description: z
      .string()
      .min(5, { message: "Add some more description..." })
      .max(300, { message: "Its too long" })
      .trim(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      price: 29.99,
      description: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    //do smth with the values
    //backend part for further development
  }

  return (
    <main className="p-24">
      <h1 className="mb-10 text-center">My Text Editor</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField 
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Main title for something" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Tiptap description={field.name} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="my-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
