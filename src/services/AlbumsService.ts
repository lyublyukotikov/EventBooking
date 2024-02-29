import $api from "../http/index.js";
import { AxiosResponse } from "axios";
import { Album } from "../models/Album.js";

export default class AlbumService {
  //возвращает промис содержаший массив объектов Album
  static async getAlbums(): Promise<AxiosResponse<Album[]>> {
    // ожидается  что ответ содержит массив объектов Album 
    return $api.get<Album[]>("/albomlist");
  }
}



  

  
