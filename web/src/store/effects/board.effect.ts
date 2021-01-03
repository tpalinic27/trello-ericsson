import { BoardItem } from 'src/common/models/board';
import {
  GetBoards,
  AddBoard,
  GetBoardsSuccess,
  AddBoardSuccess,
  DeleteBoard,
  DeleteBoardSuccess,
} from './../actions/board.action';

import { BoardService } from 'src/app/services/board.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

// actions
import {} from '../actions';
@Injectable()
export class BoardEffects {
  getAllBoards = createEffect(() =>
    this.action.pipe(
      ofType(GetBoards),
      mergeMap(() =>
        this.boardService.getAllBoards().pipe(
          map((data: { boards: BoardItem[] }) =>
            GetBoardsSuccess({ boardList: data.boards })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addBoard = createEffect(() =>
    this.action.pipe(
      ofType(AddBoard),
      mergeMap((action) =>
        this.boardService.addBoard(action.board).pipe(
          map((board: BoardItem) => AddBoardSuccess({ board })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  deleteBoard = createEffect(() =>
    this.action.pipe(
      ofType(DeleteBoard),
      mergeMap((action) =>
        this.boardService.deleteBoard(action.boardId).pipe(
          map(() => DeleteBoardSuccess({ boardId: action.boardId })),
          catchError(() => EMPTY)
        )
      )
    )
  );
  
  constructor(private action: Actions, private boardService: BoardService) {}
}
