"use client";
import React, { useEffect, useState } from "react";
import { useGetUserBudget, useGetTransactions } from "@ob/api";
import { useStore } from "~/store";
import { CiMoneyBill } from "react-icons/ci";
import { PiWalletLight } from "react-icons/pi";
import dayjs from "dayjs";
import { DateRange } from "react-day-picker";

dayjs().locale("id-Id");

const RootPage = () => {
  const { accessToken, userId } = useStore();

  const [budgetUsed, setBudgetUsed] = useState<number>(0);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: dayjs().subtract(7, "day").toDate(),
    to: dayjs().toDate(),
  });

  const { data, isLoading: budgetLoading } = useGetUserBudget(
    {
      params: { sum: true, userId: userId! },
    },
    {
      enabled: !!accessToken,
      refetchOnWindowFocus: false,
    },
  );

  useGetTransactions(
    {
      params: {
        userId: userId!,
        startDate: dayjs().startOf("month").toDate(),
        endDate: dayjs().endOf("month").toDate(),
      },
    },
    {
      enabled: !!accessToken,
      onSuccess(data) {
        const sum =
          data?.data.userTransactions &&
          data.data.userTransactions.reduce(
            (a, b) =>
              a + b.order.reduce((acu, cur) => acu + Number(cur.amount), 0),
            0,
          );
        setBudgetUsed(sum);
      },
    },
  );

  const { data: transactions } = useGetTransactions(
    {
      params: {
        userId: userId!,
        startDate: dateRange.from,
        endDate: dateRange.to,
      },
    },
    {
      enabled: !!accessToken,
    },
  );

  useEffect(() => {
    console.log({ transactions });
    console.log(dayjs().format("ddd, DD MMMM hh:mm:ss"));
  }, [transactions]);

  return (
    <div className="mt-10 flex flex-col gap-10 max-sm:px-2">
      <div className="flex gap-5">
        <div className="flex w-fit flex-col gap-4 rounded-xl bg-yellow-200 px-3 py-4 shadow-solid-sm outline outline-2 outline-slate-700">
          <PiWalletLight size={30} />
          <div>
            <p className="text-2xl font-bold">
              Rp. {data?.data.sum.toLocaleString("id")}
            </p>

            <h1 className="font-semibold">Budgets</h1>
          </div>
        </div>
        <div className="flex w-fit flex-col gap-4 rounded-xl bg-yellow-200 px-3 py-4 shadow-solid-sm outline outline-2 outline-slate-700">
          <CiMoneyBill size={30} />
          <div>
            <p className="text-2xl font-bold">
              Rp. {budgetUsed.toLocaleString("id")}
            </p>
            <h1 className="font-semibold">This month spending</h1>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-2">
          <h1 className="text-2xl font-bold">Recent transactions</h1>
          <p className="">
            {dayjs(dateRange.from).format("DD MMMM")}
            {" - "}
            {dayjs(dateRange.to).format("DD MMMM")}
          </p>
        </div>
        <div className="grid gap-2 divide-y-2 divide-solid divide-slate-400">
          {transactions?.data.userTransactions &&
            transactions.data.userTransactions.map((transaction, index) => (
              <div key={index}>
                <h1 className="text-xl font-semibold">
                  {dayjs(transaction.createdAt).format("dddd DD MMMM H:mm")}
                </h1>
                <ul className="divide-y-2 divide-dashed divide-slate-300">
                  {transaction.order.map((order, index) => (
                    <li className="grid grid-cols-[1fr_max-content]">
                      <p>{order.name}</p>
                      <div className="flex w-24 justify-between">
                        <p>Rp. </p>
                        <p>{Number(order.amount).toLocaleString("id")}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RootPage;
