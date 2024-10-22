import { render, screen } from "@testing-library/react";

import WeightDetails from "../../src/components/WeightDetails";

// TEST NOT FINISHED
describe.skip("WeightDetails", () => {
  test("Displays headings; Average, Difference, Max and Min", () => {
    render(<WeightDetails/>);

    expect(screen.getByRole("heading")).toHaveTextContent("Average:");
  });
});