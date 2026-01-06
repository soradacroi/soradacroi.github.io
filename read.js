async function loadText() {
  try {
    const response = await fetch('works.txt');
    const fullText = await response.text();

    const lines = fullText.split(/\r?\n/);
    const listContainer = document.getElementById('content-list');
    
    if (listContainer) {
      listContainer.innerHTML = '';

      lines.forEach((line) => {
        if (line.trim() === "") return;

        const parts = line.split('|');
        const siteName = parts[0].trim();
        const siteUrl = parts[1] ? parts[1].trim() : "#";
        const li = document.createElement('li');
        

        const link = document.createElement('a');
        link.textContent = siteName;
        link.href = siteUrl;
        link.target = "_blank";
        link.className = "link"; 

        li.appendChild(link);
        listContainer.appendChild(li); 
      });
    }
  } catch (error) {
    console.error("Error:", error); 
  }
}

loadText();