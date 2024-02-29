import $api from "../http/index.js";
import { AxiosResponse } from "axios";
import { Event } from "../models/Events.js";


export default class EventService {
  static createEvent(eventData: Event): Promise<AxiosResponse<Event>> {
    return $api.post<Event>("/create", eventData);
  }
  static getAllEvents(): Promise<AxiosResponse<Event[]>> {
    return $api.get<Event[]>("/all");
  }
  static getAllEventsByUser(): Promise<AxiosResponse<Event[]>> {
    return $api.get<Event[]>("/user-events");
  }
  static deleteEvent(eventId: number): Promise<AxiosResponse<string>> {
    return $api.delete<string>(`/events/${eventId}`);
  }
  static bookEvent(bookingData: { date: string; eventId: number }[]): Promise<AxiosResponse<string>> {
    return $api.post<string>("/bookings", bookingData);
  }
   static getAllBookings(): Promise<AxiosResponse<string>> {
    return $api.get<string>("/all-events-booking");
  }
  static getBookingsByUserId(): Promise<AxiosResponse<string>> {
    return $api.get<string>("/bookings-by-user-id");
  }
  static deleteBookingByData(bookingData: { eventId: number; date: string }): Promise<AxiosResponse<string>> {
    return $api.delete<string>("/delete-booking", { data: bookingData });
}

}
