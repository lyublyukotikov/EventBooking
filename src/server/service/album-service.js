// album-service.js
import { Album } from "../models/album.js";
import { Photo } from "../models/photo.js";
import ApiError from "../exceptions/api-error.js";


class AlbumService {
  // на вход получаем заголовок альбома из контроллера
  async createAlbum(title) {
    // Создаем альбом в базе данных
    const album = await Album.create({ title });
    return album;
  }
// Получение всех существующих альбомов 
async getAllAlbumList() {
  try {
    const albums = await Album.findAll();

    if (!albums || albums.length === 0) {
      throw new Error("Альбомы не найдены.");
    }

    // Возвращаем массив альбомов
    return { albums };
  } catch (error) {
    console.error(error);
    throw new Error("Произошла ошибка при получении альбомов.");
  }
}



// на вход получаем название альбома чтобы получить его из контроллера
async getPhotoList(albumId) {
  try {
    // Находим альбом по id
    const album = await Album.findByPk(albumId);

    // Проверяем существование альбома
    if (!album) {
      throw new Error("Альбом с таким id не найден.");
    }

    // Находим фотографии, принадлежащие данному альбому
    const photosInAlbum = await Photo.findAll({
      where: { albumId: album.id },
    });

    // Возвращаем объект с фотографиями
    return { photos: photosInAlbum };
  } catch (error) {
    console.error(error);
    throw new Error("Произошла ошибка при поиске альбома и фотографий.");
  }
}

//обновление альбома на вход поступает id и заголовок на который нужно поменять
  async updateAlbum(id, title) {
    // ищем по id альбом
    const album = await Album.findByPk(id);
    // если такого альбома с таким id нет,пробрасываем ошибку
    if(!album){
      throw ApiError.BadRequest(`Альбома с id=${id} не существует`)
    }
    // меняем название альбома на то,которое поступило 
    album.title=title
    // сохраняем
    await album.save();
    // возвращаем 
    return album;
    
  }
// удаление альбома,на вход поступает id альбома который нужно удалить 
  async deleteAlbum(id) {
    // ищем альбом по id в базе данных
    const album =await Album.findByPk(id);
    if(!album){
      throw ApiError.BadRequest(`Альбома с id =${id} не существует.`)
      
    }
    await album.destroy()
    // возвращаем информацию об успешном удалении альбома
    return {success:true};
  }
// функция по добавлению фото в альбом 
  async addPhotoToAlbum(photoFilename, albumId,title) {
    // Сохраняем фотографию в базе данных
    const photo = await Photo.create({
      title: title, // Замените на реальный заголовок
      url: '../../../albums/' + photoFilename, // Путь к файлу
      albumId: albumId,
    });
    return photo;
  }

 // функция по добавлению фотото в несколько альбомов (пока не работает)
  async addPhotoToAlbums(photoFilename, albumIds, title) {
    try {
      // Сохраняем фотографию в базе данных
      const photo = await Photo.create({
        title: title, // Замените на реальный заголовок
        url: '../../../albums/' + photoFilename, // Путь к файлу
      });
  
      // Получаем объекты альбомов по их идентификаторам
      const albums = await Album.findAll({ where: { id: albumIds } });
  
      // Связываем фотографию с несколькими альбомами
      await photo.setAlbums(albums);
  
      return photo;
    } catch (error) {
      console.error(error);
      throw new Error("Произошла ошибка при добавлении фотографии в альбомы.");
    }
  }
}

export default new AlbumService();