
// DataTable Class
// This class provides a customizable data table with features like pagination, sorting, and search functionality.

class DataTable {
    constructor(config) {
        // Initialize table elements and configurations
        this.table = document.getElementById(config.tableId); // Reference to the HTML table
        this.rows = Array.from(this.table.querySelectorAll('tbody tr')); // Convert table rows to array
        this.entriesSelect = document.getElementById(config.entriesSelectId); // Reference to the entries selection dropdown
        this.searchInput = document.getElementById(config.searchInputId); // Reference to the search input field
        this.pagination = document.getElementById(config.paginationId); // Reference to the pagination element
        this.info = document.getElementById(config.infoId); // Reference to the information display element
        this.startEntry = document.getElementById(config.startEntryId); // Reference to the start entry display element
        this.endEntry = document.getElementById(config.endEntryId); // Reference to the end entry display element
        this.totalEntries = document.getElementById(config.totalEntriesId); // Reference to the total entries display element
        this.firstLabel = config.firstLabel || '<<'; // Label for the "First" button
        this.previousLabel = config.previousLabel || '<'; // Label for the "Previous" button
        this.nextLabel = config.nextLabel || '>'; // Label for the "Next" button
        this.lastLabel = config.lastLabel || '>>'; // Label for the "Last" button
        this.currentPage = 1; // Current active page
        this.filteredData = [...this.rows]; // Initialize filtered data with all rows
    
        this.hasCheckboxes = config.hasCheckboxes || false; 

        if (this.hasCheckboxes) {
            this.addCheckboxesToRows();
        }

        // Initialize functionalities
        this.addSearchFunctionality(); // Add search functionality
        this.addEntriesFunctionality(); // Add entries per page functionality
        this.makeTableSortable(); // Add column sorting functionality
        this.displayTable(this.filteredData, 1); // Display the table on the first page
    }    

    addCheckboxesToRows() {
        this.rows.forEach(row => {
            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'row-checkbox';
            checkboxCell.appendChild(checkbox);
            row.insertBefore(checkboxCell, row.firstChild);
        });

        const headerRow = this.table.querySelector('thead tr');
        const checkboxHeaderCell = document.createElement('th');
        const selectAllCheckbox = document.createElement('input');
        selectAllCheckbox.type = 'checkbox';
        selectAllCheckbox.className = 'select-all-checkbox';
        checkboxHeaderCell.appendChild(selectAllCheckbox);
        headerRow.insertBefore(checkboxHeaderCell, headerRow.firstChild);
        
        selectAllCheckbox.addEventListener('change', (event) => {
            const isChecked = event.target.checked;
            this.rows.forEach(row => {
                const checkbox = row.querySelector('.row-checkbox');
                checkbox.checked = isChecked;
            });
        });
    }
    
    getSelectedItems() {
        const selectedItems = [];
        this.rows.forEach(row => {
            const checkbox = row.querySelector('.row-checkbox');
            if (checkbox && checkbox.checked) {
                selectedItems.push(row);
            }
        });
        return selectedItems;
    }

    performActionOnSelected(callback) {
        const selectedRows = this.getSelectedItems();
        if (selectedRows.length > 0) {
            callback(selectedRows);
        } else {
            alert('Nenhuma linha selecionada.');
        }
    }
    
    // Enable sorting functionality for table columns
    makeTableSortable() {
        const headers = this.table.querySelectorAll('th'); // Get all table headers
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer'; // Make header clickable

            // Add initial sorting icon to each header
            const sortIcon = document.createElement('i');
            sortIcon.className = 'ri-expand-up-down-line sort-icon'; // Default sorting icon
            header.appendChild(sortIcon);

            // Add click event to sort the column
            header.addEventListener('click', () => this.sortColumn(index, headers));
        });
    }

    // Sort the rows based on the selected column index
    sortColumn(index, headers) {
        const rows = Array.from(this.filteredData); // Convert rows to array for sorting
    
        // Reset sorting icons for all columns
        headers.forEach(header => {
            const icon = header.querySelector('i');
            icon.className = 'ri-expand-up-down-line sort-icon'; // Reset icon to default
        });
    
        // Toggle between ascending and descending order
        this.sortOrder = (this.sortedColumnIndex === index && this.sortOrder === 'asc') ? 'desc' : 'asc';
        this.sortedColumnIndex = index; // Set the sorted column index
    
        // Check if the column contains numeric values
        const isNumericColumn = rows.every(row => {
            const cellValue = row.getElementsByTagName('td')[index].textContent.trim();
            return !isNaN(cellValue) && cellValue !== ''; // Return true if numeric
        });
    
        // Sort the rows based on the column's content
        rows.sort((rowA, rowB) => {
            const cellA = rowA.getElementsByTagName('td')[index].textContent.trim();
            const cellB = rowB.getElementsByTagName('td')[index].textContent.trim();
    
            // If numeric, sort numerically
            if (isNumericColumn) {
                const numA = parseFloat(cellA);
                const numB = parseFloat(cellB);
                return this.sortOrder === 'asc' ? numA - numB : numB - numA;
            }
    
            // Otherwise, sort alphabetically
            return this.sortOrder === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        });
    
        // Update sorting icon for the current column
        const currentHeaderIcon = headers[index].querySelector('i');
        currentHeaderIcon.className = this.sortOrder === 'asc'
            ? 'ri-arrow-up-s-line sort-icon'   // Ascending icon
            : 'ri-arrow-down-s-line sort-icon'; // Descending icon
    
        // Update table with the sorted rows
        this.filteredData = rows;
        this.goToPage(1); // Go back to the first page
    }

    // Display the table with the current data for the selected page
    displayTable(data, page) {
        const entries = this.entriesSelect.value === '*' ? data.length : parseInt(this.entriesSelect.value); // Get entries per page
        const start = (page - 1) * entries; // Calculate start index
        const end = start + entries; // Calculate end index
        const paginatedData = data.slice(start, end); // Get data for the current page

        // Clear the table body and insert the new rows
        this.table.querySelector('tbody').innerHTML = '';
        paginatedData.forEach(row => this.table.querySelector('tbody').appendChild(row));

        // Update information and pagination controls
        this.updateInfo(data.length, page, entries);
        this.updatePagination(data.length, page, entries);
    }

    // Update information about the visible entries
    updateInfo(totalRows, page, entriesPerPage) {
        const start = (page - 1) * entriesPerPage + 1;
        const end = Math.min(page * entriesPerPage, totalRows);

        // Update the start, end, and total entry elements
        this.startEntry.textContent = totalRows === 0 ? 0 : start;
        this.endEntry.textContent = totalRows === 0 ? 0 : end;
        this.totalEntries.textContent = totalRows;

        // If no data is found
        if (totalRows === 0) {
            this.info.textContent = 'No entries found';
        }
    }

    // Add functionality for the search input to filter table rows
    addSearchFunctionality() {
        this.searchInput.addEventListener('input', () => {
            const searchTerm = this.searchInput.value.toLowerCase(); // Get search term
            this.filteredData = this.rows.filter(row =>
                row.textContent.toLowerCase().includes(searchTerm) // Filter rows based on the search term
            );
            this.goToPage(1); // Go back to the first page after filtering
        });
    }

    // Add functionality for changing the number of entries displayed per page
    addEntriesFunctionality() {
        this.entriesSelect.addEventListener('change', () => this.goToPage(1)); // Go back to the first page when changing entries per page
    }

    // Update pagination controls based on the total number of rows
    updatePagination(totalRows, page, entriesPerPage) {
        this.pagination.innerHTML = ''; // Clear pagination controls
    
        // If all rows fit on one page, no need for pagination
        if (entriesPerPage >= totalRows) return;
    
        const totalPages = Math.ceil(totalRows / entriesPerPage); // Calculate the total number of pages
    
        // If there are more than one page, create pagination controls
        if (totalPages > 1) {
            this.pagination.appendChild(this.createPageItem(this.firstLabel, 1)); // Create "First" button
            this.pagination.appendChild(this.createPageItem(this.previousLabel, page > 1 ? page - 1 : 1)); // Create "Previous" button
    
            for (let i = 1; i <= totalPages; i++) {
                this.pagination.appendChild(this.createPageItem(i, i, i === page)); // Create numbered page buttons
            }
    
            this.pagination.appendChild(this.createPageItem(this.nextLabel, page < totalPages ? page + 1 : totalPages)); // Create "Next" button
            this.pagination.appendChild(this.createPageItem(this.lastLabel, totalPages)); // Create "Last" button
        }
    }

    // Create pagination items (buttons for pages)
    createPageItem(label, page, active = false) {
        const li = document.createElement('li');
        li.classList.add('page-item'); // Add page-item class to the list item
        if (active) li.classList.add('active'); // Mark the current page as active
        li.innerHTML = `<a class="page-link" href="#">${label}</a>`; // Create page link
        li.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default link behavior
            this.goToPage(page); // Go to the selected page
        });
        return li;
    }

    // Navigate to the specified page and update the table
    goToPage(page) {
        this.currentPage = page; // Set the current page
        this.displayTable(this.filteredData, page); // Display the table for the current page
    }
}