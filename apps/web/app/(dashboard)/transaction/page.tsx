"use client";
import React, { useEffect, useState } from "react";
import { useGetTransactions } from "@ob/api";
import { useStore } from "~/store";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { PiClockBold } from "react-icons/pi";
import { AiOutlineLoading } from "react-icons/ai";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "~/components/ui/button";
import { DateRange } from "react-day-picker";
import { IoCalendarOutline } from "react-icons/io5";
import { TbError404 } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";

dayjs.locale("id-ID");

const TransactionPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { userId } = useStore();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: dayjs().startOf("month").toDate(),
    to: dayjs().endOf("month").toDate(),
  });

  const { data, isLoading, refetch } = useGetTransactions(
    {
      params: {
        userId: userId!,
        startDate: dateRange?.from!,
        endDate: dateRange?.to!,
      },
    },
    {
      queryKey: ["transactions"],
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!userId,
    },
  );

  return (
    <div className="grid gap-5 py-10">
      <div className="flex flex-wrap gap-5 md:justify-between">
        <Button
          outline="1"
          className="shadow-solid-xs bg-green-300 max-md:w-full max-md:self-center"
          onClick={() => router.push("/transaction/new-transaction")}
        >
          New Transaction
        </Button>
        <div className="flex flex-wrap gap-3 max-md:w-full max-md:flex-col md:items-center md:justify-end">
          <h1 className="font-semibold">Filter :</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="default"
                outline="1"
                className="shadow-solid-xs flex w-[300px] justify-start gap-2 bg-yellow-300 text-left font-normal max-md:w-full"
                id="date"
              >
                <IoCalendarOutline />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {dayjs(dateRange.from).format("DD MMMM YYYY")}
                      {" - "}
                      {dayjs(dateRange.to).format("DD MMMM YYYY")}
                    </>
                  ) : (
                    dayjs(dateRange.from).format("DD MMMM YYYY")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                className="mr-10 rounded-xl bg-white shadow-solid-sm outline outline-1 outline-slate-700"
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button
            className="shadow-solid-xs bg-purple-300 max-md:w-full"
            outline="1"
            onClick={() => refetch()}
          >
            Apply Filter
          </Button>
        </div>
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
              {data?.data.userTransactions && (
                <>
                  {!data.data.userTransactions.length ? (
                    <div className="flex min-h-[70vh] flex-col items-center justify-center">
                      <TbError404 size={100} />
                      <h1 className="text-3xl">No records found</h1>
                    </div>
                  ) : (
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
                                        {Number(order.amount).toLocaleString(
                                          "id",
                                        )}
                                      </p>
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))
                  )}
                </>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
