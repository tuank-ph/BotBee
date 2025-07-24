(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const target = urlParams.get("target");

  if (!target) {
    document.body.innerHTML = `<h1>Missing target</h1><p>Please provide a ?target= parameter in the URL.</p>`;
    return;
  }

  try {
    const response = await fetch('redirects.json');
    const redirects = await response.json();

    const destination = redirects[target];

    if (destination) {
      window.location.href = destination;
    } else {
      document.body.innerHTML = `<h1>404 Not Found</h1><p>No redirect found for target "${target}".</p>`;
    }
  } catch (error) {
    console.error("Redirect error:", error);
    document.body.innerHTML = `<h1>Error</h1><p>Could not load redirects.json.</p>`;
  }
})();
