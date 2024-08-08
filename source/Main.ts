import { Elements } from "./Elements.js";

class Main {

    elements: Elements;
    performance: Performance;
    clipboard: Clipboard;

    confirmReset: boolean;
    confirmTimestamp: number;

    resetTime: number;
    goalTime: number;
    now: number;

    constructor() {
        this.elements = new Elements();
        this.performance = window.performance;
        this.clipboard = window.navigator.clipboard;

        this.confirmReset = false;
        this.confirmTimestamp = Number.MAX_SAFE_INTEGER;

        this.now = Math.floor(this.performance.now());
        this.resetTime = this.now;
        this.goalTime = 90 * 24 * 60 * 60 * 1000;
    }

    init(): void {
        window.requestAnimationFrame(this.loop.bind(this));


        this.elements.resetTimestampDiv.addEventListener("click", (() => {
            this.clipboard.writeText((this.performance.timeOrigin + this.resetTime).toString());
        }).bind(this));
        this.elements.currentTimestampDiv.addEventListener("click", (() => {
            this.clipboard.writeText((this.performance.timeOrigin + this.now).toString());
        }).bind(this));

        this.elements.submitResetTimestampDiv.addEventListener("click", (() => {
            this.resetTime = Number(this.elements.setResetTimestampInput.value) - this.performance.timeOrigin;
        }).bind(this));
        this.elements.submitGoalTimeDiv.addEventListener("click", (() => {
            this.goalTime = Number(this.elements.setGoalTimeInput.value);
        }).bind(this));

        this.elements.resetDiv.addEventListener("click", (() => {
            this.confirmReset = !this.confirmReset;
            if (this.confirmReset) {
                this.confirmTimestamp = this.now;
            } else {
                this.resetTime = this.now;
                this.confirmTimestamp = Number.MAX_SAFE_INTEGER;
            }
        }).bind(this));
    }

    loop(): void {
        this.now = Math.floor(this.performance.now());

        let timeElapsed: number = this.now - this.resetTime;

        this.elements.millisecondSpan.innerHTML = this.prependZeroes(timeElapsed % 1000, 3);
        timeElapsed = this.floorDivide(timeElapsed, 1000);

        this.elements.secondSpan.innerHTML = this.prependZeroes(timeElapsed % 60, 2);
        timeElapsed = this.floorDivide(timeElapsed, 60);

        this.elements.minuteSpan.innerHTML = this.prependZeroes(timeElapsed % 60, 2);
        timeElapsed = this.floorDivide(timeElapsed, 60);

        this.elements.hourSpan.innerHTML = this.prependZeroes(timeElapsed % 24, 2);
        timeElapsed = this.floorDivide(timeElapsed, 24);

        this.elements.daySpan.innerHTML = this.prependZeroes(timeElapsed % 365, 3);
        timeElapsed = this.floorDivide(timeElapsed, 365);

        this.elements.yearSpan.innerHTML = this.prependZeroes(timeElapsed, 2);

        const goalPercentage: number = (this.now - this.resetTime) / this.goalTime * 100;

        const highestPlaceValue: number = Math.floor(Math.log(goalPercentage) / Math.log(10));
        const lowestPlaceValue: number = Math.floor(Math.log(100 / this.goalTime) / Math.log(10));

        const adjustPlaceValue: (value: number) => number = (value: number): number => {
            return value >= 0 ? value + 1 : value;
        }
        
        const highestDisplayPV: number = Math.max(adjustPlaceValue(highestPlaceValue), 1);
        const lowestDisplayPV: number = Math.min(adjustPlaceValue(lowestPlaceValue), 1);
        this.elements.goalPercentageSpan.innerHTML = this.selectPlaceValues(goalPercentage, lowestDisplayPV, highestDisplayPV) + "%";

        this.elements.goalBarDivInside.style.width = "calc(" + Math.min(goalPercentage, 100) + "% - 4px)";

        if (this.confirmReset && (this.now > (this.confirmTimestamp + 5000))) {
            this.confirmReset = false;
        }

        if (this.confirmReset) {
            this.elements.resetSpan.innerHTML = "Are you sure you want to reset?"
        } else {
            this.elements.resetSpan.innerHTML = "Reset";
        }

        this.elements.resetTimestampSpan.innerHTML = "Reset timestamp: " + (this.performance.timeOrigin + this.resetTime);
        this.elements.currentTimestampSpan.innerHTML = "Current timestamp: " + (this.performance.timeOrigin + this.now);

        window.requestAnimationFrame(this.loop.bind(this));
    }

    floorDivide(value: number, divisor: number): number {
        return Math.floor(value / divisor);
    }

    prependZeroes(value: number, digits: number): string {
        let valueStr: string = Math.abs(value).toString();
        const digitsToAdd: number = Math.max(digits - valueStr.length, 0);
        for (let i: number = 0; i < digitsToAdd; i++) {
            valueStr = "0" + valueStr;
        }
        if (value < 0) {
            valueStr = "-" + valueStr;
        }
        return valueStr;
    }

    selectPlaceValues(value: number, start: number, end: number): string {
        const valueStr: string = value.toString();
        const dotIndex: number = valueStr.indexOf(".");

        let resultStr: string[] = [];
        for (let i: number = start; i <= end; i++) {
            const index: number = dotIndex - i;

            if (typeof valueStr[index] === "undefined") {
                resultStr[end - i] = "0";
            } else {
                resultStr[end - i] = valueStr[index];
            }
        }
        return resultStr.join("");
    }
}

const main: Main = new Main();
main.init.bind(main)();
