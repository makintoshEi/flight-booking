import { Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'fb-loading-screen',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent {
  description = input('Cargando...')
}
