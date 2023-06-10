
import {drawMultilineText} from "./multiline";
import type {PrintingString} from "../types/PrintingString";

export default function Preview (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, printingStrings: PrintingString[],image: any){

    ctx.textAlign = 'center';
    ctx.drawImage(image, 0, 0);
    for(let string of printingStrings){

        drawMultilineText(
            ctx,
            string.example,
            {
                rect: {
                    x: string.x,
                    y: string.y,
                    width: image.width,
                    height: string.fontsize
                },
                font: "Domine",
                verbose: true,
                lineHeight: 1,
                minFontSize: string.fontsize,
                maxFontSize: string.fontsize
            });
    }
}