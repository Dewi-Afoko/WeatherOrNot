import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LogoutButton from "../../src/components/LogoutButton";

describe("LogoutButton", () => {
  test("displays a button called 'Log out'", () => {
    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Log out");
  });
});
