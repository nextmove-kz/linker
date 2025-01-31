export async function handleRequest<T>(
  requestFn: () => Promise<T>
): Promise<T | null> {
  try {
    const response = await requestFn();
    return response;
  } catch (error) {
    console.error("Request error:", error);
    return null;
  }
}
