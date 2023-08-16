import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "..";

describe("<Button />", () => {
  it("renders children", () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole("button", { name: "Button" });

    expect(button).toBeInTheDocument();
  });

  it("calls `onClick` when the button is clicked", async () => {
    const user = userEvent.setup();

    const onClick = jest.fn();

    render(<Button onClick={onClick}>Button</Button>);

    const button = screen.getByRole("button", { name: "Button" });

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
