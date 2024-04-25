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

export async function getReservationDetailsById(reservationId: number) : Promise<GetReservationDetailsData | string> {
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

export interface ReservationData {
    id: number;
    reservedByOwner: boolean;
    timeFrom: string;
    timeTo: string;
    cancelled: boolean;
    confirmed: boolean;
}

export async function getAllReservationByCourtId(courtId: number, from?: string, to?: string) : Promise<ReservationData[] | string> {
    try {
        const response: AxiosResponse<ReservationData[] | string> = await appAPI.get(
          from ? `/api/reservation/${courtId}?from=${from}` : 
          to ? `/api/reservation/${courtId}?to=${to}` :
          (from && to) ? `/api/reservation/${courtId}?from=${from}&to=${to}` : 
          `/api/reservation/${courtId}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("Wszystkie rezerwacje w danym korcie pobrano poprawnie!");
          return response.data;
        } else {
          console.error("Wystąpił błąd podczas pobierania rezerwacji w danym korcie");
          return "Wystąpił błąd podczas pobierania rezerwacji w danym korcie";
        }
    } catch (error: any) {
        throw new Error("Error500");
    }
}

export async function getUpcomingReservationByClubId(clubId: number, confirmed?: boolean) : Promise<ReservationData[] | string> {
    try {
        const response: AxiosResponse<ReservationData[] | string> = await appAPI.get(
          confirmed ? `/api/reservation/${clubId}/upcoming?confirmed=${confirmed}` : `/api/reservation/${clubId}/upcoming`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("Wszystkie nadchodzące rezerwacje w danym klubie pobrano poprawnie!");
          return response.data;
        } else if (response.status === 401) {
          window.location.replace("/login");
          console.error("Brak autoryzacji użytkownika");
          return "Brak autoryzacji użytkownika";
        } else if (response.status === 403) {
          console.error("Brak dostępu");
          return "Brak dostępu";
        } else {
          console.error("Wystąpił błąd podczas pobierania nadchodzących rezerwacji w danym klubie");
          return "Wystąpił błąd podczas pobierania nadchodzących rezerwacji w danym klubie";
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

export async function confirmReservation(reservationId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.patch(
      `/api/reservation/${reservationId}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Rezerwacja została zatwierdzona poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Brak dostępu");
      return "Brak dostępu";
    } else {
      console.error("Wystąpił błąd podczas zatwierdzania rezerwacji");
      return "Wystąpił błąd podczas zatwierdzania rezerwacji";
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