(async function () {
  // Get the last part of the URL path (e.g., "recruitment")
  const path = window.location.pathname.split("/").filter(Boolean).pop();

  try {
    const response = await fetch('redirects.json');
    const redirects = await response.json();

    const destination = redirects[path];

    if (destination) {
      window.location.href = destination;
    } else {
      document.body.innerHTML = `<h1>404 Not Found</h1><p>No redirect found for "/${path}"</p>`;
    }
  } catch (error) {
    console.error("Redirect error:", error);
    document.body.innerHTML = `<h1>Error</h1><p>Could not load redirects.</p>`;
  }
})();
