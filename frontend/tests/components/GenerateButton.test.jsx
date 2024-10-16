import { render, screen } from "@testing-library/react";

import GenerateButton from "../../src/components/GenerateButton";

describe("GenerateButton", () => {
  test("displays a button called 'Generate'", () => {
    render(<GenerateButton/>);
    const button = screen.getByRole("button");
    expect(button.textContent).toBe("Generate Workout");
  });
});
