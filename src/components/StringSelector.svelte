<script lang="ts">
    import type {PrintingString} from "../types/PrintingString";
    import { slide } from 'svelte/transition';

    export let printStringProps: PrintingString;
    export let printingStrings: PrintingString[];

    let isOpened = false;

    function select() {
        let previous = printStringProps.selected;
        printingStrings.forEach(i=>i.selected=false)
        printStringProps.selected = !previous;
        printingStrings = printingStrings;
    }

    function remove(){
        printingStrings.splice(printingStrings.indexOf(printStringProps), 1);
        printingStrings = printingStrings;
    }

    function open() {
        isOpened = !isOpened;
    }
</script>


<div class="selectorWrapper">
    <div class:opened={isOpened} class="inputFields">
        <div class:printingStringSelected={printStringProps.selected} class="printingString">
            <span>x: {printStringProps.x}</span>
            <span>y: {printStringProps.y}</span>
            <button class="button plainButton w-5"  on:click={select}>Selection Mode</button>
            <div class="button functionalButton" on:click={remove}><div class="burgerCloseButton"></div></div>
            <div class="button functionalButton" class:rotated={isOpened} on:click={open}><div class="burgerHideButton"></div></div>

        </div>
        {#if isOpened}
            <div transition:slide|local class="inputFieldsOpen">
                <div>
                    <span>Font:</span>
                    <input class="basic-text fontInput" type="text" bind:value={printStringProps.font}>
                </div>
                <div>
                    <span>Font Size:</span>
                    <input class="basic-text" type="number" bind:value={printStringProps.fontsize}>
                </div>
                <div>
                    <span>Table Row</span>
                    <input class="basic-text" type="number" bind:value={printStringProps.row}>
                </div>
                <div>
                    <span>X:</span>
                    <input class="basic-text" type="number" bind:value={printStringProps.x}>
                </div>
                <div>
                    <span>Y:</span>
                    <input class="basic-text" type="number" bind:value={printStringProps.y}>
                </div>
                <div>
                    <span>Example Text:</span>
                    <input class="basic-text" type="text" bind:value={printStringProps.example}>
                </div>
            </div>

        {/if}
    </div>
</div>


<style>
    .printingString > .fontInput {
        width: 80px;
    }

    .printingString > input {
        width: 50px;
    }

    .printingString {
        display: flex;
        gap: 10px;
        background: #3e62ae;
        align-items: center;
        justify-content: center;
        border-radius: 13px;
        padding: 10px;
    }

    .printingString.printingStringSelected {
        background: #d2f0f7;
        color: #11274b;
    }



    .inputFields {
        color: #d2f0f7;
        display: flex;
        flex-direction: column;
        background: #11274b;
        border-radius: 15px;
        border: #140f07 4px solid;
    }
    .inputFieldsOpen{
        margin: 10px;
        display: flex;
        flex-direction: column;
    }

    .inputFieldsOpen > div {
        display: flex;
        justify-content: space-between;
    }
    .burgerCloseButton {
        position: relative;
        transform: translateY(2px);
    }
    .burgerCloseButton::after, .burgerCloseButton, .burgerCloseButton::before {
        content: '';
        width: 30px;
        border-radius: 4px;
        transition: transform .6s ease-in-out, margin .6s ease-in-out;
    }
    .burgerCloseButton::after, .burgerCloseButton::before {
        display: block !important;
        height: 4px;
        background: #ff5151;
    }

    .burgerCloseButton::after {
        margin-top: 0;
        transform: rotate(45deg) translateY(-3px) translateX(-3px);
    }

    .burgerCloseButton::before {
        transform: rotate(-45deg);
    }
    .burgerHideButton{
        position: relative;
    }
    .burgerHideButton::after, .burgerHideButton, .burgerHideButton::before {
        content: '';
        width: 24px;
        border-radius: 4px;
        transition: transform .6s ease-in-out, margin .6s ease-in-out;
    }
    .burgerHideButton::after, .burgerHideButton::before {
        display: block !important;
        height: 4px;
        background: #333333;
    }
    .burgerHideButton::after {
        margin-top: 0;
        transform: rotate(45deg) translateY(1px) translateX(-13px);
    }

    .burgerHideButton::before {
        transform: rotate(-45deg) translateX(8px);
    }
    .rotated > .burgerHideButton::before {
        transform: rotate(45deg);
    }
    .rotated > .burgerHideButton::after {
        transform: rotate(-45deg);
    }

</style>