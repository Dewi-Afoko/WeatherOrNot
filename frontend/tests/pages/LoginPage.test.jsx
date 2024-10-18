import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../src/pages/Login/LoginPage";

describe("LoginPage", () => {
  test("renders a login form", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    
    const submitButton = screen.getByRole("submit-button");
    expect(submitButton).toHaveAttribute("value", "Submit"); 
  });
});