import $api from "../http/index.js";
import { AxiosResponse } from "axios";
import { Photo } from "../models/Photo.js";

export default class PhotoService {
  // Метод для получения фотографий в альбоме по ID
  static async getPhotosInAlbum(albumId: string): Promise<AxiosResponse<Photo[]>> {
    return $api.get<Photo[]>(`/albums/${albumId}/photos`);
  }
  
 // Добавление фотографии в альбом
 static async addPhotoToAlbum(albumId: number, title: string, file: File): Promise<AxiosResponse<{ photo: Photo }>> {
  const formData = new FormData();
  formData.append('photo', file);
  formData.append('title', title);

  return $api.post<{ photo: Photo }>(`http://localhost:5000/api/album/${albumId}/photo`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

  
}