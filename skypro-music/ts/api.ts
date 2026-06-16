import { TrackType } from "@/sharedTypes/types";

export const useApi = () => {
  const fetchTracksAll = async ():Promise<TrackType[]> => {
    try {
      let data: TrackType[] = await fetch("https:/webdev-music-003b5b991590.herokuapp.com/catalog/track/all/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage?.getItem('access')}`,
        },
      })
        .then((response) => response.json())
        .then((json) => json.data);

      data = data.map((item, index) => ({
        ...item,
        id: index,
        isLike: false,
      }));

      let favoriteTrack: TrackType[] = await fetch("https:/webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage?.getItem('access')}`,
        },
      })
        .then((response) => response.json())
        .then((json) => json.data);

      favoriteTrack = favoriteTrack?.map((item, index) => ({
        ...item,
        id: index,
        isLike: true,
      }));

      data.forEach(item1 => {
        const item2 = favoriteTrack?.find((item) => item._id === item1._id);
        if (item2 && item2.isLike === true) {
          item1.isLike = true;
        }
      });

      return data;
    } catch (error) {
      console.log('Ошибка при получении всех треков:', error);
      throw error;
    }
  };

  const fetchTrackFavoriteAll = async (): Promise<TrackType[]> => {
    try {
      let data: TrackType[] = await fetch("https:/webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage?.getItem('access')}`,
        },
      })
        .then((response) => response.json())
        .then((json) => json.data);

      data = data.map((item, index) => ({
        ...item,
        id: index,
        isLike: true,
      }));

      return data;
    } catch (error){
      console.log(`Ошибка при получении избранных треков`, error);
      throw error;
    }
  };

  const fetchTrackCategory = async (id: number): Promise<TrackType[]> => {
    try {
      const tracks = await fetchTracksAll();
      const data = await fetch(`https:/webdev-music-003b5b991590.herokuapp.com/catalog/selection/${id}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage?.getItem('access')}`,
        },
      })
        .then((response) => response.json())
        .then((json) => json.data.items);

      const idSet = new Set(data);
      let filteredTracks: TrackType[] = tracks.filter(track => idSet.has(track._id));
      filteredTracks = filteredTracks.map((item, index) => ({
        ...item,
        id: index,
        isLike: false,
      }));

      let favoriteTrack: TrackType[] = await fetchTrackFavoriteAll();

      filteredTracks.forEach(item1 => {
        const item2 = favoriteTrack.find(item => item._id === item1._id);
        if (item2 && item2.isLike === true) {
          item1.isLike = true;
        }
      });

      return filteredTracks;
    } catch (error) {
      console.log(`Ошибка при получении треков категории ${id}:`, error);
      throw error;
    }
  };

  const fetchTrackAdd = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`https:/webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`, {
        method: "POST",
        body: JSON.stringify({
          email: localStorage?.getItem('email'),
          password: localStorage?.getItem('password'),
        }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage?.getItem('access')}`,
        },
      });

      if (!response.ok) {
        switch (response.status) {
          case 401:
            alert('Ошибка авторизации');
            window.location.href = '/auth/signin'
            break;
          default:
            alert(`Ошибка ${response.status}: проблема с авторизацией`);
        }
      }
    } catch (error) {
      console.log(`Ошибка при добавлении трека ${id} в избранное:`, error);
    }
  };

  const fetchTrackDelete = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`https:/webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`, {
        method: "DELETE",
        body: JSON.stringify({
          email: localStorage?.getItem('email'),
          password: localStorage?.getItem('password'),
        }),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage?.getItem('access')}`,
        },
      });

      if (!response.ok) {
        switch (response.status) {
          case 401:
            alert('Ошибка авторизации');
            window.location.href = '/auth/signin'
            break;
          default:
            alert(`Ошибка ${response.status}: проблема с авторизацией`);
        }
      }
    } catch (error) {
      console.log(`Ошибка при удалении трека ${id} из избранного:`, error);
      
    }
  };

  const fetchSignIn = async (login: string, password: string): Promise<Response> => {
    try {
      const response = await fetch("https:/webdev-music-003b5b991590.herokuapp.com/user/login/", {
        method: "POST",
        body: JSON.stringify({
          email: login,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.log('Ошибка при авторизации:', error);
      throw error;
    }
  };

  const fetchGetToken = async (login: string, password: string): Promise<string> => {
    try {
      const access: string = await fetch("https:/webdev-music-003b5b991590.herokuapp.com/user/token/", {
        method: "POST",
        body: JSON.stringify({
          email: login,
          password: password
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json());
      return access;
    } catch (error) {
      console.log('Ошибка при получении токена:', error);
      throw error;
    }
  };

  return {
    fetchTracksAll,
    fetchTrackFavoriteAll,
    fetchTrackCategory,
    fetchTrackAdd,
    fetchTrackDelete,
    fetchSignIn,
    fetchGetToken
  };
};
