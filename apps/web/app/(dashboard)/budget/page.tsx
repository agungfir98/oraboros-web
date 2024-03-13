"use client";
import { useGetUserBudget } from "@ob/api";
import React from "react";
import { CiEdit } from "react-icons/ci";
import Link from "~/components/Link";
import { Button } from "~/components/ui/button";
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
          <li
            key={index}
            className={`grid grid-cols-[auto_max-content] py-1 before:content-['${index + 1}_']`}
          >
            <div className="grid grid-cols-[max-content_1fr_1fr_1fr]">
              <p className="mx-2">{index + 1}.</p>
              <h1>{budget.name}</h1>
              <p>{budget.shortName}</p>
              <p>Rp. {Number(budget.amount).toLocaleString("id")}</p>
            </div>
            <div>
              <Link
                href={`/budget/${budget.budgetId}`}
                variant="button"
                outline="1"
                className="h-fit w-fit rounded-md px-2 py-1 shadow-none hover:bg-yellow-300"
              >
                <CiEdit size={16} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPage;
