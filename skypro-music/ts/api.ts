import { TrackType } from "@/sharedTypes/types";
import { useRouter } from "next/navigation";

export const useApi = () => {
  const API_URL: string = "https://webdev-music-003b5b991590.herokuapp.com/";
  const router = useRouter();
  const fetchTracksAll = async ():Promise<TrackType[]> => {
    try {
      let data: TrackType[] = await fetch(`${API_URL}catalog/track/all/`,{
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => json.data);
      data = data.map((item, index) => ({
        ...item,
        id: index,
        isLike: false,
      }));
      if (localStorage.getItem('email')){
        let favoriteTrack: TrackType[] = await fetchTrackFavoriteAll();
        data.forEach(item1 => {
          const item2 = favoriteTrack.find((item) => item._id === item1._id);
          if (item2 && item2.isLike === true) {
            item1.isLike = true;
          }
        });
      }
      return data;
    } catch (error) {
      console.log('Ошибка при получении всех треков:', error);
      throw error;
    }
  };
  const fetchTrackFavoriteAll = async (): Promise<TrackType[]> => {
    const MAX_RETRIES = 2;
    let retries = 0;
    const executeRequest = async (): Promise<TrackType[]> => {
      try {
        const response = await fetch(`${API_URL}catalog/track/favorite/all/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage?.getItem('access')}`,
          },
        });
        if (response.status === 401 && retries < MAX_RETRIES) {
          retries++;
          if (localStorage.getItem('access')) {
            await fetchRefreshToken();
            return await executeRequest();
          } else {
            return [];
          }
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data.map((item: TrackType, index: number) => ({
          ...item,
          id: index,
          isLike: true,
        }));
      } catch {
        return [];
      }
    };
    return await executeRequest();
  };
  const fetchTrackCategory = async (id: number) => {
    try {
      let tracks: TrackType[] = await fetchTracksAll();
      const data = await fetch(`${API_URL}catalog/selection/${id}`, {
        method: "GET",
      })
        .then((response) => response.json()) 
        .then((json) => json.data.items);
      const idSet = new Set(data);
      let filteredTracks: TrackType[] = tracks.filter(track => idSet.has(track._id));
      filteredTracks = filteredTracks.map((item, index) => ({
        ...item,
        id: index
      }))
      return filteredTracks ? filteredTracks : [];
    } catch (error) {
      console.log(`Ошибка при получении треков категории ${id}:`, error);
      throw error;
    }
  };

  const fetchTrackAdd = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}catalog/track/${id}/favorite/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage?.getItem('access')}`,
        },
      });

      if (!response.ok) {
        switch (response.status) {
          case 401:
            alert('Ошибка авторизации');
            router.push('/auth/signin');
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
      const response = await fetch(`${API_URL}catalog/track/${id}/favorite/`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage?.getItem('access')}`,
        },
      });
      if (!response.ok) {
        switch (response.status) {
          case 401:
            alert('Ошибка авторизации');
            router.push('/auth/signin');
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
    return fetch(`${API_URL}user/login/`, {
      method: "POST",
      body: JSON.stringify({
        email: login,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
  const fetchSignUp = async (login: string, password: string, name: string) => {
    const response = await fetch(`${API_URL}user/signup/`, {
      method: "POST",
      body: JSON.stringify({
          email: login,
          password: password,
          username: name,
      }),
      headers: {
          "content-type": "application/json",
      },
    })
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка регистрации');
    }
    return response;
  }
  const fetchGetToken = async (login: string, password: string) => {
    const response = await fetch(`${API_URL}user/token/`, {
      method: "POST",
      body: JSON.stringify({
        email: login,
        password: password
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      else 
        return response 
    }).then((response) => response.json())
    return response;
  };
  const fetchRefreshToken = async () => {
    try {
      const response = await fetch(`${API_URL}user/token/refresh/`, {
        method: "POST",
        body: JSON.stringify({
          refresh:
            localStorage.getItem('refresh'),
        }),
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => response.json())
      .then(response => response.access)
      localStorage.setItem('access',response)
    } catch {
        return;
    }
  }
  return {
    fetchTracksAll,
    fetchTrackFavoriteAll,
    fetchTrackCategory,
    fetchTrackAdd,
    fetchTrackDelete,
    fetchSignIn,
    fetchSignUp,
    fetchGetToken,
    fetchRefreshToken
  };
};
