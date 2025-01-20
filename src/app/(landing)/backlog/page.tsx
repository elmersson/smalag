"use client";

import React, { useEffect, useState } from "react";
import GradientText from "@/components/global/gradient-text";
import { BacklogTable, Backlog } from "./_components/backlog-table";
import { fetchIssuesFromProject } from "@/utils/linear";

export default function BacklogPage() {
  const [data, setData] = useState<Backlog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const issues = await fetchIssuesFromProject(
        process.env.NEXT_PUBLIC_LINEAR_PROJECT_ID || "",
      );

      const formattedData = issues.map((issue) => ({
        id: issue.id,
        title: issue.title,
        description: issue.description || "",
        status: issue.priorityLabel || "",
      }));

      setData(formattedData);
    };
    fetchData();
  }, []);

  return (
    <main className="md:px-10 py-20 flex flex-col gap-24">
      <div className="flex flex-col items-start md:items-center gap-y-6 md:gap-y-2">
        <GradientText
          className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
          element="H1"
        >
          Backlog
        </GradientText>
      </div>
      <BacklogTable data={data} />
    </main>
  );
}
