/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * Created By: Paolo Salvador
 * Date: 12-20-2024
 * Script Description: To change Customer Amount Line field on Opportunities wherein Rate * Quantity * Terms in Months
 * is computed if customform = 229
 */
define(['N/record', 'N/log'], function (record, log) {
    function fieldChanged(context) {
        try {
            console.log('test1');
            var currentRecord = context.currentRecord;

            // Check if the form is "form1"
            var formId = currentRecord.getValue({ fieldId: 'customform' });
            console.log(formId);
            if (formId !== '229') {
                return;
            }

            // Get values for Quantity, Rate, and Terms in Months, set condition to trigger only on Terms field change
            if (context.sublistId == 'item' && context.fieldId == 'custcol_amplify_monthly') {
                console.log('test2');
                var quantity = currentRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity'
                });

                var rate = currentRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate'
                });

                var terms = currentRecord.getCurrentSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_amplify_monthly'
                });

                // Calculate the value
                if (quantity && rate && terms) {
                    var amount = quantity * rate * terms;

                    // Set the calculated value in a custom field
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_amplify_pre_gross_amount',
                        value: amount,
                    });
                }
            }
        } catch (e) {
            log.error('Error in fieldChanged', e.message);
        }
    }

    return {
        fieldChanged: fieldChanged
    };
});
