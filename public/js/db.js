// Offline data
db.enablePersistence().catch((err) => {
  if (err.code == "failed-precondition") {
    // Probably multiple tabs open at once
    console.log("Persistence failed -  Probably multiple tabs open at once?");
  } else if (err.code == "unimplemented") {
    //   Lack of browser support
    console.log("Persistence is not available -  Lack of browser support?");
  }
});
// Real-time listener
db.collection("recipes").onSnapshot((snapshot) => {
  //   console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);

    if (change.type === "added") {
      // add the document data to the web page
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
      // remove the document data to the web page
      removeRecipe(change.doc.id);
    }
  });
});

// Add new recipe
const form = document.querySelector("form.add-recipe");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
  };

  db.collection("recipes")
    .add(recipe)
    .catch((err) => console.log(err));

  form.title.value = "";
  form.ingredients.value = "";
});

// Delete a recipe
const recipeContainer = document.querySelector("div.recipes");
recipeContainer.addEventListener("click", (evt) => {
  // console.log("clicked on: ", evt);
  if (evt.target.tagName === "I") {
    const id = evt.target.getAttribute("data-id");
    db.collection("recipes").doc(id).delete();
  }
});
