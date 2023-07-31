import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export class AuthenticationManager {
  
  permissions: WLPermissionsConfig | null = null;
  config: FirebaseOptions | null = null;

  constructor(config: FirebaseOptions, permissions: WLPermissionsConfig) {
    this.permissions = permissions;
    this.config = config;
  }

  setConfig(config: FirebaseOptions) {
    this.config = config;
  }

  app: FirebaseApp | null = null;
  firestore: Firestore | null = null;
  auth: Auth | null = null;
  storage: FirebaseStorage | null = null;

  initialize() {
    if (!this.config) {
      console.error("AuthenticationManager has no config.");
      return;
    }
    this.app = initializeApp(this.config);
    this.firestore = getFirestore();
    this.auth = getAuth();
    this.storage = getStorage()
  }

    /**
   * Sign in user with google and return user
   */
  
  async signInWithGoogle() {
    if (!this.config) { return; }
    const provider = new GoogleAuthProvider();
    return new Promise((resolve, reject) => {
      if (!this.auth) { 
        reject(new Error("AuthenticationManager instance has not been given a config."))
        return; 
      }
      signInWithPopup(this.auth, provider).then((result) => {
        resolve(result.user);
      }).catch((error) => {
        reject(error)
      });
    })
  }

  async createNewUser(userId: string) {
    return new Promise((resolve, reject) => {
      fetch(`/site-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          permissions: this.permissions
        }),
      }).then(res => {
        resolve(res.status);
      });
    })
  }

  async getPermission(currentSignIn: {uid: string}, perm: string) {
    if (!currentSignIn) { return; }
    if (!currentSignIn.uid) { return; }
    return new Promise((resolve, reject) => {
      fetch(`/site-auth?id=${currentSignIn.uid}`).then((res) => {
        res.json().then((json) => {
          resolve(json[perm]);
        })
      })
    })
  }
}

export class WLPermissionsConfig {
  /** Whether user can edit everything */
  op: string = "op";
  /** Whether user can edit WLSiteText */
  text: string = "siteText";
  /** Whether user can edit WLSiteImages */
  images: string = "siteImages";
  
  constructor(fields: {[key: string]: string}) {
    for (const fieldKey of Object.keys(fields)) {
      this[fieldKey] = fields[fieldKey];
    }
  }
}