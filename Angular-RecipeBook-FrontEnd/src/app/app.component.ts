import { Component } from '@angular/core';
import { LoadingSpinnerService } from './core/services/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Angular-RecipeBook';

  //#region GETTERS

  public get loadingSpinnerMessage(): string {
    return this.loadingSpinnerService.message;
  }

  //#endregion

  constructor(private loadingSpinnerService: LoadingSpinnerService) {}
}
