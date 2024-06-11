import {getCurrentUser} from "@/hooks/user";

export default async function getRole() {
    const userData = await getCurrentUser();
    if (userData && typeof userData === "object" && "role" in userData) {
        return userData.role;
    }
    return null;
}