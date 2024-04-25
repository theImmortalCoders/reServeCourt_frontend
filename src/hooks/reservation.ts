import { appAPI } from "@/utils/appAPI";
import { AxiosResponse } from "axios";

export async function cancelReservation(reservationId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
    `/api/reservation/${reservationId}`,
     {
      withCredentials: true,
     }
    );
    if (response.status === 200) {
      console.log("Rezerwacja została odwołana poprawnie!");
      return response.status;
    } else if (response.status === 400) {
      console.error("Rezerwacja została już zrealizowana");
      return "Rezerwacja została już zrealizowana";
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Brak dostępu");
      return "Brak dostępu";
    } else {
      console.error("Wystąpił błąd podczas odwoływania rezerwacji");
      return "Wystąpił błąd podczas odwoływania rezerwacji";
    }
  } catch (error: any) {
    if (error.response.status === 400) {
      console.error("Rezerwacja została już zrealizowana");
      return "Rezerwacja została już zrealizowana";
    } else if (error.response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (error.response.status === 403) {
      console.error("Brak dostępu");
      return "Brak dostępu";
    } else {
      throw new Error("Error500");
    }
  }
}

export interface Booker {
    id: number;
    name: string;
    surname: string;
    email: string;
}

export interface GetReservationDetailsData {
    id: number;
    booker: Booker;
    reservedByOwner: boolean;
    timeFrom: string;
    timeTo: string;
    message: string;
    canceled: boolean;
    confirmed: boolean;
}

export async function getReservationDetails(reservationId: number) : Promise<GetReservationDetailsData | string> {
    try {
        const response: AxiosResponse<GetReservationDetailsData | string> = await appAPI.get(
          `/api/reservation/${reservationId}/details`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("Szczegóły rezerwacji pobrano poprawnie!");
          return response.data;
        } else if (response.status === 401) {
          window.location.replace("/login");
          console.error("Brak autoryzacji użytkownika");
          return "Brak autoryzacji użytkownika";
        } else if (response.status === 403) {
          console.error("Brak dostępu");
          return "Brak dostępu";
        } else {
          console.error("Wystąpił błąd podczas pobierania szczegółów rezerwacji");
          return "Wystąpił błąd podczas pobierania szczegółów rezerwacji";
        }
    } catch (error: any) {
        if (error.response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else if (error.response.status === 403) {
            console.error("Brak dostępu");
            return "Brak dostępu";
        } else {
            throw new Error("Error500");
        }
    }
}

