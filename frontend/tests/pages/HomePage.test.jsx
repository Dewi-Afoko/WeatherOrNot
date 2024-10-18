import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from "../../src/pages/Home/HomePage";


describe("HomePage", () => {
  test("renders two links, Sign up and Log in", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

});