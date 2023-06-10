<script lang="ts">
    import {onMount} from 'svelte';
    import {PrintingString} from "./types/PrintingString";
    import StringSelector from "./components/StringSelector.svelte";
    import {OpenImage} from "./functions/OpenImage";
    import Preview from "./functions/Preview";
    import Print from "./functions/Print";
    import {count, rowCount} from "./functions/Stores";
    import "./Buttons.css";
    import "./UI.css";
    import "./Burger.css";
    import {fly, fade, slide} from 'svelte/transition';


    let canvasElement: HTMLCanvasElement;

    let printingStrings: PrintingString[] = [];
    let saveAs: string = "1";
    let panelVisible: boolean = true;

    let totalCount: number = 0;
    let numCount: number = 0;
    let percent: string = "0";
    let customPreset = "";
    rowCount.subscribe(n => {
        totalCount = n
        percent = ((n / totalCount) * 100).toFixed(2);
    })
    count.subscribe(n => {
        numCount = n;
        percent = ((n / totalCount) * 100).toFixed(2);
    })

    let image: any;

    function addPrintingString() {
        printingStrings.push(new PrintingString());
        printingStrings = printingStrings;
    }

    let ctx: CanvasRenderingContext2D;


    onMount(() => {
        ctx = canvasElement.getContext("2d");
        ctx.textAlign = 'center';
    });

    function coordinates(e) {

        let els = printingStrings.filter((ps) => ps.selected === true);
        for (let i = 1; i < els.length; i++) {
            els[i].selected = false;
        }
        let el = els[0]
        el.x = e.x - canvasElement.offsetLeft;
        el.y = e.y - canvasElement.offsetTop;
        printingStrings = printingStrings;
        Preview(ctx, canvasElement, printingStrings, image);
    }

    function preview() {
        Preview(ctx, canvasElement, printingStrings, image);
    }

    function print() {
        Print(printingStrings, image, saveAs);
    }

    function parse() {
        printingStrings = JSON.parse(customPreset);
    }

    function copy() {
        navigator.clipboard.writeText(JSON.stringify(printingStrings));
    }

    function changeView() {
        panelVisible = !panelVisible;
    }

</script>

<main>
    <div class="button functionalButton fixed left-5 top-5 z-20"
         class:burger_or={!panelVisible}
         on:click={changeView}>
        <div class="burger"></div>
    </div>
    {#if panelVisible}
        <div in:fade out:fade class="control-panel">
            <div class="flex-row flex items-center justify-center text-4xl">
                Printer 0.1.0
            </div>

            <div class="flex-row flex justify-between">
                <button class="button mainButton"
                        on:click={preview}>
                    Preview
                </button>
                <button class="button mainButton"
                        on:click={print}>
                    Print
                </button>
                <button class="button mainButton"
                        on:click={async ()=>{image = await OpenImage(ctx, canvasElement)}}>
                    Image
                </button>
            </div>

            <div class="flex-row flex justify-between items-center text-lg">
                <span>Name sources: </span>
                <input class="basic-text"
                       type="text"
                       bind:value={saveAs}>
            </div>


            {#if totalCount > 0}
                <span>{numCount}/{totalCount}  {percent}%</span>
            {/if}

            <div class="printingStringWrapper">
                <div class="flex flex-row justify-between items-center text-lg">
                    <span>Places for text: </span>
                    <button class="button mainButton"
                            on:click={addPrintingString}>
                        Add Printing String
                    </button>
                </div>
                <div class="printingStringFields">
                    {#each printingStrings as printString}
                        <div transition:slide|local>
                            <StringSelector
                                    bind:printingStrings={printingStrings}
                                    bind:printStringProps={printString}>

                            </StringSelector>
                        </div>

                    {/each}
                </div>

            </div>

            <div class="printingStringWrapper">
                <input class="basic-text w-full" type="text" bind:value={customPreset}>
                <div class="flex flex-row justify-between items-center text-lg">
                    <span>Save menu:</span>
                    <button class="button mainButton"
                            on:click={parse}>
                        Parse
                    </button>
                    <button class="button mainButton"
                            on:click={copy}>
                        Copy
                    </button>
                </div>
            </div>


        </div>

    {/if}
    <canvas on:click={coordinates} bind:this={canvasElement}></canvas>

</main>


<style global>
    @import url('https://fonts.googleapis.com/css2?family=Domine:wght@700&display=swap');

    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
