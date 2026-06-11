import { TrackType } from "@/sharedTypes/types";
import { useParams } from "next/navigation";
import { useTrackData } from "./data";

export const useApi = () => {
    const fetchTracksAll = async () => {
        let data: TrackType[] = await fetch("https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`,
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
        const param = useParams();
        let data: TrackType[] = await fetch("https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/", {
            method: "GET",
            headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
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
    const fetchTrackCategory = async (id: string) => {
        const { tracks } = useTrackData();
        const data = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/${id}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then((response) => response.json())
      const idSet = new Set(data.data.items);
      const filteredTracks = tracks.filter(track => idSet.has(track._id));
      return filteredTracks;
    }
    return {fetchTracksAll, fetchTrackFavoriteAll, fetchTrackCategory}
}