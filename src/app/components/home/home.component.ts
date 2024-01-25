import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { min } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  grid_size: number = 2;
  mines_count: number = 3;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) { }

  startGame() {
    if(this.grid_size < 2 || this.grid_size > 10) {
      this.toastr.error("Invalid Grid Size")
      return;
    }
    if(this.mines_count >= this.grid_size*this.grid_size) {
      this.toastr.error("Mines should be less than the total number of grids");
      return;
    }

    this.router.navigate(['/play'],
    {
      queryParams: {
        grid_size: this.grid_size,
        mines: this.mines_count
      }
    })

  }


}
