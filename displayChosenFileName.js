
$(document).ready(function()
{ 
    var uploadButton = document.getElementById("uploadButton");
    var fakeButton = document.getElementById("fakeButton");
    var wrongFileDialog = document.getElementById("wrongFileModal");
    var statusDialog = document.getElementById("statusModal");
    var nameWrongFile = document.getElementById("nameWrongFile");
    var statusUpload = document.getElementById("statusUpload");
    var fileInput = document.getElementById("customFile");
    var wrongFileModalButton = document.getElementById("wrongFileModalButton");
    var statusModalButton = document.getElementById("statusModalButton");
    
    document.querySelector('.custom-file-input').addEventListener('change',function(event)
    {
        var fileName = fileInput.files[0].name; 
        // Allowing file type 
        var allowedExtensions =  /(\.xlsx|\.xls|\.xlt)$/i; 
        console.log(fileInput.files)  
        if (!allowedExtensions.exec(fileName)) 
        { 
            ToggleModal("Open",wrongFileDialog);
            document.querySelector(".fileupload.stop").style.display = "block";
            nameWrongFile.style.color = "red";
            nameWrongFile.style.fontWeight = "700";
            nameWrongFile.innerText = "File " + fileName + " is not CSV File!"
            fileName = '';
            ToggleButton("Off",uploadButton);
            ToggleButton("On",fakeButton);
        }
        else
        {
            ToggleButton("On",uploadButton);
            ToggleButton("Off",fakeButton);
            var nextSibling = event.target.nextElementSibling
            nextSibling.innerText = fileName
        }
        fileInput.value = null
    })
    uploadButton.addEventListener("click",function(event)
    {
        document.getElementById("loader").style.display = "block";
        setTimeout(function()
        { 
            document.getElementById("loader").style.display = "none";
            ToggleModal("Open",statusDialog);
            document.querySelector(".fileupload.ok").style.display = "block";
            statusUpload.innerText = "Upload Successful!"
            $('form').first().hide();  
        }, 2000);

    })
    wrongFileModalButton.addEventListener("click",function(event)
    {
        ToggleModal("Close",wrongFileDialog);
    })
    statusModalButton.addEventListener("click",function(event)
    {
        ToggleModal("Close",statusDialog);
        $('form').first().show(); 
        ToggleButton("Off",uploadButton);
        ToggleButton("On",fakeButton);
        fileInput.nextElementSibling.innerText= "Choose file: Only CSV File allowed!";
    })

    $(statusDialog).on('hidden.bs.modal', function () {
        $('form').first().show(); 
    })
    function ToggleModal(keyword,modalName)
    {
        if (keyword == "Open")
        {
            $(modalName).modal()
            //modalName.style.display = "block";
        }
        else if (keyword == "Close")
        {
            $(modalName).modal('hide')
            //modalName.style.display = "none";
        }
    }
    function ToggleButton(keyword,buttonName)
    {
        if(keyword == "On")
        {
            buttonName.style.display = "block";
        }
        else if (keyword == "Off")
        {
            buttonName.style.display = "none";
        }
    }
});
