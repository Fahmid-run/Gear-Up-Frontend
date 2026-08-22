"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Package, Trash2 } from "lucide-react";

type GearStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";

const statusStyles: Record<GearStatus, string> = {
  PAID: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
  PLACED: "bg-muted text-muted-foreground",
  RETURNED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  PICKED_UP: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
};

const statusLabels: Record<GearStatus, string> = {
  PLACED: "PLACED",
  CONFIRMED: "CONFIRMED",
  PAID: "PAID",
  PICKED_UP: "PICKED_UP",
  RETURNED: "RETURNED",
  CANCELLED: "CANCELLED",
};

export function GearList({
  gearList,
  userRole,
}: {
  gearList?: any[];
  userRole: "Provider" | "Admin";
}) {
  const router = useRouter();

  return (
    <section className="w-full rounded-xl border bg-card text-card-foreground shadow-sm">
      <header className="flex items-center justify-between gap-4 px-6 py-4">
        <h2 className="text-lg font-semibold text-balance">Gears</h2>
        {userRole !== "Admin" && (
          <Button
            size={"lg"}
            onClick={() => {
              router.push("/dashboard/provider/gear/new");
            }}
          >
            Add Item
          </Button>
        )}
      </header>

      <div className="border-t">
        <Table>
          <TableBody>
            {gearList?.map((gear) => (
              <TableRow key={gear.id}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border bg-muted">
                      <img
                        src={
                          gear.image?.startsWith("/")
                            ? gear.image
                            : `/${gear.image}`
                        }
                        alt={gear.name || "Gear preview"}
                        // sizes="44px"
                        className="object-cover size-11"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium leading-tight">
                        {gear.name}
                      </p>
                      <p className="text-sm text-muted-foreground">{gear.id}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="font-medium">
                  <h2>{gear.rentalPricePerDay}/day</h2>
                  <span className="text-sm text-muted-foreground">
                    price per day
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  <h2>{gear.stock}</h2>
                  <span className="text-sm text-muted-foreground">
                    {gear.availability}
                  </span>
                </TableCell>

                {/* <TableCell>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "rounded-full font-medium",
                      statusStyles[gear.status],
                    )}
                  >
                    {statusLabels[gear.status]}
                  </Badge>
                </TableCell> */}
                {userRole != "Admin" && (
                  <TableCell className="pr-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        router.push(`/dashboard/provider/gear/${gear.id}/edit`);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                )}
                {/* {userRole === "Admin" && (
                  <TableCell className="pr-6 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(gear.id)}
                      disabled={deletingId === gear.id}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )} */}
              </TableRow>
            ))}
          </TableBody>

          {gearList?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 ">
              <Package className="h-12 w-12 text-slate-300" />
              <p className="mt-4 text-lg text-slate-600">No gears found</p>
            </div>
          )}
        </Table>
      </div>
    </section>
  );
}
