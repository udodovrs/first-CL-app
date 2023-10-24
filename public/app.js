document.addEventListener("click", (event) => {
  const dataAtribute = event.target.dataset.type;

  if (dataAtribute === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => event.target.closest("li").remove());
  }

  if (dataAtribute === "edit") {
    const id = event.target.dataset.id;
    const title = event.target.closest("li").querySelector("span");
    const newTitle = prompt("Text new title", title.textContent);    
    if(newTitle){
        edit(id, newTitle).then(() => title.textContent = newTitle);
    }   
  }
});

async function remove(id) {
  return await fetch(`/${id}`, { method: "DELETE" });
}

async function edit(id, newTitle) {
  return await fetch(`/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      title: newTitle,
    }),
  });
}
