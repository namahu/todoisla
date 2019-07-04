function doPost(e): GoogleAppsScript.Content.TextOutput {
    const properties: any = PropertiesService.getScriptProperties().getProperties();
    const verificationToken: string = properties.verificationToken;
    const postedToken: string = e.parameter.token;
    
    if (verificationToken !== postedToken) {
        throw new Error('Invalid token');
    }

    const commandText: string = e.parameter.text;
    let res: GoogleAppsScript.URL_Fetch.HTTPResponse;

    if (/today/i.test(commandText)) {
        // todoistへ
        const todoistTaskEndPoint: string = 'https://beta.todoist.com/API/v8/tasks?filter=today';

        const todoistToken: string = properties.todoistToken;

        const option: any = {
            'method': 'get',
            'headers': {
                'Authorization': `Bearer ${todoistToken}`,
            },
            'muteHttpExceptions': true,
        };
        

        res = UrlFetchApp.fetch(todoistTaskEndPoint, option);
    }

    let result: any;
    if (res.getResponseCode() === 200) {
        const tasks: string[] = [];
        const resContents: any = JSON.parse(res.getBlob().getDataAsString());
        resContents.forEach(task => {
            tasks.push(task.id);
        });
        result = {
            result: 'success',
            data: tasks,
        };
    } else {
        result = {
            result: 'failer',
        };
    }

    const resultMessage: string = JSON.stringify(result);
    return ContentService.createTextOutput(resultMessage).setMimeType(ContentService.MimeType.JSON);

}
