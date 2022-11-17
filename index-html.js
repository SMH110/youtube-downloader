module.exports = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <form action="/" method="POST">
        <input name="url" type="text" placeholder="Paste your link here">
        <label>Video <input name="audioVideo" type="radio" value="video"/></label>
        <label>Audio <input name="audioVideo" type="radio" value="audio"/></label>
        <button type="submit">Download</button>
    </form>
</body>
</html>`;
