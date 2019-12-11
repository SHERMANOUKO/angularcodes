//within the sending component
sendingFunction(minimum,maximum,field){
  let navigationExtras: NavigationExtras = {
    queryParams: {
        "search":true,
        "minimum": minimum,
        "maximum": maximum,
        "field":field
      }
  };

  this.router.navigate(["sizepricelimits"], navigationExtras);  
}

//on the receiving component
import { ActivatedRoute } from '@angular/router' //we import activatedroute

constructor(
  private activatedRoute: ActivatedRoute
) {
  //we extract the values within the constructor
  this.activatedRoute.queryParams.subscribe((params: { [x: string]: any; })=>{
    if(params["search"] === 'true'){
      this.minimum = params["minimum"]
      this.maximum = params["maximum"]
      this.field = params["field"]
    }else{
      //navigates to a different place if condition fails
      this.router.navigate([""]);  
    }
  })
}
