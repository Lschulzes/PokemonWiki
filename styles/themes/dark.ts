import { createTheme } from "@nextui-org/react";

export const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      gradient:
        "linear-gradient(112deg, $blue100 -25%, $brand -10%, $brandAlt 80%)",
      brand: "#00fa9a",
      brandAlt: "#00b4b4",
    },
  },
});
