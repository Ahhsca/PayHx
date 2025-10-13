"use client";

import { HospitalMultiSelect } from "@/components/hospital-multiselect";
import { MekkoChart } from "@/components/mekko-chart";
import { HospitalMultiselectProvider } from "@/context/hospital-multiselect-context";

export default function HomePage() {
  return (
    <main className="container mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="px-2 sm:p-0 text-4xl font-extrabold tracking-tight">
          Know you worth!
        </h1>
        <div className="sm:w-3/5">
          <p className="px-2 sm:p-0 text-left sm:text-justify text-sm">
            Pay transparency is essential in nursing, as it empowers
            professionals to make informed career decisions, advocate for fair
            compensation, and address wage disparities. By openly sharing salary
            information, nurses can ensure equitable pay, foster trust within
            the workplace, and contribute to a more supportive and just
            healthcare environment.
          </p>
        </div>
        <HospitalMultiselectProvider>
          <div className="flex gap-4">
            <h2 className="px-2 sm:p-0 text-3xl font-semibold tracking-tight">
              Compare facilities:
            </h2>
            <HospitalMultiSelect />
          </div>
          <div>
            <MekkoChart />
          </div>
        </HospitalMultiselectProvider>
        <div className="text-center">This is where Footer should be</div>
      </div>
    </main>
  );
}
