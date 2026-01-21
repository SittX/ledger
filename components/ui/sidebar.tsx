import { JSX } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

interface MenuItem {
  name: string;
  description?: string;
  href: string;
  icon: string;
  order: number;
}

const menus: MenuItem[] = [
  { name: "Home", icon: "", href: "/", order: 1 },
  { name: "Transaction", icon: "", href: "/transaction", order: 2 },
  { name: "Account", icon: "", href: "/account", order: 3 },
  { name: "Category", icon: "", href: "/category", order: 3 },
];

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps): JSX.Element {
  return (
    <div className={cn("py-5 px-10", className)}>
      <ul className="flex flex-col space-y-5">
        {menus.map((menu) => {
          return (
            <li key={menu.name}>
              <Link href={menu.href}>
                <ArrowBigLeft />
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
