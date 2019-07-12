window.onload = function()
{    
    var file = [];
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', "/upload");
    httpRequest.send();

    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                console.log("File Successfully recieved");
            file = file.concat(JSON.parse(httpRequest.responseText));

        for(var i=0; i < file.length; ++i)
	{
	    var url = 'uploads/' + file[i];
	    var ext = file[i].substr(file[i].lastIndexOf('.') + 1);
	    
	    if(ext == 'docx' || ext == 'doc' || ext == 'pptx' || ext == 'ppt' || ext == 'xls' || ext == 'xlsx' || ext == 'pdf') {
		url = 'https://docs.google.com/gview?url=' + window.location.href + url + '&embedded=true';
	    }
	    else if(ext == 'txt' || ext == 'java' || ext == 'cpp' || ext == 'h' || ext == 'css' || ext == 'js'|| ext == 'sql') {
		url = 'https://raw.arshwaraich.com/Editor/editor.html?file=' + window.location.href + url;
	    }
	    else {
		url = '/' + url;
	    }

            document.getElementById("fileList").innerHTML += (
            "<div class='div-table-row'>" +
            "   <div class='div-table-col center' style='width: 8vh; float: left;'>" +
            "        <a href='" + url + "' style='display: block;' target='_blank'>" +
            "        <i class='fa fa-eye'></i>" +
            "        </a>" +
            "        <div class='box'>" +
            //"            <iframe src='/uploads/" + file[i] + "' width = '500px' height = '500px'>" +
            //"            </iframe>" +
            "        </div>" +
            "    </div>" +
            "    <div  class='div-table-col'style='background: inherit;'>" +
            "        <div class='listbox center'>" + (file[i].length > 30 ? file[i].substr(0,30) + '...' : file[i]) + "</div>" +
            "    </div>" +
            "    <div  class='div-table-col center' onclick='deleteFile(\"" + file[i] + "\")' style='width: 8vh; float: right;'>" +
            "        <i class='fa fa-times'></i>" +
            "    </div>" +
            "</div>");
	}
            }else{
                console.log("Error getting uploads");
            }
        }
    }
};

function deleteFile(fileName)
{
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('DELETE', "/delete/" + fileName);
    httpRequest.send();
    document.getElementsByTagName('html')[0].style.cursor = "progress";
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                console.log(fileName + ' deleted!');
                window.location.reload();
            }
            else {
                console.log('Delete failed!');
            }
        }
    };
};
