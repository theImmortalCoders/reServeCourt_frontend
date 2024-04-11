import { appAPI } from "@/utils/appAPI";
import { AxiosResponse } from "axios";

export async function deleteImage(imageId: number) {
    try{
        const response: AxiosResponse<void> = await appAPI.delete(
            `/api/image/${imageId}`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Zdjęcie zostało usunięte poprawnie!")
            return response.status;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas usuwania zdjęcia");
            return "Wystąpił błąd podczas usuwania zdjęcia";
        }
    } catch (error: any) {
        if (error.response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            throw new Error("Error500");
        }
    }
}

export interface ImageResponseData {
    id: number;
    path: string;
    hasThumbnail: boolean;
    authorId: number;
}

export async function getAllImagesByAuthorId(authorId: number) {
    try{
        const response: AxiosResponse<ImageResponseData[]> = await appAPI.get(
            `/api/image?authorId=${authorId}`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Zdjęcia danego autora pobrano poprawnie!")
            return response.data;
        } else {
            console.error("Wystąpił błąd podczas pobierania zdjęć danego autora");
            return "Wystąpił błąd podczas pobierania zdjęć danego autora";
        }
    } catch (error: any) {
        throw new Error("Error500");
    }
}
  
export async function uploadSingleImage(uploadedFile: File, thumbnail?: boolean) {
    try {
      const formData = new FormData();
      formData.append('uploadedFile', uploadedFile);
      const response: AxiosResponse<ImageResponseData> = await appAPI.post(
        thumbnail ? `/api/image?thumbnail=${thumbnail}` : `/api/image`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Zdjęcie zostało przesłane poprawnie!")
        return response.data;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else if (response.status === 413) {
            console.error("Obrazek jest zbyt duży!");
            return "Obrazek jest zbyt duży!";
        } else {
            console.error("Wystąpił błąd podczas przesyłania zdjęcia");
            return "Wystąpił błąd podczas przesyłania zdjęcia";
        }
    } catch (error: any) {
        if (error.response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else if (error.response.status === 413) {
            console.error("Obrazek jest zbyt duży!");
            return "Obrazek jest zbyt duży!";
        } else {
            throw new Error("Error500");
        }
    }
}

export async function uploadMultipleImages(uploadedFiles: File[], thumbnail?: boolean) {
    try {
      const formData = new FormData();
        uploadedFiles.forEach((file) => {
            formData.append('uploadedFiles', file);
        }
      );
      const response: AxiosResponse<ImageResponseData[]> = await appAPI.post(
        thumbnail ? `/api/image?thumbnail=${thumbnail}` : `/api/image`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Zdjęcia zostały przesłane poprawnie!")
        return response.data;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else if (response.status === 413) {
            console.error("Obrazek jest zbyt duży!");
            return "Obrazek jest zbyt duży!";
        } else {
            console.error("Wystąpił błąd podczas przesyłania zdjęć");
            return "Wystąpił błąd podczas przesyłania zdjęć";
        }
    } catch (error: any) {
        if (error.response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else if (error.response.status === 413) {
            console.error("Obrazek jest zbyt duży!");
            return "Obrazek jest zbyt duży!";
        } else {
            throw new Error("Error500");
        }
    }
}