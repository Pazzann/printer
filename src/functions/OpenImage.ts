
const remote = require("@electron/remote");

// import {read} from "jimp";
//@ts-ignore
const Jimp = require("jimp");

export async function OpenImage(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const {filePaths} = await remote.dialog.showOpenDialog({
        filters: [
            {name: 'Image Files', extensions: ['jpg', 'jpeg', 'bmp', 'png']},
        ],
        properties: ['openFile']
    });
    if (filePaths.length > 0) {
        try {
            let img = await Jimp.read(filePaths[0]);
            ctx.clearRect(0, 0, canvas.width, canvas.width);
            canvas.width = img.getWidth();
            canvas.height = img.getHeight();

            const imageData = new ImageData(
                Uint8ClampedArray.from(img.bitmap.data),
                img.bitmap.width,
                img.bitmap.height
            );
            ctx.putImageData(imageData, 0, 0);
            const image = new Image();
            image.src = canvas.toDataURL();
            return image;
        } catch (err) {

        }
    }
}