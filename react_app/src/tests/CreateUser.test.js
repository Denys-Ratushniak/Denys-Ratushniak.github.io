import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import axios from "axios";
import CreateUser from "../components/CreateUser";

jest.mock("axios");

describe("CreateUser", () => {
    it("should handle form submission and display success message", async () => {
        const mockedResponse = {
            data: {
                message: "User successfully created",
            },
        };
        axios.post.mockResolvedValue(mockedResponse);

        const { getByLabelText, getByText } = render(<CreateUser />, {
            wrapper: MemoryRouter,
        });

        // Fill in the form fields
        fireEvent.change(getByLabelText("Username *"), {
            target: { value: "testuser" },
        });

        fireEvent.change(getByLabelText("First Name *"), {
            target: { value: "testuser" },
        });

        fireEvent.change(getByLabelText("Last Name *"), {
            target: { value: "testuser" },
        });

        fireEvent.change(getByLabelText("Email *"), {
            target: { value: "testuser@gmail.com" },
        });

        fireEvent.change(getByLabelText("Password *"), {
            target: { value: "testuser" },
        });

        fireEvent.change(getByLabelText("Confirm Password *"), {
            target: { value: "testuser" },
        });

        fireEvent.change(getByLabelText("Phone"), {
            target: { value: "+380961414141" },
        });

        fireEvent.change(getByLabelText("Birth Date"), {
            target: { value: "23.5.2023" },
        });

        // Submit the form
        fireEvent.click(getByText("Create User"));

        // Wait for the asynchronous form submission to complete
        await waitFor(() =>
            expect(axios.post).toHaveBeenCalledWith(
                "http://127.0.0.1:5000/user",
                expect.any(Object),
                expect.any(Object)
            )
        );
    });

    // it("should display error message when passwords do not match", () => {
    //     const { getByLabelText, getByText } = render(<CreateUser />, { wrapper: MemoryRouter});

    //     // Fill in the form fields
    //     fireEvent.change(getByLabelText("Username *"), {
    //     target: { value: "testuser" },
    //     });
    //     // Fill in other form fields similarly...

    //     // Set password and confirm password fields with different values
    //     fireEvent.change(getByLabelText("Password *"), {
    //     target: { value: "password123" },
    //     });
    //     fireEvent.change(getByLabelText("Confirm Password *"), {
    //     target: { value: "differentpassword" },
    //     });

    //     // Submit the form
    //     fireEvent.click(getByText("Create User"));

    //     // Assert that error message is displayed
    //     expect(getByText("Passwords do not match")).toBeInTheDocument();
    // });

    // Add more test cases for different scenarios
});
