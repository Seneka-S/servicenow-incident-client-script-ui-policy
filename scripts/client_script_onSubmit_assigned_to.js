function onSubmit() {
    var impact = g_form.getValue('impact');
    var assignedTo = g_form.getValue('assigned_to');

    // If Impact is High (1) and Assigned to is empty, prevent form submission
    if (impact == '1' && (!assignedTo || assignedTo.trim() === '')) {
        g_form.showFieldMsg('assigned_to', 'Assigned To is mandatory for High impact incidents.', 'error');
        return false;
    }

    return true;
}
