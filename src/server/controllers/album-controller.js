import AlbumService from "../service/album-service.js";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api-error.js";

class AlbumController {
  // функция создания альбома
  async createAlbum(req, res, next) {
    try {
      // создади переменную в которую будем класть ошибки валидации,в функцию validationRezult() передадим request от туда автоматически дастанется тело и провалидируется
     const errors = validationResult(req);
     //проверяем нашлась ли какая то ошибка при валидации,если нет передаем ее в Api-error
     if(!errors.isEmpty()){
      return next(
           // передаем сообщение ошибка при валидации вторым параметром массив с ошибками
           ApiError.BadRequest("Ошибка при валидации",errors.array())
      );
      }
      //вытаскиваем из тела название альбома
      const {title}=req.body
      //передаем сервису по созданию альбомов название альбома
      const album = await AlbumService.createAlbum(title);
       // возвращаем на клиент наш альбом
       return res.json(album);
    } catch (error) {
      // Вызываем функцию next чтобы передать нашу ошибку 
      next(error)
    }
     
     }
    //  функция получения листа всех альбомов с базы данных
    async  getAllAlbumList(req, res, next) {
      try {
        // Получаем все альбомы с использованием сервиса
        const result = await AlbumService.getAllAlbumList();
    
        // Возвращаем массив альбомов на клиент в формате JSON
        return res.json(result.albums);
      } catch (error) {
        // Если произошла ошибка, передаем ее дальше
        next(error);
      }
    }
    
  
// Функция получения листа фотографий в альбоме 
async getPhotoList(req, res, next) {
  try {
    // Получаем id альбома из параметров запроса
    const { albumId } = req.params;

    // Проверяем, что id альбома предоставлен
    if (!albumId) {
      throw ApiError.BadRequest('Не предоставлен id альбома.');
    }

    // Получаем фотографии по id альбома с использованием сервиса
    const result = await AlbumService.getPhotoList(albumId);

    // Возвращаем массив фотографий на клиент в формате JSON
    return res.json(result.photos);
  } catch (error) {
    // Если произошла ошибка, передаем ее дальше
    next(error);
  }
}
  // Логика обновления альбома
  async updateAlbum(req, res, next) {
   try{
    // вытаскиваем id альбома который надо изменить из параметра
    const {id}=req.params
    // вытаскиваем название альбома который нужно изменить 
    const {title}=req.body;
    const album = await AlbumService.updateAlbum(id,title)
    return res.json(album)
   }catch(error){
    next(error);
   }
  }
// Логика удаления альбома
async deleteAlbum(req, res, next) {
  try {
    const { id } = req.params;
    const result = await AlbumService.deleteAlbum(id);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

  // логика добавления 1 фотографии в альбом 
  async addPhotoToAlbum(req,res,next){
    try {
      const { albumId } = req.params;
      const photo = req.file; // Файл загружается через multer
      const title = req.body.title; // Заголовок из тела запроса
      // если файл не загружен возвращаем ошибку на сервер 
      if (!photo) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      //передаем данные в сервис 
      const photoData = await AlbumService.addPhotoToAlbum(photo.filename, albumId,title);
      // передаем информацию на сервер об удачном занесении фото в альбом 
      res.json({ success: true, photo: photoData });
    }catch(error){
      next(error);
    }
  }
  // добавление фотографии в несколько альбомов
  async addPhotoToAlbums (req, res, next) {
    try {
      const albumIds = req.params.albumIds.split(',').map(Number);
      const photo = req.file;
      const title = req.body.title;
  
      if (!photo) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }
  
      const photoData = await AlbumService.addPhotoToAlbums(photo.filename, albumIds, title);
      res.json({ success: true, photo: photoData });
    } catch (error) {
      next(error);
    }
  }
}

export default new AlbumController();