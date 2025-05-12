import { BASE_URL } from "../utils/url";

export async function getAllSeries() {
  try {
    const response = await fetch(`${BASE_URL}/series/`, {
      method: "GET",
    });
    const series = await response.json();
    return series;
  } catch (error) {
    console.log(error);
  }
}

export async function getSerieById(id) {
  try {
    const response = await fetch(`${BASE_URL}/series/${id}`, {
      method: "GET",
    });

    const serie = await response.json();
    return serie;
  } catch (error) {
    console.error(error);
  }
}
