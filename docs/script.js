(async function () {
  const currentDomain = window.location.hostname;

  try {
    const response = await fetch('redirects.json');
    const redirects = await response.json();

    const destination = redirects[currentDomain];

    if (destination) {
      // Redirect to the mapped URL
      window.location.href = destination;
    } else {
      // If not found, show an error
      document.body.innerHTML = `<h1>404 Not Found</h1><p>No redirect found for ${currentDomain}</p>`;
    }
  } catch (error) {
    // If something fails (like the file doesn't load), show a fallback error
    document.body.innerHTML = `<h1>Error</h1><p>Could not load redirects.</p>`;
  }
})();
