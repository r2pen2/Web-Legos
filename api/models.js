export async function sendModelData(collection, id, data) {
  return new Promise((resolve, reject) => {
    fetch(`/site-models`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        collection: collection,
        documentId: id,
        documentData: data,
      }),
    }).then(res => {
      resolve(res.status);
    });
  })
}

export async function fetchModelData(collection) {
  return new Promise((resolve, reject) => {
    fetch(`/site-models?collection=${collection}`).then(res => {
      res.json().then(data => {
        resolve(data);
      })
    })
  })
}

export function sortByOrder(array) {
  return array.sort((a, b) => a.order - b.order);
}