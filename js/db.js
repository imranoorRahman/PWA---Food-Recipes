// Real-time listener
db.collection("recipes").onSnapshot((snapshot) => {
  //   console.log(snapshot.docChanges());
  snapshot.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);

    change.type === "added"
      ? // add the document data to the web page
        console.log(change)
      : null;

    change.type === "removed"
      ? // remove the document data to the web page
        console.log(change)
      : null;
  });
});
