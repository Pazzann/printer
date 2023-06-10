export class PrintingString {
    public fontsize: number;
    public font: string;
    public x: number;
    public y: number;
    public color: {
        r: number,
        g: number,
        b: number,
        a: number
    }
    public example: string;
    public selected: boolean = false;
    public row: number = 1;

    constructor() {
        this.fontsize = 0;
        this.font = "sans-serif";
        this.x = 0;
        this.y = 0;
        this.example = "exampletext";
        this.color = {
            r: 255,
            b: 0,
            g: 0,
            a: 0
        };

    }

    get HexColor(): string {
        return "#" + (this.color.r > 16 ? this.color.r.toString(16) : "0" + this.color.r.toString(16))
            + (this.color.g > 16 ? this.color.g.toString(16) : "0" + this.color.g.toString(16))
            + (this.color.b > 16 ? this.color.b.toString(16) : "0" + this.color.b.toString(16));
    }
    public setColorHex(color: string){
        color = color.split('#')[1];
        this.color.r = parseInt(color[0] + color[1], 16);
        this.color.g = parseInt(color[2] + color[3], 16);
        this.color.b = parseInt(color[4] + color[5], 16);
    }
}
