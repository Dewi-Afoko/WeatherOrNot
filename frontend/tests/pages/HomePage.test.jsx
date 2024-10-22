import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from "../../src/pages/Home/HomePage";
import { LoginPage } from "../../src/pages/Login/LoginPage";
import { SignupPage } from "../../src/pages/Signup/SignupPage";

describe("HomePage", () => {
  test("renders a Sign up link", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const signUpLink = screen.getByRole('link', { name: /Sign Up/i });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/signup');

  });

    test("renders a login link", () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
  
      const logInLink = screen.getByRole('link', { name: /Log In/i });
      expect(logInLink).toBeInTheDocument();
      expect(logInLink).toHaveAttribute('href', '/login');
  
    });

    test("navigates to the login page when the 'Log In' link is clicked", () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      );

      const logInLink = screen.getByRole('link', { name: /Log In/i });
      fireEvent.click(logInLink); // Click 'Login In' link

      expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument(); // Ensure this heading exists in LoginPage
    });

    test("navigates to the signup page when the 'Sign Up' link is clicked", () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </MemoryRouter>
      );

      const signUpLink = screen.getByRole('link', { name: /Sign Up/i });
      fireEvent.click(signUpLink); // Click 'Sign Up' link

      expect(screen.getByRole('heading', { name: /Signup/i })).toBeInTheDocument(); // Ensure this heading exists in LoginPage
    });

});