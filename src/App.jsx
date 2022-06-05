import { Suspense } from "react";
import { PulseLoader } from "react-spinners";

import Container from "@/components/Container";
import LazyList from "@/components/LazyList";

export default function App() {
  return (
    <div>
      <Container className="mt-6 max-w-[960px]">
        <h1 className="text-center text-6xl font-extrabold text-zinc-900">
          Lazy loading
        </h1>
      </Container>
      <Container className="my-9 max-w-[960px]">
        <Suspense
          fallback={
            <div className="text-center">
              <PulseLoader color="#e4e4e7" />
            </div>
          }
        >
          <LazyList />
        </Suspense>
      </Container>
    </div>
  );
}
