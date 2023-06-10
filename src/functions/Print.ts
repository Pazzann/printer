import type {PrintingString} from "../types/PrintingString";
import {drawMultilineText} from "./multiline";
import {count, rowCount} from "./Stores";

const remote = require("@electron/remote");
// //@ts-ignore
// const canvas = require("canvas");
//@ts-ignore
const Jimp = require("jimp");
export default async function Print(printingStrings: PrintingString[], image: any, saveAs: string) {

    const {filePaths} = await remote.dialog.showOpenDialog({
        filters: [
            {name: 'Excel Files', extensions: ['xlsx']},
        ],
        properties: ['openFile']
    });
    if (filePaths.length > 0) {
        // @ts-ignore
        const ExcelJS = window.exceljs;
        // @ts-ignore
        const fs = window.fs;
        // console.log(ExcelJS);
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(filePaths[0]);

        const dirPaths = await remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (dirPaths.filePaths?.length > 0) {
            let indexes: Array<string | number> = saveAs.split(";");
            indexes.forEach((i: string | number) => +i);
            workbook.eachSheet(async (worksheet, sheetId) => {
                rowCount.set(worksheet.rowCount);
                count.set(0);
                worksheet.eachRow({includeEmpty: true}, async (row, rowNumber) => {
                    const offscreen = new OffscreenCanvas(image.width, image.height);
                    //@ts-ignore
                    const ctx: CanvasRenderingContext2D = offscreen.getContext("2d");
                    ctx.drawImage(image, 0, 0);
                    ctx.textAlign = 'center';
                    for (let string of printingStrings) {
                        drawMultilineText(
                            ctx,
                            row.values[string.row],
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
                    //@ts-ignore
                    let imageBlob = await offscreen.convertToBlob({type: "image/jpeg"});
                    let buffer = await imageBlob.arrayBuffer();
                    Jimp.read(buffer)
                        .then(async (image) => {
                            let savePath = "";
                            for (let i of indexes){
                                savePath+= row.values[i] + " ";
                            }
                            savePath.split(" ").filter(i => i!=="").join(" ")
                            await image.write(dirPaths.filePaths + "/" + savePath + ".jpg");
                            count.update(n=>n+1)
                        })
                });

            });
        }
    }
}