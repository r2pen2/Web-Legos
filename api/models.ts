export class SiteModel {
  id: string;
  collection: string;
  name: string;
  images: object;
  shortStrings: object;
  longStrings: object;
  numbers: object;
}

export async function sendModelData(collection: string, id: string, data: string) {
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

export async function fetchModelData(collection: string) {
  return new Promise((resolve, reject) => {
    fetch(`/site-models?collection=${collection}`).then(res => {
      res.json().then(data => {
        resolve(data);
      })
    })
  })
}

export function sortByOrder(array: any[]) {
  return array.sort((a, b) => a.order - b.order);
}



export async function deleteModel(collection: string, id: string) {
  return new Promise((resolve, reject) => {
    fetch(`/site-models`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        collection: collection,
        documentId: id,
        action: "delete",
      }),
    }).then(res => {
      resolve(res.status);
    });
  })
}

export async function createModel(collection: string, data: string) {
  return new Promise((resolve, reject) => {
    fetch(`/site-models`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        collection: collection,
        documentData: data,
        action: "create"
      }),
    }).then(res => {
      resolve(res.status);
    });
  })
}