import { createBrowserRouter } from "react-router";

import { IndexPage } from "../pages/main/page";
import { MemoPage } from "../pages/memo/page";
import { Layout } from "../shared/ui/layout";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        index: true,
        Component: IndexPage,
      },
      {
        path: "/:id",
        Component: MemoPage,
      },
    ],
  },
]);
