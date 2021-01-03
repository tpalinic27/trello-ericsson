package io.trello.trelloapp.board;

import java.util.List;

public class BoardListResponse {
    public BoardListResponse(List<BoardModel> boards) {
        this.boards = boards;
    }

    public List<BoardModel> boards;
}
