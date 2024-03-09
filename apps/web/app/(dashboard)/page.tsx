"use client";
import React from "react";
import Link from "~/components/Link";
import { useGetUserBudget } from "@ob/api";
import { useStore } from "~/store";
import { CiMoneyBill } from "react-icons/ci";
import { PiWalletLight } from "react-icons/pi";

const RootPage = () => {
  const { accessToken } = useStore();

  const { data, isLoading: budgetLoading } = useGetUserBudget(
    {
      params: { sum: true },
    },
    {
      enabled: !!accessToken,
    },
  );

  return (
    <div className="mt-10 flex flex-col gap-10 max-sm:px-2">
      <div className="flex gap-5">
        <div className="flex w-fit flex-col gap-4 rounded-xl bg-yellow-200 px-3 py-4 shadow-solid-sm outline outline-2 outline-slate-700">
          <PiWalletLight size={30} />
          <div>
            <p className="text-2xl font-bold">
              Rp. {data?.data.sum?.toLocaleString("id")}
            </p>
            <h1 className="font-semibold">Budgets</h1>
          </div>
        </div>
        <div className="flex w-fit flex-col gap-4 rounded-xl bg-yellow-200 px-3 py-4 shadow-solid-sm outline outline-2 outline-slate-700">
          <CiMoneyBill size={30} />
          <div>
            <p className="text-2xl font-bold">
              Rp. {data?.data.sum?.toLocaleString("id")}
            </p>
            <h1 className="font-semibold">This month spending</h1>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Recent transactions</h1>
        <div>
          <div>
            <Link href={"https://google.com"}>googoru</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootPage;
