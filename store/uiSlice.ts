import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import ModalEnum from "@/model/ModalEnum";
// Define a type for the slice state
interface UiState {
  activeBoard: number;
  openedTask: { taskIndex: number; colIndex: number } | undefined;
  openedModal: ModalEnum | undefined;
  sidebarIsOpen: boolean;
}

// Define the initial state using that type
const initialState: UiState = {
  activeBoard: 0,
  openedTask: undefined,
  openedModal: undefined,
  sidebarIsOpen: true,
};
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<number>) => {
      state.activeBoard = action.payload;
    },

    setActiveModal: (state, action: PayloadAction<ModalEnum | undefined>) => {
      state.openedModal = action.payload;
    },

    setOpenedTask: (
      state,
      action: PayloadAction<{ taskIndex: number; colIndex: number } | undefined>
    ) => {
      state.openedTask = action.payload;
    },

    toggleSidebar: (state) => {
      state.sidebarIsOpen = !state.sidebarIsOpen;
    },
  },
});
export const { setActiveBoard, setActiveModal, setOpenedTask, toggleSidebar } =
  uiSlice.actions;
export const selectBoard = (state: RootState) => state.ui.activeBoard;
export const selectModal = (state: RootState) => state.ui.openedModal;
export const selectTask = (state: RootState) => state.ui.openedTask;
export const selectSidebar = (state: RootState) => state.ui.sidebarIsOpen;
export default uiSlice.reducer;
