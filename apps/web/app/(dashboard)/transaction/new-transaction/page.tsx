"use client";
import React from "react";
import ContainerCard from "~/components/containerCard";
import {
  ErrorMessage,
  FieldArray,
  Form,
  FormikProvider,
  useFormik,
} from "formik";
import * as yup from "yup";
import { CiTrash } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { useCreateTransaction, useGetUserBudget } from "@ob/api";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";

const NewTransactionPage = () => {
  const { data } = useGetUserBudget(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    onError(err) {
      if (isAxiosError(err)) {
        toast.error(err.message);
      }
      console.table(err);
    },
    onSuccess() {
      toast.success("transaction recorded!");
    },
  });

  const { mutate, isLoading } = useCreateTransaction({
    onSuccess() {
      toast.success("transaction successfully created");
    },
    onError(err) {
      if (isAxiosError(err)) {
        toast.error(err.message);
      }
      toast.error("something wrong with server");
    },
  });

  const formik = useFormik({
    initialValues: {
      orders: [
        {
          name: "",
          amount: 0,
          budgetId: undefined,
        },
      ],
    },
    onSubmit({ orders }) {
      mutate({ orders });
    },
    validationSchema: yup.object().shape({
      orders: yup.array().of(
        yup.object().shape({
          name: yup.string().required("please insert this field"),
          amount: yup
            .number()
            .required("amount should not be empty")
            .moreThan(0, "amount can't be zero"),
        }),
      ),
    }),
  });

  return (
    <ContainerCard
      variant="blue"
      className="mx-auto my-10 lg:w-1/2"
      shadow="sm"
    >
      <h1 className="mb-5 text-2xl font-semibold text-slate-700">
        New transaction
      </h1>
      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <FieldArray name="orders">
            {({ remove, push }) => (
              <div className="grid gap-2">
                <ContainerCard className="divide-y-2 divide-dashed divide-slate-400">
                  {formik.values.orders.map((order, index, arr) => (
                    <div key={index}>
                      <div className="grid grid-cols-[min-content_auto_min-content] items-center pb-2">
                        <h1 className="font-2xl mr-3 font-semibold">
                          {index + 1}.
                        </h1>
                        <div>
                          <div className="mb-2 grid grid-cols-2 items-center gap-2 text-slate-700">
                            <div className="grid items-center gap-2 text-slate-700">
                              <label
                                htmlFor={`order.${index}.name`}
                                className="font- font-semibold"
                              >
                                Item
                              </label>
                              <input
                                id={`order.${index}.name`}
                                name={`order.${index}.name`}
                                value={order.name}
                                placeholder="item name"
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    `orders.${index}.name`,
                                    e.target.value,
                                  );
                                }}
                                className="text-lg focus:outline-none"
                              />
                              <ErrorMessage
                                name={`orders.${index}.name`}
                                className="text-red-400"
                                component={"p"}
                              />
                            </div>
                            <div className="grid items-center gap-2 text-slate-700 ">
                              <label
                                htmlFor={`order.${index}.amount`}
                                className="font- font-semibold"
                              >
                                amount
                              </label>
                              <div className="flex gap-1">
                                <p>Rp.</p>
                                <input
                                  id={`order.${index}.amount`}
                                  name={`order.${index}.amount`}
                                  type="text"
                                  value={order.amount.toLocaleString("id-ID")}
                                  placeholder="item name"
                                  onChange={(e) => {
                                    const { value } = e.target;
                                    const amount = Number(
                                      value.replace(/\D/g, ""),
                                    );
                                    formik.setFieldValue(
                                      `orders.${index}.amount`,
                                      amount,
                                    );
                                  }}
                                  className="text-lg focus:outline-none"
                                />
                              </div>
                              <ErrorMessage
                                name={`orders.${index}.amount`}
                                className="text-red-400"
                                component={"p"}
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="category"></label>
                            <Select
                              value={order.budgetId || ""}
                              onValueChange={(value) => {
                                formik.setFieldValue(
                                  `orders.${index}.budgetId`,
                                  value.length ? value : undefined,
                                );
                              }}
                              name={`orders.${index}.budgetId`}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                {data?.data.userBudget.map((value, i) => (
                                  <SelectItem value={value.budgetId} key={i}>
                                    {value.shortName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          {arr.length > 1 && (
                            <Button
                              type="button"
                              variant="danger"
                              className="rounded-full text-red-700 outline-none outline outline-transparent hover:text-white"
                              onClick={() => remove(index)}
                            >
                              <CiTrash size={24} />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end pt-5">
                    <Button
                      variant="success"
                      outline="1"
                      className="rounded-md shadow-solid-xs"
                      type="button"
                      onClick={() => push({ name: "", amount: 0 })}
                    >
                      <GoPlus size={24} />
                    </Button>
                  </div>
                </ContainerCard>
              </div>
            )}
          </FieldArray>
          <div className="mt-10 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              outline="3"
              className="w-full rounded-md bg-blue-400 font-semibold hover:bg-blue-500"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </ContainerCard>
  );
};

export default NewTransactionPage;
