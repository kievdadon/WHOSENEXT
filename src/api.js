const BASE_URL = "https://whosenext-4-fh9z.onrender.com"; // your backend

// ========== Existing API calls ==========

export async function getMenu(storeName) {
  try {
    const response = await fetch(`${BASE_URL}/api/menu/${storeName}`);
    if (!response.ok) throw new Error("Failed to fetch menu");
    return await response.json();
  } catch (error) {
    console.error("Error fetching menu:", error);
    return { menu: [] };
  }
}

export async function sendCheckin(message) {
  try {
    const res = await fetch(`${BASE_URL}/checkin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    return await res.json();
  } catch (err) {
    console.error("Check-in error:", err);
    return { error: "Check-in failed" };
  }
}

export async function trackOrder(orderId) {
  try {
    const res = await fetch(`${BASE_URL}/track-order/${orderId}`);
    return await res.json();
  } catch (err) {
    console.error("Track order error:", err);
    return { error: "Tracking failed" };
  }
}

export async function rateWorker(workerId, rating, review) {
  try {
    const res = await fetch(`${BASE_URL}/rate-worker`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ worker_id: workerId, rating, review })
    });
    return await res.json();
  } catch (err) {
    console.error("Rate worker error:", err);
    return { error: "Rating failed" };
  }
}

export async function cancelOrder(orderId) {
  try {
    const res = await fetch(`${BASE_URL}/cancel-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: orderId })
    });
    return await res.json();
  } catch (err) {
    console.error("Cancel order error:", err);
    return { error: "Cancellation failed" };
  }
}

export async function completeDelivery(orderId, driverAccountId, driverPercentage, companyPercentage) {
  try {
    const res = await fetch(`${BASE_URL}/complete-delivery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_id: orderId,
        driver_account_id: driverAccountId,
        driver_percentage: driverPercentage,
        company_percentage: companyPercentage,
      })
    });
    return await res.json();
  } catch (err) {
    console.error("Complete delivery error:", err);
    return { error: "Delivery completion failed" };
  }
}

// ========== New API calls for auth and dashboard ==========

// Register user
export async function register(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("Register error:", err);
    return { error: "Registration failed" };
  }
}

// Login user and save token
export async function login(username, password) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    return data;
  } catch (err) {
    console.error("Login error:", err);
    return { error: "Login failed" };
  }
}

// Helper for authorized fetch calls
function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

// Get products with optional category and search filters
export async function getProducts(category = "", search = "") {
  try {
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (search) query.append("search", search);
    const res = await fetch(`${BASE_URL}/products?${query.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    console.error("Get products error:", err);
    return [];
  }
}

// Get store availability
export async function getStoreAvailability(storeId) {
  try {
    const res = await fetch(`${BASE_URL}/stores/${storeId}/availability`);
    if (!res.ok) throw new Error("Failed to get store availability");
    return await res.json();
  } catch (err) {
    console.error("Store availability error:", err);
    return { is_open: false };
  }
}

// Worker: get orders assigned to logged-in worker
export async function getWorkerOrders() {
  try {
    const res = await authFetch(`${BASE_URL}/worker/orders`);
    if (!res.ok) throw new Error("Failed to fetch worker orders");
    return await res.json();
  } catch (err) {
    console.error("Worker orders error:", err);
    return [];
  }
}

// Worker: accept a pending order
export async function acceptOrder(orderId) {
  try {
    const res = await authFetch(`${BASE_URL}/worker/orders/${orderId}/accept`, {
      method: "POST",
    });
    return await res.json();
  } catch (err) {
    console.error("Accept order error:", err);
    return { error: "Failed to accept order" };
  }
}

// Worker: update status of assigned order
export async function updateOrderStatus(orderId, status) {
  try {
    const res = await authFetch(`${BASE_URL}/worker/orders/${orderId}/update_status`, {
      method: "POST",
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (err) {
    console.error("Update order status error:", err);
    return { error: "Failed to update order status" };
  }
}

// Admin: get all users
export async function getAdminUsers() {
  try {
    const res = await authFetch(`${BASE_URL}/admin/users`);
    if (!res.ok) throw new Error("Failed to fetch admin users");
    return await res.json();
  } catch (err) {
    console.error("Admin users error:", err);
    return [];
  }
}

// Admin: get all orders
export async function getAdminOrders() {
  try {
    const res = await authFetch(`${BASE_URL}/admin/orders`);
    if (!res.ok) throw new Error("Failed to fetch admin orders");
    return await res.json();
  } catch (err) {
    console.error("Admin orders error:", err);
    return [];
  }
}
