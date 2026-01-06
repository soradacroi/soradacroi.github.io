
async function loadText() {
  try {
    const response = await fetch('work.txt');
    const text = await response.text();
    
    document.getElementById('content-target').textContent = text;
  } catch (error) {
    console.error("Error loading the text file:", error);
    document.getElementById('content-target').textContent = "Failed to load file.";
  }
}

loadText();