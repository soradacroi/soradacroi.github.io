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

        const [name, url, description] = line.split('|').map(item => item.trim());

        const btn = document.createElement('button');
        btn.className = "works-button"; 
        
        btn.style.width = "100%";
        btn.style.height = "auto";
        btn.style.padding = "17px";
        btn.style.marginBottom = "20px";
        btn.style.textAlign = "left"
        
        btn.innerHTML = `
          <div style="font-size: 22px; margin-bottom: 5px;">${name}</div>
          <div style="font-size: 14px; font-weight: normal; opacity: 0.8;">${description}</div>
        `;
        
        btn.onclick = () => window.open(url, '_blank');
        listContainer.appendChild(btn);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

loadText();