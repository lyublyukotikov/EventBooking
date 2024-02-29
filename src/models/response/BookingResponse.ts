interface BookingResponse {
  bookedDates: { date: string; eventId: number }[];
  userId: number;
  userEmail: string;
}
export default BookingResponse;