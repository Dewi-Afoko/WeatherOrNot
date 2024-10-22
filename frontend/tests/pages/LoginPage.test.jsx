import { render, screen, fireEvent } from "@testing-library/react";
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

  test("check username and password fields can be updated", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const usernameInput = screen.getByLabelText(/Username:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);

    fireEvent.change(usernameInput, { target: { value: 'User' } });
    fireEvent.change(passwordInput, { target: { value: 'Testpassword123' } });

    expect(usernameInput.value).toBe('User');
    expect(passwordInput.value).toBe('Testpassword123');
  });
  

});