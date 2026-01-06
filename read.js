async function loadText() {
  try {
    const response = await fetch('works.txt');
    const fullText = await response.text();

    const lines = fullText.split(/\r?\n/);

    const listContainer = document.getElementById('content-list');
    listContainer.innerHTML = '';

    lines.forEach((line, index) => {
      
      const li = document.createElement('li');
      li.textContent = line;
      listContainer.appendChild(li);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}
loadText();