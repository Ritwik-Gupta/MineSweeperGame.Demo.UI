import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { MINE_ICON, DEFAULT_ICON, NUMBER_ONE_ICON, NUMBER_TWO_ICON, NUMBER_THREE_ICON, NUMBER_FOUR_ICON,
  NUMBER_FIVE_ICON, NUMBER_SIX_ICON, NUMBER_SEVEN_ICON, NUMBER_NINE_ICON, NUMBER_EIGHT_ICON, NUMBER_ZERO_ICON} from '../../models/constants';
import { IGrid } from '../../models/igrid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit{

  grid_size: number = 2;
  mines: number = 3;
  grid_icons_data: IGrid[][] = [];
  currGrid: IGrid = {
    value: 0,
    icon: DEFAULT_ICON,
    clicked: false,
    checked: false
  }
  IsGameStarted: boolean = false;
  IsGameOver: boolean = false;
  curr_score: number = 0;
  final_score: number = 0;

  constructor(
    private route: ActivatedRoute,
    private service: GameService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.grid_size = params['grid_size']
      this.mines = params['mines']
    })
    // this.startGame();
  }

  startGame() {
    //fetch the grid data from the api
    this.service.getGridData(this.grid_size, this.mines).subscribe({
      next: (data: any) => {
        let grid_data = data;
        this.populateGridData(grid_data)
        this.IsGameStarted = true;
      }
    })
  }

  populateGridData(grid_data: number[][]) {
    for(let i=0; i<grid_data.length; i++)
    {
      let trow: IGrid[] = [];
      for(let j=0; j<grid_data[0].length; j++)
      {
        let grid: IGrid = {
          value: grid_data[i][j],
          icon: DEFAULT_ICON,
          clicked: false,
          checked: false
        }
        trow.push(grid)
      }
      this.grid_icons_data.push(trow);
    }
    // console.log(this.grid_icons_data);
  }

  uncoverGrid(rowIdx: number, colIdx: number) {
    this.currGrid = this.grid_icons_data[rowIdx][colIdx];

    if(this.IsGameOver) {
      this.toastr.error("Game has ended!..Please restart")
    }

    if(this.currGrid.clicked){
      return;
    }

    if(this.currGrid.value == -99){
      this.uncoverAllMines();
      this.toastr.error("Game Over! you stepped on mine")
      this.IsGameOver = true;
      this.final_score = this.curr_score;
      this.curr_score = 0;
      return;
    }

    this.currGrid.icon = this.getIconFromValue(this.currGrid.value);
    this.currGrid.clicked = true;
    this.curr_score += 1;

    if(this.currGrid.value == 0) {
      this.UncoverEmptyAdjacentGrids(rowIdx, colIdx);
    }
  }

  UncoverEmptyAdjacentGrids(rowIdx: number, colIdx: number) {

    for(let i=rowIdx-1; i<rowIdx+2; i++)
    {
      for(let j=colIdx-1; j<colIdx+2; j++)
      {
        if(!(i==rowIdx && j==colIdx))
        {
          if(!(i<0 || j<0) && !(i>=this.grid_icons_data.length || j>=this.grid_icons_data[0].length)) //checks if not out of bounds
          {
            let currGrid = this.grid_icons_data[i][j];
            if(currGrid.value == 0 && !currGrid.checked)
            {
              this.curr_score += 1;
              currGrid.checked = true;
              currGrid.clicked = true;
              currGrid.icon = this.getIconFromValue(currGrid.value);
              this.UncoverEmptyAdjacentGrids(i,j);
            }
          }
        }
      }
    }
  }

  uncoverAllMines() {
    for(let i=0; i<this.grid_icons_data.length; i++)
    {
      for(let j=0; j<this.grid_icons_data[0].length; j++)
      {
        if(this.grid_icons_data[i][j].value == -99)
        {
          this.grid_icons_data[i][j].icon = MINE_ICON;
          this.grid_icons_data[i][j].clicked = true;
        }
      }
    }
  }

  getIconFromValue(value: number): string{
    let icon = "";

    switch(value) {
      case 1:
        icon = NUMBER_ONE_ICON
        break;

      case 2:
        icon = NUMBER_TWO_ICON
        break;

      case 3:
        icon = NUMBER_THREE_ICON
        break;

      case 4:
        icon = NUMBER_FOUR_ICON
        break;

      case 5:
        icon = NUMBER_FIVE_ICON
        break;

      case 6:
        icon = NUMBER_SIX_ICON
        break;

      case 7:
        icon = NUMBER_SEVEN_ICON
        break;

      case 8:
        icon = NUMBER_EIGHT_ICON
        break;

      case 9:
        icon = NUMBER_NINE_ICON
        break;

      case 0:
        icon = NUMBER_ZERO_ICON
        break;

      case -99:
        icon = MINE_ICON;
        break;

      default:
        break;
    }

    return icon;
  }
}
