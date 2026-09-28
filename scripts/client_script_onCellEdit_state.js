function onCellEdit(sysIDs, table, subfields, oldValue, newValue, callback) {
    var saveAndClose = false;

    // Prevent state changes via list editing
    alert('State cannot be updated using list editing. Please open the Incident.');
    callback(false);
}
