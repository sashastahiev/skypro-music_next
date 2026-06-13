import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/types';
type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean,
  isLoop: boolean,
  isShuffle: boolean,
  namePlaylist: string,
  Playlist: TrackType[],
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isLoop: false,
  isShuffle: false,
  namePlaylist: 'Треки',
  Playlist: [],
};

const trackSlice = createSlice({
  name: 'tracks',  
  initialState,  
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    }, 
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;    
    },   
    setIsLoop: (state, action: PayloadAction<boolean>) => {
      state.isLoop = action.payload;    
    }, 
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;    
    }, 
    setNamePlaylist: (state, action: PayloadAction<string>) => {
      state.namePlaylist = action.payload
    },
    setPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.Playlist = action.payload
    }
  },
});

export const { setCurrentTrack, setIsPlay, setIsLoop, setIsShuffle, setNamePlaylist, setPlaylist} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;