export async function getRequest(url: any) {
  let data = await fetch(`${url}`);
  return data.json();
}
export function formatDate(date: any) {
  let newDate = new Date(date);
  // Format the date as 'Mon, 1st Jan 2024' in Indian style
  const options: object = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = newDate.toLocaleDateString("en-IN", options);
  return formattedDate;
}
