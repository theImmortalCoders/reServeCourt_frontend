import { appAPI } from "@/utils/appAPI";
import { AxiosResponse } from "axios";

export async function markNotificationAsRead(notificationId: number) {
    try {
      const response: AxiosResponse<void> = await appAPI.post(
        `/api/notification?notificationId=${notificationId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("Powiadomienie zostało przeczytane poprawnie!");
        return response.status;
      } else if (response.status === 401) {
        window.location.replace("/login");
        console.error("Brak autoryzacji użytkownika");
        return "Brak autoryzacji użytkownika";
      } else if (response.status === 403) {
        console.error("Brak dostępu");
        return "Brak dostępu";
      } else {
        console.error("Wystąpił błąd podczas zaznaczania powiadomienia");
        return "Wystąpił błąd podczas zaznaczania powiadomienia";
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
        console.error("Wystąpił błąd podczas zaznaczania powiadomienia");
        return "Wystąpił błąd podczas zaznaczania powiadomienia";
      }
    }
}