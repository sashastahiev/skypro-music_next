import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/sharedTypes/types';
type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean,
  isLoop: boolean,
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isLoop: false,
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
  },
});

export const { setCurrentTrack,  setIsPlay, setIsLoop} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;