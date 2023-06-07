import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import EditUser from "../components/EditUser";
import { useNavigate } from 'react-router-dom';
import * as router from 'react-router';

jest.mock("axios");

describe("EditUser", () => {
    test("should submit form and update user", async () => {
        const mockSessionStorage = {
            getItem: jest.fn((key) =>
                key === "Authorization" ? "mock-token" : null
            ),
        };

        Object.defineProperty(window, "sessionStorage", {
            value: mockSessionStorage,
            writable: true,
        });

        const mockedUsedNavigate = jest.fn();

        jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedUsedNavigate);

        const { getByLabelText, getByText } = render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );
        const firstNameInput = getByLabelText("First Name");
        const lastNameInput = getByLabelText("Last Name");
        const emailInput = getByLabelText("Email");
        const passwordInput = getByLabelText("Password");
        const confirmPasswordInput = getByLabelText("Confirm Password");
        const phoneInput = getByLabelText("Phone");
        const submitButton = getByText("Edit");

        fireEvent.change(firstNameInput, { target: { value: "John" } });
        fireEvent.change(lastNameInput, { target: { value: "Doe" } });
        fireEvent.change(emailInput, {
            target: { value: "johndoe@example.com" },
        });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, {
            target: { value: "password123" },
        });
        fireEvent.change(phoneInput, { target: { value: "1234567890" } });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                "http://127.0.0.1:5000/user/self",
                {
                    firstName: "John",
                    lastName: "Doe",
                    email: "johndoe@example.com",
                    password: "password123",
                    phone: "1234567890",
                },
                expect.objectContaining({
                    headers: expect.objectContaining({
                        "Content-Type": "application/json",
                        Authorization: "mock-token",
                    }),
                })
            );
            expect(mockedUsedNavigate).toHaveBeenCalledWith("../account");
        });
    });

    test("passwords not matching", () => {
        const { getByLabelText, getByText } = render(
            <MemoryRouter>
                <EditUser />
            </MemoryRouter>
        );
        const passwordInput = getByLabelText("Password");
        const confirmPasswordInput = getByLabelText("Confirm Password");
        const submitButton = getByText("Edit");

        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, {
            target: { value: "password456" },
        });

        fireEvent.click(submitButton);

        expect(axios.put).not.toHaveBeenCalled();
    });

    // Add more tests for input field validation using patterns
    // For example, you can test email validation, phone number validation, etc.
});
