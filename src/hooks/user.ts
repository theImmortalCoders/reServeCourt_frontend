import { appAPI } from "@/utils/appAPI";
import { AxiosResponse } from "axios";

export async function deleteAccount() {
    try{
        const response: AxiosResponse<void> = await appAPI.delete(
            `/api`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Konto zostało usunięte poprawnie!")
            return response.status;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas usuwania konta");
            return "Wystąpił błąd podczas usuwania konta";
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

export interface GetCurrentUserData {
    id: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    role: string;
    birthDate: string;
    companyName: string;
    address: string;
    city: string;
    active: boolean;
}

export async function getCurrentUser() {
    try{
        const response: AxiosResponse<GetCurrentUserData> = await appAPI.get(
            `/api/me`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Dane użytkownika pobrano poprawnie!")
            return response.data;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas pobierania danych użytkownika");
            return "Wystąpił błąd podczas pobierania danych użytkownika";
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

export async function logoutUser() {
    try{
        const response: AxiosResponse<void> = await appAPI.get(
            `/api/logout`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Wylogowano poprawnie!")
            return response.status;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas wylogowywania użytkownika");
            return "Wystąpił błąd podczas wylogowywania użytkownika";
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

export async function changeUserRole(userId: number, userRole: string) {
    try{
        const response: AxiosResponse<void> = await appAPI.patch(
            `/api/${userId}/role`,
            {
                userRole,
            },
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Rola użytkownika została zmieniona poprawnie!")
            return response.status;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas zmiany roli użytkownika");
            return "Wystąpił błąd podczas zmiany roli użytkownika";
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

export async function banUser(userId: number) {
    try{
        const response: AxiosResponse<void> = await appAPI.patch(
            `/api/${userId}/ban`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Użytkownik został zablokowany poprawnie!")
            return response.status;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas zablokowywania użytkownika");
            return "Wystąpił błąd podczas zablokowywania użytkownika";
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

export async function changeEmail(value: string) {
    try{
        const response: AxiosResponse<void> = await appAPI.patch(
            `/api/change-username`,
            {
                value,
            },
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("E-mail użytkownika został zmieniony poprawnie!")
            return response.status;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas zmieniania e-mailu użytkownika");
            return "Wystąpił błąd podczas zmieniania e-mailu użytkownika";
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

interface changePasswordData {
    oldPassword: string;
    newPassword: string;
}

export async function changePassword(passwordsData: changePasswordData) {
    try{
        const response: AxiosResponse<void> = await appAPI.patch(
            `/api/change-password`,
            passwordsData,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Hasło użytkownika został zmieniony poprawnie!")
            return response.status;
        } else if(response.status === 401) {
            window.location.replace("/login");
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas zmieniania hasła użytkownika");
            return "Wystąpił błąd podczas zmieniania hasła użytkownika";
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

export interface RegisterNewUserData {
    name: string;
    surname: string;
    birthDate: string;
    password: string;
    companyName: string;
    phoneNumber: string;
    email: string;
}

export async function registerNewUser(newUser: RegisterNewUserData) {
    try{
        const response: AxiosResponse<void> = await appAPI.post(
            `/api/register`,
            newUser,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Użytkownik został zarejestrowany poprawnie!")
            return response.status;
        } else if(response.status === 409) {
            console.error("Użytkownik już istnieje");
            return "Użytkownik już istnieje";
        } else {
            console.error("Wystąpił błąd podczas rejestracji użytkownika");
            return "Wystąpił błąd podczas rejestracji użytkownika";
        }
    } catch (error: any) {
        if (error.response.status === 409) {
            console.error("Użytkownik już istnieje");
            return "Użytkownik już istnieje";
        } else {
            throw new Error("Error500");
        }
    }
}

export interface AuthenticateUserData {
    email: string;
    password: string;
}

export async function authenticateUser(userData: AuthenticateUserData) {
    try{
        const response: AxiosResponse<void> = await appAPI.post(
            `/api/login`,
            userData,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Użytkownik został zalogowany poprawnie!")
            return response.status;
        } else if(response.status === 401) {
            console.error("Błędne dane logowania");
            return "Błędne dane logowania";
        } else {
            console.error("Wystąpił błąd podczas rejestracji użytkownika");
            return "Wystąpił błąd podczas rejestracji użytkownika";
        }
    } catch (error: any) {
        if (error.response.status === 401) {
            console.error("Błędne dane logowania");
            return "Błędne dane logowania";
        } else {
            throw new Error("Error500");
        }
    }
}

export interface AuthenticateAsCourtOwner {
    companyName: string;
    address: string;
    city: string;
}

export async function authenticateAsCourtOwner(ownerData: AuthenticateAsCourtOwner) {
    try{
        const response: AxiosResponse<void> = await appAPI.post(
            `/api/become-court-owner`,
            ownerData,
            {
                withCredentials: true,
            }
        );
        if (response.status === 200) {
            console.log("Użytkownik stał się właścicielem kortu!")
            return response.status;
        } else if(response.status === 401) {
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            console.error("Wystąpił błąd podczas dodawnia użytkownikowi roli właściciela kortu");
            return "Wystąpił błąd podczas dodawnia użytkownikowi roli właściciela kortu";
        }
    } catch (error: any) {
        if (error.response.status === 401) {
            console.error("Brak autoryzacji użytkownika");
            return "Brak autoryzacji użytkownika";
        } else {
            throw new Error("Error500");
        }
    }
}