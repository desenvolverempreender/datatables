// Instanciar as datatables
const dataTable = new DataTable({
    tableId: 'datatable1',
    entriesSelectId: 'entriesSelect1',
    searchInputId: 'searchInput1',
    paginationId: 'pagination1',
    infoId: 'info1',
    startEntryId: 'startEntry1',
    endEntryId: 'endEntry1',
    totalEntriesId: 'totalEntries1',
    firstLabel: '<i class="ri-arrow-left-double-line"></i>',
    previousLabel: '<i class="ri-arrow-left-s-line"></i>',
    nextLabel: '<i class="ri-arrow-right-s-line"></i>',
    lastLabel: '<i class="ri-arrow-right-double-fill"></i>',
    hasCheckboxes: true // Ativar os checkboxes
});

new DataTable({
    tableId: 'datatable2',
    entriesSelectId: 'entriesSelect2',
    searchInputId: 'searchInput2',
    paginationId: 'pagination2',
    infoId: 'info2',
    startEntryId: 'startEntry2',
    endEntryId: 'endEntry2',
    totalEntriesId: 'totalEntries2',
    firstLabel: 'First',
    previousLabel: 'Previous',
    nextLabel: 'Next',
    lastLabel: 'Last'
});

// Exemplo de ação com os itens selecionados
document.getElementById('performActionButton').addEventListener('click', () => {
    dataTable.performActionOnSelected((selectedRows) => {
        // Verificar se alguma linha foi selecionada
        if (selectedRows.length === 0) {
            alert('Nenhum item foi selecionado.');
            return;
        }

        // Obter os IDs das linhas selecionadas
        const selectedRowIds = selectedRows.map((row) => {
            const idCell = row.querySelectorAll('td')[1]; // Pega a segunda célula (assumindo que a primeira seja o checkbox)
            return idCell ? idCell.textContent.trim() : ''; // Retorna o valor da célula (ID) ou string vazia se não existir
        }).filter(id => id !== ''); // Filtra possíveis valores vazios

        // Exibir os IDs das linhas selecionadas em um alert
        if (selectedRowIds.length > 0) {
            alert('IDs selecionados: ' + selectedRowIds.join(', '));
        } else {
            alert('Nenhum ID foi selecionado.');
        }
    });
});