"use client";
import { useGetUserBudget } from "@ob/api";
import React from "react";
import Link from "~/components/Link";
import { useStore } from "~/store";

const BudgetPage = () => {
  const { accessToken, userId } = useStore();

  const { data } = useGetUserBudget(
    {
      params: {
        userId: userId!,
      },
    },
    { enabled: !!accessToken },
  );

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold">Your budgets</h1>
      <ul className="mt-5 divide-y-2 divide-dashed divide-slate-300">
        {data?.data.userBudget.map((budget, index) => (
          <li key={index} className={`py-1 before:content-['${index + 1}_']`}>
            <div className="grid w-full grid-cols-[max-content_5fr_5fr_1fr]">
              <p className="mx-1">{index + 1}.</p>
              <Link href={`/budget/${budget.budgetId}`} className="w-fit">
                <h1>{budget.name}</h1>
              </Link>
              <p>{budget.shortName}</p>
              <div className="flex gap-1">
                <p>Rp.</p>
                <p className="flex w-16 justify-end">
                  {Number(budget.amount).toLocaleString("id")}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPage;
