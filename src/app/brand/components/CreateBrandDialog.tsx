"use client";

import type React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formSchema } from "@/app/schema/createBrandFormSchema";
import { createBrand, updateBrand } from "@/lib/api/brand";
import { Brand } from "@/app/types/types";
import { useEffect } from "react";

interface BrandPageProps {
  brand?: Brand;
}

export function BrandForm({ brand }: BrandPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      value: "",
    },
  });

  useEffect(() => {
    if (brand) {
      form.reset({
        value: brand.value || "",
        label: brand.label || "",
      });
    }
  }, [brand, form]);

  const createMutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      form.reset();
      toast("Brand created successfully");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      router.push("/brand");
    },
    onError: () => {
      toast("Failed to create brand");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateBrand,
    onSuccess: () => {
      toast("Brand updated successfully");
      queryClient.invalidateQueries({ queryKey: ["brands"] });
      router.push("/brand");
    },

    onError: () => {
      console.error("Error updating product:");
      toast("Failed to update product");
    },
  });

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    form.setValue("label", label);
    const currentSlug = form.getValues("value");
    const labelToSlug = label
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    if (
      !currentSlug ||
      currentSlug ===
        form
          .getValues("label")
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
    ) {
      form.setValue("value", labelToSlug);
    }
  };
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!brand) {
      createMutation.mutate(values as z.infer<typeof formSchema>);
    } else if (brand) {
      updateMutation.mutate({ id: brand.id, data: values });
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>{brand ? "Edit Brand" : "Create Brand"}</DialogTitle>
        <DialogDescription>
          {brand
            ? "Update the brand details below."
            : "Add a new brand to your store."}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Label</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Nike"
                    {...field}
                    onChange={(e) => handleLabelChange(e)}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. nike"
                    {...field}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose>
              <Button
                type="button"
                variant="outline"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {brand ? "update" : "save"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
