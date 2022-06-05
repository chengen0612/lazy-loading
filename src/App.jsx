import { Suspense } from "react";

import Container from "@/components/Container";
import Waterfall from "@/components/Waterfall";

export default function App() {
  return (
    <div className="bg-slate-200">
      <Container className="max-w-[960px]">
        <h1>Waterfall</h1>
        <Suspense>
          <Waterfall />
        </Suspense>
      </Container>
    </div>
  );
}
