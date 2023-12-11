import ENV from '../../config/config.js';
import { Client, Account, ID } from "appwrite";

class AuthService {
  client;
  account;

  constructor() {
    this.client = new Client()
      .setEndpoint(ENV.appwriteUrl)
      .setProject(ENV.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password
      );

      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log(ENV.appwriteUrl, ENV.appwriteProjectId);
      throw error;
    }
  }

  // async getCurrentUser() {
  //     try {
  //         return await this.account.get();
  //     } catch (error) {
  //         throw error;
  //     }
  //     return null;
  // }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }

  async logout() {
    try {
      return  this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;