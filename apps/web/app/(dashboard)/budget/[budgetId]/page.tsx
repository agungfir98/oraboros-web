"use client";
import { useGetBudgetById } from "@ob/api";
import dayjs from "dayjs";
import React, { Suspense, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import BudgetLoading from "./loading";

dayjs.locale("id");

const DetailBudget = ({ params }: { params: { budgetId: string } }) => {
  const [spend, setSpend] = useState<number>(0);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: dayjs().startOf("month").toDate(),
    to: dayjs().endOf("month").toDate(),
  });

  // TODO: add sum monthly spent to backend
  const { data, isLoading } = useGetBudgetById(
    { params },
    {
      queryKey: ["budgetById"],
      refetchOnWindowFocus: false,
      cacheTime: 1,
    },
  );

  useEffect(() => {
    if (!data) return;
    const order = data.data.orders.filter(
      (order) =>
        dayjs(order.createdAt).toDate() > dateRange?.from! &&
        dayjs(order.createdAt).toDate() < dateRange?.to!,
    );

    setSpend(order.reduce((a, c) => a + Number(c.amount), 0));
  }, [data]);

  return (
    <div className="pt-10">
      <Suspense fallback={<BudgetLoading />}>
        <div className="grid gap-3">
          <div className="flex justify-between max-md:flex-col">
            <div>
              <h1 className="text-xl font-bold md:text-4xl ">
                {data?.data.name}
              </h1>
            </div>
            <div>
              <p className="text-xl font-bold md:text-4xl">
                Rp. {Number(data?.data.amount).toLocaleString("id")}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <p>this month spent:</p>
            <p className="font-semibold md:text-lg">
              Rp. {spend.toLocaleString("id")}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between">
            <h1 className="text-md font-semibold md:text-2xl">Order history</h1>
          </div>
          <ul className="divide-y-2 divide-dashed divide-slate-300">
            {data?.data.orders.map((order, index) => (
              <li key={index} className="grid grid-cols-[1fr_1fr_auto] py-1">
                <p>
                  {index + 1}. {order.name}
                </p>
                <div className="flex gap-2">
                  <p>Rp. </p>
                  <p>{Number(order.amount).toLocaleString("id")}</p>
                </div>
                <p className="max-md:hidden">
                  {dayjs(order.createdAt).format("DD MMMM YYYY H:mm")}
                </p>
                <p className="md:hidden">
                  {dayjs(order.createdAt).format("DD MMMM YYYY")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Suspense>
    </div>
  );
};

export default DetailBudget;
