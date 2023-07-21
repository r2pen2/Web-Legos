interface StringToNumber {
  [key: string]: number | null;
}

interface StringToString {
  [key: string]: string | null;
}

export abstract class SiteModel {

  constructor(collection: string, modelName: string) {
    this.collection = collection;
    this.modelName = modelName;
  }

  id: string;
  collection: string;
  modelName: string;
  images: StringToString = {};
  shortStrings: StringToString = {};
  longStrings: StringToString = {};
  numbers: StringToNumber = {};

  /**
   * Get model data from server and return
   * @returns a promise resolved with model data from server
   * @param model - model to fetch
   * @param setFetched - setter function for model fetched state
   */
  static async get(model: SiteModel, setFetched: Function) {
    return new Promise((resolve, reject) => {
      fetchModelData((new model()).collection).then((data) => {
        if (setFetched) {
          setFetched(true);
        }
        resolve(data);
      })
    })
  }

  /**
   * @async
   * Get model data from the server and call setter function for the state
   * @param model - model to fetch
   * @param setter - setter function for model state
   * @param setFetched - setter function for model fetched state
   */
  static async getAndSet(model: SiteModel, setter: Function, setFetched: Function) {
    fetchModelData((new model()).collection).then((data) => {
      if (setFetched) {
        setFetched(true);
      }
      setter(data);
    })
  }
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