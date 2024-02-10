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
import Button from "~/components/Button/default";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "react-query";
import { api, authHeader } from "~/lib/axios";
import useTokenStore from "~/store/tokenStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import * as yup from "yup";

const BoardingPage: React.FC = () => {
  const router = useRouter();
  const { token } = useTokenStore();

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
      // console.log({ values });
      budgetMutation.mutate(values);
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

  const budgetMutation = useMutation({
    mutationKey: ["new-budget"],
    mutationFn: async (data: typeof formik.initialValues) => {
      return await api.post("/budget/newbudgets", data, {
        headers: { ...authHeader(token) },
      });
    },
    onSuccess() {
      toast.success("Budgets successfully created");
      router.replace("/");
    },
    onError(err) {
      console.error(err);
      toast.error("something went wrong");
    },
  });

  return (
    <div className="flex-1 flex flex-col gap-10">
      <h1 className="text-center text-2xl mt-10">
        You don't have budget set yet, let's set some!
      </h1>
      <div className="container mx-auto mb-20 relative">
        <FormikProvider value={formik}>
          {typeof formik.errors.budgets === "string" && (
            <pre className="text-red-400 font-semibold">
              {formik.errors.budgets}
            </pre>
          )}
          <Form onSubmit={formik.handleSubmit}>
            <FieldArray name="budgets">
              {({ remove, push }) => (
                <div>
                  <div className="grid grid-cols-[1fr_1fr_1fr_3rem] font-semibold">
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
                        className="col-span-3 gap-y-8 grid grid-cols-[1fr_1fr_1fr_3rem]"
                      >
                        <div className="flex relative outline outline-1 outline-black items-center">
                          <input
                            name={`budgets.${index}.name`}
                            placeholder="budget name"
                            type="text"
                            className="w-full h-full outline-none px-2 py-2"
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
                            className="text-red-400 text-sm font-medium absolute right-0 top-[50%] translate-y-[-50%] px-2"
                            component="div"
                          />
                        </div>
                        <div className="flex relative outline outline-1 outline-black items-center">
                          <input
                            name={`budgets.${index}.shortName`}
                            placeholder="shortened name"
                            type="text"
                            className="w-full h-full outline-none px-2 py-2"
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
                            className="text-red-400 text-sm font-medium absolute right-0 top-[50%] translate-y-[-50%] px-2"
                            component="div"
                          />
                        </div>
                        <div className="flex relative outline outline-1 outline-black items-center ml-[1px] pl-1">
                          <p>Rp.</p>
                          <input
                            type="text"
                            name={`budgets.${index}.amount`}
                            placeholder="0"
                            className="w-[90%] h-[90%] outline-none mx-2 my-2 bg-transparent"
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
                            className="text-red-400 text-sm font-medium absolute right-0 top-[50%] translate-y-[-50%] px-2"
                            component="div"
                          />
                        </div>
                        <div>
                          <Button
                            variant="danger"
                            outline="1"
                            type="button"
                            className="ml-[1px] w-full h-full flex justify-center items-center"
                            onClick={() => remove(index)}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    ))}
                  <div className="col-end-4 row-end-13 flex justify-end">
                    <Button
                      type="button"
                      variant="primary"
                      size="2"
                      outline="1"
                      className="shadow-solid-sm mt-5"
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
              size="2"
              outline="2"
              className="w-full mt-10 shadow-solid-base font-medium rounded-lg"
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
