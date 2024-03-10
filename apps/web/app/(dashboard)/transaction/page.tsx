"use client";
import React from "react";
import Link from "~/components/Link";
import { useGetTrasactionHistory } from "@ob/api";
import { useStore } from "~/store";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { PiClockBold } from "react-icons/pi";
import { AiOutlineLoading } from "react-icons/ai";

dayjs.locale("id-ID");

const TransactionPage = () => {
  const { userId } = useStore();

  const { data, isLoading } = useGetTrasactionHistory(
    { params: { userId: userId! } },
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <div className="grid gap-10 py-10 ">
      <div className="outline-3 grid h-10 items-center rounded-full px-5 shadow-solid-sm outline outline-slate-700">
        <Link href={"/transaction/new-transaction"}>New Transaction</Link>
      </div>
      <div className="outline-3 h-max rounded-xl bg-teal-200 px-3 pb-4 shadow-solid-sm outline outline-slate-700">
        <h1 className="my-4 text-2xl font-bold">Your Transactions</h1>
        <div className="h-fit min-h-[70vh] rounded-xl bg-white px-2 py-3 outline outline-2 outline-slate-700">
          {isLoading ? (
            <div className="flex h-fit min-h-[70vh] items-center justify-center">
              <AiOutlineLoading className="animate-spin" size={40} />
            </div>
          ) : (
            <ul className="grid gap-2 divide-y-2 divide-slate-400">
              {data?.data.userTransactions &&
                Array.from(
                  Map.groupBy(data.data.userTransactions, ({ createdAt }) =>
                    dayjs(createdAt).format("DD MMMM YYYY"),
                  ),
                ).map(([key, transactions]) => (
                  <li key={key}>
                    <div className="my-2 flex justify-between">
                      <h1 className="text-xl font-semibold">{key}</h1>

                      <div className="flex gap-2 text-xl font-semibold">
                        <p>Rp. </p>
                        <p>
                          {transactions
                            .reduce(
                              (acu, curr) =>
                                acu +
                                Number(
                                  curr.order.reduce(
                                    (a, b) => a + Number(b.amount),
                                    0,
                                  ),
                                ),
                              0,
                            )
                            .toLocaleString("id")}
                        </p>
                      </div>
                    </div>
                    <ul className="divide-y-2 divide-dotted divide-slate-300 pl-2">
                      {transactions.map((transaction, index, arr) => (
                        <li key={index}>
                          <h2 className="item-center flex gap-2 text-base font-semibold">
                            <PiClockBold className="my-auto" size={16} />
                            {dayjs(transaction.createdAt).format("H:mm")}
                          </h2>
                          <ul className="grid gap-1 divide-y-2 divide-dashed divide-slate-300 px-3">
                            {transaction.order.map((order, i) => (
                              <li
                                className="grid grid-cols-[auto_max-content]"
                                key={i}
                              >
                                <p>{order.name}</p>
                                <span className="flex w-24 justify-between">
                                  <p className="font-semibold">Rp. </p>
                                  <p>
                                    {Number(order.amount).toLocaleString("id")}
                                  </p>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
