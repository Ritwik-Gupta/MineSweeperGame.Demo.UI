import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  base_URL = "https://localhost:7266/api/MineSweeperGame/"

  constructor(private httpClient: HttpClient) { }

  getGridData(grid_size: number, mines: number) {
    return this.httpClient.get(this.base_URL + `generate-grid?grid_size=${grid_size}&mines=${mines}`)
  }
}
