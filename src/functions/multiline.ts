export function drawMultilineText(ctx: CanvasRenderingContext2D, text: string, opts: any) {

    // Default options
    if(!opts)
        opts = {}
    if (!opts.font)
        opts.font = 'sans-serif'
    if (typeof opts.stroke == 'undefined')
        opts.stroke = false
    if (typeof opts.verbose == 'undefined')
        opts.verbose = false
    if (!opts.rect)
        opts.rect = {
            x: 0,
            y: 0,
            width: ctx.canvas.width,
            height: ctx.canvas.height
        }
    if (!opts.lineHeight)
        opts.lineHeight = 1.1
    if (!opts.minFontSize)
        opts.minFontSize = 30
    if (!opts.maxFontSize)
        opts.maxFontSize = 100
    // Default log function is console.log - Note: if verbose il false, nothing will be logged anyway
    if (!opts.logFunction)
        opts.logFunction = function(message: any) { console.log(message) }


    const words = require('words-array')(text)
    if (opts.verbose) opts.logFunction('Text contains ' + words.length + ' words')
    let lines = []
    let y;  //New Line

    // Finds max font size  which can be used to print whole text in opts.rec
    for (let fontSize = opts.minFontSize; fontSize <= opts.maxFontSize; fontSize++) {

        // Line height
        let lineHeight = fontSize * opts.lineHeight

        // Set font for testing with measureText()
        ctx.font = ' ' + fontSize + 'px ' + opts.font

        // Start
        let x = opts.rect.x;
        y = fontSize; //modified line
        lines = []
        let line = ''

        // Cycles on words
        for (let word of words) {
            // Add next word to line
            let linePlus = line + word + ' '
            // If added word exceeds rect width...
            if (ctx.measureText(linePlus).width > (opts.rect.width)) {
                // ..."prints" (save) the line without last word
                lines.push({ text: line, x: x, y: y })
                // New line with ctx last word
                line = word + ' '
                y += lineHeight
            } else {
                // ...continues appending words
                line = linePlus
            }
        }

        // "Print" (save) last line
        lines.push({ text: line, x: x, y: y })

        // If bottom of rect is reached then breaks "fontSize" cycle
        if (y > opts.rect.height)
            break

    }

    if (opts.verbose) opts.logFunction("Font used: " + ctx.font);
    const offset = opts.rect.y + (opts.rect.height - y) / 2; //New line, calculates offset
    for (let line of lines)
        // Fill or stroke
        if (opts.stroke)
            ctx.strokeText(line.text.trim(), line.x, line.y + offset) //modified line
        else
            ctx.fillText(line.text.trim(), line.x, line.y + offset) //modified line

}