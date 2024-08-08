class Elements {
    body: HTMLBodyElement;

    yearSpan: HTMLSpanElement;
    daySpan: HTMLSpanElement;
    hourSpan: HTMLSpanElement;
    minuteSpan: HTMLSpanElement;
    secondSpan: HTMLSpanElement;
    millisecondSpan: HTMLSpanElement;

    resetTimestampDiv: HTMLDivElement;
    resetTimestampSpan: HTMLSpanElement;
    currentTimestampDiv: HTMLDivElement;
    currentTimestampSpan: HTMLSpanElement;

    setResetTimestampInput: HTMLInputElement;
    submitResetTimestampDiv: HTMLDivElement;
    setGoalTimeInput: HTMLInputElement;
    submitGoalTimeDiv: HTMLDivElement;

    goalPercentageSpan: HTMLSpanElement;
    goalBarDivInside: HTMLDivElement;

    resetDiv: HTMLDivElement;
    resetSpan: HTMLSpanElement;

    constructor() {
        this.body = document.body as HTMLBodyElement;

        this.yearSpan = this.getElement("#yearSpan") as HTMLSpanElement;
        this.daySpan = this.getElement("#daySpan") as HTMLSpanElement;
        this.hourSpan = this.getElement("#hourSpan") as HTMLSpanElement;
        this.minuteSpan = this.getElement("#minuteSpan") as HTMLSpanElement;
        this.secondSpan = this.getElement("#secondSpan") as HTMLSpanElement;
        this.millisecondSpan = this.getElement("#millisecondSpan") as HTMLSpanElement;

        this.resetTimestampDiv = this.getElement("#resetTimestampDiv") as HTMLDivElement;
        this.resetTimestampSpan = this.getElement("#resetTimestampSpan") as HTMLSpanElement;
        this.currentTimestampDiv = this.getElement("#currentTimestampDiv") as HTMLDivElement;
        this.currentTimestampSpan = this.getElement("#currentTimestampSpan") as HTMLSpanElement;

        this.setResetTimestampInput = this.getElement("#setResetTimestampInput") as HTMLInputElement;
        this.submitResetTimestampDiv = this.getElement("#submitResetTimestampDiv") as HTMLDivElement;
        this.setGoalTimeInput = this.getElement("#setGoalTimeInput") as HTMLInputElement;
        this.submitGoalTimeDiv = this.getElement("#submitGoalTimeDiv") as HTMLDivElement;

        this.goalPercentageSpan = this.getElement("#goalPercentageSpan") as HTMLSpanElement;
        this.goalBarDivInside = this.getElement("#goalBarDivInside") as HTMLDivElement;

        this.resetDiv = this.getElement("#resetDiv") as HTMLDivElement;
        this.resetSpan = this.getElement("#resetSpan") as HTMLSpanElement;
    }

    getElement(query: string): HTMLElement {
        return document.querySelector(query) ?? this.throwError();
    }

    throwError(): never {
        throw new Error();
    }

}

export { Elements };
