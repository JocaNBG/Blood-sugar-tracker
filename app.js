
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sugar-form");
  const tableBody = document.getElementById("entries-table");

  function loadEntries() {
    const data = JSON.parse(localStorage.getItem("sugarData") || "[]");
    tableBody.innerHTML = "";
    data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
    data.forEach(entry => {
      const row = document.createElement("tr");
      const dt = new Date(entry.datetime);
      const date = dt.toLocaleDateString("sr-RS");
      const time = dt.toLocaleTimeString("sr-RS", { hour: '2-digit', minute: '2-digit' });
      row.innerHTML = `
        <td>${date}</td>
        <td>${time}</td>
        <td>${entry.glucose}</td>
        <td>${entry.note || ""}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const glucose = parseFloat(document.getElementById("glucose").value);
    const note = document.getElementById("note").value;
    const datetime = new Date(`${date}T${time}`);
    const data = JSON.parse(localStorage.getItem("sugarData") || "[]");
    data.push({ datetime, glucose, note });
    localStorage.setItem("sugarData", JSON.stringify(data));
    form.reset();
    loadEntries();
  });

  loadEntries();
});
