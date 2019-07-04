function doPost(e): GoogleAppsScript.Content.TextOutput {
    const verificationToken: string = PropertiesService.getScriptProperties().getProperty('verificationToken');
    const postedToken: string = e.parameter.token;
    
    if (verificationToken !== postedToken) {
        throw new Error('Invalid token');
    }

    const commandText: string = e.parameter.text;

    if (/list/i.test(commandText)) {
        // todoistへ
    }

    const result: string = JSON.stringify({result: 'success', data: commandText});
    return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}
