# Calendar Hook

## Preview
[https://calendar.chayote.app/](https://calendar.chayote.app/)
## Overview

useCalendar is designed for managing calendar-related functionalities within a React application. It provides an efficient way to handle dates, days, and events, making it ideal for applications that require calendar features. The hook is built using date-fns for date manipulation, ensuring a lightweight and functional approach.

## Installation

`yarn add @bruceshi/calendar-hook`

## Usage


```typescript
import { useCalendar } from '@bruceshi/calendar-hook';

const {
  days,
  weekdays,
  next,
  prev,
  setView,
  current,
  setCurrent
} = useCalendar(events);

```
### Args

* events: An optional array of events to initialize the calendar.

### Return Values

The hook returns an object containing the following properties:

* `days`: An array of Day objects representing each day in the current view (month or week).
* `weekdays`: An array of strings representing the days of the week.
* `next`: A function to navigate to the next month or week.
* `prev`: A function to navigate to the previous month or week.
* `setView`: A function to set the calendar view ('month' or 'week').
* `current`: The current date.
* `setCurrent`: A function to set the current date.

### Interfaces
* `Event`: Represents an event with a date property.
* `Day`: Represents a day in the calendar with properties such as date, format, isSameMonth, isToday, and events.

### Example

[Codesandbox](https://codesandbox.io/p/devbox/calendar-hook-jxpk5v)