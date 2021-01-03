import { Action, createReducer, on } from '@ngrx/store';

// actions
import {
  GetBoardsSuccess,
  AddBoardSuccess,
  DeleteBoardSuccess,
} from 'src/store/actions';


// models
import { BoardItem } from 'src/common/models/board';

export interface State {
  boardList: BoardItem[];
}

export const initialState: State = {
  boardList: [],
};

const onAddBoard = (state: State, { board }) => {
  const boardList: BoardItem[] = [...state.boardList];

  boardList.push(board);

  return {
    ...state,
    boardList,
  };
};

const onGetBoards = (state: State, { boardList }) => {
  return {
    ...state,
    boardList,
  };
};
const onDeleteBoard = (state: State, { boardId }) => {
  const boardList: BoardItem[] = [...state.boardList].filter(
    (board: BoardItem) => board.id !== boardId
  );

  return {
    ...state,
    boardList,
  };
};
const boardReducer = createReducer(
  initialState,
  on(AddBoardSuccess, onAddBoard),
  on(GetBoardsSuccess, onGetBoards),
  on(DeleteBoardSuccess, onDeleteBoard)
);

export function reducer(state: State | undefined, action: Action): State {
  return boardReducer(state, action);
}
