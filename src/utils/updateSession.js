export async function updateSession(newSessionData) {
  await fetch("/api/auth/session", {
    method: "POST",
    body: JSON.stringify(newSessionData),
  });
}
