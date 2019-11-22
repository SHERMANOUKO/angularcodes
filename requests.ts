//an example of http post request

this.apidata.postUnauthData(this.userData,'my/path').subscribe(
    (res) => {
      if(res.code === 200){
        this.succesful = true
        this.registerMessage = res.message
      }else{
        this.succesful = false
        this.registerMessage = res.message
      }
    },
    (err) => {
      this.succesful = false
      this.registerMessage = err.message
    }
);

//post assync request that also caters for serverside pagination (check the html code for this commented out below)
getPage(page: number) {
    this.loading = true;
    this.pageNo = page - 1
    this.asyncProperties = this.apidata.getAuth('singleProperty?number='+this.pageNo+'&size=6&ownerIdentifier='+this.userIdentifier)
      .pipe(
        tap<any>(res=>{
          if(res.code === 200){
            this.p = page;
            this.loading = false;
          }else{
            this.propertyMessage = res.message
            this.loading = false;
          }
        }),
        map<any,any>(res => res.data)
    )
  }


 //request to get a pdf file document from a django rest API I created
 this.apiservice.getPdf('http://127.0.0.1:8000/getReport/document').subscribe(
      (res)=>{
        var newBlob = new Blob([res], { type: "application/pdf" });

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers: 
        // Create a link pointing to the ObjectURL containing the blob.
        const data = window.URL.createObjectURL(newBlob);

        var link = document.createElement('a');
        link.href = data;
        link.download = "Je kar.pdf";
        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

        setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
        }, 100);
      },
      (err)=>{
       console.log(err.status)
       console.log(err.statusText)
       console.log(err.error)
      }
    ) 
    
  }
  
//<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12" *ngFor="let property of asyncProperties | async | paginate: { id: 'server', itemsPerPage: 6, currentPage: p, totalItems: totalCount }" id="imageholder">
//  <div>
//    <h6 class="text text-center">Title Deed: {{property.propertyTitleDeedNo}}</h6>
//    <table>
//      <tr>
//        <td>County: {{property.propertyCounty}}</td>
//        <td>Area: {{property.propertyAreaName}}</td>
//      </tr>
//      <tr>
//        <td>Alias: {{property.propertyLandAliasName}}</td>
//        <td>Size: {{property.propertySize}}</td>
//      </tr>
//    </table>
//  </div>
//</div>
//
// <pagination-controls (pageChange)="getPage($event)" id="server" *ngIf="!loading"></pagination-controls>
