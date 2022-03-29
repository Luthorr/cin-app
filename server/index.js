import express from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import jwt from 'jsonwebtoken';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import usersRoutes from './routes/users.js';

const app = express();
const PORT = 5000;
const API_URL = `http://185.41.68.195:${PORT}`;
const UPLOADS_PATH = '/uploads/';

const con = mysql.createPool({
  host: '',
  user: '',
  password: '',
  database: '',
  multipleStatements: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/', (req, res) => res.send('Api kinowe'));

const handleError = (
  res,
  err,
  code,
  message = 'Oops! Something went wrong!'
) => {
  console.log(err);
  res.status(code).end(message);
};

const deleteFile = (fileName) => {
  fs.unlink(`./uploads/${fileName}`, (err) => {
    if (err && err.code == 'ENOENT') {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error('Error occurred while trying to remove file');
    } else {
      console.info(`removed`);
    }
  });
};

const SECRET_KEY =
  'tIHYvvtfo0EcNVvOhxlLzCtUwbZS/UI7I0CcVZGEC3eTDSgnKZhQbjPqrUXJiixzBoH2dsPfV5sAPPmHkQC/yv6ug/lRwB8WqpB4k+iv2J7kwfEnuNbx9nG2G65iGDoKFDDmf8vMPHECBJZVKc8QH9jQQsQjYno9GN4znTbgW1WDillwY3Dv36jWfIyJ73zlhb4VUbFOhls8G+tLGQvozduxRCY6f1O8GX7G3XFpYBdkoY8yt9kF43AUiMwO94I6h8ZeMMUrrqyt6E2zgy3yWIgUFck/WHOwl26Vji9cQgB71IzMsKZ59ZtkD2TF/24Qey8arLPw5mwt0H4eEdqTrA==';

const SECRET_REFRESH_KEY =
  '7dX6TAbrPmpf18SFRM+YE5AV+fAUP/5YrjZiL8f9PgFzFhh/fcLxBLZFgpfjA98e75LTGNDY0nDDdeJAgSIamSqKLLlv+g7zRP/rpgZ1RjFQapSiSCPtcHVVUxU0wsc6eHgeTgMxYssZP/tJCyyu9Rp6BW//NB47z6fwLPLBvS6hlRarD/uZDN3VA5ybpBP1jdjdEby6yr5SBK4UD+StgF5xL8eYgl5S0jHFiINPyMyb8Pn1JKY8tErSzPyoY0H5UAqKEFGMzOheK7on58nucjEelh8ouJTBzBYZO2olCnkg0ecW9NjlfltDb2uViT91JKC3mjpy7vXZ0zaBnpKdWg==';

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, data) => {
      if (err) {
        return res.status(403).send('Token nie jest prawidłowy');
      }
      req.user = data;
      next();
    });
  } else {
    res.status(401).send('Autoryzacja zakończona niepowodzeniem.');
  }
};

const isAdmin = (req) => {
  if (req.user.role === 2) return true;
  return false;
};

const isOwner = (req) => {
  if (req.user.id == req.params.userId) return true;
  return false;
};

// ===================

app.get('/cities', (req, res) => {
  // res.send('GET /test running');
  const sql = 'SELECT * FROM city';
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    const citiesArray = [];
    result.forEach((record) => {
      citiesArray.push({ ...record });
    });
    res.send(citiesArray);
  });
});

// app.get('/users', (req, res) => {
//     // res.send('GET /test running');
//     con.query('SELECT * FROM users', (err, result) => {
//         if (err) {
//             console.log(err.sqlMessage);
//             res.status(500).send(err.sqlMessage);
//             return;
//         }
//         const usersArray = [];
//         result.forEach((record) => {
//             usersArray.push({ ...record });
//         });
//         res.send(usersArray);
//     });
// });

//wszystkie gatunki filmowe
app.get('/genres', (req, res) => {
  // res.send('GET /test running');
  const sql = 'SELECT * FROM genre';
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    const genresArray = [];
    result.forEach((record) => {
      genresArray.push({ ...record });
    });
    console.log('GET /genres');
    res.send(genresArray);
  });
});

//wszystkie kina
app.get('/cinemas', (req, res) => {
  const sql =
    'SELECT cinema.id, cinema.street, city.name as cityName FROM cinema, city WHERE cinema.cityId = city.id';
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    console.log('GET /cinemas');
    res.send(result);
  });
});

//wszystkie filmy
app.get('/movies', (req, res) => {
  const sql =
    'SELECT ur.movieId, COUNT(*) as votesCount, SUM(ur.rate) as totalSum, AVG(ur.rate) AS rate FROM userRatings ur GROUP BY ur.movieId';

  const sql1 =
    'SELECT movie.id, movie.bgImage, movie.posterImage, movie.title, movie.duration, movie.trailerURL, movie.minAge, movie.description, movie.releaseDate, movie.director,genre.id as genreId, genre.name AS genreName FROM movie, genre  WHERE movie.genreId = genre.id';

  con.query(sql, (err, stats) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    con.query(sql1, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      const newResult = [];
      let rate = 0;
      let votes = 0;
      let totalSum = 0;
      result.forEach((movie) => {
        for (let i = 0; i < stats.length; i += 1) {
          if (stats[i].movieId === movie.id) {
            rate = Math.round((stats[i].rate + Number.EPSILON) * 100) / 100;
            votes = stats[i].votesCount;
            totalSum = stats[i].totalSum;
            break;
          }
        }
        const { genreId, genreName, ...newMovie } = { ...movie };
        newResult.push({
          ...newMovie,
          bgImage: `${API_URL}/file/${movie.bgImage}`,
          posterImage: `${API_URL}/file/${movie.posterImage}`,
          genre: { id: genreId, name: genreName },
          statistics: {
            rate,
            votes,
            totalSum,
          },
        });
        rate = 0;
        votes = 0;
        totalSum = 0;
      });
      res.send(newResult);
    });
  });
});

//wszystkie filmy - panel admina
app.get('/admin-movies', (req, res) => {
  const sql1 =
    'SELECT movie.id, movie.bgImage, movie.posterImage, movie.title, movie.duration, movie.trailerURL, movie.minAge, movie.description, movie.releaseDate, movie.director,genre.id as genreId FROM movie, genre WHERE movie.genreId = genre.id';
  con.query(sql1, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    res.send(result);
  });
});

//wszystkie seanse - panel admina
app.get('/admin-filmshows', (req, res) => {
  const sql1 =
    'select f.id, r.id as roomId, r.name as roomName, m.id as movieId, m.title, f.playDate, cit.name as cityName, cin.id as cinemaId, cin.street from filmshow f, room r, movie m, city cit, cinema cin where f.movieId = m.id && f.roomId = r.id && r.cinemaId = cin.id && cin.cityId = cit.id order by f.playDate DESC';
  con.query(sql1, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    res.send(result);
  });
});

//wszystkie sale - panel admina
app.get('/admin-rooms', (req, res) => {
  const sql1 =
    'select r.*, cit.id as cityId, cit.name as cityName, cin.street from room r, cinema cin, city cit where r.cinemaId = cin.id && cin.cityId = cit.id ';
  con.query(sql1, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    res.send(result);
  });
});

app.get('/admin-news', (req, res) => {
  const sql1 = 'select b.* from news b order by b.creationDate DESC';
  con.query(sql1, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    res.send(result);
  });
});

app.get('/admin-cinemas', (req, res) => {
  const sql1 =
    'select cin.*, cit.name as cityName from cinema cin, city cit where cin.cityId = cit.id';
  con.query(sql1, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    res.send(result);
  });
});

//wszystkie akutalnie wyświetlane filmy
app.get('/played-movies', (req, res) => {
  const sql =
    'SELECT ur.movieId, COUNT(*) as votesCount, SUM(ur.rate) as totalSum, AVG(ur.rate) AS rate FROM userRatings ur GROUP BY ur.movieId';

  const sql1 =
    'SELECT distinct m.*, g.name as genreName from movie m, filmshow f, genre g WHERE m.id = f.movieId && g.id = m.genreId && f.playDate >= DATE(NOW())';

  con.query(sql, (err, stats) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    con.query(sql1, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      const newResult = [];
      let rate = 0;
      let votes = 0;
      let totalSum = 0;
      result.forEach((movie) => {
        for (let i = 0; i < stats.length; i += 1) {
          if (stats[i].movieId === movie.id) {
            rate = Math.round((stats[i].rate + Number.EPSILON) * 100) / 100;
            votes = stats[i].votesCount;
            totalSum = stats[i].totalSum;
            break;
          }
        }
        const { genreId, ...newMovie } = { ...movie };
        newResult.push({
          ...newMovie,
          bgImage: `${API_URL}/file/${movie.bgImage}`,
          posterImage: `${API_URL}/file/${movie.posterImage}`,
          genre: { id: movie.genreId, name: movie.genreName },
          statistics: {
            rate,
            votes,
            totalSum,
          },
        });
        rate = 0;
        votes = 0;
        totalSum = 0;
      });
      res.send(newResult);
    });
  });
});

//wszystkie przyszłe filmy
app.get('/future-movies', (req, res) => {
  const sql =
    'SELECT ur.movieId, COUNT(*) as votesCount, SUM(ur.rate) as totalSum, AVG(ur.rate) AS rate FROM userRatings ur GROUP BY ur.movieId';

  const sql1 =
    'SELECT m.*, g.name as genreName from movie m, genre g WHERE g.id = m.genreId && m.releaseDate >= DATE(NOW())';

  con.query(sql, (err, stats) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    con.query(sql1, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      const newResult = [];
      let rate = 0;
      let votes = 0;
      let totalSum = 0;
      result.forEach((movie) => {
        for (let i = 0; i < stats.length; i += 1) {
          if (stats[i].movieId === movie.id) {
            rate = Math.round((stats[i].rate + Number.EPSILON) * 100) / 100;
            votes = stats[i].votesCount;
            totalSum = stats[i].totalSum;
            break;
          }
        }
        const { genreId, ...newMovie } = { ...movie };
        newResult.push({
          ...newMovie,
          bgImage: `${API_URL}/file/${movie.bgImage}`,
          posterImage: `${API_URL}/file/${movie.posterImage}`,
          genre: { id: movie.genreId, name: movie.genreName },
          statistics: {
            rate,
            votes,
            totalSum,
          },
        });
        rate = 0;
        votes = 0;
        totalSum = 0;
      });
      res.send(newResult);
    });
  });
});

app.get('/movies/:searchString', (req, res) => {
  const sql1 =
    'SELECT movie.id, movie.bgImage, movie.posterImage, movie.title, movie.duration, movie.minAge, movie.description, movie.releaseDate, genre.name AS genreName FROM movie, genre  WHERE movie.genreId = genre.id && movie.title LIKE ?';
  con.query(sql1, `${req.params.searchString}%`, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    console.log('result', result);
    const newResult = result.map((movie) => ({
      ...movie,
      bgImage: `${API_URL}/file/${movie.bgImage}`, //tworzymy tutaj HTML URL, żeby pobrać zdjęcie z serwera http://localhost..../file/nazwa_pliku.jpg
      posterImage: `${API_URL}/file/${movie.posterImage}`,
    }));
    res.send(newResult);
  });
});

app.get('/news', (req, res) => {
  const sql = 'SELECT * from news ORDER BY news.creationDate DESC';
  con.query(sql, (err, result, fields) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    console.log('result', result);
    const newResult = result.map((news) => ({
      ...news,
      image: `${API_URL}/file/${news.image}`, //tworzymy tutaj HTML URL, żeby pobrać zdjęcie z serwera http://localhost..../file/nazwa_pliku.jpg
    }));
    res.send(newResult);
  });
});

app.get('/news/:id', (req, res) => {
  const sql = 'SELECT * from news WHERE news.id = ?';
  con.query(sql, req.params.id, (err, result, fields) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    console.log('result', result);
    const newResult = result.map((news) => ({
      ...news,
      image: `${API_URL}/file/${news.image}`, //tworzymy tutaj HTML URL, żeby pobrać zdjęcie z serwera http://localhost..../file/nazwa_pliku.jpg
    }));
    res.send(newResult[0]);
  });
});

// film o danym id
app.get('/movie/:movieId', (req, res) => {
  const sql =
    'SELECT movie.id, movie.bgImage, movie.posterImage, movie.title, movie.trailerURL, movie.duration, movie.minAge, movie.description, movie.releaseDate, movie.director, genre.id AS genre_id, genre.name AS genreName FROM movie, genre  WHERE movie.genreId = genre.id && movie.id = ?';
  con.query(sql, req.params.movieId, (err, result, fields) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    const sql1 =
      'SELECT ur.movieId, COUNT(*) as votesCount, SUM(ur.rate) as totalSum, AVG(ur.rate) AS rate FROM userRatings ur WHERE ur.movieId = ? GROUP BY ur.movieId ';
    con.query(sql1, req.params.movieId, (err, stats) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      let rate = 0;
      let votes = 0;
      let totalSum = 0;
      if (stats.length > 0) {
        rate = Math.round((stats[0].rate + Number.EPSILON) * 100) / 100;
        votes = stats[0].votesCount;
        totalSum = stats[0].totalSum;
      }
      if (result[0]) {
        const movie = {
          id: result[0].id,
          bgImage: `${API_URL}/file/${result[0].bgImage}`,
          posterImage: `${API_URL}/file/${result[0].posterImage}`,
          title: result[0].title,
          description: result[0].description,
          director: result[0].director,
          duration: result[0].duration,
          trailerURL: result[0].trailerURL,
          genre: {
            id: result[0].genre_id,
            name: result[0].genreName,
          },
          minAge: result[0].minAge,
          releaseDate: result[0].releaseDate,
          statistics: {
            rate,
            votes,
            totalSum,
          },
        };
        console.log(`GET /movie/${req.params.movieId}`);
        res.send(movie);
      } else {
        res.send(null);
      }
    });
  });
});

//bilety kupione przez wybranego użytkownika
app.get('/tickets/:userId', verify, (req, res) => {
  if (isAdmin(req) || isOwner(req)) {
    const sql =
      'SELECT t.id, t.reservedSeats, t.purchaseDate, t.cost, f.playDate, m.id as movieId, m.title, m.bgImage, cit.name as cityName, cin.street, r.name as roomName from ticket t, filmshow f, movie m, room r, cinema cin, city cit WHERE t.filmshowId = f.id && f.roomId = r.id && f.movieId = m.id && r.cinemaId = cin.id && cin.cityId = cit.id && t.userId = ? ORDER BY t.purchaseDate DESC';
    con.query(sql, req.params.userId, (err, result, fields) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      const tickets = [];

      result.forEach((r) => {
        const reservedSeats = JSON.parse(r.reservedSeats);
        tickets.push({
          id: r.id,
          purchaseDate: r.purchaseDate,
          reservedSeats,
          playDate: r.playDate,
          cost: r.cost,
          movie: {
            id: r.movieId,
            title: r.title,
            bgImage: `${API_URL}/file/${r.bgImage}`,
          },
          cityAddress: `${r.cityName} ${r.street}`,
          roomName: r.roomName,
        });
      });

      console.log(`GET /tickets/${req.params.userId}`);
      res.send(tickets);
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

// //bilety kupione przez wybranego użytkownika
// app.get('/tickets/:userId', verify, (req, res) => {
//   if (isAdmin(req) || isOwner(req)) {
//     const sql =
//       'SELECT ticket.id, movie.id AS movie_id, movie.title, movie.description, ticket.purchaseDate, status.id AS status_id, status.name, ticket.cost, filmshow.id AS filmshow_id, filmshow.playDate, ticket.reservedSeats FROM ticket, movie, filmshow, status WHERE ticket.filmshowId = filmshow.id && filmshow.movieId = movie.id && ticket.statusId = status.id &&ticket.userId = ?';
//     con.query(sql, req.params.userId, (err, result, fields) => {
//       if (err) {
//         console.log(err.sqlMessage);
//         res.status(500).send(err.sqlMessage);
//         return;
//       }

//       const tickets = [];

//       result.forEach((r) => {
//         tickets.push({
//           id: r.id,
//           purchaseDate: r.purchaseDate,
//           reservedSeats: r.reservedSeats,
//           movie: {
//             id: r.movie_id,
//             title: r.title,
//             description: r.description,
//           },
//           filmshow: {
//             id: r.filmshow_id,
//             playDate: r.playDate,
//           },
//           status: {
//             id: r.status_id,
//             name: r.name,
//           },
//         });
//       });

//       console.log(`GET /tickets/${req.params.userId}`);
//       res.send(tickets);
//     });
//   } else {
//     res.status(403).send('Nie masz dostępu do usuwania zasobów!');
//   }
// });

//sale kinowe w danym kinie
app.get('/rooms/cinema/:cinemaId', (req, res) => {
  const sql =
    'SELECT room.id, room.name, room.rows, room.cols, room.unavailableSeats FROM room WHERE room.cinemaId = ?';
  con.query(sql, req.params.cinemaId, (err, result, fields) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    console.log(`GET /rooms/cinema/:${req.params.cinemaId}`);
    res.send(result);
  });
});

//pobranie sali kinowej o id
app.get('/rooms/id/:roomId', (req, res) => {
  const sql =
    'SELECT room.id, room.name, room.rows, room.cols, room.unavailableSeats FROM room WHERE room.id = ?';
  con.query(sql, req.params.roomId, (err, result, fields) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    console.log(`GET /rooms/id/:${req.params.roomId}`);
    res.send(result);
  });
});

//pobranie wszystkich ulubionych filmów danego użytkownika
app.get('/userFavourite/:userId', verify, (req, res) => {
  if (isAdmin(req) || isOwner(req)) {
    const sql = 'SELECT * FROM userFavourite WHERE userFavourite.userId = ?';
    con.query(sql, req.params.userId, (err, result, fields) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      console.log(`GET /userFavourite/:${req.params.userId}`);
      res.send(result);
    });
  } else {
    res.status(403).send('Nie masz dostępu do tego zasobu!');
  }
});

//pobranie wszystkich ulubionych filmów, z detalami o filmie, danego użytkownika
app.get('/userFavourite/detailed/:userId', verify, (req, res) => {
  if (isAdmin(req) || isOwner(req)) {
    const sql =
      'SELECT m.* from userFavourite uf, movie m WHERE uf.movieId = m.id && uf.userId = ?';
    con.query(sql, req.params.userId, (err, result, fields) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      const newResults = [];
      result.forEach((movie) => {
        newResults.push({
          ...movie,
          posterImage: `${API_URL}/file/${movie.posterImage}`,
          bgImage: `${API_URL}/file/${movie.bgImage}`,
        });
      });

      console.log(`GET /userFavourite/:${req.params.userId}`);
      res.send(newResults);
    });
  } else {
    res.status(403).send('Nie masz dostępu do tego zasobu!');
  }
});

// //pobranie wszystkich ulubionych filmów, z detalami o filmie, danego użytkownika
// app.get('/tickets/:userId', verify, (req, res) => {
//   if (isAdmin(req) || isOwner(req)) {
//     const sql =
//       'SELECT m.* from userFavourite uf, movie m WHERE uf.movieId = m.id && uf.userId = ?';
//     con.query(sql, req.params.userId, (err, result, fields) => {
//       if (err) {
//         console.log(err.sqlMessage);
//         res.status(500).send(err.sqlMessage);
//         return;
//       }

//       const newResults = [];
//       result.forEach((movie) => {
//         newResults.push({
//           ...movie,
//           posterImage: `${API_URL}/file/${movie.posterImage}`,
//           bgImage: `${API_URL}/file/${movie.bgImage}`,
//         });
//       });

//       console.log(`GET /userFavourite/:${req.params.userId}`);
//       res.send(newResults);
//     });
//   } else {
//     res.status(403).send('Nie masz dostępu do tego zasobu!');
//   }
// });

// TODO, zwracać informacje o filmie (id, tytuł, image itp.), będzie wykorzystywane przy wyświetlaniu wszyskich ocenionych filmów
app.get('/userRatings/:userId', verify, (req, res) => {
  if (isAdmin(req) || isOwner(req)) {
    const sql = 'SELECT * FROM userRatings WHERE userRatings.userId = ?';
    con.query(sql, req.params.userId, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      console.log(`GET /userRatings/${req.params.userId}`);
      res.send(result);
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

// TODO, zwracać informacje o filmie (id, tytuł, image itp.), będzie wykorzystywane przy wyświetlaniu wszyskich ocenionych filmów
app.get('/userRatings/:userId/:movieId', verify, (req, res) => {
  if (isAdmin(req) || isOwner(req)) {
    const { userId, movieId } = req.params;
    const sql =
      'SELECT * FROM userRatings WHERE userRatings.userId = ? && userRatings.movieId = ?';
    con.query(sql, [userId, movieId], (err, result, fields) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      if (result.length <= 0) {
        res.send({
          userId: Number(userId),
          movieId: Number(movieId),
          rate: 0,
        });
      } else {
        res.send(result[0]);
      }

      console.log(`GET /userRatings/${userId}/${movieId}`);
    });
  }
});

// recenzje dla danego filmu
app.get('/reviews/:movieId', (req, res) => {
  const sql =
    'SELECT review.id, review.title, review.content, review.creationDate, review.isRated, user.id AS user_id, user.userName, user.image FROM review, user WHERE review.movieId = ? && review.userId = user.id';
  con.query(sql, req.params.movieId, (err, result, fields) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    const reviews = [];

    result.forEach((r) => {
      const image = r.image ? `${API_URL}/file/${r.image}` : null;
      reviews.push({
        id: r.id,
        title: r.title,
        content: r.content,
        creationDate: r.creationDate,
        isRated: r.isRated ? true : false,
        user: {
          id: r.user_id,
          userName: r.userName,
          image,
        },
      });
    });

    console.log(`GET /reviews/${req.params.movieId}`);
    res.send(reviews);
  });
});

// recenzja o danym id
app.get('/review/:reviewId', (req, res) => {
  const sql =
    'SELECT r.id, r.title, r.content, r.creationDate, r.isRated, u.id AS creatorId, u.userName, u.image, m.id as movieId, m.title as movieTitle, m.releaseDate FROM review r, user u, movie m WHERE r.id = ? && r.userId = u.id && m.id = r.movieId';
  con.query(sql, req.params.reviewId, (err, result, fields) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    if (result[0] !== null && result[0] !== undefined) {
      const {
        id,
        title,
        content,
        creationDate,
        user_id,
        userName,
        image,
        isRated,
        movieId,
        releaseDate,
        movieTitle,
        creatorId,
      } = result[0];
      const userImage = image ? `${API_URL}/file/${image}` : null;
      const review = {
        id,
        title,
        content,
        creationDate,
        isRated: isRated ? true : false,
        user: { creatorId, userName, image: userImage },
        movie: { id: movieId, releaseDate, movieTitle },
      };
      res.send(review);
    } else {
      res.status(404).send('Something went wrong');
    }
  });
});

// posty dla recenzji
app.get('/posts/:reviewId', (req, res) => {
  const sql =
    'SELECT post.id, post.content, post.creationDate, user.id AS user_id, user.userName, user.image FROM post, user WHERE post.reviewId = ? && post.userId = user.id ORDER BY post.creationDate ';
  con.query(sql, req.params.reviewId, (err, result, fields) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    const posts = [];

    result.forEach((r) => {
      posts.push({
        id: r.id,
        content: r.content,
        creationDate: r.creationDate,
        user: {
          id: r.user_id,
          userName: r.userName,
          image: r.image ? `${API_URL}/file/${r.image}` : null,
        },
      });
    });

    // console.log(result);

    console.log(`GET /posts/${req.params.reviewId}`);
    res.send(posts);
  });
});

//seanse w kinie danego dnia (podział względem filmów)
app.get('/filmshows/:cinemaId/:date', (req, res) => {
  const sql =
    'SELECT ur.movieId, COUNT(*) as votesCount, SUM(ur.rate) as totalSum, AVG(ur.rate) AS rate FROM userRatings ur GROUP BY ur.movieId';

  const sql1 =
    'SELECT room.id AS room_id, room.rows, room.cols, room.unavailableSeats, movie.id as movie_id, movie.title, movie.posterImage, movie.description, movie.duration, genre.name AS genreName, filmshow.id AS filmshow_id, filmshow.playDate, filmshow.occupiedSeats FROM filmshow, movie, room, genre WHERE room.cinemaId = ? && filmshow.roomId = room.id && filmshow.movieId = movie.id && movie.genreId = genre.id && filmshow.playDate LIKE ?';

  con.query(sql, (err, stats) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    con.query(
      sql1,
      [req.params.cinemaId, req.params.date + '%'],
      (err, result, fields) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }

        let rate = 0;
        let votes = 0;
        let totalSum = 0;

        // console.log(result);

        const filmshows = {};
        result.forEach((r) => {
          for (let i = 0; i < stats.length; i += 1) {
            if (stats[i].movieId === r.movie_id) {
              rate = Math.round((stats[i].rate + Number.EPSILON) * 100) / 100;
              votes = stats[i].votesCount;
              totalSum = stats[i].totalSum;
              break;
            }
          }

          filmshows[r.movie_id] = {
            id: r.movie_id,
            title: r.title,
            posterImage: `${API_URL}/file/${r.posterImage}`,
            description: r.description,
            duration: r.duration,
            genre: r.genreName,
            playDates: [],
            statistics: {
              rate,
              votes,
              totalSum,
            },
          };
          rate = 0;
          votes = 0;
          totalSum = 0;
        });

        result.forEach((r) => {
          filmshows[r.movie_id].playDates.push({
            id: r.filmshow_id,
            room: r.room_id,
            date: r.playDate,
          });
        });

        // console.log(filmshows);
        console.log(`GET /filmshows/${req.params.cinemaId}/${req.params.date}`);
        res.send(filmshows);
      }
    );
  });
});

// pobranie wszystkich seansów po ID filmu i kina
app.get('/movieFilmshows/:movieId/:cinemaId', (req, res) => {
  const sql1 =
    'SELECT f.id AS filmshowId, f.playDate, r.name FROM filmshow f, room r WHERE f.playDate BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY) && f.roomId = r.id && f.movieId = ? && r.cinemaId = ? ORDER BY f.playDate ASC';

  con.query(sql1, [req.params.movieId, req.params.cinemaId], (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    console.log('result', result);
    console.log(
      `GET /movieFilmshows/${req.params.movieId}/${req.params.cinemaId}`
    );
    res.send(result);
  });
});

//pobranie seansu po id
app.get('/filmshow/:id', (req, res) => {
  const sql =
    'SELECT room.id AS room_id, room.rows, room.cols, room.unavailableSeats, room.name, movie.id as movie_id, movie.title, movie.posterImage, movie.bgImage, movie.description, movie.duration, genre.name AS genreName, filmshow.id AS filmshow_id, filmshow.playDate, filmshow.occupiedSeats FROM filmshow, movie, room, genre WHERE filmshow.roomId = room.id && filmshow.movieId = movie.id && movie.genreId = genre.id && filmshow.id = ?';
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    const {
      filmshow_id,
      playDate,
      occupiedSeats,
      room_id,
      rows,
      cols,
      unavailableSeats,
      movie_id,
      title,
      posterImage,
      description,
      duration,
      genreName,
      bgImage,
      name,
    } = result[0];

    const filmshow = {
      id: filmshow_id,
      playDate,
      occupiedSeats: JSON.parse(occupiedSeats),
      room: {
        id: room_id,
        rows,
        cols,
        unavailableSeats: JSON.parse(unavailableSeats),
        name,
      },
      movie: {
        id: movie_id,
        title,
        posterImage: `${API_URL}/file/${posterImage}`,
        bgImage: `${API_URL}/file/${bgImage}`,
        description,
        duration,
        genreName,
      },
    };

    // console.log(filmshow);
    console.log(`GET /filmshow/${req.params.id}`);
    res.send(filmshow);
  });
});

// ===================

//przesłanie filmu
app.post('/movie', verify, (req, res) => {
  if (isAdmin(req)) {
    const sql =
      'INSERT INTO movie (bgImage, posterImage, title, description, duration, director, genreId, minAge, releaseDate) VALUES (?,?,?,?,?,?,?,?,?)';
    con.query(
      sql,
      [
        req.body.bgImage,
        req.body.posterImage,
        req.body.title,
        req.body.description,
        req.body.duration,
        req.body.director,
        req.body.genreId,
        req.body.minAge,
        req.body.releaseDate,
      ],
      (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        const insertId = result.insertId;
        const sql2 =
          'SELECT movie.id AS movie_id, movie.bgImage, movie.posterImage, movie.title, movie.duration, movie.director, genre.id AS genre_id, genre.name, movie.minAge, movie.releaseDate FROM movie, genre WHERE movie.genreId = genre.id && movie.id = ?';
        con.query(sql2, insertId, (err, result) => {
          if (err) {
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
            return;
          }
          if (!result || result.length < 1) {
            console.log("Can't find movie with id: " + insertId);
            res.status(500).send('Cant find movie with id: ' + insertId);
            return;
          }

          const r = result.shift();

          const movie = {
            id: r.movie_id,
            bgImage: `${API_URL}/file/${r.bgImage}`,
            posterImage: `${API_URL}/file/${r.posterImage}`,
            title: r.title,
            description: r.description,
            director: r.director,
            duration: r.duration,
            genre: {
              id: r.genre_id,
              name: r.name,
            },
            minAge: r.minAge,
            releaseDate: r.releaseDate,
          };

          console.log('One row inserted');
          res.status(201).send(movie);
        });
      }
    );
  } else {
    res.status(403).send('Nie masz dostępu do tego zasobu!');
  }
});

app.post('/news', verify, (req, res) => {
  if (isAdmin(req)) {
    const sql =
      'INSERT INTO news (image, title, content, creationDate) VALUES (?,?,?,?)';
    con.query(
      sql,
      [req.body.image, req.body.title, req.body.content, req.body.creationDate],
      (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        const insertId = result.insertId;
        const sql2 = 'select b.* from news b where b.id = ?';
        con.query(sql2, insertId, (err, result) => {
          if (err) {
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
            return;
          }
          if (!result || result.length < 1) {
            console.log(`Can't find news with id: ${insertId}`);
            res.status(500).send(`Can't find news with id: ${insertId}`);
            return;
          }

          console.log('One row inserted');
          res.status(201).send(result[0]);
        });
      }
    );
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

// app.post('/userFavourite', (req, res) => {
//   const sql = 'INSERT INTO userFavourite (userId, movieId) VALUES (?,?)';
//   con.query(sql, [req.body.userId, req.body.movieId], (err, result) => {
//     if (err) {
//       console.log(err.sqlMessage);
//       res.status(500).send(err.sqlMessage);
//       return;
//     }
//     const sql2 =
//       'SELECT user.userName, user.image, user.id AS user_id, movie.id AS movie_id, movie.posterImage, movie.title, movie.description FROM user, movie WHERE user.id = ? && movie.id = ?';
//     con.query(sql2, [req.body.userId, req.body.movieId], (err, result) => {
//       if (err) {
//         console.log(err.sqlMessage);
//         res.status(500).send(err.sqlMessage);
//         return;
//       }
//       if (!result || result.length < 1) {
//         console.log(
//           `Can't find userFavourite U: ${req.body.userId}, M: ${req.body.movieId}`
//         );
//         res
//           .status(500)
//           .send(
//             `Can't find userFavourite U: ${req.body.userId}, M: ${req.body.movieId}`
//           );
//         return;
//       }

//       const {
//         userName,
//         image,
//         user_id,
//         movie_id,
//         posterImage,
//         title,
//         description,
//       } = result[0];
//       const userFavourite = {
//         user: {
//           id: user_id,
//           userName,
//           image,
//         },
//         movie: {
//           id: movie_id,
//           posterImage,
//           title,
//           description,
//         },
//       };

//       console.log('One row inserted');
//       res.status(201).send(userFavourite);
//     });
//   });
// });

app.post('/userFavourite', verify, (req, res) => {
  const sql = 'INSERT INTO userFavourite (userId, movieId) VALUES (?,?)';
  const { userId, movieId } = req.body;
  con.query(sql, [userId, movieId], (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    res.status(201).send({ userId, movieId });
  });
});

app.post('/userRatings', verify, (req, res) => {
  console.log('HALO');
  const sql = 'INSERT INTO userRatings (userId, movieId, rate) VALUES (?,?,?)';
  const { userId, movieId, rate } = req.body;
  con.query(sql, [userId, movieId, rate], (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }

    res.status(201).send({ userId, movieId, rate });
  });
});

//przesłanie miasta
app.post('/city', verify, (req, res) => {
  if (isAdmin(req)) {
    const sql = 'INSERT INTO city (name) VALUES (?)';
    con.query(
      sql,

      req.body.name,
      (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        const insertId = result.insertId;
        const sql2 = 'SELECT city.* FROM city WHERE city.id = ?';
        con.query(sql2, insertId, (err, result) => {
          if (err) {
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
            return;
          }
          if (!result || result.length < 1) {
            console.log("Can't find city with id: " + insertId);
            res.status(500).send('Cant find city with id: ' + insertId);
            return;
          }

          console.log('One row inserted');
          res.status(201).send(result[0]);
        });
      }
    );
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

//przesłanie kina
app.post('/cinema', verify, (req, res) => {
  if (isAdmin(req)) {
    const sql = 'INSERT INTO cinema (cityId, street) VALUES (?,?)';
    con.query(sql, [req.body.cityId, req.body.street], (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      const insertId = result.insertId;
      const sql2 =
        'select cin.*, cit.name as cityName from cinema cin, city cit where cin.cityId = cit.id && cin.id = ?';
      con.query(sql2, insertId, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        if (!result || result.length < 1) {
          console.log("Can't find cinema with id: " + insertId);
          res.status(500).send('Cant find cinema with id: ' + insertId);
          return;
        }

        console.log('One row inserted');
        res.status(201).send(result[0]);
      });
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

app.post('/register', async (req, res) => {
  try {
    const { email, firstName, lastName, userName, password } = req.body;
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    const searchForUser =
      'SELECT * FROM user WHERE user.email = ? OR user.userName = ?';

    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date} ${time}`;
    const hashedPassword = await bcrypt.hash(password, 5);
    const sql =
      'INSERT INTO user (firstName, lastName, email, userName, image, password, role, postsCnt, points, creationDate, banned) VALUES (?,?,?,?,NULL,?,1,0,0,?,0)';

    con.query(searchForUser, [email, userName], (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      // console.log('RESULT', result);
      if (result.length > 0) {
        if (result[0].userName.toLowerCase() === userName.toLowerCase()) {
          res.send('Użytkownik o podanej nazwie jest już zarejestrowany.');
          return;
        }
        res.send('Użytkownik o podanym adresie email jest już zarejestrowany.');
        return;
      }
      con.query(
        sql,
        [firstName, lastName, email, userName, hashedPassword, dateTime],
        (err, result) => {
          if (err) {
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
            return;
          }

          res.send(true);
        }
      );
    });
  } catch (e) {
    console.log('error ', e);
  }
});

// let refreshTokens = [];

// app.post('/refreshToken', (req, res) => {
//   const refreshToken = req.body.token;
//   if (!refreshToken) {
//     return res.status(401).send('Nie można przeprowadzić autoryzacji');
//   }
//   if (!refreshTokens.includes(refreshToken)) {
//     return res.status(403).send('Token nie jest prawidłowy');
//   }
//   jwt.verify(refreshToken, SECRET_REFRESH_KEY, (err, data) => {
//     err && console.log(err);
//     refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

//     // user = data
//     const newAccessToken = generateAccessToken(data);
//     const newRefreshToken = generateRefreshToken(data);
//     refreshTokens.push(newRefreshToken);
//     res
//       .status(200)
//       .send({ accessToken: newAccessToken, refreshToken: newRefreshToken });
//   });
// });

const generateAccessToken = (user) => jwt.sign({ ...user }, SECRET_KEY);

// const generateRefreshToken = (user) =>
//   jwt.sign({ ...user }, SECRET_REFRESH_KEY);

app.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    const passw = req.body.password;
    const sql = 'SELECT user.* FROM user WHERE user.email = ?';

    con.query(sql, email, async (err, result) => {
      if (err) {
        res.status(404).send(err.sqlMessage);
        return;
      }
      if (!result || result.length < 1) {
        console.log("Can't find user with email: " + email);
        res.status(404).send('Podano niepoprawny adres email lub hasło!');
        return;
      }
      const isPasswordValid = await bcrypt.compare(passw, result[0].password);

      if (isPasswordValid) {
        const { password, image, ...rest } = result[0];
        let newImage = null;
        if (image) {
          newImage = `${API_URL}/file/${image}`;
        }
        const user = { ...rest, image: newImage };
        const accessToken = generateAccessToken(user);
        // const refreshToken = generateRefreshToken(rest);
        // refreshTokens.push(refreshToken);
        res.status(200).send({ ...user, accessToken });
      } else {
        console.log('Password is not valid.');
        res.status(500).send('Podano niepoprawny adres email lub hasło!');
      }

      // if (validPassword) {
      //     res.status(201).send({ ...result });
      // } else {
      //     res.status(500).send('Password do not match!');
      // }
    });
  } catch (e) {
    console.log('error ', e);
  }
});

app.get('/me', verify, (req, res, ctx) => {
  if (req.user) {
    const { id } = req.user;
    const sql = 'SELECT * FROM user WHERE id = ?';
    con.query(sql, id, (err, result) => {
      if (err) {
        res.status(404).send(err.sqlMessage);
        return;
      }

      const { password, image, ...rest } = result[0];
      const newImage = `${API_URL}/file/${image}`;
      res.send({ ...rest, image: newImage });
    });
  }
});

//przesłanie gatunku
app.post('/genre', verify, (req, res) => {
  if (isAdmin(req)) {
    const sql = 'INSERT INTO genre (name) VALUES (?)';
    con.query(sql, req.body.name, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      const insertId = result.insertId;
      const sql2 = 'SELECT genre.* FROM genre WHERE genre.id = ?';
      con.query(sql2, insertId, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        if (!result || result.length < 1) {
          console.log("Can't find city with id: " + insertId);
          res.status(500).send('Cant find city with id: ' + insertId);
          return;
        }

        const r = result.shift();

        const genre = { ...r };

        console.log('One row inserted');
        res.status(201).send(genre);
      });
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

//przesłanie seansu
app.post('/filmshow', verify, (req, res) => {
  if (isAdmin(req)) {
    const sql =
      'INSERT INTO filmshow (roomId, movieId, playDate, occupiedSeats) VALUES (?,?,?,?)';
    con.query(
      sql,
      [
        req.body.roomId,
        req.body.movieId,
        req.body.playDate,
        req.body.occupiedSeats,
      ],
      (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }

        const insertId = result.insertId;
        const sql2 =
          'select f.id, r.id as roomId, r.name as roomName, m.id as movieId, m.title, f.playDate, cit.name as cityName, cin.id as cinemaId, cin.street from filmshow f, room r, movie m, city cit, cinema cin where f.movieId = m.id && f.roomId = r.id && r.cinemaId = cin.id && cin.cityId = cit.id &&  f.id = ? order by f.playDate DESC';
        con.query(sql2, insertId, (err, result) => {
          if (err) {
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
            return;
          }
          if (!result || result.length < 1) {
            console.log("Can't find filmshow with id: " + insertId);
            res.status(500).send('Cant find filmshow with id: ' + insertId);
            return;
          }

          console.log('One row inserted');
          res.status(201).send(result[0]);
        });
      }
    );
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

//przesłanie recenzji
app.post('/review', verify, (req, res) => {
  const sql =
    'INSERT INTO review (movieId, userId, title, content, creationDate, isRated) VALUES (?,?,?,?,?,0)';
  con.query(
    sql,
    [
      req.body.movieId,
      req.body.userId,
      req.body.title,
      req.body.content,
      req.body.creationDate,
    ],
    (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      const insertId = result.insertId;
      const sql2 =
        'SELECT review.id AS review_id, review.title AS revTitle, review.content, review.creationDate, review.isRated, user.id AS user_id, user.userName, user.image AS usImage, movie.id AS movie_id, movie.bgImage, movie.posterImage, movie.title AS movTitle, movie.description, movie.duration, movie.minAge, movie.releaseDate FROM review, movie, user WHERE review.movieId = movie.id && review.userId = user.id && review.id = ?';
      con.query(sql2, insertId, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        if (!result || result.length < 1) {
          console.log("Can't find city with id: " + insertId);
          res.status(500).send('Cant find city with id: ' + insertId);
          return;
        }

        const r = result.shift();

        const review = {
          id: r.review_id,
          content: r.content,
          creationDate: r.creationDate,
          isRated: r.isRated ? true : false,
          movie: {
            id: r.movie_id,
            bgImage: `${API_URL}/file/${r.bgImage}`,
            posterImage: `${API_URL}/file/${r.posterImage}`,
            title: r.movTitle,
            description: r.description,
            duration: r.duration,
            minAge: r.minAge,
            releaseDate: r.releaseDate,
          },
          user: {
            id: r.user_id,
            userName: r.userName,
            image: r.usImage,
          },
        };

        console.log('One row inserted');
        res.status(201).send(review);
      });
    }
  );
});

//przesłanie postu
app.post('/post', verify, (req, res) => {
  const sql =
    'INSERT INTO post (userId, reviewId, content, creationDate) VALUES (?,?,?,?)';
  con.query(
    sql,
    [
      req.body.userId,
      req.body.reviewId,
      req.body.content,
      req.body.creationDate,
    ],
    (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      const insertId = result.insertId;
      const sql2 =
        'SELECT post.id AS post_id, post.content AS postContent, post.creationDate AS postCreationDate, user.id AS user_id, user.userName, user.image, review.id AS review_id, review.title, review.content as revContent, review.creationDate AS revCreationDate, review.isRated FROM post, user, review WHERE post.userId = user.id && post.reviewId = review.id && post.id = ?';
      con.query(sql2, insertId, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        if (!result || result.length < 1) {
          console.log("Can't find city with id: " + insertId);
          res.status(500).send('Cant find city with id: ' + insertId);
          return;
        }

        const r = result.shift();

        const post = {
          id: r.post_id,
          content: r.postContent,
          creationDate: r.postCreationDate,
          review: {
            id: r.review_id,
            content: r.revContent,
            creationDate: r.revCreationDate,
            isRated: r.isRated ? true : false,
          },
          user: {
            id: r.user_id,
            userName: r.userName,
            image: r.image ? `${API_URL}/file/${r.image}` : null,
          },
        };

        console.log('One row inserted');
        res.status(201).send(post);
      });
    }
  );
});

//przesłanie sali
app.post('/room', verify, (req, res) => {
  if (isAdmin(req)) {
    const sql =
      'INSERT INTO room (cinemaId, name, rows, cols, unavailableSeats) VALUES (?,?,?,?,?)';
    con.query(
      sql,
      [
        req.body.cinemaId,
        req.body.name,
        req.body.rows,
        req.body.cols,
        req.body.unavailableSeats,
      ],
      (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        const insertId = result.insertId;
        const sql2 =
          'select r.*, cit.id as cityId, cit.name as cityName, cin.street from room r, cinema cin, city cit where r.cinemaId = cin.id && cin.cityId = cit.id && r.id = ?';
        con.query(sql2, insertId, (err, result) => {
          if (err) {
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
            return;
          }
          if (!result || result.length < 1) {
            console.log("Can't find room with id: " + insertId);
            res.status(500).send('Cant find room with id: ' + insertId);
            return;
          }

          console.log('One row inserted');
          res.status(201).send(result[0]);
        });
      }
    );
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

//kupno biletu
app.post('/ticket/buy', verify, (req, res) => {
  const sql0 = 'SELECT f.occupiedSeats FROM filmshow AS f WHERE f.id = ?';
  //POINTS_FOR_TICKET
  const sql3 = 'UPDATE user SET points = points - ? * 10 WHERE id = ?';

  con.query(sql0, req.body.filmshowId, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    const occupiedSeats = JSON.parse(result[0].occupiedSeats);
    const reservedSeats = JSON.parse(req.body.reservedSeats);
    for (let i = 0; i < occupiedSeats.length; i += 1) {
      for (let j = 0; j < reservedSeats.length; j += 1) {
        if (
          JSON.stringify(occupiedSeats[i]) === JSON.stringify(reservedSeats[j])
        ) {
          res.status(500).send(null);
          return;
        }
      }
    }
    const sql1 =
      'INSERT INTO ticket (filmshowId, userId, reservedSeats, purchaseDate, statusId, cost) VALUES (?,?,?,?,1,?)';
    con.query(
      sql1,
      [
        req.body.filmshowId,
        req.body.userId,
        req.body.reservedSeats,
        req.body.purchaseDate,
        req.body.cost,
      ],
      (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        // 'UPDATE movie SET title = ?, description = ?, duration = ?, genreId = ?, minAge = ?, releaseDate = ?';
        const mergedSeats = [...occupiedSeats, ...reservedSeats];
        const sql2 =
          'UPDATE filmshow SET occupiedSeats = ? WHERE filmshow.id = ?';
        con.query(
          sql2,
          [JSON.stringify(mergedSeats), req.body.filmshowId],
          (err, result) => {
            if (err) {
              console.log(err.sqlMessage);
              res.status(500).send(err.sqlMessage);
              return;
            }
          }
        );
        if (req.body.ticketsPaidWithPoints) {
          con.query(
            sql3,
            [req.body.ticketsPaidWithPoints, req.body.userId],
            (err, result) => {
              if (err) {
                console.log(err.sqlMessage);
                res.status(500).send(err.sqlMessage);
                return;
              }
              res.status(200).send(true);
            }
          );
        } else {
          res.status(200).send(true);
        }
      }
    );
  });
  // con.query(
  //   sql,
  //   [
  //     req.body.filmshowId,
  //     req.body.userId,
  //     req.body.reservedSeats,
  //     req.body.purchaseDate,
  //     req.body.cost,
  //   ],
  //   (err, result) => {
  // if (err) {
  //   console.log(err.sqlMessage);
  //   res.status(500).send(err.sqlMessage);
  //   return;
  // }
  // const insertId = result.insertId;
  // const sql3 =
  // 'SELECT t.id AS ticket_id, t.reservedSeats, t.purchaseDate, t.cost, u.userName, u.image, u.id, f.id, f.roomId, f.movieId, f.playDate, f.occupiedSeats FROM filmshow AS f, user AS u, status AS s WHERE t.filmshowId = f.id && t.userId = u.id && t.statusId = s.id && t.id = ?';
  //     con.query(sql3, insertId, (err, result) => {
  //       if (err) {
  //         console.log(err.sqlMessage);
  //         res.status(500).send(err.sqlMessage);
  //         return;
  //       }
  //       if (!result || result.length < 1) {
  //         console.log("Can't find ticket with id: " + insertId);
  //         res.status(500).send('Cant find ticket with id: ' + insertId);
  //         return;
  //       }

  //       const r = result.shift();

  //       // const post = {
  //       //     id: r.post_id,
  //       //     content: r.postContent,
  //       //     creationDate: r.postCreationDate,
  //       //     review: {
  //       //         id: r.review_id,
  //       //         content: r.revContent,
  //       //         creationDate: r.revCreationDate,
  //       //     },
  //       //     user: {
  //       //         id: r.user_id,
  //       //         userName: r.userName,
  //       //         image: r.image,
  //       //     },
  //       // };

  //       console.log('One row inserted');
  //       res.status(201).send(post);
  //     });
  //   }
  // );
});

// ===================

app.delete('/movie/:id', verify, (req, res) => {
  if (isAdmin(req)) {
    const sql = 'DELETE FROM movie WHERE id = ?';
    const sqlImage = 'SELECT bgImage, posterImage FROM movie WHERE id = ?';
    let bgToDelete = '';
    let posterToDelete = '';
    con.query(sqlImage, req.params.id, (err, result) => {
      if (err) {
        const resultApi = {
          status: 0,
          message: err.sqlMessage,
        };
        res.status(500).send(resultApi);
        return;
      }

      bgToDelete = result[0].bgImage;
      posterToDelete = result[0].posterImage;
      con.query(sql, req.params.id, function (err, result) {
        if (err) {
          const resultApi = {
            status: 0,
            message: err.sqlMessage,
          };

          console.log(resultApi);
          res.status(500).send(resultApi);
          return;
        }

        const resultApi = {
          status: true,
          message: 'Film został usunięty.',
        };

        res.status(200).send(resultApi);
        deleteFile(bgToDelete);
        deleteFile(posterToDelete);
        console.log('Successfully deleted movie with id = ' + req.params.id);
      });
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

app.delete('/city/:id', verify, (req, res) => {
  // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";
  if (isAdmin(req)) {
    const sql = 'DELETE FROM city WHERE id = ?';
    con.query(sql, req.params.id, function (err, result) {
      if (err) {
        const resultApi = {
          status: 0,
          message: err.sqlMessage,
        };

        console.log(resultApi);
        res.status(500).send(resultApi);
        return;
      }

      const resultApi = {
        status: 1,
        message: 'Miasto zostało usunięte.',
      };

      res.status(200).send(resultApi);
      console.log('Successfully deleted city with id = ' + req.params.id);
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

app.delete('/cinema/:id', verify, (req, res) => {
  // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";
  if (isAdmin(req)) {
    const sql = 'DELETE FROM cinema WHERE id = ?';
    con.query(sql, req.params.id, function (err, result) {
      if (err) {
        const resultApi = {
          status: 0,
          message: err.sqlMessage,
        };

        console.log(resultApi);
        res.status(500).send(resultApi);
        return;
      }

      const resultApi = {
        status: 1,
        message: 'Kino zostało usunięte.',
      };

      res.status(200).send(resultApi);
      console.log('Successfully deleted cinema with id = ' + req.params.id);
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

app.delete('/filmshow/:id', verify, (req, res) => {
  // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";
  if (isAdmin(req)) {
    const sql = 'DELETE FROM filmshow WHERE id = ?';
    con.query(sql, req.params.id, function (err, result) {
      if (err) {
        const resultApi = {
          status: 0,
          message: err.sqlMessage,
        };

        console.log(resultApi);
        res.status(500).send(resultApi);
        return;
      }

      const resultApi = {
        status: 1,
        message: 'Seans został usunięty.',
      };

      res.status(200).send(resultApi);
      console.log('Successfully deleted filmshow with id = ' + req.params.id);
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

app.delete('/genre/:id', verify, (req, res) => {
  // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";
  if (isAdmin(req)) {
    const sql = 'DELETE FROM genre WHERE id = ?';
    con.query(sql, req.params.id, function (err, result) {
      if (err) {
        const resultApi = {
          status: 0,
          message: err.sqlMessage,
        };

        console.log(resultApi);
        res.status(500).send(resultApi);
        return;
      }

      const resultApi = {
        status: 1,
        message: 'Rodzaj filmu został usunięty.',
      };

      res.status(200).send(resultApi);
      console.log('Successfully deleted genre with id = ' + req.params.id);
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

app.delete('/post/:id', verify, (req, res) => {
  const initSql = 'SELECT p.userId FROM post p WHERE p.id = ?';
  con.query(initSql, req.params.id, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    const { userId } = result[0];
    if (isAdmin(req) || req.user.id === userId) {
      const sql = 'DELETE FROM post WHERE id = ?';
      con.query(sql, req.params.id, function (err, result) {
        if (err) {
          const resultApi = {
            status: 0,
            message: err.sqlMessage,
          };

          console.log(resultApi);
          res.status(500).send(resultApi);
          return;
        }

        const resultApi = {
          status: 1,
          message: 'Post został usunięty.',
        };

        res.status(200).send(resultApi);
        console.log('Successfully deleted post with id = ' + req.params.id);
      });
    } else {
      res.status(403).send('Nie masz dostępu do usuwania zasobów!');
    }
  });
  // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";
});

app.delete('/review/:id', verify, (req, res) => {
  // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";
  const initSql = 'SELECT r.userId FROM review r WHERE r.id = ?';
  con.query(initSql, req.params.id, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    const { userId } = result[0];
    if (isAdmin(req) || userId === req.user.id) {
      const sql = 'DELETE FROM review WHERE id = ?';
      con.query(sql, req.params.id, function (err, result) {
        if (err) {
          const resultApi = {
            status: 0,
            message: err.sqlMessage,
          };

          console.log(resultApi);
          res.status(500).send(resultApi);
          return;
        }

        const resultApi = {
          status: 1,
          message: 'Recenzja została usunięta.',
        };

        res.status(200).send(resultApi);
        console.log('Successfully deleted review with id = ' + req.params.id);
      });
    } else {
      res.status(403).send('Nie masz dostępu do usuwania zasobów!');
    }
  });
});

app.delete('/room/:id', verify, (req, res) => {
  // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";
  if (isAdmin(req)) {
    const sql = 'DELETE FROM room WHERE id = ?';
    con.query(sql, req.params.id, function (err, result) {
      if (err) {
        const resultApi = {
          status: 0,
          message: err.sqlMessage,
        };

        console.log(resultApi);
        res.status(500).send(resultApi);
        return;
      }

      const resultApi = {
        status: 1,
        message: 'Sala została usunięta.',
      };

      res.status(200).send(resultApi);
      console.log('Successfully deleted room with id = ' + req.params.id);
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

// app.delete('/ticket/:id', (req, res) => {
//   // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";

//   const sql = 'DELETE FROM ticket WHERE id = ?';
//   con.query(sql, req.params.id, function (err, result) {
//     if (err) {
//       const resultApi = {
//         status: 0,
//         message: err.sqlMessage,
//       };

//       console.log(resultApi);
//       res.status(500).send(resultApi);
//       return;
//     }

//     const resultApi = {
//       status: 1,
//       message: 'Bilet został usunięty.',
//     };

//     res.status(200).send(resultApi);
//     console.log('Successfully deleted ticket with id = ' + req.params.id);
//   });
// });

app.delete('/user/:id', (req, res) => {
  // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";

  const sql = 'DELETE FROM user WHERE id = ?';
  con.query(sql, req.params.id, function (err, result) {
    if (err) {
      const resultApi = {
        status: 0,
        message: err.sqlMessage,
      };

      console.log(resultApi);
      res.status(500).send(resultApi);
      return;
    }

    const resultApi = {
      status: 1,
      message: 'Użytkownik został usunięty.',
    };

    res.status(200).send(resultApi);
    console.log('Successfully deleted user with id = ' + req.params.id);
  });
});

app.delete('/userFavourite/:userId/:movieId', verify, (req, res) => {
  if (isAdmin(req) || isOwner(req)) {
    const sql = 'DELETE FROM userFavourite WHERE userId = ? && movieId = ?';
    con.query(
      sql,
      [req.params.userId, req.params.movieId],
      function (err, result) {
        if (err) {
          const resultApi = {
            status: 0,
            message: err.sqlMessage,
          };

          console.log(resultApi);
          res.status(500).send(resultApi);
          return;
        }

        const resultApi = {
          status: 1,
          message: 'Ulubiony film został usunięty.',
        };

        res.status(200).send(resultApi);
        console.log(
          `Successfully deleted userFavourite with userId=${req.params.userId}, movieId=${req.params.movieId}`
        );
      }
    );
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
  // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";
});

app.delete('/userRatings/:userId/:movieId', verify, (req, res) => {
  // let sql = "DELETE FROM filmshows WHERE movie_id = ?;DELETE FROM movies WHERE id = ?";
  if (isAdmin(req) || isOwner(req)) {
    const sql = 'DELETE FROM userRatings WHERE userId = ? && movieId = ?';
    con.query(
      sql,
      [req.params.userId, req.params.movieId],
      function (err, result) {
        if (err) {
          const resultApi = {
            status: 0,
            message: err.sqlMessage,
          };

          console.log(resultApi);
          res.status(500).send(resultApi);
          return;
        }

        const resultApi = {
          status: 1,
          message: 'Ocena z filmu została usunięta.',
        };

        res.status(200).send(resultApi);
        console.log(
          `Successfully deleted userRatings with userId=${req.params.userId}, movieId=${req.params.movieId}`
        );
      }
    );
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

app.delete('/news/:id', verify, (req, res) => {
  if (isAdmin(req)) {
    const sql = 'DELETE FROM news WHERE id = ?';
    const sqlImage = 'SELECT image FROM news WHERE id = ?';
    let imageToDelete = '';
    con.query(sqlImage, req.params.id, (err, result) => {
      if (err) {
        const resultApi = {
          status: 0,
          message: err.sqlMessage,
        };
        res.status(500).send(resultApi);
        return;
      }

      imageToDelete = result[0].image;

      con.query(sql, req.params.id, (err, result) => {
        if (err) {
          const resultApi = {
            status: 0,
            message: err.sqlMessage,
          };

          console.log(resultApi);
          res.status(500).send(resultApi);
          return;
        }

        const resultApi = {
          status: true,
          message: 'Post na blogu został usunięty.',
        };
        deleteFile(imageToDelete);
        res.status(200).send(resultApi);
        console.log('Successfully deleted news with id = ' + req.params.id);
      });
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

// ===================

app.put('/movie/:id', verify, (req, res) => {
  if (isAdmin(req)) {
    const params = [
      req.body.bgImage,
      req.body.posterImage,
      req.body.title,
      req.body.description,
      req.body.duration,
      req.body.genreId,
      req.body.minAge,
      req.body.releaseDate,
      req.body.director,
      req.body.trailerURL,
      req.params.id,
    ];
    const sql =
      'UPDATE movie SET bgImage = ?, posterImage = ?, title = ?, description = ?, duration = ?, genreId = ?, minAge = ?, releaseDate = ?, director = ?, trailerURL = ? WHERE id = ?';
    const sqlImage = 'SELECT bgImage, posterImage FROM movie WHERE id = ?';
    let posterToDelete = '';
    let bgToDelete = '';
    con.query(sqlImage, req.params.id, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      posterToDelete = result[0].posterImage;
      bgToDelete = result[0].bgImage;
      con.query(sql, params, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }

        if (posterToDelete !== req.body.posterImage) {
          deleteFile(posterToDelete);
        }

        if (bgToDelete !== req.body.bgImage) {
          deleteFile(bgToDelete);
        }

        console.log(result.affectedRows + ' record(s) updated of movies');
        res.status(200).send(req.body);
      });
    });
  } else {
    res.status(403).send('Nie masz dostępu do edycji zasobów!');
  }
});

app.put('/city/:id', verify, (req, res) => {
  if (isAdmin(req)) {
    const params = [req.body.name, req.params.id];
    let sql = 'UPDATE city SET name = ? WHERE id = ?';

    con.query(sql, params, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      console.log(result.affectedRows + ' record(s) updated of cities');
      res.status(200).send({ id: Number(req.params.id), ...req.body });
    });
  }
});

app.put('/genre/:id', verify, (req, res) => {
  if (isAdmin(req)) {
    const params = [req.body.name, req.params.id];
    let sql = 'UPDATE genre SET name = ? WHERE id = ?';

    con.query(sql, params, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      console.log(result.affectedRows + ' record(s) updated of cities');
      res.status(200).send(req.body);
    });
  }
});

// app.put('/role/:id', (req, res) => {
//   const params = [req.body.name, req.params.id];
//   let sql = 'UPDATE role SET name = ? WHERE id = ?';

//   con.query(sql, params, (err, result) => {
//     if (err) {
//       console.log(err.sqlMessage);
//       res.status(500).send(err.sqlMessage);
//       return;
//     }

//     console.log(result.affectedRows + ' record(s) updated of cities');
//     res.status(200).send(req.body);
//   });
// });

app.put('/cinema/:id', verify, (req, res) => {
  if (isAdmin(req)) {
    const params = [req.body.street, req.body.cityId, req.params.id];
    let sql = 'UPDATE cinema SET street = ?, cityId = ? WHERE id = ?';
    const sql2 =
      'select cin.*, cit.name as cityName from cinema cin, city cit where cin.cityId = cit.id && cin.id = ?';

    con.query(sql, params, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      con.query(sql2, req.params.id, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        res.status(200).send(result[0]);
      });
      console.log(result.affectedRows + ' record(s) updated of cities');
    });
  }
});

/* Pomyśleć nad tym, żeby zwracało nam seans w podobnym formacie, co jest pobierane przy admin-filmshows  */
app.put('/filmshow/:id', verify, (req, res) => {
  if (isAdmin(req)) {
    console.log('REQ', req.params);
    const params = [
      req.body.roomId,
      req.body.movieId,
      req.body.playDate,
      req.params.id,
    ];
    let sql =
      'UPDATE filmshow SET roomId = ?, movieId = ?, playDate = ? WHERE id = ?';
    const sql1 =
      'select f.id, r.id as roomId, r.name as roomName, m.id as movieId, m.title, f.playDate, cit.name as cityName, cin.id as cinemaId, cin.street from filmshow f, room r, movie m, city cit, cinema cin where f.movieId = m.id && f.roomId = r.id && r.cinemaId = cin.id && cin.cityId = cit.id && f.id = ?';
    con.query(sql, params, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      con.query(sql1, req.params.id, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        res.status(200).send(result[0]);
      });
      console.log(result.affectedRows + ' record(s) updated of cities');
    });
  } else {
    res.status(403).send('Nie masz dostępu do edycji zasobów!');
  }
});

app.put('/post/:id', verify, (req, res) => {
  const initSql = 'SELECT p.userId FROM post p WHERE p.id = ?';
  con.query(initSql, req.params.id, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    const { userId } = result[0];
    if (isAdmin(req) || req.user.id === userId) {
      const params = [req.body.content, req.params.id];
      let sql = 'UPDATE post SET content = ? WHERE id = ?';
      const sql2 =
        'SELECT p.id, p.content, p.creationDate, u.id AS user_id, u.userName, u.image FROM post p, user u WHERE p.userId = u.id && p.id = ?';
      con.query(sql, params, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }

        con.query(sql2, req.params.id, (err, result) => {
          if (err) {
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
            return;
          }

          const { id, content, creationDate, user_id, userName, image } =
            result[0];

          res.status(200).send({
            id: id,
            content: content,
            creationDate: creationDate,
            user: {
              id: user_id,
              userName: userName,
              image: image ? `${API_URL}/file/${image}` : null,
            },
          });
        });

        // console.log(result.affectedRows + ' record(s) updated of posts');
        // res.status(200).send(req.body);
      });
    } else {
      res.status(403).send('Nie masz dostępu do edycji zasobów!');
    }
  });
});

app.put('/review/:id', verify, (req, res) => {
  const initSql = 'SELECT r.userId FROM review r WHERE r.id = ?';
  con.query(initSql, req.params.id, (err, result) => {
    if (err) {
      console.log(err.sqlMessage);
      res.status(500).send(err.sqlMessage);
      return;
    }
    const { userId } = result[0];
    if (isAdmin(req) || req.user.id === userId) {
      const params = [req.body.title, req.body.content, req.params.id];
      let sql = 'UPDATE review SET title = ?, content = ? WHERE id = ?';

      con.query(sql, params, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }

        console.log(result.affectedRows + ' record(s) updated of reviews');
        res.status(200).send(req.body);
      });
    }
  });
});

app.put('/review/points/:id', verify, (req, res) => {
  if (isAdmin(req)) {
    const sql = 'UPDATE review SET isRated = ? WHERE id = ?';
    con.query(sql, [req.body.newRate, req.params.id], (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      const points = req.body.newRate ? 1 : -1;

      const sqlUpdate = 'UPDATE user SET points = user.points + ? WHERE id = ?';
      con.query(sqlUpdate, [points, req.body.userId], (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        res.status(200).send(true);
      });

      console.log(result.affectedRows + ' record(s) updated of reviews');
    });
  }
});

app.put('/room/:id', verify, (req, res) => {
  if (isAdmin(req)) {
    const params = [
      req.body.cinemaId,
      req.body.name,
      req.body.rows,
      req.body.cols,
      req.body.unavailableSeats,
      req.params.id,
    ];
    const sql =
      'UPDATE room SET cinemaId = ?, name = ?, rows = ?, cols = ?, unavailableSeats = ? WHERE id = ?';

    con.query(sql, params, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      console.log(result.affectedRows + ' record(s) updated of rooms');
      res.status(200).send({ ...req.body, id: Number(req.params.id) });
    });
  } else {
    res.status(403).send('Nie masz dostępu do edycji zasobów!');
  }
});

// app.put('/ticket/:id', (req, res) => {
//   const params = [
//     req.body.filmshowId,
//     req.body.userId,
//     req.body.reservedSeats,
//     req.body.purchaseDate,
//     req.body.statusId,
//     req.body.cost,
//     req.params.id,
//   ];
//   let sql =
//     'UPDATE ticket SET filmshowId = ?, userId = ?, reservedSeats = ?, purchaseDate = ?, statusId = ?, cost = ?, WHERE id = ?';

//   con.query(sql, params, (err, result) => {
//     if (err) {
//       console.log(err.sqlMessage);
//       res.status(500).send(err.sqlMessage);
//       return;
//     }

//     console.log(result.affectedRows + ' record(s) updated of cities');
//     res.status(200).send(req.body);
//   });
// });

app.put('/user/:userId', verify, (req, res) => {
  if (isAdmin(req) || isOwner(req)) {
    const params = [req.body.email, req.params.userId];
    const sql0 = 'SELECT * FROM user WHERE email = ?';
    const sql = 'UPDATE user SET email = ? WHERE id = ?';

    con.query(sql0, req.body.email, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
      }
      if (result.length <= 0) {
        con.query(sql, params, (err, result) => {
          if (err) {
            console.log(err.sqlMessage);
            res.status(500).send(err.sqlMessage);
            return;
          }
          console.log(result.affectedRows + ' record(s) updated of user');
          res.status(200).send({ status: true });
        });
      } else {
        res.send({
          status: false,
          message: 'Podany przez Ciebie adres email jest używany.',
        });
      }
    });
  } else {
    res.status(403).send('Nie masz dostępu do tych zasobów!');
  }
});

app.put('/user/password/:userId', verify, (req, res) => {
  if (isAdmin(req) || isOwner(req)) {
    const sql = 'UPDATE user SET password = ? WHERE id = ?';
    const checkPasswordSQL = 'SELECT password FROM user WHERE id = ?';

    con.query(checkPasswordSQL, req.params.userId, async (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      const isPasswordValid = await bcrypt.compare(
        req.body.oldPassword,
        result[0].password
      );
      if (isPasswordValid) {
        const newHashedPassword = await bcrypt.hash(req.body.password, 5);
        con.query(
          sql,
          [newHashedPassword, req.params.userId],
          (err, result) => {
            if (err) {
              console.log(err.sqlMessage);
              res.status(500).send(err.sqlMessage);
              return;
            }

            console.log(result.affectedRows + ' record(s) updated of user');
            res.status(200).send(true);
          }
        );
      } else {
        res.status(403).send('Stare hasło nie jest poprawne');
      }
    });
  } else {
    res.status(403).send('Nie masz dostępu do tych zasobów!');
  }
});

app.put('/user/avatar/:userId', verify, (req, res) => {
  if (isAdmin(req) || isOwner(req)) {
    const sqlImage = 'SELECT image FROM user WHERE id = ?';
    const params = [req.body.avatar, req.params.userId];
    const sql = 'UPDATE user SET image = ? WHERE id = ?';
    let userAvatar = '';
    con.query(sqlImage, req.params.userId, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      userAvatar = result[0].image;

      con.query(sql, params, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }
        if (userAvatar) {
          deleteFile(userAvatar);
        }
        console.log(result.affectedRows + ' record(s) updated of user');
        res.status(200).send(`${API_URL}/file/${req.body.avatar}`);
      });
    });
  } else {
    res.status(403).send('Nie masz dostępu do tych zasobów!');
  }
});

app.put('/news/:id', verify, (req, res) => {
  if (isAdmin(req)) {
    const params = [
      req.body.image,
      req.body.title,
      req.body.content,
      req.params.id,
    ];
    const sql =
      'UPDATE news SET image = ?, title = ?, content = ? WHERE id = ?';
    const sqlImage = 'SELECT image FROM news WHERE id = ?';
    let imageToDelete = '';
    con.query(sqlImage, req.params.id, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }
      imageToDelete = result[0].image;
      con.query(sql, params, (err, result) => {
        if (err) {
          console.log(err.sqlMessage);
          res.status(500).send(err.sqlMessage);
          return;
        }

        if (imageToDelete !== req.body.image) {
          deleteFile(imageToDelete);
        }
        console.log(result.affectedRows + ' record(s) updated of blog posts');
        res.status(200).send({ ...req.body, id: Number(req.params.id) });
      });
    });
  } else {
    res.status(403).send('Nie masz dostępu do usuwania zasobów!');
  }
});

app.put('/userRatings/:userId/:movieId', verify, (req, res) => {
  if (isAdmin(req) || isOwner(req)) {
    const params = [req.body.rate, req.params.userId, req.params.movieId];
    const sql =
      'UPDATE userRatings SET rate = ? WHERE userId = ? && movieId = ?';

    con.query(sql, params, (err, result) => {
      if (err) {
        console.log(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
        return;
      }

      console.log(result.affectedRows + ' record(s) updated of userRatings');
      res.status(200).send(req.body);
    });
  }
});

// ===================

app.post('/upload', verify, (req, res) => {
  if (req.files === null) {
    return res.status(400).send('No file uploaded');
  }

  const dateNow = Date.now();
  const file = req.files.file;

  file.mv(`${__dirname}${UPLOADS_PATH}${dateNow}_${file.name}`, (err) => {
    if (err) {
      console.log('ERROR', err);
      return res.status(500).send(err);
    }
    res.json({
      fileName: file.name,
      filePath: `${dateNow}_${file.name}`,
    });
  });
});

app.get('/file/:name', (req, res) => {
  let filePath = path.join(__dirname, './uploads/' + req.params.name);
  // console.log(`FILE PATH ${filePath}`);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    return handleError(
      res,
      'File does not exist!',
      404,
      'File does not exists!'
    );
  }
});

// ===================

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
