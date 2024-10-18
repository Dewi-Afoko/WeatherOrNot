import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SignupPage } from "../../src/pages/Signup/SignupPage";

describe("LoginPage", () => {
  test("renders a login form", () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    
    const submitButton = screen.getByRole("submit-button");
    expect(submitButton).toHaveAttribute("value", "Submit"); 
  });
});