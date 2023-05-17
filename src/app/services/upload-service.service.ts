import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private UPLOAD_PRESET = 'dvirco_123';
  private CLOUD_NAME = 'dvirco123';
  private UPLOAD_URL = `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`;

  constructor(private http: HttpClient) { }

  async uploadImg(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.UPLOAD_PRESET);

    try {
      const res = await firstValueFrom(this.http.post(this.UPLOAD_URL, formData));
      return res;
    } catch (err) {
      console.error('ERROR!', err);
      throw err;
    }
  }
}
