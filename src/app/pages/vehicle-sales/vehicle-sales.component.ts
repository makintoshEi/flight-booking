import { Component, computed, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Vehicle } from '../../types';

@Component({
  selector: 'app-vehicle-sales',
  standalone: true,
  imports: [MatSelectModule, MatFormFieldModule, MatInputModule],
  templateUrl: './vehicle-sales.component.html',
  styleUrl: './vehicle-sales.component.scss'
})
export class VehicleSalesComponent {
  vehicles = signal<Vehicle[]>([
    { id: 1, name: 'Sand Crawler', price: 22050 },
    { id: 2, name: 'AT-AT', price: 10000 },
    { id: 3, name: 'TIE Fighter', price: 15000 },
    { id: 4, name: 'Suzuki Jimny', price: 25000 }]);

  selectedVehicle = signal<Vehicle | undefined>(undefined);
  quantity = signal<number>(1);

  color = computed<'green' | 'red'>(() => this.totalValue() > 50000 ? 'green' : 'red');
  totalValue = computed(() => (this.selectedVehicle()?.price ?? 0) * this.quantity());

  onSelectVehicle(ele: EventTarget | null) {
    const id = +((ele as HTMLSelectElement).value);
    const foundVehicle = this.vehicles().find((v) => v.id === id);
    if (foundVehicle) {
      this.selectedVehicle.set(foundVehicle) // signal changes
    }
  }

  onQuantityChange(ele: EventTarget | null) {
    this.quantity.set(+((ele as HTMLInputElement).value))
  }

}
