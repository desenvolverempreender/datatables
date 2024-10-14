// Classe DataTable
class DataTable {
    constructor(config) {
        this.table = document.getElementById(config.tableId);
        this.rows = Array.from(this.table.querySelectorAll('tbody tr'));
        this.entriesSelect = document.getElementById(config.entriesSelectId);
        this.searchInput = document.getElementById(config.searchInputId);
        this.pagination = document.getElementById(config.paginationId);
        this.info = document.getElementById(config.infoId);
        this.startEntry = document.getElementById(config.startEntryId);
        this.endEntry = document.getElementById(config.endEntryId);
        this.totalEntries = document.getElementById(config.totalEntriesId);
        this.firstLabel = config.firstLabel || '<<'; // String para "First"
        this.previousLabel = config.previousLabel || '<'; // String para "Previous"
        this.nextLabel = config.nextLabel || '>'; // String para "Next"
        this.lastLabel = config.lastLabel || '>>'; // String para "Last"
        this.currentPage = 1;
        this.filteredData = [...this.rows];
    
        this.addSearchFunctionality();
        this.addEntriesFunctionality();
        this.makeTableSortable();
        this.displayTable(this.filteredData, 1);
    }    

    makeTableSortable() {
        const headers = this.table.querySelectorAll('th');
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';

            // Adicionar o ícone inicial para indicar que pode ser ordenado
            const sortIcon = document.createElement('i');
            sortIcon.className = 'ri-expand-up-down-line sort-icon'; // Ícone inicial
            header.appendChild(sortIcon);

            header.addEventListener('click', () => this.sortColumn(index, headers));
        });
    }

    sortColumn(index, headers) {
        const rows = Array.from(this.filteredData);
    
        // Resetar ícones de outras colunas
        headers.forEach(header => {
            const icon = header.querySelector('i');
            icon.className = 'ri-expand-up-down-line sort-icon'; // Reseta o ícone para o padrão
        });
    
        // Alternar entre ascendente e descendente
        this.sortOrder = (this.sortedColumnIndex === index && this.sortOrder === 'asc') ? 'desc' : 'asc';
        this.sortedColumnIndex = index;
    
        // Detectar se a coluna contém números
        const isNumericColumn = rows.every(row => {
            const cellValue = row.getElementsByTagName('td')[index].textContent.trim();
            return !isNaN(cellValue) && cellValue !== ''; // Verifica se é um número
        });
    
        // Ordenar as linhas com base na ordem atual
        rows.sort((rowA, rowB) => {
            const cellA = rowA.getElementsByTagName('td')[index].textContent.trim();
            const cellB = rowB.getElementsByTagName('td')[index].textContent.trim();
    
            // Se for uma coluna numérica, ordene numericamente
            if (isNumericColumn) {
                const numA = parseFloat(cellA);
                const numB = parseFloat(cellB);
                return this.sortOrder === 'asc' ? numA - numB : numB - numA;
            }
    
            // Caso contrário, faça a ordenação alfabética normal (texto)
            return this.sortOrder === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        });
    
        // Atualizar o ícone da coluna atual
        const currentHeaderIcon = headers[index].querySelector('i');
        currentHeaderIcon.className = this.sortOrder === 'asc'
            ? 'ri-arrow-up-s-line sort-icon'   // Ícone para ascendente
            : 'ri-arrow-down-s-line sort-icon'; // Ícone para descendente
    
        this.filteredData = rows;
        this.goToPage(1);
    }
        
    displayTable(data, page) {
        const entries = this.entriesSelect.value === '*' ? data.length : parseInt(this.entriesSelect.value);
        const start = (page - 1) * entries;
        const end = start + entries;
        const paginatedData = data.slice(start, end);

        this.table.querySelector('tbody').innerHTML = '';
        paginatedData.forEach(row => this.table.querySelector('tbody').appendChild(row));

        this.updateInfo(data.length, page, entries);
        this.updatePagination(data.length, page, entries);
    }

    updateInfo(totalRows, page, entriesPerPage) {
        const start = (page - 1) * entriesPerPage + 1;
        const end = Math.min(page * entriesPerPage, totalRows);

        // Atualizando os elementos separadamente usando os IDs passados
        this.startEntry.textContent = totalRows === 0 ? 0 : start;
        this.endEntry.textContent = totalRows === 0 ? 0 : end;
        this.totalEntries.textContent = totalRows;

        // Caso não haja dados
        if (totalRows === 0) {
            this.info.textContent = 'No entries found';
        }
    }

    addSearchFunctionality() {
        this.searchInput.addEventListener('input', () => {
            const searchTerm = this.searchInput.value.toLowerCase();
            this.filteredData = this.rows.filter(row =>
                row.textContent.toLowerCase().includes(searchTerm)
            );
            this.goToPage(1);
        });
    }

    addEntriesFunctionality() {
        this.entriesSelect.addEventListener('change', () => this.goToPage(1));
    }

    updatePagination(totalRows, page, entriesPerPage) {
        this.pagination.innerHTML = '';
    
        if (entriesPerPage >= totalRows) return;
    
        const totalPages = Math.ceil(totalRows / entriesPerPage);
    
        if (totalPages > 1) {
            this.pagination.appendChild(this.createPageItem(this.firstLabel, 1)); // First
            this.pagination.appendChild(this.createPageItem(this.previousLabel, page > 1 ? page - 1 : 1)); // Previous
    
            for (let i = 1; i <= totalPages; i++) {
                this.pagination.appendChild(this.createPageItem(i, i, i === page));
            }
    
            this.pagination.appendChild(this.createPageItem(this.nextLabel, page < totalPages ? page + 1 : totalPages)); // Next
            this.pagination.appendChild(this.createPageItem(this.lastLabel, totalPages)); // Last
        }
    }
    

    createPageItem(label, page, active = false) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (active) li.classList.add('active');
        li.innerHTML = `<a class="page-link" href="#">${label}</a>`;
        li.addEventListener('click', (e) => {
            e.preventDefault();
            this.goToPage(page);
        });
        return li;
    }

    goToPage(page) {
        this.currentPage = page;
        this.displayTable(this.filteredData, page);
    }
}

