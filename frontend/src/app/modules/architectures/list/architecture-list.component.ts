import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ArchitectureApiService } from 'src/app/api-services/architectures/architecture-api.service';
import { ArchitectureModel } from 'src/app/models/architectures/architecture.model';
import { environment } from 'src/environments/environment';

/**
 * Architecture List Component to show list of architectures
 */
@Component({
  selector: 'nn-architecture-list',
  styleUrls: ['./architecture-list.component.scss'],
  templateUrl: './architecture-list.component.html',
})
export class ArchitectureListComponent {
  public showLoader: boolean = false;
  public architectures: ArchitectureModel[] = [];
  public dataSource = new MatTableDataSource<ArchitectureModel>([]);

  public displayedColumns: string[] = [
    'name',
    'optimizer',
    'loss',
    'metrics',
    'layers',
    'created_at',
    'action',
  ];

  public isSampleData: boolean = environment.sampleDataAPI;

  constructor(
    public architectureApiService: ArchitectureApiService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getItems();
  }

  public getItems(): void {
    this.showLoader = true;
    this.architectureApiService.getAllArchitectures().subscribe({
      next: (data: ArchitectureModel[]) => {
        this.dataSource.data = data;
        this.architectures = data;
      },
      error: (err) => { },
      complete: () => {
        this.showLoader = false;
      },
    });
  }

  public edit(id: string | number) {
    this.router.navigate(['/architecture/design', { architecture_id: id }]);
  }

  public deleteDesign(id: string | number): void {
    if (confirm('Are you sure you want to delete the design?')) {
      this.architectureApiService.deleteArchitecture(id).subscribe({
        next: (res) => {
          this.showSuccessSnackbar("Architecture Design was successfully deleted.");
          this.architectures = this.architectures.filter(x => x.id != id);
          this.dataSource.data = [...this.architectures];
        },
        error: (err) => {
          this.showSuccessSnackbar("Error while deleting the design. Please try again later.");
        },
        complete: () => {
        }
      })
    }
  }

  showSuccessSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
  }
}
