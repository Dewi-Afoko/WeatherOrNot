//  NOT WORKING

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { UserPage } from "../../src/pages/User/UserPage"; // Check the import path

describe.skip("UserPage", () => {
  test("renders a User Profile form", () => {
    render(
      <MemoryRouter>
        <UserPage />
      </MemoryRouter>
    );

    
});
});
