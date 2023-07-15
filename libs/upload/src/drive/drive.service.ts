import { appConfig } from '@app/core';
import { Injectable, Logger } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';
import { resolve } from 'path';

@Injectable()
export class DriveService {
  private drive: drive_v3.Drive;
  private readonly FOLDER_NAME = appConfig.DRIVE.PARENT_FOLDER_NAME;
  private readonly logger = new Logger(DriveService.name);
  private parentsFolderId = '';

  constructor() {
    const auth = this.authClientId();

    this.drive = google.drive({
      version: 'v3',
      auth,
    });
  }

  async uploadFile(filename: string, mimeType: string, body: any) {
    try {
      if (!this.parentsFolderId) {
        await this.createFolderBackup();
      }

      const res = await this.drive.files.create({
        requestBody: {
          name: filename,
          parents: [this.parentsFolderId],
        },
        media: {
          mimeType,
          body,
        },
        fields: 'id, name',
      });

      this.logger.verbose(`File '${filename}' has been uploaded.`);

      return res;
    } catch (error) {
      this.logger.error('Error: ' + error);
      throw error;
    }
  }

  async createFolderBackup() {
    try {
      const folderExists = await this.checkFolder();
      if (folderExists) {
        return;
      }
      const response = await this.drive.files.create({
        requestBody: {
          name: this.FOLDER_NAME,
          mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id, name, mimeType, webViewLink',
      });

      const folder = response.data;
      if (!folder || !folder.id) {
        throw new Error('Folder could not be created.');
      }
      this.parentsFolderId = folder.id;

      this.logger.log(
        `Folder '${folder.name}' has been created with ID: ${folder.id}`,
      );
    } catch (error) {
      this.logger.error('Error occurred while creating folder:', error);
    }
  }

  async checkFolder(): Promise<boolean> {
    try {
      const response = await this.drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='${this.FOLDER_NAME}' and trashed=false`,
        fields: 'files(id, name)',
      });

      const files = response.data.files || [];
      if (files.length > 0) {
        if (!files[0].id) {
          throw new Error('Folder could not be created.');
        }

        this.parentsFolderId = files[0].id;
        this.logger.verbose(
          `The folder '${this.FOLDER_NAME}' has been created.`,
          this.parentsFolderId,
        );
        return true;
      } else {
        this.logger.verbose(
          `The folder '${this.FOLDER_NAME}' has not been created yet.`,
        );
        return false;
      }
    } catch (error) {
      this.logger.error('Error occurred while checking the folder:', error);
      return false;
    }
  }

  authServiceAccount() {
    const KEY_FILE_PATH = resolve(
      process.cwd(),
      'keys/google',
      'credential.json',
    );

    const auth = new google.auth.GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    return auth;
  }

  authClientId() {
    const oauth2Client = new google.auth.OAuth2(
      appConfig.DRIVE.GOOGLE_API_CLIENT_ID,
      appConfig.DRIVE.GOOGLE_API_CLIENT_SECRET,
      appConfig.DRIVE.GOOGLE_API_REDIRECT_URI,
    );

    oauth2Client.setCredentials({
      refresh_token: appConfig.DRIVE.GOOGLE_API_REFRESH_TOKEN,
    });

    return oauth2Client;
  }
}
