export class Icon {
    
    public scaledSize:ScaledSize;
    constructor(public url: string, size: number){
        this.scaledSize = new ScaledSize(size,size);
    }

    setSize(size: number) {
        this.scaledSize = new ScaledSize(size,size);
    }
}


export class ScaledSize {
    constructor(
    public width:  number,
    public height: number){}
}
