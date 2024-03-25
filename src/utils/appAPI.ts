import axios from "axios";

export const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const appAPI = axios.create({baseURL: NEXT_PUBLIC_API_BASE_URL});