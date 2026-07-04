import Link from "next/link";
import { CalculatorSearch } from "@/components/search/calculator-search";

export default function NotFound() {
  return (
    <div className="container-page section text-center max-w-xl">
      <p className="eyebrow">404</p>
      <h1 className="h-hero mt-2">We couldn't find that page</h1>
      <p className="lede mt-3">
        The page may have moved. Try searching for a calculator, or head back to the finance hub.
      </p>
      <div className="mt-7 text-left">
        <CalculatorSearch />
      </div>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="btn btn-ghost">
          Go home
        </Link>
        <Link href="/finance" className="btn btn-primary">
          All calculators
        </Link>
      </div>
    </div>
  );
}
