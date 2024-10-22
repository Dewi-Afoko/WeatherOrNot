import createFetchMock from "vitest-fetch-mock";
import { describe, vi } from "vitest";

import { addDetails } from "../../src/services/adddetails";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createFetchMock(vi).enableMocks();

// Test Add Details function
describe("add details", () => {

  // Reset the mocks after each test
  afterEach(() => {
    fetch.resetMocks();
  });

  // Test that function gives a correct message and status code
  it("gives a 201 response status code when adding all user details", async () => {

    // Create mock data for a user
    const token = "aMockToken";
    const username = "user"
    const first_name = "John"
    const last_name = "Doe"
    const dob  = "12/12/2013"
    const height = "174"
    const weight = "87"

    // Mock the repsonse body and status code
    fetch.mockResponseOnce(
      JSON.stringify({ message: 'Details updated' }), 
      { status: 201 } 
    );

    // Call the addDetails function with the mock data
    const result = await addDetails(token, username, first_name, last_name, dob, height, weight);

    const fetchArguments = fetch.mock.lastCall; // returns an array that has the url and options object (contains method, headers, body etc)
    const url = fetchArguments[0]; // Gets the url
    const options = fetchArguments[1]; // Gets the options object

    // Check url matches expected endpoint
    expect(url).toEqual(`${BACKEND_URL}/users`);

    // PATCH method
    expect(options.method).toEqual("PATCH");

    // The payload
    expect(options.body).toEqual(
      JSON.stringify({ username: username, first_name: first_name, last_name: last_name, dob: dob, height: height, weight: weight })
    );
    // Content type header
    expect(options.headers["Content-Type"]).toEqual("application/json");

    // Authorization header
    expect(options.headers.Authorization).toEqual(`Bearer ${token}`);
    
    // Returned message should equal 'Details updated'
    expect(result).toEqual({ message: 'Details updated' });
  });


  // Test that function throws an error when the status code is not 201
  it("throws an error when response status is not 201", async () => {

    // Create mock data for a user
    const token = "";
    const username = "";
    const first_name = "";
    const last_name = "";
    const dob = "";
    const height = "";
    const weight = "";
  
    // Mock the repsonse body and status code
    fetch.mockResponseOnce(
      JSON.stringify({ error: 'Unable to change details' }), 
      { status: 400 } 
    );
  
    // Checks function throws an error when status code is not 201
    await expect(addDetails(token, username, first_name, last_name, dob, height, weight))
      .rejects
      .toThrow("Unable to change details");

    });
});
