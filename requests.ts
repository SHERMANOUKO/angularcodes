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
