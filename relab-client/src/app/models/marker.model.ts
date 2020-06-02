import { Icon } from './icon.model';

export class Marker {
    icon : Icon;
    
    constructor(public lat: number, public lng: number, public label?: string) 
    {
        if (this.label.includes("Gas")) {
            this.icon = new Icon ( './assets/img/gas.ico', 24 );
            this.label = "";
            console.log(this.icon);
        }
        if(this.label.includes("elettrica"))
        {
            this.icon =  new Icon ( './assets/img/electricity.ico', 24 );
            this.label = "";
        }
    }

    changeIconSize(size)
    {
        this.icon.setSize(size);
    }


   



}
