import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "..";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  title: "Button",
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};
