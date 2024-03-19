"use client";
import React, { useState } from "react";
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
  const [dateRange] = useState<DateRange>({
    from: dayjs().startOf("month").toDate(),
    to: dayjs().endOf("month").toDate(),
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

  const { data: transactions } = useGetTransactions(
    {
      params: {
        userId: userId!,
        startDate: dateRange.from!,
        endDate: dateRange.to!,
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

  return (
    <div className="my-10 flex flex-col gap-10 max-sm:px-2">
      <div className="flex gap-5">
        <div className="flex w-fit flex-col gap-4 rounded-xl bg-yellow-200 px-3 py-4 shadow-solid-sm outline outline-2 outline-slate-700">
          <PiWalletLight size={30} />
          <div>
            <p className="text-2xl font-bold">
              Rp. {data?.data.sum && data.data.sum.toLocaleString("id")}
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
        <h1 className="mb-2 text-2xl font-bold">Recent transactions</h1>
        <div className="grid gap-2 divide-y-2 divide-solid divide-slate-400">
          {transactions?.data.userTransactions &&
            transactions.data.userTransactions
              .slice(0, 3)
              .map((transaction, index) => (
                <div key={index}>
                  <h1 className="text-xl font-semibold">
                    {dayjs(transaction.createdAt).format("dddd DD MMMM H:mm")}
                  </h1>
                  <ul className="divide-y-2 divide-dashed divide-slate-300">
                    {transaction.order.map((order, i) => (
                      <li className="grid grid-cols-[1fr_max-content]" key={i}>
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
