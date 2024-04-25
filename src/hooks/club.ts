import { appAPI } from "@/utils/appAPI";
import { AxiosResponse } from "axios";

export async function deleteClub(clubId: number) {
  try {
    const response: AxiosResponse<void> = await appAPI.delete(
      `/api/club/${clubId}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Klub został usunięty poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Brak dostępu");
      return "Brak dostępu";
    } else {
      console.error("Wystąpił błąd podczas usuwania klubu");
      return "Wystąpił błąd podczas usuwania klubu";
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
      console.error("Wystąpił błąd podczas usuwania klubu");
      return "Wystąpił błąd podczas usuwania klubu";
    }
  }
}

interface Image {
  id: number;
  path: string;
  hasThumbnail: boolean;
  authorId: number;
}

export interface Location {
  locX: number;
  locY: number;
  name: string;
}

export interface Court {
  id: number;
  name: string;
  clubId: number;
  type: string;
  surface: string;
  location: Location;
  closed: boolean;
  image: Image;
}

interface Owner {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export interface OpenClosedGetting {
  open: string;
  closed: string;
}

export interface DaysOpenGetting {
  monday: OpenClosedGetting;
  tuesday: OpenClosedGetting;
  wednesday: OpenClosedGetting;
  thursday: OpenClosedGetting;
  friday: OpenClosedGetting;
  saturday: OpenClosedGetting;
  sunday: OpenClosedGetting;
}

export interface GetClubDetailsData {
  id: number;
  name: string;
  description: string;
  logo: Image;
  location: Location;
  courts: Court[];
  owner: Owner;
  rating: number;
  daysOpen: DaysOpenGetting;
}

export async function getClubDetails(
  clubId: number
): Promise<GetClubDetailsData | string> {
  try {
    const response: AxiosResponse<GetClubDetailsData | string> =
      await appAPI.get(`/api/club/${clubId}`, {
        withCredentials: true,
      });
    if (response.status === 200) {
      console.log("Szczegóły klubu pobrano poprawnie!");
      return response.data;
    } else {
      console.error("Wystąpił błąd podczas pobierania szczegółów klubu");
      return "Wystąpił błąd podczas pobierania szczegółów klubu";
    }
  } catch (error: any) {
    console.error("Wystąpił błąd podczas pobierania szczegółów klubu");
    return "Wystąpił błąd podczas pobierania szczegółów klubu";
  }
}

export interface Content {
  id: number;
  name: string;
  description: string;
  logo: Image;
  location: Location;
  rating: number;
  courtsAmount: number;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface GetAllClubsData {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Content[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

export async function getAllClubs(): Promise<GetAllClubsData> {
  try {
    const response: AxiosResponse<GetAllClubsData> = await appAPI.get(
      `/api/club?sort=name&sortDirection=ASC`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Wszystkie kluby pobrano poprawnie!");
      return response.data;
    } else {
      throw new Error("Wystąpił błąd podczas pobierania wszystkich klubów");
    }
  } catch (error: any) {
    throw new Error("Wystąpił błąd podczas pobierania wszystkich klubów");
  }
}

export interface HourMinuteSecondNano {
  hour: number;
  minute: number;
  second: 0;
  nano: 0;
}

export interface OpenClosedAdding {
  open: HourMinuteSecondNano;
  closed: HourMinuteSecondNano;
}

export interface DaysOpenAdding {
  monday: OpenClosedAdding;
  tuesday: OpenClosedAdding;
  wednesday: OpenClosedAdding;
  thursday: OpenClosedAdding;
  friday: OpenClosedAdding;
  saturday: OpenClosedAdding;
  sunday: OpenClosedAdding;
}

export interface AddClubData {
  name: string;
  description: string;
  location: Location;
  logoId: number;
  daysOpen: DaysOpenAdding;
}

export async function addClub(clubData: AddClubData) {
  try {
    const response: AxiosResponse<void> = await appAPI.post(
      `/api/club`,
      clubData,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Klub został dodany poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Brak dostępu");
      return "Brak dostępu";
    } else {
      console.error("Wystąpił błąd podczas dodawania klubu");
      return "Wystąpił błąd podczas dodawania klubu";
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
      console.error("Wystąpił błąd podczas dodawania klubu");
      return "Wystąpił błąd podczas dodawania klubu";
    }
  }
}

export async function updateClub(clubId: number, clubData: AddClubData) {
  try {
    const response: AxiosResponse<void> = await appAPI.put(
      `/api/club/${clubId}`,
      clubData,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      console.log("Klub został zaktualizowany poprawnie!");
      return response.status;
    } else if (response.status === 401) {
      window.location.replace("/login");
      console.error("Brak autoryzacji użytkownika");
      return "Brak autoryzacji użytkownika";
    } else if (response.status === 403) {
      console.error("Brak dostępu");
      return "Brak dostępu";
    } else {
      console.error("Wystąpił błąd podczas aktualizowania klubu");
      return "Wystąpił błąd podczas aktualizowania klubu";
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
      console.error("Wystąpił błąd podczas aktualizowania klubu");
      return "Wystąpił błąd podczas aktualizowania klubu";
    }
  }
}
