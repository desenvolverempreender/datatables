
# DataTables.js

**DataTables.js** is a lightweight, vanilla JavaScript library for managing data tables with features such as search, pagination, sorting, and dynamic entry controls. It allows developers to create responsive and interactive tables with ease, without relying on any external JavaScript frameworks.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Examples](#examples)
- [Customization](#customization)
- [Improvements](#improvements)
- [License](#license)

## Introduction

DataTables.js enables you to quickly implement data tables with sorting, pagination, and searching functionalities. It’s designed to be simple to integrate and customizable, so you can adapt it to any project where managing tabular data is required.

With **DataTables.js**, you can:
- Easily create paginated, searchable, and sortable tables.
- Maintain table states such as current page, search terms, and number of entries using cookies.
- Customize how data is rendered and interact with tables through intuitive configurations.

## Installation

To use DataTables.js, simply include the JavaScript file in your project:

```html
<script src="path/to/datatables.js"></script>
```

Additionally, you can use Bootstrap and icon libraries (such as Remix Icons) to enhance the table's styling:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css" rel="stylesheet">
```

## Usage

### Basic Setup

To initialize DataTables.js for a table, pass a configuration object containing the required element IDs:

```javascript
new DataTable({
    tableId: 'datatable1',
    entriesSelectId: 'entriesSelect1',
    searchInputId: 'searchInput1',
    paginationId: 'pagination1',
    infoId: 'info1',
    startEntryId: 'startEntry1',
    endEntryId: 'endEntry1',
    totalEntriesId: 'totalEntries1',
    firstLabel: 'First',     // Customizable pagination label
    previousLabel: 'Previous',
    nextLabel: 'Next',
    lastLabel: 'Last'
});
```

The table and other related elements (like the search input, pagination, etc.) should be defined in your HTML:

```html
<div>
    <label>
        Show
        <select id="entriesSelect1">
            <option value="*">All</option>
            <option value="5" selected>5</option>
            <option value="10">10</option>
        </select>
        entries
    </label>
    <input id="searchInput1" type="text" placeholder="Search">
</div>

<table id="datatable1" class="table table-bordered">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>1</td><td>Item 1</td><td>Active</td></tr>
        <tr><td>2</td><td>Item 2</td><td>Inactive</td></tr>
        <!-- Add more rows here -->
    </tbody>
</table>

<div id="info1"></div>
<ul id="pagination1" class="pagination"></ul>
```

### Pagination & Search Persistence
The library allows you to persist the state of the table (current page, search query, etc.) using cookies. This means that when a user refreshes the page, the table will retain its last state.

## Features

1. **Search Functionality**: Filters table rows based on user input in the search field.
2. **Pagination**: Automatically paginates rows based on the number of entries selected.
3. **Dynamic Entries Control**: Allows users to select how many rows they want to display at a time.
4. **Sortable Columns**: Users can click on column headers to sort data in ascending or descending order, with support for numeric and text sorting.
5. **State Persistence with Cookies**: Table states (current page, search term, entries per page) are saved in cookies and restored upon page reloads.
6. **Custom Pagination Labels**: You can easily replace default pagination symbols (`<<`, `>>`, etc.) with custom text like "First", "Previous", "Next", and "Last".

## Examples

### Initialize a Table with DataTables.js

```javascript
new DataTable({
    tableId: 'myTable',
    entriesSelectId: 'entriesSelect',
    searchInputId: 'searchInput',
    paginationId: 'pagination',
    infoId: 'info',
    startEntryId: 'startEntry',
    endEntryId: 'endEntry',
    totalEntriesId: 'totalEntries',
    firstLabel: 'First',
    previousLabel: 'Prev',
    nextLabel: 'Next',
    lastLabel: 'Last'
});
```

HTML structure for the table:

```html
<div>
    <select id="entriesSelect">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
    </select>
    <input id="searchInput" type="text" placeholder="Search...">
</div>

<table id="myTable">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
        </tr>
    </thead>
    <tbody>
        <!-- Your table rows here -->
    </tbody>
</table>

<div id="info"></div>
<ul id="pagination" class="pagination"></ul>
```

## Customization

You can further customize DataTables.js by:
- Changing pagination styles using Bootstrap classes.
- Modifying sorting behavior for specific column types.
- Using different icons for sorting (e.g., with Remix Icons or Font Awesome).
- Adjusting how table state is stored (e.g., switch from cookies to `localStorage`).

## Improvements

Some areas that could be improved or extended in the future:
- **Advanced Sorting**: Right now, sorting is based on string and number detection. Improvements could be made to handle date formats, currency values, or other complex data types.
- **Responsive Design**: Adding features like responsive collapse for smaller screens could enhance the mobile experience.
- **Client-side and Server-side Integration**: While DataTables.js is fully client-side, extending it to fetch paginated data from a server could improve performance for large datasets.
- **Plugins Support**: Providing support for extensible plugins (e.g., for custom filtering, exporting data, etc.).

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
