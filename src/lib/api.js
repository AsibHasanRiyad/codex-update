const API_BASE_URL = import.meta.env.VITE_API_URL || null;

async function apiFetch(endpoint, options = {}) {
  if (!API_BASE_URL) return null;
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function submitContactForm(data) {
  if (API_BASE_URL) {
    return apiFetch("/contact", { method: "POST", body: JSON.stringify(data) });
  }
  // Frontend-only fallback
  console.log("Contact form submitted (no API configured):", data);
  return { success: true, message: "Message sent successfully!" };
}

export async function fetchServices() {
  if (API_BASE_URL) return apiFetch("/services");
  const { servicesData } = await import("../data/services");
  return servicesData;
}

export async function fetchProducts() {
  if (API_BASE_URL) return apiFetch("/products");
  const { products } = await import("../data/products");
  return products;
}

export async function fetchCaseStudies() {
  if (API_BASE_URL) return apiFetch("/case-studies");
  const { caseStudies } = await import("../data/caseStudies");
  return caseStudies;
}
