import styled, { createGlobalStyle } from "styled-components";
import { COLORS } from "./colors";
import { devices } from "./devices";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.color};
        font-family: "Inter", sans-serif;
        font-size: 18px;
        overflow-x: hidden;
        overflow-y: scroll;
        position: relative;
    }

    * {
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }

    *:focus {
        outline: none;
    }

    a {
        font-weight: 400;
        font-size: inherit;
        color: ${COLORS.blue};
        text-decoration: none;
    }

    a:hover,
    a:active {
        text-decoration: underline;
    }

    button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        padding: 0;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"],
    input[type="search"],
    input[type="tel"],
    textarea {
        display: block;
        background-color: transparent;
        color: ${({ theme }) => theme.inputText};
        padding: 0;
        width: 100%;
        border: none;
    }

    textarea {
        resize: none;
    }

    input::-ms-reveal {
        display: none;
    }

    input::placeholder {
        color: ${({ theme }) => theme.inputText};
        opacity: 1;
    }

    input[type="search"]::-webkit-search-cancel-button {
        display: none;
    }

    .not-scrolling {
        overflow-y: hidden;
    }

    .editor-hashtag {
        color: ${COLORS.blue};
        text-decoration: none;
    }

    .editor-hashtag:hover,
    .editor-hashtag:focus {
        text-decoration: underline;
    }

    .select__indicator.select__dropdown-indicator svg {
        fill: ${({ theme }) => theme.inputText};
    }

    .select__option:first-child {
        border-radius: 6px 6px 0px 0px;
    }

    .select__option:last-child {
        border-radius: 0px 0px 6px 6px;
    }

    .select__option:only-child {
        border-radius: 6px;
    }

    // for DatePickerComponent
    .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view--down-arrow,
    .react-datepicker__navigation-icon::before {
        border-color: ${({ theme }) => theme.inputText};
        border-style: solid;
        border-width: 3px 3px 0 0;
        content: "";
        display: block;
        height: 9px;
        position: absolute;
        top: 6px;
        width: 9px;
        border-radius: 2px;
    }
    .react-datepicker__triangle {
        display: none;
    }

    .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle,
    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
        margin-left: -4px;
        position: absolute;
        width: 0;
    }
    .react-datepicker-popper[data-placement^="top"]
        .react-datepicker__triangle::before,
    .react-datepicker-popper[data-placement^="bottom"]
        .react-datepicker__triangle::before,
    .react-datepicker-popper[data-placement^="top"]
        .react-datepicker__triangle::after,
    .react-datepicker-popper[data-placement^="bottom"]
        .react-datepicker__triangle::after {
        box-sizing: content-box;
        position: absolute;
        border: 8px solid transparent;
        height: 0;
        width: 1px;
        content: "";
        z-index: -1;
        border-width: 8px;
        left: -8px;
    }
    .react-datepicker-popper[data-placement^="top"]
        .react-datepicker__triangle::before,
    .react-datepicker-popper[data-placement^="bottom"]
        .react-datepicker__triangle::before {
        border-bottom-color: ${({ theme }) => theme.inputText};
    }

    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
        top: 0;
        margin-top: -8px;
    }
    .react-datepicker-popper[data-placement^="bottom"]
        .react-datepicker__triangle::before,
    .react-datepicker-popper[data-placement^="bottom"]
        .react-datepicker__triangle::after {
        border-top: none;
        border-bottom-color: ${({ theme }) => theme.inputText};
    }
    .react-datepicker-popper[data-placement^="bottom"]
        .react-datepicker__triangle::after {
        top: 0;
    }
    .react-datepicker-popper[data-placement^="bottom"]
        .react-datepicker__triangle::before {
        top: -1px;
        border-bottom-color: ${({ theme }) => theme.inputText};
    }

    .react-datepicker-popper[data-placement^="top"] .react-datepicker__triangle {
        bottom: 0;
        margin-bottom: -8px;
    }
    .react-datepicker-popper[data-placement^="top"]
        .react-datepicker__triangle::before,
    .react-datepicker-popper[data-placement^="top"]
        .react-datepicker__triangle::after {
        border-bottom: none;
        border-top-color: ${({ theme }) => theme.color};
    }
    .react-datepicker-popper[data-placement^="top"]
        .react-datepicker__triangle::after {
        bottom: 0;
    }
    .react-datepicker-popper[data-placement^="top"]
        .react-datepicker__triangle::before {
        bottom: -1px;
        border-top-color: ${({ theme }) => theme.inputText};
    }

    .react-datepicker-wrapper {
        display: inline-block;
        padding: 0;
        border: 0;
        width: 100%;
    }

    .react-datepicker {
        font-family: "Inter";
        font-size: 0.8rem;
        background-color: ${({ theme }) => theme.inputBackground};
        color: ${({ theme }) => theme.color};
        border: none;
        border-radius: 6px;
        display: inline-block;
        position: relative;
        box-shadow: 0px 0px 2px ${COLORS.darkGrey};
    }

    .react-datepicker--time-only .react-datepicker__triangle {
        left: 35px;
    }
    .react-datepicker--time-only .react-datepicker__time-container {
        border-left: 0;
    }
    .react-datepicker--time-only .react-datepicker__time,
    .react-datepicker--time-only .react-datepicker__time-box {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }

    .react-datepicker__triangle {
        position: absolute;
        left: 50px;
    }

    .react-datepicker-popper {
        z-index: 1;
    }
    .react-datepicker-popper[data-placement^="bottom"] {
        padding-top: 12px;
    }
    .react-datepicker-popper[data-placement="bottom-end"]
        .react-datepicker__triangle,
    .react-datepicker-popper[data-placement="top-end"] .react-datepicker__triangle {
        left: auto;
        right: 50px;
    }
    .react-datepicker-popper[data-placement^="top"] {
        padding-bottom: 10px;
    }
    .react-datepicker-popper[data-placement^="right"] {
        padding-left: 8px;
    }
    .react-datepicker-popper[data-placement^="right"] .react-datepicker__triangle {
        left: auto;
        right: 42px;
    }
    .react-datepicker-popper[data-placement^="left"] {
        padding-right: 8px;
    }
    .react-datepicker-popper[data-placement^="left"] .react-datepicker__triangle {
        left: 42px;
        right: auto;
    }

    .react-datepicker__header {
        text-align: center;
        background-color: ${({ theme }) => theme.inputBackground};
        border-top-left-radius: 6px;
        padding: 12px 0;
        position: relative;
    }
    .react-datepicker__header--time {
        padding-bottom: 8px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .react-datepicker__header--time:not(.react-datepicker__header--time--only) {
        border-top-left-radius: 0;
    }
    .react-datepicker__header:not(.react-datepicker__header--has-time-select) {
        border-top-right-radius: 6px;
    }

    .react-datepicker__year-dropdown-container--select,
    .react-datepicker__month-dropdown-container--select,
    .react-datepicker__month-year-dropdown-container--select,
    .react-datepicker__year-dropdown-container--scroll,
    .react-datepicker__month-dropdown-container--scroll,
    .react-datepicker__month-year-dropdown-container--scroll {
        display: inline-block;
        margin: 0 2px;
    }

    .react-datepicker__current-month,
    .react-datepicker-time__header,
    .react-datepicker-year-header {
        margin-top: 0;
        color: ${({ theme }) => theme.color};
        font-weight: bold;
        font-size: 0.944rem;
    }

    .react-datepicker-time__header {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .react-datepicker__navigation {
        align-items: center;
        background: none;
        display: flex;
        justify-content: center;
        text-align: center;
        cursor: pointer;
        position: absolute;
        top: 2px;
        padding: 0;
        border: none;
        z-index: 1;
        height: 32px;
        width: 32px;
        text-indent: -999em;
        overflow: hidden;
    }
    .react-datepicker__navigation--previous {
        left: 2px;
    }
    .react-datepicker__navigation--next {
        right: 2px;
    }
    .react-datepicker__navigation--next--with-time:not(
            .react-datepicker__navigation--next--with-today-button
        ) {
        right: 85px;
    }
    .react-datepicker__navigation--years {
        position: relative;
        top: 0;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .react-datepicker__navigation--years-previous {
        top: 4px;
    }
    .react-datepicker__navigation--years-upcoming {
        top: -4px;
    }
    .react-datepicker__navigation:hover *::before {
        border-color: ${({ theme }) => theme.inputText};
    }

    .react-datepicker__navigation-icon {
        position: relative;
        top: -1px;
        font-size: 20px;
        width: 0;
    }
    .react-datepicker__navigation-icon--next {
        left: -2px;
    }
    .react-datepicker__navigation-icon--next::before {
        transform: rotate(45deg);
        left: -7px;
    }
    .react-datepicker__navigation-icon--previous {
        right: -2px;
    }
    .react-datepicker__navigation-icon--previous::before {
        transform: rotate(225deg);
        right: -7px;
    }

    .react-datepicker__month-container {
        float: left;
    }

    .react-datepicker__year {
        margin: 0.4rem;
        text-align: center;
    }
    .react-datepicker__year-wrapper {
        display: flex;
        flex-wrap: wrap;
        max-width: 180px;
    }
    .react-datepicker__year .react-datepicker__year-text {
        display: inline-block;
        width: 4rem;
        margin: 2px;
    }

    .react-datepicker__month {
        padding-top: 0;
        padding-left: 12px;
        padding-right: 12px;
        padding-bottom: 12px;
        text-align: center;
    }
    .react-datepicker__month .react-datepicker__month-text,
    .react-datepicker__month .react-datepicker__quarter-text {
        display: inline-block;
        width: 4rem;
        margin: 2px;
    }

    .react-datepicker__input-time-container {
        clear: both;
        width: 100%;
        float: left;
        margin: 5px 0 10px 15px;
        text-align: left;
    }
    .react-datepicker__input-time-container .react-datepicker-time__caption {
        display: inline-block;
    }
    .react-datepicker__input-time-container
        .react-datepicker-time__input-container {
        display: inline-block;
    }
    .react-datepicker__input-time-container
        .react-datepicker-time__input-container
        .react-datepicker-time__input {
        display: inline-block;
        margin-left: 10px;
    }
    .react-datepicker__input-time-container
        .react-datepicker-time__input-container
        .react-datepicker-time__input
        input {
        width: auto;
    }
    .react-datepicker__input-time-container
        .react-datepicker-time__input-container
        .react-datepicker-time__input
        input[type="time"]::-webkit-inner-spin-button,
    .react-datepicker__input-time-container
        .react-datepicker-time__input-container
        .react-datepicker-time__input
        input[type="time"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .react-datepicker__input-time-container
        .react-datepicker-time__input-container
        .react-datepicker-time__input
        input[type="time"] {
        -moz-appearance: textfield;
    }
    .react-datepicker__input-time-container
        .react-datepicker-time__input-container
        .react-datepicker-time__delimiter {
        margin-left: 5px;
        display: inline-block;
    }

    .react-datepicker__time-container {
        float: right;
        border-left: 1px solid ${({ theme }) => theme.inputText};
        width: 85px;
    }
    .react-datepicker__time-container--with-today-button {
        display: inline;
        border: 1px solid ${({ theme }) => theme.inputText};
        border-radius: 6px;
        position: absolute;
        right: -72px;
        top: 0;
    }
    .react-datepicker__time-container .react-datepicker__time {
        position: relative;
        background: ${({ theme }) => theme.inputBackground};
        border-bottom-right-radius: 6px;
    }
    .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box {
        width: 85px;
        overflow-x: hidden;
        margin: 0 auto;
        text-align: center;
        border-bottom-right-radius: 6px;
    }
    .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box
        ul.react-datepicker__time-list {
        list-style: none;
        margin: 0;
        height: calc(195px + (1.7rem / 2));
        overflow-y: scroll;
        padding-right: 0;
        padding-left: 0;
        width: 100%;
        box-sizing: content-box;
    }
    .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box
        ul.react-datepicker__time-list
        li.react-datepicker__time-list-item {
        height: 30px;
        padding: 5px 10px;
        white-space: nowrap;
    }
    .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box
        ul.react-datepicker__time-list
        li.react-datepicker__time-list-item:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.inputText};
    }
    .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box
        ul.react-datepicker__time-list
        li.react-datepicker__time-list-item--selected {
        background-color:${COLORS.blue};
        color: ${COLORS.white};
        font-weight: bold;
    }
    .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box
        ul.react-datepicker__time-list
        li.react-datepicker__time-list-item--selected:hover {
        background-color: ${COLORS.blue};
    }
    .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box
        ul.react-datepicker__time-list
        li.react-datepicker__time-list-item--disabled {
        color: ${({ theme }) => theme.inputText};
    }
    .react-datepicker__time-container
        .react-datepicker__time
        .react-datepicker__time-box
        ul.react-datepicker__time-list
        li.react-datepicker__time-list-item--disabled:hover {
        cursor: default;
        background-color: transparent;
    }

    .react-datepicker__week-number {
        color: ${({ theme }) => theme.inputText};
        display: inline-block;
        width: 1.7rem;
        line-height: 1.7rem;
        text-align: center;
        margin: 0.166rem;
    }
    .react-datepicker__week-number.react-datepicker__week-number--clickable {
        cursor: pointer;
    }
    .react-datepicker__week-number.react-datepicker__week-number--clickable:hover {
        border-radius: 6px;
        background-color: ${({ theme }) => theme.inputText};
    }

    .react-datepicker__day-names,
    .react-datepicker__week {
        white-space: nowrap;
    }

    .react-datepicker__day-names {
        margin-bottom: -8px;
    }

    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
        color: ${({ theme }) => theme.color};
        display: inline-block;
        width: 1.7rem;
        line-height: 1.7rem;
        text-align: center;
        margin: 0.166rem;
    }

    .react-datepicker__day--outside-month {
        color: ${({ theme }) => theme.inputText};
    }

    .react-datepicker__month--selected,
    .react-datepicker__month--in-selecting-range,
    .react-datepicker__month--in-range,
    .react-datepicker__quarter--selected,
    .react-datepicker__quarter--in-selecting-range,
    .react-datepicker__quarter--in-range {
        border-radius: 6px;
        background-color: ${COLORS.blue};
        color: ${COLORS.white};
    }
    .react-datepicker__month--selected:hover,
    .react-datepicker__month--in-selecting-range:hover,
    .react-datepicker__month--in-range:hover,
    .react-datepicker__quarter--selected:hover,
    .react-datepicker__quarter--in-selecting-range:hover,
    .react-datepicker__quarter--in-range:hover {
        background-color: ${COLORS.blue};
    }
    .react-datepicker__month--disabled,
    .react-datepicker__quarter--disabled {
        color: ${({ theme }) => theme.inputText};
        pointer-events: none;
    }
    .react-datepicker__month--disabled:hover,
    .react-datepicker__quarter--disabled:hover {
        cursor: default;
        background-color: transparent;
    }

    .react-datepicker__day,
    .react-datepicker__month-text,
    .react-datepicker__quarter-text,
    .react-datepicker__year-text {
        cursor: pointer;
    }
    .react-datepicker__day:hover,
    .react-datepicker__month-text:hover,
    .react-datepicker__quarter-text:hover,
    .react-datepicker__year-text:hover {
        border-radius: 6px;
        background-color: ${({ theme }) => theme.background};
    }

    .react-datepicker__day--outside-month:hover {
        background-color: ${({ theme }) => theme.overlayGrey};
    }

    .react-datepicker__day--today,
    .react-datepicker__month-text--today,
    .react-datepicker__quarter-text--today,
    .react-datepicker__year-text--today {
        font-weight: bold;
    }
    .react-datepicker__day--highlighted,
    .react-datepicker__month-text--highlighted,
    .react-datepicker__quarter-text--highlighted,
    .react-datepicker__year-text--highlighted {
        border-radius: 6px;
        background-color: ${COLORS.blue};
        color: ${COLORS.white};
    }
    .react-datepicker__day--highlighted:hover,
    .react-datepicker__month-text--highlighted:hover,
    .react-datepicker__quarter-text--highlighted:hover,
    .react-datepicker__year-text--highlighted:hover {
        background-color: ${COLORS.blue};
    }
    .react-datepicker__day--highlighted-custom-1,
    .react-datepicker__month-text--highlighted-custom-1,
    .react-datepicker__quarter-text--highlighted-custom-1,
    .react-datepicker__year-text--highlighted-custom-1 {
        color: ${COLORS.blue};
    }
    .react-datepicker__day--highlighted-custom-2,
    .react-datepicker__month-text--highlighted-custom-2,
    .react-datepicker__quarter-text--highlighted-custom-2,
    .react-datepicker__year-text--highlighted-custom-2 {
        color: ${COLORS.blue};
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range,
    .react-datepicker__month-text--selected,
    .react-datepicker__month-text--in-selecting-range,
    .react-datepicker__month-text--in-range,
    .react-datepicker__quarter-text--selected,
    .react-datepicker__quarter-text--in-selecting-range,
    .react-datepicker__quarter-text--in-range,
    .react-datepicker__year-text--selected,
    .react-datepicker__year-text--in-selecting-range,
    .react-datepicker__year-text--in-range {
        border-radius: 6px;
        background-color: ${COLORS.blue};
        color: ${COLORS.white};
    }
    .react-datepicker__day--selected:hover,
    .react-datepicker__day--in-selecting-range:hover,
    .react-datepicker__day--in-range:hover,
    .react-datepicker__month-text--selected:hover,
    .react-datepicker__month-text--in-selecting-range:hover,
    .react-datepicker__month-text--in-range:hover,
    .react-datepicker__quarter-text--selected:hover,
    .react-datepicker__quarter-text--in-selecting-range:hover,
    .react-datepicker__quarter-text--in-range:hover,
    .react-datepicker__year-text--selected:hover,
    .react-datepicker__year-text--in-selecting-range:hover,
    .react-datepicker__year-text--in-range:hover {
        background-color: ${COLORS.blue};
    }
    .react-datepicker__day--keyboard-selected,
    .react-datepicker__month-text--keyboard-selected,
    .react-datepicker__quarter-text--keyboard-selected,
    .react-datepicker__year-text--keyboard-selected {
        border-radius: 6px;
        background-color: ${COLORS.blue};
        color: ${COLORS.white};
    }
    .react-datepicker__day--keyboard-selected:hover,
    .react-datepicker__month-text--keyboard-selected:hover,
    .react-datepicker__quarter-text--keyboard-selected:hover,
    .react-datepicker__year-text--keyboard-selected:hover {
        background-color: ${COLORS.blue};
    }
    .react-datepicker__day--in-selecting-range:not(
            .react-datepicker__day--in-range,
            .react-datepicker__month-text--in-range,
            .react-datepicker__quarter-text--in-range,
            .react-datepicker__year-text--in-range
        ),
    .react-datepicker__month-text--in-selecting-range:not(
            .react-datepicker__day--in-range,
            .react-datepicker__month-text--in-range,
            .react-datepicker__quarter-text--in-range,
            .react-datepicker__year-text--in-range
        ),
    .react-datepicker__quarter-text--in-selecting-range:not(
            .react-datepicker__day--in-range,
            .react-datepicker__month-text--in-range,
            .react-datepicker__quarter-text--in-range,
            .react-datepicker__year-text--in-range
        ),
    .react-datepicker__year-text--in-selecting-range:not(
            .react-datepicker__day--in-range,
            .react-datepicker__month-text--in-range,
            .react-datepicker__quarter-text--in-range,
            .react-datepicker__year-text--in-range
        ) {
        background-color: ${COLORS.blue};
    }
    .react-datepicker__month--selecting-range
        .react-datepicker__day--in-range:not(
            .react-datepicker__day--in-selecting-range,
            .react-datepicker__month-text--in-selecting-range,
            .react-datepicker__quarter-text--in-selecting-range,
            .react-datepicker__year-text--in-selecting-range
        ),
    .react-datepicker__month--selecting-range
        .react-datepicker__month-text--in-range:not(
            .react-datepicker__day--in-selecting-range,
            .react-datepicker__month-text--in-selecting-range,
            .react-datepicker__quarter-text--in-selecting-range,
            .react-datepicker__year-text--in-selecting-range
        ),
    .react-datepicker__month--selecting-range
        .react-datepicker__quarter-text--in-range:not(
            .react-datepicker__day--in-selecting-range,
            .react-datepicker__month-text--in-selecting-range,
            .react-datepicker__quarter-text--in-selecting-range,
            .react-datepicker__year-text--in-selecting-range
        ),
    .react-datepicker__month--selecting-range
        .react-datepicker__year-text--in-range:not(
            .react-datepicker__day--in-selecting-range,
            .react-datepicker__month-text--in-selecting-range,
            .react-datepicker__quarter-text--in-selecting-range,
            .react-datepicker__year-text--in-selecting-range
        ) {
        background-color: ${COLORS.white};
        color: ${COLORS.black};
    }
    .react-datepicker__day--disabled,
    .react-datepicker__month-text--disabled,
    .react-datepicker__quarter-text--disabled,
    .react-datepicker__year-text--disabled {
        cursor: default;
        color: ${({ theme }) => theme.inputText};
    }
    .react-datepicker__day--disabled:hover,
    .react-datepicker__month-text--disabled:hover,
    .react-datepicker__quarter-text--disabled:hover,
    .react-datepicker__year-text--disabled:hover {
        background-color: transparent;
    }

    .react-datepicker__month-text.react-datepicker__month--selected:hover,
    .react-datepicker__month-text.react-datepicker__month--in-range:hover,
    .react-datepicker__month-text.react-datepicker__quarter--selected:hover,
    .react-datepicker__month-text.react-datepicker__quarter--in-range:hover,
    .react-datepicker__quarter-text.react-datepicker__month--selected:hover,
    .react-datepicker__quarter-text.react-datepicker__month--in-range:hover,
    .react-datepicker__quarter-text.react-datepicker__quarter--selected:hover,
    .react-datepicker__quarter-text.react-datepicker__quarter--in-range:hover {
        background-color: ${COLORS.blue};
    }
    .react-datepicker__month-text:hover,
    .react-datepicker__quarter-text:hover {
        background-color: ${({ theme }) => theme.color};
    }

    .react-datepicker__input-container {
        position: relative;
        display: inline-block;
        width: 100%;
    }

    .react-datepicker__year-read-view,
    .react-datepicker__month-read-view,
    .react-datepicker__month-year-read-view {
        border: 1px solid transparent;
        border-radius: 6px;
        position: relative;
    }
    .react-datepicker__year-read-view:hover,
    .react-datepicker__month-read-view:hover,
    .react-datepicker__month-year-read-view:hover {
        cursor: pointer;
    }
    .react-datepicker__year-read-view:hover
        .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__year-read-view:hover
        .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-read-view:hover
        .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view:hover
        .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view:hover
        .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-year-read-view:hover
        .react-datepicker__month-read-view--down-arrow {
        border-top-color: ${({ theme }) => theme.inputText};
    }
    .react-datepicker__year-read-view--down-arrow,
    .react-datepicker__month-read-view--down-arrow,
    .react-datepicker__month-year-read-view--down-arrow {
        transform: rotate(135deg);
        right: -16px;
        top: 0;
    }

    .react-datepicker__year-dropdown,
    .react-datepicker__month-dropdown,
    .react-datepicker__month-year-dropdown {
        background-color: ${({ theme }) => theme.inputText};
        position: absolute;
        width: 50%;
        left: 25%;
        top: 30px;
        z-index: 1;
        text-align: center;
        border-radius: 6px;
        border: none;
    }
    .react-datepicker__year-dropdown:hover,
    .react-datepicker__month-dropdown:hover,
    .react-datepicker__month-year-dropdown:hover {
        cursor: pointer;
    }
    .react-datepicker__year-dropdown--scrollable,
    .react-datepicker__month-dropdown--scrollable,
    .react-datepicker__month-year-dropdown--scrollable {
        height: 150px;
        overflow-y: scroll;
    }

    .react-datepicker__year-option,
    .react-datepicker__month-option,
    .react-datepicker__month-year-option {
        line-height: 20px;
        width: 100%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    .react-datepicker__year-option:first-of-type,
    .react-datepicker__month-option:first-of-type,
    .react-datepicker__month-year-option:first-of-type {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
    .react-datepicker__year-option:last-of-type,
    .react-datepicker__month-option:last-of-type,
    .react-datepicker__month-year-option:last-of-type {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
    }
    .react-datepicker__year-option:hover,
    .react-datepicker__month-option:hover,
    .react-datepicker__month-year-option:hover {
        background-color: ${({ theme }) => theme.inputText};
    }
    .react-datepicker__year-option:hover
        .react-datepicker__navigation--years-upcoming,
    .react-datepicker__month-option:hover
        .react-datepicker__navigation--years-upcoming,
    .react-datepicker__month-year-option:hover
        .react-datepicker__navigation--years-upcoming {
        border-bottom-color: ${({ theme }) => theme.inputText};
    }
    .react-datepicker__year-option:hover
        .react-datepicker__navigation--years-previous,
    .react-datepicker__month-option:hover
        .react-datepicker__navigation--years-previous,
    .react-datepicker__month-year-option:hover
        .react-datepicker__navigation--years-previous {
        border-top-color: ${({ theme }) => theme.inputText};
    }
    .react-datepicker__year-option--selected,
    .react-datepicker__month-option--selected,
    .react-datepicker__month-year-option--selected {
        position: absolute;
        left: 15px;
    }

    .react-datepicker__close-icon {
        cursor: pointer;
        background-color: transparent;
        border: 0;
        outline: 0;
        padding: 0 6px 0 0;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        display: table-cell;
        vertical-align: middle;
    }
    .react-datepicker__close-icon::after {
        cursor: pointer;
        background-color: ${COLORS.blue};
        color: ${COLORS.white};
        border-radius: 50%;
        height: 16px;
        width: 16px;
        padding: 2px;
        font-size: 12px;
        line-height: 1;
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        content: "×";
    }

    .react-datepicker__today-button {
        background: ${({ theme }) => theme.inputText};
        border-top: none;
        cursor: pointer;
        text-align: center;
        font-weight: bold;
        padding: 5px 0;
        clear: left;
    }

    .react-datepicker__portal {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: ${({ theme }) => theme.overlayGrey};
        left: 0;
        top: 0;
        justify-content: center;
        align-items: center;
        display: flex;
        z-index: 2147483647;
    }
    .react-datepicker__portal .react-datepicker__day-name,
    .react-datepicker__portal .react-datepicker__day,
    .react-datepicker__portal .react-datepicker__time-name {
        width: 3rem;
        line-height: 3rem;
    }
    @media (max-width: 400px), (max-height: 550px) {
        .react-datepicker__portal .react-datepicker__day-name,
        .react-datepicker__portal .react-datepicker__day,
        .react-datepicker__portal .react-datepicker__time-name {
            width: 2rem;
            line-height: 2rem;
        }
    }
    .react-datepicker__portal .react-datepicker__current-month,
    .react-datepicker__portal .react-datepicker-time__header {
        font-size: 1.44rem;
    }

    select {
        display: block;
        background-color: ${({ theme }) => theme.inputBackground};
        color: ${({ theme }) => theme.inputText};
        padding: 0;
        width: 100%;
        border: none;
        border-radius: 6px;
        padding: 10px 12px;
        cursor: pointer;
    }
    select option {
        background-color: ${({ theme }) => theme.inputBackground};
        color: ${({ theme }) => theme.inputText};
    }
`;

export default GlobalStyle;

export const Button = styled.button`
    display: block;
    background-color: inherit;
    color: inherit;
    padding: 12px 24px;
    font-weight: 700;
    border-radius: 9999px;
`;

export const SmallButton = styled(Button)`
    padding: 6px 18px;
    border: inherit;
    background-color: transparent;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

export const PageBlock = styled.div`
    display: block;
`;

export const PageText = styled.div`
    display: block;
    text-align: left;
`;

export const PageTextMT24 = styled(PageText)`
    margin-top: 24px;
`;

export const PageTextMB24 = styled(PageText)`
    margin-bottom: 24px;
`;

export const PageTextMT48 = styled(PageText)`
    margin-top: 48px;
`;

export const PageTextMB48 = styled(PageText)`
    margin-bottom: 48px;
`;

export const SvgIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    fill: inherit;
    stroke: inherit;

    svg {
        width: inherit;
        height: inherit;
        fill: inherit;
        stroke: inherit;
    }
`;

export const ControlContainer = styled.div.attrs(
    (props: { size?: number; isDisabled?: boolean }) => props
)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: ${(props) => (props.size ? `${props.size}px` : `36px`)};
    height: ${(props) => (props.size ? `${props.size}px` : `36px`)};
    border-radius: 9999px;
    background-color: transparent;
    transition: background-color ease 0.2s;
    opacity: ${(props) => (props.isDisabled ? "0.6" : "1")};

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

export const ButtonControlContainer = styled.button.attrs(
    (props: { size?: number }) => props
)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: ${(props) => (props.size ? `${props.size}px` : `36px`)};
    height: ${(props) => (props.size ? `${props.size}px` : `36px`)};
    border-radius: 9999px;
    background-color: transparent;
    transition: background-color ease 0.2s;
    opacity: 1;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }

    &:disabled {
        opacity: 0.6;
    }
`;

export const ModalFormContainer = styled.div`
    display: block;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 24px;

    @media ${devices.mobileS} {
        padding-left: 36px;
        padding-right: 36px;
    }
`;

export const AuthForm = styled.div`
    display: block;
    padding-top: 12px;
    padding-bottom: 24px;
`;

export const AuthFormTitle = styled.div`
    display: block;
    font-weight: 800;
    margin-bottom: 48px;
    font-size: 32px;

    @media ${devices.mobileS} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

export const AuthFormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Status = styled.div`
    display: block;
    padding: 6px;
    border-radius: 6px;
    font-size: 14px;
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
    margin-bottom: 24px;
`;

export const StandardButton = styled(Button)`
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
`;

export const AuthHalfInput = styled.div`
    display: flex;
    gap: 24px;
    flex-direction: column;
    align-items: unset;

    @media ${devices.mobileS} {
        flex-direction: column;
        align-items: unset;
    }

    @media ${devices.mobileL} {
        flex-direction: row;
        align-items: flex-end;
    }
`;

export const CustomFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

export const CustomFieldError = styled.div`
    display: block;
    font-size: 14px;
`;

export const CustomFieldContainer = styled.div`
    display: block;
    background-color: ${({ theme }) => theme.inputBackground};
    height: 60px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 6px;
`;

export const CustomInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: 4px;
    margin-bottom: 4px;
`;

export const CustomInfo = styled.div`
    display: block;
    font-size: 14px;
`;

export const CustomInnerFieldContainer = styled.div`
    display: flex;
    align-items: center;
    height: 26px;
    width: 100%;
    margin-bottom: 4px;
`;

export const AppErrorWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
`;

export const AppErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    max-width: 260px;
`;

export const CustomSpanOption = styled.span`
    display: inherit;
    cursor: pointer;
`;

export const FeedLoading = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 64px;
`;

export const ItemLoading = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 42px;
`;

export const NoElementsAlert = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 24px;
`;

export const OptionBaseItem = styled.div`
    display: flex;
    cursor: pointer;
    background-color: transparent;
    transition: background-color ease 0.2s;
    width: 100%;
    align-items: center;
    flex-direction: row;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

export const OptionBaseIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const LinkOptionBaseItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    a,
    span {
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.color};
        background-color: transparent;
        transition: background-color ease 0.2s;
        width: 100%;
    }

    a,
    a:hover,
    a:active {
        text-decoration: none;
    }

    a:hover,
    span:hover,
    a:active,
    span:focus {
        background-color: ${({ theme }) => theme.overlayGrey};
    }
`;

export const EndContainer = styled(PageText)`
    text-align: center;
    color: ${({ theme }) => theme.inputText};
    padding: 4px 16px;
`;

export const LumenInputContainer = styled.div`
    display: block;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 12px;
`;

export const LumenModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 36px;
`;

export const FullWidthFeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const NotificationsCount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 9999px;
    background-color: ${COLORS.blue};
    font-size: 10px;
    font-weight: 700;
    color: ${COLORS.white};
    width: 16px;
    height: 16px;
    top: 0;
    left: unset;
    right: 0;
    bottom: unset;
    box-shadow: 0px 0px 2px ${({ theme }) => theme.overlayGrey};
`;

export const SettingsPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const SettingsPageContentContainer = styled(SettingsPageContainer)`
    padding-left: 16px;
    padding-right: 16px;
`;

export const SettingsPageDescription = styled(PageText)`
    font-size: 14px;
    color: ${({ theme }) => theme.inputText};
    padding-top: 6px;
    padding-left: 16px;
    padding-right: 16px;
    margin-bottom: 24px;
`;

export const ProfilePictureWrapper = styled(PageBlock)`
    opacity: 1;
    transition: opacity ease 0.2s;

    &:hover,
    &:focus {
        opacity: 0.8;
    }
`;

export const FeedWithLumenInput = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
`;

export const SignUpOrLogInText = styled(PageText)`
    padding-left: 16px;
    padding-right: 16px;
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: auto;
    flex: 1;
    overflow: hidden;
`;

export const UserFullNameContainer = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    flex: 1;
    overflow: hidden;
    text-overflow: clip;
    gap: 6px;
`;

export const UserFullName = styled(PageText)`
    font-weight: 700;
    font-size: 16px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-decoration: none;
    color: ${({ theme }) => theme.color};

    &:hover,
    &:active {
        text-decoration: underline;
        text-decoration-color: ${({ theme }) => theme.color};
    }
`;

export const UsernameContainer = styled(PageText)`
    font-size: 14px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${({ theme }) => theme.inputText};
`;

export const RightContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
`;

export const ModalFeedContainer = styled.div`
    display: block;
    padding-bottom: 36px;
`;

export const EditorFieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;