import ENV from "../../config/config.js";
import { Client, Storage, ID } from "appwrite";

class FeaturedImageService {
  client;
  storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(ENV.appwriteUrl)
      .setProject(ENV.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  async createFeaturedImage(file) {
    try {
        return await this.storage.createFile(
            ENV.appwriteBucketId,
            ID.unique(),
            file
        );
    } catch (error) {
        throw error;
    }
  }

  async deleteFeaturedImage(fileId) {
    try {
        return await this.storage.deleteFile(
            ENV.appwriteBucketId,
            fileId
        );
    } catch (error) {
        throw error;
    }
  }

  async getFilePreview(fileId) {
    try {
        return await this.storage.getFilePreview(
            ENV.appwriteBucketId,
            fileId
        );
    } catch (error) {
        throw error;
    }
  }
}

const featuredImageService = new FeaturedImageService();
export default featuredImageService;
