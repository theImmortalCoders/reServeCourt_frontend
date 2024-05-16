import { appAPI } from "@/utils/appAPI";
import { AxiosResponse } from "axios";

export async function deleteCourt(courtId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/court/${courtId}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Kort został usunięty poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Brak dostępu");
      return "Brak dostępu";
    } else {
      console.error("Wystąpił błąd podczas usuwania kortu");
      return "Wystąpił błąd podczas usuwania kortu";
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
      console.error("Wystąpił błąd podczas usuwania kortu");
      return "Wystąpił błąd podczas usuwania kortu";
    }
  }
}

interface Image {
  id: number;
  path: string;
  hasThumbnail: boolean;
  authorId: number;
}

interface Location {
  locX: number;
  locY: number;
  name: string;
}

export interface GetCourtDetailsData {
  id: number;
  name: string;
  description: string;
  clubId: number;
  type: string;
  surface: string;
  location: Location;
  closed: boolean;
  images: Image[];
}

export async function getCourtDetails(
  courtId: number
): Promise<GetCourtDetailsData | string> {
  try {
    const response: AxiosResponse<GetCourtDetailsData | string> =
      await appAPI.get(`/api/court/${courtId}`, {
        withCredentials: true,
      });
    if (response.status === 200) {
      console.log("Szczegóły kortu pobrano poprawnie!");
      return response.data;
    } else {
      console.error("Wystąpił błąd podczas pobierania szczegółów kortu");
      return "Wystąpił błąd podczas pobierania szczegółów kortu";
    }
  } catch (error: any) {
    console.error("Wystąpił błąd podczas pobierania szczegółów kortu");
    return "Wystąpił błąd podczas pobierania szczegółów kortu";
  }
}

export interface GetAllAvailableCourtsByDateData {
  id: number;
  name: string;
  clubId: number;
  type: string;
  surface: string;
  location: Location;
  closed: boolean;
  image: Image;
}

export async function getAllAvailableCourtsByDate(
  from: string,
  to: string,
  courtType?: string,
  surface?: string,
  locationName?: string
): Promise<GetAllAvailableCourtsByDateData | string> {
  try {
    let url = `/api/court/available?from=${from}&to=${to}`;
    courtType ? url.concat("&courtType=", courtType) : null;
    surface ? url.concat("&surface=", surface) : null;
    locationName ? url.concat("&locationName=", locationName) : null;
    const response: AxiosResponse<GetAllAvailableCourtsByDateData | string> =
      await appAPI.get(`${url}`, {
        withCredentials: true,
      });
    if (response.status === 200) {
      console.log("Dostępne korty w podanym terminie pobrano poprawnie!");
      return response.data;
    } else {
      console.error(
        "Wystąpił błąd podczas pobierania dostępnych kortów w podanym terminie"
      );
      return "Wystąpił błąd podczas pobierania dostępnych kortów w podanym terminie";
    }
  } catch (error: any) {
    console.error(
      "Wystąpił błąd podczas pobierania dostępnych kortów w podanym terminie"
    );
    return "Wystąpił błąd podczas pobierania dostępnych kortów w podanym terminie";
  }
}

export interface AddCourtData {
  name: string;
  description: string;
  type: string;
  surface: string;
  location: Location;
  imagesIds: number[];
}

export async function addCourt(clubId: number, courtData: AddCourtData) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/court?clubId=${clubId}`,
      courtData,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Kort został dodany poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Brak dostępu");
      return "Brak dostępu";
    } else {
      console.error("Wystąpił błąd podczas dodawania kortu");
      return "Wystąpił błąd podczas dodawania kortu";
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
      console.error("Wystąpił błąd podczas dodawania kortu");
      return "Wystąpił błąd podczas dodawania kortu";
    }
  }
}

export async function updateCourt(courtId: number, courtData: AddCourtData) {
  try {
    const response: AxiosResponse<void> = await appAPI.put(
      `/api/court/${courtId}`,
      courtData,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Kort został zaktualizowany poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Brak dostępu");
      return "Brak dostępu";
    } else {
      console.error("Wystąpił błąd podczas aktualizowania kortu");
      return "Wystąpił błąd podczas aktualizowania kortu";
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
      console.error("Wystąpił błąd podczas aktualizowania kortu");
      return "Wystąpił błąd podczas aktualizowania kortu";
    }
  }
}

export async function setCourtOpenness(courtId: number, closed: boolean) {
  try {
    const response: AxiosResponse<void> = await appAPI.put(
      `/api/court/${courtId}/active?closed=${closed}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Kort został otwarty/zamknięty poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Brak dostępu");
      return "Brak dostępu";
    } else {
      console.error("Wystąpił błąd podczas otwierania/zamykania kortu");
      return "Wystąpił błąd podczas otwierania/zamykania kortu";
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
      console.error("Wystąpił błąd podczas otwierania/zamykania kortu");
      return "Wystąpił błąd podczas otwierania/zamykania kortu";
    }
  }
}
