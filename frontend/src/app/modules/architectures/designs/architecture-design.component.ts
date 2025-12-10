import { ChangeDetectorRef, Component, Input } from '@angular/core';
import {
  ArchitectureLayerViewModel,
  ArchitectureViewModel,
} from '../models/architecture-view.model';
import {
  ActivationFunctionTypes,
  ArchitectureLossTypes,
  ArchitectureMetricTypes,
  ArchitectureOptimizerTypes,
} from 'src/app/utils/app-constant';
import { ArchitectureApiService } from 'src/app/api-services/architectures/architecture-api.service';
import { Observable } from 'rxjs';
import {
  ArchitectureDesignLayerModel,
  ArchitectureDesignModel,
  ArchitectureModel,
  ArchitectureUpdateModel,
} from 'src/app/models/architectures/architecture.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var LeaderLine: any;

/**
 * Architecture Component to show basic test and api service call
 */
@Component({
  selector: 'nn-architecture-design',
  styleUrls: ['./architecture-design.component.scss'],
  templateUrl: './architecture-design.component.html',
})
export class ArchitectureDesignComponent {
  public isAdd: boolean = false;
  public architecture_id?: string | number;
  public isLoading: boolean = false;

  public activationFunctions: string[] = ActivationFunctionTypes.TYPES;
  public optimizerTypes: string[] = ArchitectureOptimizerTypes.TYPES;
  public lossTypes: string[] = ArchitectureLossTypes.TYPES;
  public metricTypes: string[] = ArchitectureMetricTypes.TYPES;

  public archModel: ArchitectureViewModel = new ArchitectureViewModel();
  public connections: any[] = [];

  constructor(
    public architectureApiService: ArchitectureApiService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.architecture_id = params['architecture_id'];
      this.isAdd = !this.architecture_id;
    });
  }

  ngAfterViewInit(): void {
    if (!this.isAdd) {
      this.isLoading = true;
      this.architectureApiService
        .getArchitectureById(this.architecture_id!)
        .subscribe({
          next: (res: ArchitectureModel | undefined) =>
            this.createArchViewModel(res, this._processEdgesConnectingNeurons),
          error: (err) => { },
          complete: () => (this.isLoading = false),
        });
    }
  }

  ngAfterViewChecked(): void {
    this.connections.forEach((line) => {
      line.position();
    });
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this._clearLeaderLines();
  }

  public onBoardScroll() {
    this.connections.forEach((line) => {
      line.position();
    });
  }

  /**
   * Save the architecture design
   */
  public onSave() {
    this.isLoading = true;

    let architectureDesign: ArchitectureDesignModel =
      new ArchitectureDesignModel();
    architectureDesign.optimizer = this.archModel.optimizer;
    architectureDesign.loss = this.archModel.loss;
    architectureDesign.metrics = this.archModel.metrics;
    architectureDesign.layers = this.archModel.layers.map((layer, index) => {
      let layerDesign = new ArchitectureDesignLayerModel();
      layerDesign.layer_id = index + 1;
      layerDesign.layer_type = layer.layer_type;
      layerDesign.architecture_type = layer.architecture_type;
      layerDesign.activation = layer.activationFunction;
      layerDesign.units = layer.getNeuronCount();
      return layerDesign;
    });

    let obs: Observable<ArchitectureModel>;
    if (this.isAdd) {
      obs = this.architectureApiService.addArchitecture({
        name: this.archModel.name,
        configuration: architectureDesign,
      });
    } else {
      obs = this.architectureApiService.updateArchitecture(this.archModel.id, {
        name: this.archModel.name,
        configuration: architectureDesign,
        id: String(this.archModel.id),
      });
    }
    obs.subscribe({
      next: (res: ArchitectureModel) => {
        this.isLoading = false;
        this.snackBar.open(
          `Architecture was successfully ${this.isAdd ? 'added' : 'updated'}.`,
          'Close',
          {
            duration: 2000,
            panelClass: ['snackbar-success'],
          }
        );
        setTimeout(() => {
          this._clearLeaderLines();
          this.router.navigate(['/'], { queryParams: { tab: 'architecture' } });
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }

  /**
   * Check if the architecutre design is valid
   * @returns True if valid otherwise false
   */
  public checkIfValid(): boolean {
    return this.archModel && this.archModel.name.trim() !== "";
  }

  public addNeuronCallbackFunc = () => {
    this._processEdgesConnectingNeurons();
  };

  public removeNeuronCallbackFunc = () => {
    this._processEdgesConnectingNeurons();
  };

  public addLayerCallbackFunc = () => {
    this._processEdgesConnectingNeurons();
  };

  public removeLayerCallbackFunc = () => {
    this._processEdgesConnectingNeurons();
  };

  /**
   * Process the connection lines between neurons
   */
  private _processEdgesConnectingNeurons = () => {
    if (LeaderLine) {
      this._clearLeaderLines();
      setTimeout(() => {
        if (this.archModel.layers.length > 1) {
          this.archModel.layers
            .filter((layer) => this.archModel.hasNextLayer(layer.id))
            .forEach((layer) => {
              let currentNeuron_element = document.getElementById(layer.id);
              let targetNeuron_element = document.getElementById(
                this.archModel.nextLayer(layer.id).id
              );
              const line = new LeaderLine(
                currentNeuron_element,
                targetNeuron_element,
                {
                  color: '#000',
                  size: 3,
                  path: 'straight',
                }
              );
              this.connections.push(line);
            });
        }
      });
    }
  };

  private _clearLeaderLines() {
    this.connections.forEach((x) => x.remove());
    this.connections.length = 0; // Clear
  }

  public createArchViewModel(
    res: ArchitectureModel | undefined,
    callBackFunction?: Function
  ): void {
    if (res) {
      this.archModel.id = res.id!;
      this.archModel.name = res.name!;
      this.archModel.optimizer = res.configuration!.optimizer!;
      this.archModel.loss = res.configuration!.loss!;
      this.archModel.metrics = res.configuration!.metrics!;
      this.archModel.layers = res.configuration!.layers!.map((l) => {
        let layer = new ArchitectureLayerViewModel();
        layer.activationFunction = l.activation!;
        layer.layer_type = l.layer_type!;
        layer.architecture_type = l.architecture_type!;
        for (let index = 1; index < l.units!; index++) {
          //1 neuron is already created while making instance of ArchitectureLayerViewModel
          // so, adding units-1 neurons,
          layer.addNeuron();
        }
        return layer;
      });
    }
    if (callBackFunction) callBackFunction();
  }
}
