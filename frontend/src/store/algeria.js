import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  inputValue: "",
  msgError: false,
  subMenu: false,
  loading: false,
  municipalities: [],
  visible: false,
  markerPosition: [],
  areaInSquare: 0,
  markerState: null,
}

const algeria = createSlice({
  name: "algeria",
  initialState,
  reducers: {
    setUpdateValue: (state, action) => {
      state.inputValue = action.payload
    },
    setMsgError: (state, action) => {
      state.msgError = action.payload
    },
    setMarker: (state, action) => {
      state.markerState = action.payload
    },
    setVisible: (state, action) => {
      state.visible = action.payload
    },
    setMunicipalities: (state, action) => {
      state.municipalities = action.payload
    },
    setMarkerPosition: (state, action) => {
      state.markerPosition = action.payload
    },
    setAreaInSquare: (state, action) => {
      state.areaInSquare = action.payload
    },
    setSubMenu: (state, action) => {
      state.subMenu = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const {
  setUpdateValue,
  setMsgError,
  setVisible,
  setMarker,
  setMarkerPosition,
  setAreaInSquare,
  setSubMenu,
  setLoading,
} = algeria.actions

export default algeria.reducer
