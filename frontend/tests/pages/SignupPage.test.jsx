import { render, screen, fireEvent } from "@testing-library/react";
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

  test("check username and password fields can be updated", () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);

    fireEvent.change(usernameInput, { target: { value: 'NewUser' } });
    fireEvent.change(passwordInput, { target: { value: 'Testpassword123' } });

    expect(usernameInput.value).toBe('NewUser');
    expect(passwordInput.value).toBe('Testpassword123');
  });

});