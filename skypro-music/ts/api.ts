import { TrackType } from "@/sharedTypes/types";
import { useTrackData } from "./data";

export const useApi = () => {
    const fetchTracksAll = async () => {
        let data: TrackType[] = await fetch("https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/", {
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
        return data;
    }
    const fetchTrackFavoriteAll = async () => {
        let data: TrackType[] = await fetch("https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/", {
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
    }
    const fetchTrackCategory = async (id: any) => {
        const { tracks } = useTrackData();
        const data = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/${id}/`, {
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
      let favoriteTrack = await fetchTrackFavoriteAll();
      filteredTracks.forEach(item1 => {
        const item2 = favoriteTrack.find(item => item._id === item1._id);
        if (item2 && item2.isLike === true) {
          item1.isLike = true;
        }
      });
      return filteredTracks;
    }
    const fetchTrackAdd = async (id: number) => {
        const response = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`, {
        method: "POST",
        body: JSON.stringify({
          email: localStorage?.getItem('email'),
          password: localStorage?.getItem('password'),
        }),
        headers: {
          // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage?.getItem('access')}`,
        },
      })
      if (response.ok) {
        console.log('Успешно сохранено')
      }
    }
    const fetchTrackDelete = async (id: number) => {
        const response = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`, {
        method: "DELETE",
        body: JSON.stringify({
          email: localStorage?.getItem('email'),
          password: localStorage?.getItem('password'),
        }),
        headers: {
          // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage?.getItem('access')}`,
        },
      })
      if (response.ok) {
        console.log('Успешно удалено')
      }
    }
    const fetchSignIn = async (login: string, password: string) => {
        const response = await fetch("https://webdev-music-003b5b991590.herokuapp.com/user/login/", {
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
    }
    const fetchGetToken = async (login: string, password: string) => {
        const access = await fetch("https://webdev-music-003b5b991590.herokuapp.com/user/token/", {
        method: "POST",
        body: JSON.stringify({
          email: login,
          password: password
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        return access;
    }
    return {fetchTracksAll, fetchTrackFavoriteAll, fetchTrackCategory, fetchTrackAdd, fetchTrackDelete, fetchSignIn, fetchGetToken}
}