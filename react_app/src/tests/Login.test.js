import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "../components/Login";

jest.mock("axios");

function isUsernameValid(username) {
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(username);
}

describe("Login", () => {
    test("validate username (valid username)", () => {
        const username = "username";
        expect(isUsernameValid(username)).toBe(true);
    });

    test("validate username (invalid username)", () => {
        const username = "user$name";
        expect(isUsernameValid(username)).toBe(false);
    });

    test("submit login form successfuly", async () => {
        const mockFn = jest.fn();
        const { getByLabelText, getByText } = render(
            <Router>
                <Login handleSumbit={mockFn} />
            </Router>
        );

        const usernameInput = getByLabelText("Username *");
        const passwordInput = getByLabelText("Password *");
        const submitButton = getByText("Sign in");

        fireEvent.change(usernameInput, { target: { value: "testuser" } });
        fireEvent.change(passwordInput, { target: { value: "testpassword" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                "http://127.0.0.1:5000/user_login",
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        Authorization: "Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk",
                    },
                }
            );
        });
    });
});
