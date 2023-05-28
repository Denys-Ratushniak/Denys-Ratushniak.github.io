import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Account from "../components/Account";

jest.mock("axios");

describe("Account", () => {
    test("should fetch user info and update state", async () => {
        const mockAccountData = {
            username: "testuser",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+1234567890",
            birthDate: "1990-01-01",
        };

        // Mock the API call for getting user info
        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockAccountData })
        );

        const { getByText } = render(
            <MemoryRouter>
                <Account />
            </MemoryRouter>
        );

        // Wait for the API call and state update
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                "http://127.0.0.1:5000/user/self",
                expect.any(Object)
            );
        });
        // Expect the user info to be rendered on the screen
        expect(
            getByText(`Username: ${mockAccountData.username}`)
        ).toBeInTheDocument();
        expect(
            getByText(`First Name: ${mockAccountData.firstName}`)
        ).toBeInTheDocument();
        expect(
            getByText(`Last Name: ${mockAccountData.lastName}`)
        ).toBeInTheDocument();
        expect(
            getByText(`Email: ${mockAccountData.email}`)
        ).toBeInTheDocument();
        expect(
            getByText(`Phone: ${mockAccountData.phone}`)
        ).toBeInTheDocument();
        expect(
            getByText(`Birth Date: ${mockAccountData.birthDate}`)
        ).toBeInTheDocument();
    });

    test("should display user orders on the screen", async () => {
        const mockOrders = [
            {
                id: 1,
                classroom_name: "Classroom 1",
                classroom_capacity: 20,
                start_time: "2023-06-01 09:00:00",
                end_time: "2023-06-01 10:00:00",
            },
            {
                id: 2,
                classroom_name: "Classroom 2",
                classroom_capacity: 30,
                start_time: "2023-06-01 11:00:00",
                end_time: "2023-06-01 12:00:00",
            },
            { code: 200 },
        ];
        const mockAccountData = {
            username: "testuser",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+1234567890",
            birthDate: "1990-01-01",
        };

        // Mock the API call for getting user info
        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockAccountData })
        );
        // Mock the API call for getting user orders
        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockOrders })
        );

        const { getByText } = render(
            <MemoryRouter>
                <Account />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                "http://127.0.0.1:5000/booking/ordersby/me",
                expect.any(Object)
            );
        });

        // Wait for the API call and state update
        mockOrders.slice(0, -1).forEach((order) => {
            expect(
                getByText(`Classroom Name: ${order.classroom_name}`)
            ).toBeInTheDocument();

            const capacityElement = getByText(
                `Capacity: ${order.classroom_capacity}`
            );
            expect(capacityElement).toBeInTheDocument();

            const startTimeElement = getByText(
                `Start Time: ${order.start_time}`
            );
            expect(startTimeElement).toBeInTheDocument();

            const endTimeElement = getByText(`End Time: ${order.end_time}`);
            expect(endTimeElement).toBeInTheDocument();
        });
    });

    test("should delete the selected order when cancel order button is clicked", async () => {
        const mockOrders = [
            {
                id: 1,
                classroom_name: "Classroom 1",
                classroom_capacity: 20,
                start_time: "2023-06-01 09:00:00",
                end_time: "2023-06-01 10:00:00",
            },
            { code: 200 },
        ];
        const mockAccountData = {
            username: "testuser",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            phone: "+1234567890",
            birthDate: "1990-01-01",
        };

        // Mock the API call for getting user info
        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockAccountData })
        );
        // Mock the API calls for getting user orders and deleting an order
        axios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockOrders })
        );
        axios.delete.mockResolvedValueOnce(() => Promise.resolve());

        const { getByRole } = render(
            <MemoryRouter>
                <Account />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                "http://127.0.0.1:5000/booking/ordersby/me",
                expect.any(Object)
            );
        });

        // Wait for the API call and state update
        await waitFor(() => {
            const cancelButton = getByRole("cancel-order-button");
            expect(cancelButton).toBeInTheDocument();

            fireEvent.click(cancelButton);
        });

        // Wait for the delete API call to be made
        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith(
                "http://127.0.0.1:5000/booking/order/1",
                expect.any(Object)
            );
        });
    });

    test("should delete the user and navigate to home page", async () => {
        const mockRemoveItem = jest.fn();
        const mockSessionStorage = {
            getItem: jest.fn((key) =>
                key === "Authorization" ? "mock-token" : null
            ),
        };

        Object.defineProperty(window, "sessionStorage", {
            value: mockSessionStorage,
            writable: true,
        });

        Object.defineProperty(window.sessionStorage, "removeItem", {
            value: mockRemoveItem,
            writable: true,
        });

        axios.delete.mockResolvedValueOnce({});

        const { getByText } = render(
            <MemoryRouter>
                <Account />
            </MemoryRouter>
        );
        fireEvent.click(getByText("Delete User"));

        await waitFor(() => {
            expect(axios.delete).toHaveBeenCalledWith(
                "http://127.0.0.1:5000/user/self",
                expect.objectContaining({
                    headers: expect.objectContaining({
                        "Content-Type": "application/json",
                        Authorization: "mock-token",
                    }),
                })
            );
            expect(mockRemoveItem).toHaveBeenCalledWith("Authorization");
        });
    });
});
