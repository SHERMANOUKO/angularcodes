import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service'
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-companyprofiles',
  templateUrl: './companyprofiles.component.html',
  styleUrls: ['./companyprofiles.component.css']
})
export class CompanyprofilesComponent implements OnInit {
  //variable declarations and initializations
  dtOptions: DataTables.Settings = {};
  companyData: Object[] = [];
  dtTrigger: Subject<Object[]> = new Subject();
  display: string = "none"
  company: Object
  dataset: boolean
  profileBlobUrl: any
  profilePhoto: boolean = false
  photoMessage: string

  constructor(private apiservice:ApiserviceService) { }

  ngOnInit() {
    //angular datatbles options
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.apiservice.getAuth('companyP').subscribe(
      (res)=>{
        if(res.body.code === 200){
          this.companyData = res.body.data
          this.dtTrigger.next()
        }
      },
      (err)=>{
        
      }
    )  
  }
  
  //function that creates an image from blob
  createImageFromBlob(image: Blob){
    let reader = new FileReader();
    
    reader.addEventListener("loadend", () => {
      this.profileBlobUrl = reader.result;
    }, false);  

    if(image){
      reader.readAsDataURL(image)
    }
  }


  //function that opens a modal and displays an image
  openModal(company){
    this.apiservice.getImages(company.profilePhotoUrl).subscribe((res)=>{
      if(res == null){
        this.photoMessage = "Unable to retrieve image or image is not available"
        this.profilePhoto = true
      }else{
        this.profileBlobUrl = this.createImageFromBlob(res)
        this.profilePhoto = true
      }
    },
    (err)=>{
      this.photoMessage = "Image not found"
      this.profilePhoto = true
    })

    this.dataset = true
    this.company = company
    this.display="block"; 
  }

  //funtion that hides an element by setting its display to none
  onCloseHandled(){
    this.display='none'; 
  }

  //simple confirm dialog boxes
  verify() {
      if(confirm("Are you sure you want to verify this seller ")) {
        alert('yeeey')
      }
  }

  unverify() {
    if(confirm("Are you sure you want to unverify this seller ")) {
      alert('yeeey')
    }
  }

}
