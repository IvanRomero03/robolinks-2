"use client";
import { Button } from "r/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "r/components/ui/dialog";
import { Input } from "r/components/ui/input";
import { Label } from "r/components/ui/label";
import { Textarea } from "r/components/ui/textarea";
import { Field, Form, Formik } from "formik";
import { useState, type ChangeEvent } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { api } from "rbrgs/trpc/react";
import { Pencil } from "lucide-react";

interface InitialValues {
  name: string;
  short: string;
  url: string;
  description: string | null;
  id: number;
}

export function CreateLink({
  initialValues,
  edit,
}: {
  initialValues?: InitialValues;
  edit: boolean;
}) {
  const { mutateAsync: createLink } = api.link.createLink.useMutation();
  const { mutateAsync: updateLink } = api.link.updateLink.useMutation();
  const utils = api.useUtils();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {edit ? (
          <Button variant="outline" size="icon" className="">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline">Create RoboLink</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Create RoboLink</DialogTitle>
          <DialogDescription>
            Create a url short link for your project
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            name: initialValues?.name ?? "",
            short: initialValues?.short ?? "",
            url: initialValues?.url ?? "",
            description: initialValues?.description ?? "",
            shortEdited: initialValues?.short ? true : false,
          }}
          validationSchema={toFormikValidationSchema(
            z.object({
              name: z.string().min(1).max(255),
              short: z.string().min(1).max(255),
              url: z.string().min(1).url(),
            }),
          )}
          onSubmit={async (values) => {
            if (edit && initialValues) {
              await updateLink({
                id: initialValues.id,
                name: values.name,
                short: values.short,
                url: values.url,
                description: values.description,
              });
            } else {
              await createLink({
                name: values.name,
                short: values.short,
                url: values.url,
                description: values.description,
              });
            }
            setOpen(false);
          }}
        >
          {({
            values,
            setFieldValue,
            setFieldError,
            errors,
            dirty,
            isValid,
            isSubmitting,
          }) => (
            <Form>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="name" className="text-left">
                    Name
                  </Label>
                  <Field
                    name="name"
                    id="name"
                    as={Input}
                    className="col-span-3"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      // void setFieldValue("shortEdited", false);
                      void setFieldValue("name", e.target.value);
                      if (!values.shortEdited) {
                        void setFieldValue(
                          "short",
                          encodeURIComponent(e.target.value),
                        );
                      }
                    }}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="short" className="text-left">
                    Short (Url slug)
                  </Label>
                  <Field
                    name="short"
                    id="short"
                    as={Input}
                    className="col-span-3"
                    value={
                      values.shortEdited
                        ? values.short
                        : encodeURIComponent(values.name)
                    }
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      void setFieldValue("shortEdited", true);
                      void setFieldValue("short", e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="url" className="text-left">
                    Url
                  </Label>
                  <Field
                    name="url"
                    id="url"
                    as={Input}
                    className="col-span-3"
                    required
                  />
                  {errors.url && (
                    <div className="text-sm text-red-500">{errors.url}</div>
                  )}
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="description" className="text-left">
                    Description
                  </Label>
                  <Field
                    name="description"
                    id="description"
                    as={Textarea}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  disabled={!dirty || !isValid || isSubmitting}
                  variant="default"
                >
                  {edit ? "Save" : "Create"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
