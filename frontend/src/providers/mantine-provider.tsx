"use client";

import { MantineProvider as Provider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "../theme/theme";

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider theme={theme} defaultColorScheme="dark">
      <Notifications />
      {children}
    </Provider>
  );
}
