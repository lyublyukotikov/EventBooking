// Модель того что шлем серверу
interface IBookingItem {
  date: string;
  eventId: number;
}

interface IBooking {
  bookedDates: IBookingItem[];
  
}

export default IBooking;