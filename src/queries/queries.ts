
export async function getMediumPosts() {
  const res = await fetch(`${process.env.MEDIUM_API_URL}`, { next: { revalidate: 604800 } });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  return res.json();
}
