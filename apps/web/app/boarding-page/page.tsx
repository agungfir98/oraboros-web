"use client";
import { CreateBudgetsDTO } from "@ob/dto";
import {
  ErrorMessage,
  FieldArray,
  Form,
  useFormik,
  FormikProvider,
} from "formik";
import React from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useCreateBudgets } from "@ob/api";
import { Button } from "~/components/ui/button";
import { CiTrash } from "react-icons/ci";
import { cn } from "~/lib/utils";

const BoardingPage: React.FC = () => {
  const router = useRouter();

  const budgetMutation = useCreateBudgets({
    onSuccess(data) {
      toast.success("Budgets successfully created");
      router.replace("/");
    },
    onError(err) {
      console.error(err);
      toast.error("something went wrong");
    },
  });

  const formik = useFormik({
    initialValues: {
      budgets: [
        {
          name: "",
          shortName: "",
          amount: 0,
        },
      ],
    },
    onSubmit(values) {
      budgetMutation.mutate(values.budgets);
    },
    validationSchema: yup.object().shape({
      budgets: yup
        .array()
        .of(
          yup.object().shape({
            name: yup.string().required("Must not empty"),
            shortName: yup
              .string()
              .required("Must not empty")
              .min(3, "too short"),
            amount: yup.number().min(1, "must not be zero"),
          }),
        )
        .min(1, "Please put at least one item!"),
    }),
  });

  return (
    <div className="flex flex-1 flex-col gap-10">
      <h1 className="mt-10 text-center text-2xl">
        You don't have budget set yet, let's set some!
      </h1>
      <div className="container relative mx-auto mb-20">
        <FormikProvider value={formik}>
          {typeof formik.errors.budgets === "string" && (
            <pre className="font-semibold text-red-400">
              {formik.errors.budgets}
            </pre>
          )}
          <Form onSubmit={formik.handleSubmit}>
            <FieldArray name="budgets">
              {({ remove, push }) => (
                <div>
                  <div className="grid grid-cols-[1fr_1fr_1fr_4rem] font-semibold">
                    <div>
                      <h1>Name</h1>
                    </div>
                    <div>
                      <h1>Short Name</h1>
                    </div>
                    <div>
                      <h1>Amount</h1>
                    </div>
                    <div> </div>
                  </div>
                  {formik.values.budgets.length > 0 &&
                    formik.values.budgets.map((data, index) => (
                      <div
                        key={index}
                        className="col-span-3 grid grid-cols-[1fr_1fr_1fr_4rem] gap-y-8"
                      >
                        <div className="relative flex items-center outline outline-1 outline-black">
                          <input
                            name={`budgets.${index}.name`}
                            placeholder="budget name"
                            type="text"
                            className="h-full w-full px-2 py-2 outline-none"
                            value={data.name}
                            onChange={(e) => {
                              formik.setFieldValue(
                                `budgets.${index}.name`,
                                e.target.value,
                              );
                            }}
                          />
                          <ErrorMessage
                            name={`budgets.${index}.name`}
                            className="absolute right-0 top-[50%] translate-y-[-50%] px-2 text-sm font-medium text-red-400"
                            component="div"
                          />
                        </div>
                        <div className="relative flex items-center outline outline-1 outline-black">
                          <input
                            name={`budgets.${index}.shortName`}
                            placeholder="shortened name"
                            type="text"
                            className="h-full w-full px-2 py-2 outline-none"
                            value={data.shortName}
                            onChange={(e) => {
                              formik.setFieldValue(
                                `budgets.${index}.shortName`,
                                e.target.value,
                              );
                            }}
                          />
                          <ErrorMessage
                            name={`budgets.${index}.shortName`}
                            className="absolute right-0 top-[50%] translate-y-[-50%] px-2 text-sm font-medium text-red-400"
                            component="div"
                          />
                        </div>
                        <div className="relative ml-[1px] flex items-center pl-1 outline outline-1 outline-black">
                          <p>Rp.</p>
                          <input
                            type="text"
                            name={`budgets.${index}.amount`}
                            placeholder="0"
                            className="mx-2 my-2 h-[90%] w-[90%] bg-transparent outline-none"
                            value={data.amount.toLocaleString("id-ID")}
                            onChange={(e) => {
                              const { value } = e.target;
                              const amount = Number(value.replace(/\D/g, ""));
                              if (isNaN(amount)) return;
                              formik.setFieldValue(
                                `budgets.${index}.amount`,
                                amount,
                              );
                            }}
                          />
                          <ErrorMessage
                            name={`budgets.${index}.amount`}
                            className="absolute right-0 top-[50%] translate-y-[-50%] px-2 text-sm font-medium text-red-400"
                            component="div"
                          />
                        </div>
                        <div className="pl-2">
                          <Button
                            variant="danger"
                            type="button"
                            disabled={formik.values.budgets.length <= 1}
                            className="flex h-full w-full items-center justify-center rounded-full"
                            onClick={() => remove(index)}
                          >
                            <CiTrash size={24} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  <div className="col-end-4 row-end-13 flex justify-end">
                    <Button
                      type="button"
                      variant="primary"
                      outline="1"
                      className="mt-5 shadow-solid-xs"
                      onClick={() =>
                        push<Omit<CreateBudgetsDTO, "userId">>({
                          amount: 0,
                          name: "",
                          shortName: "",
                        })
                      }
                    >
                      Add more
                    </Button>
                  </div>
                </div>
              )}
            </FieldArray>
            <Button
              type="submit"
              variant="primary"
              outline="1"
              className="mt-10 w-full rounded-lg font-medium shadow-solid-xs"
              isLoading={budgetMutation.isLoading}
            >
              Submit
            </Button>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default BoardingPage;
