async function loadText() {
  try {
    const response = await fetch('works.txt');
    const fullText = await response.text();
    const lines = fullText.split(/\r?\n/);
    const listContainer = document.getElementById('content-list');
    const clickSound = document.getElementById('button-clicked');

    if (listContainer) {
      listContainer.innerHTML = ''; 

      lines.forEach((line) => {
        if (line.trim() === "") return;

        const [name, url, description, gitUrl] = line.split('|').map(item => item?.trim());

        const projectWrapper = document.createElement('div');
        projectWrapper.style.display = "flex";
        projectWrapper.style.alignItems = "center";
        projectWrapper.style.gap = "0px";
        projectWrapper.style.width = "100%";
        projectWrapper.style.marginBottom = "0px";

        const btn = document.createElement('button');
        btn.className = "works-button"; 
        btn.style.flex = "1";
        btn.style.height = "auto";
        btn.style.padding = "20px";
        btn.style.textAlign = "left"; 

        btn.innerHTML = `
          <div style="font-size: 22px; font-weight: bold; margin-bottom: 8px;">${name}</div>
          <div style="font-size: 15px; font-weight: normal; opacity: 0.8; line-height: 1.4;">${description}</div>
        `;
        
        btn.onclick = () => {
          if (clickSound) clickSound.play();
          setTimeout(() => window.open(url, '_blank'), 100); 
        };

        projectWrapper.appendChild(btn);

        if (gitUrl && gitUrl !== "") {
          const gitBtn = document.createElement('button');
          gitBtn.className = "works-button";
          gitBtn.innerHTML = `<img src="resources/github-mark.webp" style ="width: 45px;">`;
          gitBtn.style.width = "96px";
          gitBtn.style.height = "96.5px";
          gitBtn.style.flexShrink = "0";
          gitBtn.style.display = "flex";
          gitBtn.style.justifyContent = "center";
          gitBtn.style.alignItems = "center";

          gitBtn.onclick = () => {
            if (clickSound) clickSound.play();
            setTimeout(() => window.open(gitUrl, '_blank'), 100);
          };
          projectWrapper.appendChild(gitBtn);
        }

        listContainer.appendChild(projectWrapper);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('load', loadText);