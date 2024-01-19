"use client";

import ExpenseService from "@/services/expense.service";
import { useEffect, useState } from "react";

import { columns } from "@/components/expenses/columns";
import { UserNav } from "@/components/expenses/user-nav";
import { DataTable } from "@/components/expenses/data-table";
import AuthService from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
    const router = useRouter();
  const [expenses, setExpenses] = useState([]);
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      router.push("/auth/signin");
    }

  useEffect(() => {
    
    async function fetchData() {
      const response = await ExpenseService.getAll();
      return response.data;
    }

    fetchData().then((data) => {
      setExpenses(data);
    });
  }, []);

  return (
    <main>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <div className="flex flex-row gap-4 items-center">
            <p className="text-muted-foreground">
              Here&apos;s a list of your expenses!
            </p>
            <Button onClick={()=> router.push("dashboard/new")}>New</Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav user={currentUser as string}/>
          </div>
        </div>
        <DataTable data={expenses} columns={columns} />
      </div>
    </main>
  );
}
