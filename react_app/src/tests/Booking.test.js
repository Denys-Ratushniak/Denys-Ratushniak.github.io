import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Booking from "../components/Booking";
import axios from "axios";
import Modal from "react-modal";

jest.mock("axios");
Modal.setAppElement(document.createElement("div"));

describe("Booking", () => {
    test("should displays classrooms on the screen", async () => {
        const mockClassrooms = [
            { id: 1, name: "Classroom 1", capacity: 20 },
            { id: 2, name: "Classroom 2", capacity: 30 },
            { code: 200 },
        ];

        // Mock the API call
        jest.spyOn(window, "fetch").mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockClassrooms),
        });

        const { getByText } = render(<Booking />);

        // Wait for the API call and state update
        await waitFor(() => {
            mockClassrooms.slice(0, -1).forEach((classroom) => {
                const classroomNameElement = getByText(
                    `Classroom name: ${classroom.name}`
                );
                expect(classroomNameElement).toBeInTheDocument();

                const classroomCapacityElement = screen.getByText(
                    `Capacity: ${classroom.capacity}`
                );
                expect(classroomCapacityElement).toBeInTheDocument();
            });
        });
    });

    test("successfull booking", async () => {
        const mockedResponse = {
            data: {
                message: "Classroom was successfully booked",
            },
        };

        const mockClassrooms = [
            { id: 1, name: "Classroom 1", capacity: 20 },
            { code: 200 },
        ];

        axios.post.mockResolvedValue(mockedResponse);

        // Mock the API call
        jest.spyOn(window, "fetch").mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockClassrooms),
        });
        const { getByLabelText, getByText, getByRole, getByTestId } = render(<Booking />);

        await waitFor(() => {
            const bookButton = getByRole("first-book-button");
            expect(bookButton).toBeInTheDocument();
            fireEvent.click(bookButton);

            const bookElement = getByText("Book a Classroom");
            expect(bookElement).toBeInTheDocument();

            const startDateInput = getByLabelText("Start Date");
            expect(startDateInput).toBeInTheDocument();

            const startTimeInput = getByRole("start-time");
            expect(startTimeInput).toBeInTheDocument();

            const endDateInput = getByLabelText("End Date");
            expect(endDateInput).toBeInTheDocument();

            const endTimeInput = getByRole("end-time");
            expect(endTimeInput).toBeInTheDocument();

            const submitButton = getByRole("second-book-button");
            startDateInput.value = "2023-06-01";
            startTimeInput.value = "09:00";
            endDateInput.value = "2023-06-01";
            endTimeInput.value = "10:00";

            fireEvent.click(submitButton);

            waitFor(() => {
                expect(axios.post).toHaveBeenCalledWith(
                    "http://127.0.0.1:5000/booking/order",
                    {
                        start_time: "2023-06-01 09:00:00",
                        end_time: "2023-06-01 10:00:00",
                        classroomId: 1,
                    },
                    expect.any(Object)
                );
            });
        });
    });
});
