import { BASE_URL } from "../utils/url";

export async function getAll() {
  try {
    const response = await fetch(`${BASE_URL}/films/getAll`, {
      method: "GET",
    });
    const films = await response.json();
    return films;
  } catch (error) {
    console.log(error);
  }
}
