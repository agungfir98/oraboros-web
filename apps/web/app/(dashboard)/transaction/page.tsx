import React from "react";
import Link from "~/components/Link";

const TransactionPage = () => {
  return (
    <div className="grid gap-10 py-10">
      <div className="outline-3 grid h-10 items-center rounded-full px-5 shadow-solid-sm outline outline-slate-700">
        <Link href={"/transaction/new-transaction"}>New Transaction</Link>
      </div>
      <div className="outline-3 h-max rounded-xl bg-teal-200 px-3 pb-4 shadow-solid-sm outline outline-slate-700">
        <h1 className="my-4 text-2xl font-bold text-slate-800">
          Your Transactions
        </h1>
        <div className="h-[70vh] rounded-xl bg-white px-2 py-3 outline outline-2 outline-slate-700">
          <ul className="grid gap-2 divide-y-2 divide-slate-500">
            <li className="">
              <div className="my-2 flex justify-between">
                <h2 className="text-xl font-semibold">4 Maret 2024</h2>
                <p className="font-semibold">Rp.10.000</p>
              </div>

              <ul className="grid gap-1 divide-y-2 divide-dashed divide-slate-500 px-3">
                <li className="flex justify-between">
                  <p>Batagor</p>
                  <p>Rp.5000</p>
                </li>
                <li className="flex justify-between">
                  <p>siomay</p>
                  <p>Rp.5000</p>
                </li>
              </ul>
            </li>
            <li className="">
              <div className="my-2 flex justify-between">
                <h2 className="text-xl font-semibold">3 Maret 2024</h2>
                <p className="font-semibold">Rp.10.000</p>
              </div>

              <ul className="divide-y-2 divide-dashed divide-slate-500 px-3">
                <li className="flex justify-between">
                  <p>Batagor</p>
                  <p>Rp.5000</p>
                </li>
                <li className="flex justify-between">
                  <p>siomay</p>
                  <p>Rp.5000</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
