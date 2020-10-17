import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Specie } from '../../models/specie.model';
//from here we get the data
import { SpeciesService } from '../../services/species.service';
import { EspeciesDialogComponent } from './especies-dialog/especies-dialog.component';
//here are stored all our modal settings
import { ModalSettings } from '../../helpers/settings';

@Component({
  selector: 'app-especies',
  templateUrl: './especies.component.html',
  styleUrls: ['./especies.component.css']
})

export class EspeciesComponent implements OnInit {
  //columns to display in the table
  columnsToDisplay = ['name', 'state', 'edit'];
  //specie objects
  specie: Specie;
  species: MatTableDataSource<Specie>;

  constructor(
    private speciesService: SpeciesService,
    private dialog: MatDialog,) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(){
    this.getAll();
  }

  //we try to get all the species from the API
  getAll(){
    this.speciesService.getAll().subscribe(
      result => {
        this.species = new MatTableDataSource<Specie>(result as Specie[]);
        this.species.paginator = this.paginator;
      }, error=>{
        if(error.status == 404){
          alert("Error al obtener los datos del servidor");
        }
      });
  }

  //opening the Add Specie Dialog
  openDialog(specie?: Specie): void {
    const dialogRef = this.dialog.open(EspeciesDialogComponent, ModalSettings.especiesAddSettings);
    dialogRef.componentInstance.title = ModalSettings.especiesAddSettings.title;
    if(specie != undefined){
      dialogRef.componentInstance.specie = specie;
    }
    dialogRef.afterClosed().subscribe(result => {
      dialogRef.componentInstance.isSending = false;
      this.getAll();
    });
  }

   
}
