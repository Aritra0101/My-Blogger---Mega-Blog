import ENV from "../../config/config.js";
import { Client, Databases, Query } from "appwrite";

class ArticleService {
  client;
  databases;

  constructor() {
    this.client = new Client()
      .setEndpoint(ENV.appwriteUrl)
      .setProject(ENV.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        ENV.appwriteDatabaseId,
        ENV.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw error;
    }
    return null;
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        ENV.appwriteDatabaseId,
        ENV.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      throw error;
    }
    return null;
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        ENV.appwriteDatabaseId,
        ENV.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
    return null;
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        ENV.appwriteDatabaseId,
        ENV.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw error;
    }
    return null;
  }

  // async getPosts(queries = [Query.equal("status", true)]) {
  //     try {
  //         return await this.databases.listDocuments(
  //           ENV.appwriteDatabaseId,
  //           ENV.appwriteCollectionId,
  //           queries
  //         );
  //     } catch (error) {
  //         throw error;
  //     }
  //     return null;
  // }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        ENV.appwriteDatabaseId,
        ENV.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }
}

const articleService = new ArticleService();
export default articleService;
