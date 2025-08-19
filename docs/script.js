(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const target = urlParams.get("target");
  const messageBox = document.getElementById('messageBox');

  function updateMessage(title, message, isError = false) {
    messageBox.innerHTML = `
      <h1>${title}</h1>
      <p>${message}</p>
      ${!isError ? '<div class="loading"></div>' : ''}
    `;
    
    if (isError) {
      messageBox.classList.add('error');
    } else {
      messageBox.classList.remove('error');
    }
  }

  if (!target) {
    updateMessage('Missing Target', 'Please provide a ?target= parameter in the URL.', true);
    return;
  }

  try {
    const response = await fetch('redirects.json');
    const redirects = await response.json();

    const destination = redirects[target];

    if (destination) {
      // updateMessage('Redirecting...', `Taking you to ${target}...`);
      updateMessage('Redirecting...', `Please wait...`);
      setTimeout(() => {
        window.location.href = destination;
      }, 2000);
    } else {
      updateMessage('404 Not Found', `No redirect found for target "${target}".`, true);
    }
  } catch (error) {
    console.error("Redirect error:", error);
    updateMessage('Error', 'Could not load redirects.json.', true);
  }
})();
